<?php
// Підключення до файлу conector.php, який буде отримувати необхідні дані
include '../dbconector/conector.php';

// Path to the log file for debugging
$log_file = 'form_submission.log';

// Function to log messages
function log_message($message) {
    global $log_file;
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - " . $message . "\n", FILE_APPEND);
}

// Log the request method and headers for debugging
log_message("Request method: " . $_SERVER['REQUEST_METHOD']);
log_message("Request headers: " . json_encode(getallheaders()));

// Extract form data
$click_id = $_POST['external_id'];
$nameDocument = $_POST['title_name'];
$firstName = $_POST['name'] ?? $_POST['name2'] ?? "ERRORlname";
$lastName = $_POST['last'] ?? $_POST['last2'] ?? "ERRORfname";
$email = $_POST['email'] ?? $_POST['email2'] ?? "error@gmail.com";
$phone = $_POST['prephone'] ?? $_POST['prephone2'] ?? null;
$countryCode = $_POST['country_code'] ?? $_POST['country_code2'] ?? null;
$phoneWithCode = preg_replace('/[^0-9]/','', $countryCode) . preg_replace('/[^0-9]/','',$phone);
$geoCode = $_POST['country_name'] ?? $_POST['country_name2'] ?? null;

// Lead portrait enrichment (AI chat output)
$leadPortraitSummary = $_POST['lead_portrait_summary'] ?? '';
$leadCtxJsonRaw = $_POST['lead_ctx_json'] ?? '';
$leadPortraitSummary = is_string($leadPortraitSummary) ? trim($leadPortraitSummary) : '';
if (mb_strlen($leadPortraitSummary) > 800) { // truncate to keep payload compact
    $leadPortraitSummary = mb_substr($leadPortraitSummary, 0, 800);
}

$leadCtxDecoded = null;
if ($leadCtxJsonRaw !== '') {
    $tmp = json_decode($leadCtxJsonRaw, true, 512, JSON_INVALID_UTF8_SUBSTITUTE);
    if (json_last_error() === JSON_ERROR_NONE && is_array($tmp)) {
        $leadCtxDecoded = $tmp;
    } else {
        log_message('lead_ctx_json decode failed: ' . json_last_error_msg());
    }
}

// Extract final_profile signals if present
$finalProfile = $leadCtxDecoded['final_profile'] ?? null;
$profileSegment = $finalProfile['segment'] ?? null;
$profileTier = $finalProfile['tier'] ?? null;
$profileReadiness = $finalProfile['readiness_score'] ?? null;
$profileIncome = $finalProfile['income_range'] ?? null;
$profileJob = $finalProfile['job_title'] ?? null;
$profileAffluence = $finalProfile['affluence'] ?? null;
$profileTech = $finalProfile['tech_savviness'] ?? null;
$profileISP = $finalProfile['isp_type'] ?? null;

// Expose key fields to later utility functions (e.g., Telegram success message)
$GLOBALS['leadPortraitSummary'] = $leadPortraitSummary;
$GLOBALS['profileSegment'] = $profileSegment;
$GLOBALS['profileTier'] = $profileTier;
$GLOBALS['profileReadiness'] = $profileReadiness;

// Build compact addendum line (safe length)
$portraitAddendum = '';
if ($profileSegment || $profileTier || $profileReadiness) {
    $parts = [];
    if ($profileSegment) $parts[] = 'SEG=' . $profileSegment;
    if ($profileTier) $parts[] = 'TIER=' . $profileTier;
    if ($profileReadiness !== null) $parts[] = 'READINESS=' . $profileReadiness;
    if ($profileIncome) $parts[] = 'INC=' . $profileIncome;
    if ($profileJob) $parts[] = 'JOB=' . $profileJob;
    $portraitAddendum = implode(' ', $parts);
    if (strlen($portraitAddendum) > 220) {
        $portraitAddendum = substr($portraitAddendum, 0, 220);
    }
}

// Other UTM parameters
$campaign_id = $_POST['campaign_id'] ?? null;
$adset_id = $_POST['adset_id'] ?? null;
$ad_id = $_POST['ad_id'] ?? null;
$utm_campaign = $_POST['utm_campaign'] ?? null;
$adset_name = $_POST['adset_name'] ?? null;
$ad_name = $_POST['ad_name'] ?? null;
$utm_placement = $_POST['utm_placement'] ?? null;
$utm_source = $_POST['utm_source'] ?? null;
$answers_description = $_POST['description'] ?? null;

// Buyer Tracking
$mbr = $_POST['affc'] ?? "TEST"; // Отримуємо значення mbr для подальшого вибору конфігурації
$pxl = $_POST['pixel'] ?? "pxl";
$pxlt = $_POST['pixel'] ?? "pxlt";
$pxlg = $_POST['pxlg'] ?? "pxlg";
$pxlm = $_POST['pixel'] ?? 877087;
$pixel = $_POST['pixel'];
// Get additional data
$subId = isset($_COOKIE['_subid']) ? $_COOKIE['_subid'] : time();
$subId = substr($subId, 0, 255);
$locationInfo = getLocationInfo();
$url = parse_url($_SERVER['HTTP_REFERER']);
$landingURL = $url['scheme'] . '://' . $url['host'] . "/loading.html";

$config = getConfig($mbr);

$subs = getSUBs($campaign_id, $adset_id, $ad_id, $utm_campaign, $adset_name, $ad_name, $utm_source, $utm_placement, $mbr, $pxl, $answers_description);
$utms = getUTMs($utm_source, $utm_campaign, $utm_medium);
$languageCode = $_POST['browser_lang'] ?? getLanguageCode();
$landingLang = $_POST['landing_lang'] ?? getLanguageCode();


$protocolLander = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https" : "http";
$domainLander = $_SERVER['HTTP_HOST'];
$pathLander = dirname($_SERVER['REQUEST_URI']);

// Merge portrait summary + addendum into subId_f instead of using comment field
if ($leadPortraitSummary !== '' || $portraitAddendum !== '') {
    $portraitPayload = trim(($leadPortraitSummary ?: '') . ($portraitAddendum ? ' | ' . $portraitAddendum : ''));
    $base = $subs['subId_f'] ?? '';
    $combined = trim($base . ' ' . $portraitPayload);
    // Typical affiliate subId length limits ~255 chars; keep safe margin
    if (mb_strlen($combined) > 250) {
        $combined = mb_substr($combined, 0, 250);
    }
    $subs['subId_f'] = $combined;
    log_message('Lead portrait merged into subId_f (len=' . strlen($combined) . ')');
}

// Re-build originalData after subId_f enrichment
$originalData = array(
    'affc' => $config['affc'] ?? null,
    'bxc' => $config['bxc'] ?? null,
    'vtc' => $config['vtc'] ?? null,
    'profile' => array(
        'firstName' => $firstName,
        'lastName' => $lastName,
        'email' => $email,
        'password' => "aA1E23135167&",
        'phone' => $phoneWithCode
    ),
    'ip' => $locationInfo['ip'],
    'funnel' => $nameDocument,
    'landingURL' => $landingURL,
    'geo' => $locationInfo['geo'],
    'lang' => strtolower($languageCode),
    'landingLang' => strtolower($landingLang),
    'subId' => strval($subId),
    'subId_a' => $subs['subId_a'],
    'subId_b' => $subs['subId_b'],
    'subId_c' => $subs['subId_c'],
    'subId_d' => $subs['subId_d'],
    'subId_e' => $subs['subId_e'],
    'subId_f' => $subs['subId_f'],
    'utmSource' => $utms['utmSource'],
    'utmMedium' => $utms['utmMedium'],
    'utmCampaign' => $utms['utmCampaign'],
    'utmId' => $utms['utmId'],
    // No 'comment' usage; partner expects enrichment via subId_f
    'comment' => null
);

if ($finalProfile) {
    log_message('Final profile keys: ' . implode(',', array_keys($finalProfile)));
}

// Log the data to be sent to the original server
log_message("Data to send to original server: " . json_encode($originalData));

// Send data to the original server using cURL
$originalResponse = sendToOriginalServer($originalData, $config['domain'], $config['apiKey']);

// Handle the response from the original server
$responseDecoded = json_decode($originalResponse, true);
if ($responseDecoded && $responseDecoded['success']) {
    $loginUrl = $responseDecoded['redirectUrl'];
        echo "
    <script>
        localStorage.setItem('lastVisited', '$loginUrl');
    </script>
";
    sendMessageToTelegramSuccess($originalResponse, $email, $locationInfo, $mbr);
} else {
    $loginUrl = 'thanks.php';
    $fullUrl = "$protocolLander://$domainLander$pathLander/$loginUrl";
    echo "
    <script>
        localStorage.setItem('lastVisited', '$fullUrl');
    </script>
";
    log_message("Error sending to original server: " . $originalResponse);
    sendMessageToTelegram($nameDocument, $originalData, $originalResponse);
        $responseData = json_decode($originalResponse, true);
if (isset($responseData['error']) && strpos($responseData['error'], 'No brands available for this lead') !== false) {
    sendMessageToTelegramSuccess($originalResponse, $email, $locationInfo, $mbr);
}
}
log_message("Redirect: " . $loginUrl);
log_message("NameDocument : " . $nameDocument);

function getSUBs($campaign_id, $adset_id, $ad_id, $utm_campaign, $adset_name, $ad_name, $utm_placement, $utm_source, $mbr, $pxl, $answers_description) {
    return array(
        'subId_a' => $mbr ?? "buyer",
        'subId_b' => "CMPID: " . ($campaign_id ?? "camp_id") . " ADSTID: " . ($adset_id ?? "adset_id") . " ADID: " . ($ad_id ?? "ad_id"),
        'subId_c' => "CMP: " . ($utm_campaign ?? "utm_campaign") . " ADST: " . ($adset_name ?? "adset_name") . " AD: " . ($ad_name ?? "ad_name"),
        'subId_d' => "SOURCE: " . $utm_placement . $utm_source ?? "-placement",
        'subId_e' => $pxl ?? null,
        'subId_f' => $answers_description ?? null
    );
}

function getUTMs() {
    // Parse the current page's URL to get query parameters
    $url = parse_url($_SERVER['REQUEST_URI']);
    parse_str($url['query'], $params);

    // Extract UTM parameters or set to null if not present
    return array(
        'utmId' => $params['utmId'] ?? null, // or provide a fallback if necessary
        'utmSource' => $params['utm_source'] ?? null,
        'utmCampaign' => $params['utm_campaign'] ?? null,
        'utmMedium' => $params['utm_medium'] ?? null,
    );
}
function getConfig($mbr) {
    $configurationsAff = array(
    'SAS' => array(
        'affc' => "AFF-V0G5LGTMY2",
        'bxc' => "BX-PRPSTHHV20X3Y",
        'vtc' => "VT-HP8XSRMKVS6E7",
        'apiKey' => "f98fcaf9-53cb-4391-86e8-687db6f8d3dd",
        'domain' => 'stormchg.biz'
    ),
    'DAN' => array(
        'affc' => "AFF-7G6VU4E6E2",
        'bxc' => "BX-PRPSTHHV20X3Y",
        'vtc' => "VT-HP8XSRMKVS6E7",
        'apiKey' => "a06bd353-40ed-4f32-8e08-fa6148f83d24",
        'domain' => 'stormchg.biz'
    ),
        'DEN' => array(
        'affc' => "AFF-4O871EIG28",
        'bxc' => "BX-PRPSTHHV20X3Y",
        'vtc' => "VT-HP8XSRMKVS6E7",
        'apiKey' => "51b43f04-fa49-4caf-8ad5-390a81a479c1",
        'domain' => 'stormchg.biz'
    ),
        'KEF' => array(
        'affc' => "AFF-JCLX9LVHEX",
        'bxc' => "BX-PRPSTHHV20X3Y",
        'vtc' => "VT-HP8XSRMKVS6E7",
        'apiKey' => "c9b9c5b4-8337-45d1-ac1a-4e036a171391",
        'domain' => 'stormchg.biz'
    ),
    );
    if (array_key_exists($mbr, $configurationsAff)) {
        return $configurationsAff[$mbr];
    } else {
        return $configurationsAff['KEF'];
    }
}
function getLocationInfo() {
    // Check if 'HTTP_X_FORWARDED_FOR' contains multiple IPs, separated by commas
    if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip_list = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        $user_ip = trim($ip_list[0]); // Take the first IP in the list, which is usually the client's real IP
    } else {
        $user_ip = $_SERVER['REMOTE_ADDR'];
    }

    log_message("Using IP address: " . $user_ip);

    $apiUrl = 'https://ipinfo.io/' . $user_ip . '/json';
    $response = @file_get_contents($apiUrl);

    if ($response !== false) {
        $data = json_decode($response, true);
        log_message("Raw response from ipinfo.io: " . $response);

        if (isset($data['ip']) && isset($data['country'])) {
            return array('ip' => $data['ip'], 'geo' => strtoupper($data['country']));
        } else {
            log_message("ipinfo.io returned an incomplete response: " . json_encode($data));
        }
    } else {
        log_message("Error fetching geo data from ipinfo.io. Response was false.");
    }

    // Fallback
    log_message("Returning default values for IP and geo.");
    return array('ip' => 'unknown', 'geo' => 'US'); // Adjust fallback values as necessary
}

function getLanguageCode() {
    if (isset($_SERVER["HTTP_ACCEPT_LANGUAGE"])) {
        $languages = explode(",", $_SERVER["HTTP_ACCEPT_LANGUAGE"]);
        $primaryLanguage = explode(";", $languages[0])[0];
        return strtolower(substr($primaryLanguage, 0, 2));
    }
    return 'en';
}

function sendToOriginalServer($data, $domain, $apiKey) {
    $url = "https://$domain/api/external/integration/lead";
    $payload = json_encode($data);

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => array(
            "Content-Type: application/json",
            "x-api-key: $apiKey"
        ),
    ));

    $response = curl_exec($curl);
    $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ($httpcode !== 201) { // 201 is Created, indicating successful post
        log_message("cURL error: HTTP code $httpcode, response: $response");
    }

    curl_close($curl);

    // Log the HTTP response code and headers
    log_message("HTTP response code: " . $httpcode);

    if ($response === FALSE) {
        log_message("Error sending to original server");
        $loginUrl = 'thanks.php';
    }
    return $response;
    
}

function sendMessageToTelegram($offer, $data, $response) {
    $TELEGRAM_TOKEN = '7551389452:AAGmNp3bS8hz7tqNuQH2T3enPtSHwH5wEbY';
    $TELEGRAM_CHAT_ID = '-1002464153296';

    $url = "https://api.telegram.org/bot$TELEGRAM_TOKEN/sendMessage";

    // Форматуємо дані для кращого відображення
    $formattedData = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    $formattedResponse = json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    $payload = array(
        'chat_id' => $TELEGRAM_CHAT_ID,
        'parse_mode' => 'HTML',
        'text' => "📄<b>ОШИБКА РЕГИСТРАЦИИ:</b>\n
        Передача лида для <a href=\"" . htmlspecialchars($_SERVER['HTTP_REFERER']) . "\">оффера $offer</a> не удалась\n\n
        <b>Запрос трансфера:</b>\n<pre>" . htmlspecialchars($formattedData) . "</pre>\n\n
        <b>Ответ трансфера:</b>\n<pre>" . htmlspecialchars($formattedResponse) . "</pre>\n\n
        #leads #transfer_failed"
    );

    $options = array(
        'http' => array(
            'header'  => "Content-Type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($payload),
        ),
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    // Можна перевірити результат і вивести лог
    if ($result === FALSE) {
        error_log('Error sending message to Telegram.');
    }
}

function sendMessageToTelegramSuccess($response, $email, $locationInfo, $mbr) {
    $TELEGRAM_TOKEN = '7551389452:AAGmNp3bS8hz7tqNuQH2T3enPtSHwH5wEbY';
    $TELEGRAM_CHAT_ID = '-1002332046690';

    $url = "https://api.telegram.org/bot$TELEGRAM_TOKEN/sendMessage";
    
    $responseData = json_decode($response, true);

if (isset($responseData['error']) && strpos($responseData['error'], 'No brands available for this lead') !== false) {
    $status = "❌ Failure";
} else {
    $status = "✅ Success";
}

    // Sanitize inputs
    $formattedResponse = json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    $email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $geo = $locationInfo['geo'] ?? 'Unknown Location';
    $mbr = htmlspecialchars($mbr, ENT_QUOTES, 'UTF-8');

    // Attempt to surface portrait summary & key metrics if stored earlier in global scope
    $portraitSummarySafe = '';
    if (!empty($GLOBALS['leadPortraitSummary'])) {
        $portraitSummarySafe = htmlspecialchars($GLOBALS['leadPortraitSummary'], ENT_QUOTES, 'UTF-8');
    }
    $segmentSafe = htmlspecialchars($GLOBALS['profileSegment'] ?? '', ENT_QUOTES, 'UTF-8');
    $tierSafe = htmlspecialchars($GLOBALS['profileTier'] ?? '', ENT_QUOTES, 'UTF-8');
    $readinessSafe = htmlspecialchars((string)($GLOBALS['profileReadiness'] ?? ''), ENT_QUOTES, 'UTF-8');

    $extraLines = '';
    if ($segmentSafe || $tierSafe || $readinessSafe) {
        $extraLines .= "\n📊 <b>SEG:</b> $segmentSafe <b>TIER:</b> $tierSafe <b>R:</b> $readinessSafe";
    }
    if ($portraitSummarySafe) {
        // Trim if very long
        if (mb_strlen($portraitSummarySafe) > 400) {
            $portraitSummarySafe = mb_substr($portraitSummarySafe, 0, 400) . '…';
        }
        $extraLines .= "\n🧬 <b>PORTRAIT:</b> <i>$portraitSummarySafe</i>";
    }

// Build payload
$payload = array(
    'chat_id' => $TELEGRAM_CHAT_ID,
    'parse_mode' => 'HTML',
     'text' => "\n📄<b>NEW LEAD:</b>\n\n<b>Status:</b> <i>$status</i>\n\n✉️ <b></b> <u>" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</u>\n🌍 <b></b> <u>" . htmlspecialchars($geo, ENT_QUOTES, 'UTF-8') . "</u>\n🤝 <b>BUYER:</b> <u>" . htmlspecialchars($mbr, ENT_QUOTES, 'UTF-8') . "</u>" . $extraLines . "\n\n#️⃣ <i>#money_station_leads</i>"
);



    // Set HTTP options
    $options = array(
        'http' => array(
            'header'  => "Content-Type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($payload),
        ),
    );

    // Send the request
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    // Error handling
    if ($result === FALSE) {
        error_log('Error sending message to Telegram. Response: ' . print_r($http_response_header, true));
        return;
    }

    // Check API response
    $decodedResult = json_decode($result, true);
    if (!$decodedResult || !$decodedResult['ok']) {
        error_log('Telegram API error: ' . $result);
    }
}


?>

<!DOCTYPE html>
<html>
<head>
  <img src="https://tracker.station.baby/de5e8b1/postback?subid={subid}&status=lead" width="1" height="1" />
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Loading</title>
  <style>
        .preloader {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
        }
    </style>
<!-- Mgid Sensor -->
<script type="text/javascript">
    (function() {
        var d = document, w = window;
        w.MgSensorData = w.MgSensorData || [];
        w.MgSensorData.push({
            cid:877087,
            lng:"us",
            project: "a.mgid.com"
        });
        var l = "a.mgid.com";
        var n = d.getElementsByTagName("script")[0];
        var s = d.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        var dt = !Date.now?new Date().valueOf():Date.now();
        s.src = "https://" + l + "/mgsensor.js?d=" + dt;
        n.parentNode.insertBefore(s, n);
    })();
</script>
<!-- /Mgid Sensor -->
<script>
   (window._mgq = window._mgq || []).push(["MgSensorInvoke", "signup"])
 </script>
<!-- Taboola Pixel Code -->

<script type='text/javascript'>

  window._tfa = window._tfa || [];

  window._tfa.push({notify: 'event', name: 'page_view', id: 1752606});

  !function (t, f, a, x) {

         if (!document.getElementById(x)) {

            t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);

         }

  }(document.createElement('script'),

  document.getElementsByTagName('script')[0],

  '//cdn.taboola.com/libtrc/unip/1752606/tfa.js',

  'tb_tfa_script');

</script>

<!-- End of Taboola Pixel Code -->

<!-- Taboola Pixel Code -->

<script>

    _tfa.push({notify: 'event', name: 'complete_registration', id: 1752606});

</script>

<!-- End of Taboola Pixel Code -->
<script>
    document.addEventListener("DOMContentLoaded", function() {
  
            const pixelId = '<?php echo $_POST['pixel'] ?>';
  
            if (pixelId) {
                !function(f,b,e,v,n,t,s) {
                    if (f.fbq) return;
                    n = f.fbq = function() {
                        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                    };
                    if (!f._fbq) f._fbq = n;
                    n.push = n;
                    n.loaded = !0;
                    n.version = '2.0';
                    n.queue = [];
                    t = b.createElement(e);
                    t.async = !0;
                    t.src = v;
                    s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s);
                }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
                
                fbq('init', pixelId); // Використовуємо pixelId із PHP
                fbq('track', 'CompleteRegistration');
                fbq('track', 'Lead');
                fbq('track', 'SubmitApplication');
                console.log('Pixel ID:', pixelId);
            } else {
                console.error('Pixel ID not found.');
            }

            // Обновлення Pixel ID у тегу noscript
            const noscriptTag = document.createElement('noscript');
            noscriptTag.innerHTML = `<img height="1" width="1" style="display:none" 
                                      src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/>`;
            document.body.appendChild(noscriptTag);

            // Відправка даних форми
        });
 
    </script>
<!-- TikTok Pixel Code Start -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t][];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t][],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

  ttq.load('<?php echo $pixel ?>');
  ttq.track('CompleteRegistration');
    ttq.track('AddToCart');
  ttq.page();
}(window, document, 'ttq');
</script>

<!-- TikTok Pixel Code End -->

 <!--  Global site tag (gtag.js) - Google Ads: 10944410989 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo $gtag?>"></script>


<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '<?php echo $gtag?>');
</script>
 <!-- Event snippet for Page view conversion page  -->
<script>
  gtag('event', 'conversion', {'send_to': '<?php echo $gtag?>/<?php echo $gsnip?>'});
</script>

<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]function(){(m[i].a=m[i].a[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(99205894, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/99205894" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->

</head>
<body>
<div class="preloader">Loading...<img src="POSTBACK_URL?subid=<?php $subId?>&status=lead" width="1" height="1" /></div>

  <script type="text/javascript">
    window.onload = function() {
      window.location.href = "<?php echo $loginUrl; echo "?pixel="; echo $pixel?>";
    };
  </script>

</body>
</html>
