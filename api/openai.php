<?php
// api/openai.php — JSON proxy (без стрімінгу)
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

// ===== Helpers =====
function http_get_json($url, $headers = [], $timeout = 5) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => $timeout,
        CURLOPT_HTTPHEADER => $headers,
    ]);
    $res = curl_exec($ch);
    $err = curl_errno($ch);
    $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($err || $http < 200 || $http >= 300 || !$res) return null;
    $data = json_decode($res, true);
    return is_array($data) ? $data : null;
}
function cache_get($key, $ttl_sec = 21600) { // 6h strong / 5m weak set below
    $f = sys_get_temp_dir()."/$key.json";
    if (!file_exists($f)) return null;
    if (filemtime($f) + $ttl_sec < time()) return null;
    $j = @file_get_contents($f);
    $d = json_decode($j, true);
    return is_array($d) ? $d : null;
}
function cache_set($key, $val) {
    $f = sys_get_temp_dir()."/$key.json";
    @file_put_contents($f, json_encode($val, JSON_UNESCAPED_UNICODE));
}
function starts_with($haystack, $needle) { return strncmp($haystack ?? '', $needle, strlen($needle)) === 0; }

// ===== Defaults / Tokens =====
// Mapbox token: env override -> provided fallback (PUBLIC pk)
$MAPBOX_TOKEN_DEFAULT = 'pk.eyJ1Ijoiam9obmF0aGFubXJkaW9yeSIsImEiOiJjbWZ4dGc1dmwwYXFlMmpyMDZ1aDRnenp5In0.Dlo6uWwTJguMX3CJf9lueQ';

// ===== API Key =====
$apiKey = getenv('OPENAI_API_KEY');
if (!$apiKey) {
    $phpKeyFile = __DIR__ . '/openai_key.php';
    if (file_exists($phpKeyFile)) {
        $val = include $phpKeyFile;
        if ($val && is_string($val)) $apiKey = trim($val);
    }
    $keyFile = __DIR__ . '/../.openai_key';
    if (!$apiKey && file_exists($keyFile)) $apiKey = trim(file_get_contents($keyFile));
}
if (!$apiKey) {
    http_response_code(200);
    echo json_encode(["error" => "NO_API_KEY", "message" => "OpenAI API key not configured"]);
    exit;
}

// ===== Input =====
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['messages']) || !is_array($input['messages'])) {
    http_response_code(400);
    echo json_encode(["error" => "INVALID_INPUT"]);
    exit;
}
$messages = $input['messages'];
$model    = $input['model'] ?? 'gpt-4o-mini';
$keitaro  = $input['keitaro'] ?? [];
$lang     = $input['lang'] ?? null; // автонижче
$cta_url  = $input['cta_url'] ?? (getenv('CTA_URL') ?: '#');

// ===== Debug / Client overrides (optional) =====
$debug_ip = $input['debug_ip'] ?? null; // {"debug_ip":"8.8.8.8"}
if ($debug_ip && filter_var($debug_ip, FILTER_VALIDATE_IP)) {
    $_SERVER['HTTP_CF_CONNECTING_IP'] = $debug_ip;
}
$coords = (isset($input['coords']) && is_array($input['coords'])) ? $input['coords'] : null; // {"coords":{"lat":50.45,"lon":30.52}}

// ===== Client IP detection (behind proxies/CDN aware) =====
function client_ip() {
    $candidates = ['HTTP_CF_CONNECTING_IP','HTTP_X_REAL_IP','HTTP_X_FORWARDED_FOR','REMOTE_ADDR'];
    foreach ($candidates as $h) {
        if (!empty($_SERVER[$h])) {
            $val = $_SERVER[$h];
            if ($h === 'HTTP_X_FORWARDED_FOR') {
                $parts = array_map('trim', explode(',', $val));
                foreach ($parts as $p) if (filter_var($p, FILTER_VALIDATE_IP)) return $p;
            } else if (filter_var($val, FILTER_VALIDATE_IP)) return $val;
        }
    }
    return null;
}
$ip        = client_ip();
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
$device    = (preg_match('/iphone|ipad|android|mobile/i', $userAgent)) ? 'mobile' : 'desktop';

// ===== Keitaro fields (extended) =====
$k = array_merge([
    'click_id'=>'','external_id'=>'','campaign_id'=>'','adset_id'=>'','ad_id'=>'',
    'utm_source'=>'','utm_medium'=>'','utm_campaign'=>'','utm_term'=>'','utm_content'=>'','utm_id'=>'',
    'fbclid'=>'','gclid'=>'','yclid'=>'','ttclid'=>'','msclkid'=>'',
    'aff_sub1'=>'','aff_sub2'=>'','aff_sub3'=>'','aff_sub4'=>'','aff_sub5'=>'',
    'country'=>'','region'=>'','state'=>'','city'=>'','ip'=>'','ua'=>'','tz'=>'','referrer'=>'',
    'source'=>'','device_model'=>'','isp'=>'','language'=>'',
    'os'=>'','os_version'=>'','browser'=>'','browser_version'=>''
], is_array($keitaro) ? $keitaro : []);

// ===== Geo: IP → coords (ipinfo/ipapi/ip-api), then reverse (Mapbox/Nominatim) =====
function fetch_ip_geo($ip, $coords = null) {
    global $MAPBOX_TOKEN_DEFAULT;

    $baseKey = 'ipgeo_';
    if ($coords && isset($coords['lat'], $coords['lon'])) {
        $baseKey .= 'coords_' . preg_replace('/[^0-9\.\-]/','_', $coords['lat'].'_'.$coords['lon']);
    } else {
        if (!$ip || $ip === '127.0.0.1' || $ip === '::1') return null;
        $baseKey .= preg_replace('/[^0-9a-fA-F\.:]/', '_', $ip);
    }
    if ($cached = cache_get($baseKey.'_strong', 21600)) return $cached; // 6h
    if ($cached = cache_get($baseKey.'_weak',   300)) return $cached;   // 5m

    $out = [
        'ip'=>$ip,'lat'=>null,'lon'=>null,
        'city'=>null,'region'=>null,'country'=>null,'postal'=>null,'org'=>null,'timezone'=>null,
        'neighborhood'=>null,'district'=>null,
        'nearby_streets'=>[],'place_label'=>null,'address'=>null,'confidence'=>0.0,
        'providers'=>[]
    ];

    // Prefer GPS coords
    if ($coords && isset($coords['lat'],$coords['lon']) && is_numeric($coords['lat']) && is_numeric($coords['lon'])) {
        $out['lat']=(float)$coords['lat']; $out['lon']=(float)$coords['lon'];
        $out['providers'][]='coords';
    } else {
        // 0) ip-api.com (public, fast)
        $j0 = http_get_json("http://ip-api.com/json/{$ip}?fields=status,message,lat,lon,city,regionName,country,countryCode,zip,isp,org,timezone");
        if ($j0 && ($j0['status'] ?? '') === 'success') {
            $out['lat']=$j0['lat']??$out['lat']; $out['lon']=$j0['lon']??$out['lon'];
            $out['city']=$j0['city']??$out['city']; $out['region']=$j0['regionName']??$out['region'];
            $out['country']=$j0['country']??$out['country']; $out['postal']=$j0['zip']??$out['postal'];
            $out['org']=$j0['org']??($j0['isp']??$out['org']); $out['timezone']=$j0['timezone']??$out['timezone'];
            $out['confidence']=max($out['confidence'],0.6);
            $out['providers'][]='ip-api';
        }
        // 1) ipinfo (if token)
        $ipinfo = getenv('IPINFO_TOKEN');
        if ($ipinfo) {
            $j = http_get_json("https://ipinfo.io/{$ip}?token={$ipinfo}");
            if ($j) {
                if (!empty($j['loc'])) { [$lat,$lon]=array_map('trim', explode(',', $j['loc'])); $out['lat']=(float)$lat; $out['lon']=(float)$lon; }
                $out['city']=$j['city']??$out['city']; $out['region']=$j['region']??$out['region'];
                $out['country']=$j['country']??$out['country']; $out['org']=$j['org']??$out['org'];
                $out['timezone']=$j['timezone']??$out['timezone']; $out['confidence']=max($out['confidence'],0.7);
                $out['providers'][]='ipinfo';
            }
        }
        // 2) ipapi.co (fallback/augment)
        if (!$out['lat'] || !$out['lon']) {
            $j = http_get_json("https://ipapi.co/{$ip}/json/");
            if ($j && empty($j['error'])) {
                $out['lat']=$j['latitude']??$out['lat']; $out['lon']=$j['longitude']??$out['lon'];
                $out['city']=$j['city']??$out['city']; $out['region']=$j['region']??$out['region'];
                $out['country']=$j['country_name']??($j['country']??$out['country']); $out['postal']=$j['postal']??$out['postal'];
                $out['org']=$j['org']??$out['org']; $out['timezone']=$j['timezone']??$out['timezone'];
                $out['confidence']=max($out['confidence'],0.6); $out['providers'][]='ipapi';
            }
        }
    }

    // Reverse geocoding — Mapbox exact address first
    if ($out['lat'] && $out['lon']) {
        $mb = getenv('MAPBOX_TOKEN') ?: $MAPBOX_TOKEN_DEFAULT;

        // address near point
        $url_addr = sprintf(
            "https://api.mapbox.com/geocoding/v5/mapbox.places/%F,%F.json?types=address&reverseMode=distance&limit=1&language=uk,ru,en&access_token=%s",
            $out['lon'], $out['lat'], $mb
        );
        $gj1 = http_get_json($url_addr, [], 5);
        if ($gj1 && !empty($gj1['features'])) {
            $f = $gj1['features'][0];
            $out['address'] = $f['place_name'] ?? ($f['text'] ?? $out['address']);
            $out['place_label'] = $out['place_label'] ?: ($f['place_name'] ?? null);
            if (!empty($f['context'])) {
                foreach ($f['context'] as $c) {
                    $id = $c['id'] ?? ''; $txt = $c['text'] ?? '';
                    if (!$out['district'] && starts_with($id,'district')) $out['district']=$txt;
                    if (!$out['neighborhood'] && starts_with($id,'neighborhood')) $out['neighborhood']=$txt;
                }
            }
            $out['confidence'] = max($out['confidence'], 0.9);
            $out['providers'][]='mapbox-address';
        }

        // fallback streets/poi/locality
        if (!$out['address']) {
            $url_fb = sprintf(
                "https://api.mapbox.com/geocoding/v5/mapbox.places/%F,%F.json?types=street,poi,neighborhood,locality,place,region,district&limit=8&language=uk,ru,en&access_token=%s",
                $out['lon'], $out['lat'], $mb
            );
            $gj2 = http_get_json($url_fb, [], 5);
            if ($gj2 && !empty($gj2['features'])) {
                foreach ($gj2['features'] as $f) {
                    $type = $f['place_type'][0] ?? ''; $text = $f['text'] ?? ''; $name = $f['place_name'] ?? '';
                    if (in_array($type,['neighborhood','locality','district']) && !$out['neighborhood']) $out['neighborhood'] = $text ?: $name;
                    if ($type==='district' && !$out['district']) $out['district'] = $text ?: $out['district'];
                    if ($type==='street' && $text && !in_array($text,$out['nearby_streets'])) $out['nearby_streets'][]=$text;
                    if (!$out['place_label'] && $name) $out['place_label']=$name;
                }
                $out['confidence'] = max($out['confidence'], 0.8);
                $out['providers'][]='mapbox-fb';
            }
        }

        // Extra fallback: OSM / Nominatim (helps with road/neighbourhood)
        if (!$out['address'] || count($out['nearby_streets'])<2 || !$out['neighborhood']) {
            $nom = http_get_json(sprintf(
                "https://nominatim.openstreetmap.org/reverse?lat=%F&lon=%F&format=jsonv2&accept-language=uk,en&zoom=18&addressdetails=1",
                $out['lat'], $out['lon']
            ), ['User-Agent: InvestGPT-Geocoder'], 5);
            if ($nom && !empty($nom['address'])) {
                $addr=$nom['address'];
                if (!$out['address'] && !empty($addr['house_number']) && !empty($addr['road'])) {
                    $out['address'] = $addr['road'].' '.$addr['house_number'].', '.($addr['city']??$addr['town']??$addr['village']??'');
                }
                if (!$out['neighborhood']) $out['neighborhood'] = $addr['neighbourhood'] ?? $addr['suburb'] ?? $addr['city_district'] ?? $out['neighborhood'];
                if (!$out['district']) $out['district'] = $addr['city_district'] ?? $addr['county'] ?? $out['district'];
                foreach (['road','pedestrian','footway'] as $key) {
                    if (!empty($addr[$key]) && !in_array($addr[$key], $out['nearby_streets'])) $out['nearby_streets'][] = $addr[$key];
                }
                if (!$out['place_label'] && !empty($nom['display_name'])) $out['place_label']=$nom['display_name'];
                $out['providers'][]='nominatim';
            }
        }
    }

    // Cache
    if (!empty($out['address'])) cache_set($baseKey.'_strong', $out);
    else cache_set($baseKey.'_weak', $out);

    return $out;
}
$geo = fetch_ip_geo($ip, $coords);

// ===== Device model detection =====
function detect_device_model($k, $ua, $device) {
    $dm = trim($k['device_model'] ?? '');
    if ($dm) return $dm;

    // Android: …; SM-G991B Build/…;
    if (stripos($ua,'Android')!==false) {
        if (preg_match('/;\s*([A-Za-z0-9\-\._]+)\s+Build\//', $ua, $m)) return $m[1]; // raw model code
        return 'Android смартфон';
    }
    if (stripos($ua,'iPhone')!==false) return 'iPhone';
    if (stripos($ua,'iPad')!==false) return 'iPad';
    if (stripos($ua,'Macintosh')!==false) return 'Mac';
    if (stripos($ua,'Windows NT')!==false) return 'Windows ПК';
    return $device==='mobile' ? 'смартфон' : 'компютер';
}
$detectedPhone = detect_device_model($k, $userAgent, $device);

// ===== Signals =====
function compute_signals($k, $geo, $device) {
    $aff='medium';
    $dm=strtolower($k['device_model'] ?: '');
    foreach (['iphone 14','iphone 15','iphone 16','pro max','s22 ultra','s23 ultra','s24 ultra','s25 ultra','galaxy fold','flip','pixel 7 pro','pixel 8 pro','pixel 9 pro','ipad pro','macbook pro','rog phone','xiaomi 13 pro'] as $needle)
        if (strpos($dm,$needle)!==false) {$aff='high'; break;}
    if ($aff!=='high' && (strpos($dm,'iphone')!==false || preg_match('/sm\-[a-z0-9]+|s(2[0-5]|1[0-9])\b/',$dm))) $aff='medium+';

    $tech='medium';
    $bv=(float)preg_replace('/[^0-9\.]/','',$k['browser_version']??'');
    $osv=(float)preg_replace('/[^0-9\.]/','',$k['os_version']??'');
    $browser=strtolower($k['browser']??''); $os=strtolower($k['os']??'');
    if (($browser==='chrome' && $bv>=120) || ($browser==='safari' && $bv>=17) || ($browser==='edge' && $bv>=120)) $tech='high';
    if ($bv && $bv<90) $tech='low';
    if ($os && $osv && (($os==='android' && $osv<9) || ($os==='ios' && $osv<13))) $tech='low';

    $isp_raw=$k['isp'] ?: ($geo['org']??''); $ispType='residential';
    if (preg_match('/(mobile|cell|lte|4g|5g)/i',$isp_raw)) $ispType='mobile';
    if (preg_match('/(llc|ltd|inc|corp|company|gmbh|s\.a\.|s\.r\.l\.|pjsc|bank|telecom|enterprise)/i',$isp_raw)) $ispType='business';

    $lang=strtolower(substr($k['language']??'',0,2));
    $ctry=strtolower(substr($k['country']??($geo['country']??''),0,2));
    $lang_ok='unknown';
    $map=['ua'=>['uk','ru'],'ru'=>['ru','uk'],'pl'=>['pl','en'],'tr'=>['tr','en'],'de'=>['de','en'],'us'=>['en','es'],'gb'=>['en']];
    if ($ctry && isset($map[$ctry])) $lang_ok = in_array($lang,$map[$ctry])?'coherent':'non_coherent';

    return [
        'affluence_signal'=>$aff,'tech_savvy'=>$tech,'isp_type'=>$ispType,'language_coherence'=>$lang_ok,
        'device_channel'=>$device,
        'geo_granularity'=>[
            'neighborhood'=>$geo['neighborhood']??null,
            'district'=>$geo['district']??null,
            'nearby_streets'=>array_slice($geo['nearby_streets']??[],0,3),
            'place_label'=>$geo['place_label']??null,
            'address'=>$geo['address']??null,
            'confidence'=>$geo['confidence']??0.0
        ]
    ];
}
$signals = compute_signals($k, $geo ?? [], $device);

// ===== Friendly strings =====
$localLine = "";
if ($geo && ($geo['district'] || $geo['neighborhood'] || !empty($geo['nearby_streets']))) {
    $parts=[];
    if (!empty($geo['neighborhood'])) $parts[]=$geo['neighborhood'];
    if (!empty($geo['district'])) $parts[]=$geo['district'];
    if (!empty($geo['nearby_streets'])) $parts[]="біля ".implode(' / ', array_slice($geo['nearby_streets'],0,2));
    $localLine = implode(', ', $parts);
}
$detectedAddress = $geo['address'] ?? ($geo['place_label'] ?? ($localLine ?: null));

// ===== Language auto (fallback): take last user message charset to pick 'ru'/'uk' =====
if (!$lang) {
    $lastUser = '';
    for ($i=count($messages)-1;$i>=0;$i--) { if (($messages[$i]['role']??'')==='user') { $lastUser=$messages[$i]['content']??''; break; } }
    $lang = (preg_match('/[ёЁыЫэЭ]/u',$lastUser) || preg_match('/\b(здравствуйте|давайте|готов)\b/ui',$lastUser)) ? 'ru' : 'uk';
}

// ===== System Prompt =====
$nearby_str = implode(' / ', array_slice($signals['geo_granularity']['nearby_streets'] ?? [], 0, 3)) ?: 'n/a';
$sysText =
"You are an AI investment consultant assistant: persuasive, professional, and focused on guiding to a deposit today.\n".
"Mission: use Keitaro + IP + maps context to build a full financial profile, keep conversation smooth, motivate action and naturally lead to deposit without asking directly.\n\n".

"## Keitaro Context\n".
"- Source: {$k['source']}\n".
"- Click ID: {$k['click_id']}\n".
"- UTM: source={$k['utm_source']}, medium={$k['utm_medium']}, campaign={$k['utm_campaign']}\n".
"- Geo: country={$k['country']}, region={$k['region']}, city={$k['city']}\n".
"- Device: {$k['device_model']} ({$device}) | ISP: {$k['isp']}\n".
"- OS/Browser: {$k['os']} {$k['os_version']} | {$k['browser']} {$k['browser_version']}\n".
"- Language: {$k['language']}\n".
"- UA/IP/TZ/Ref: {$k['ua']} | ".($k['ip'] ?: $ip)." | {$k['tz']} | {$k['referrer']}\n\n".

"## Local Geodata (from IP & maps)\n".
($detectedAddress ? "- Detected address: {$detectedAddress}\n" : "- Detected address: n/a\n").
"- Nearby streets: {$nearby_str}\n".
"- Area hint: ".($localLine ?: 'n/a')."\n".
"- Confidence: ".number_format((float)($geo['confidence'] ?? 0), 2)."\n".
"- Detected device (exact string if possible): {$detectedPhone}\n\n".

"## Tone & Rules\n".
"- Use only 1 language for all prompts and replies. Use this language: ".($lang ?: 'uk').".\n".
"- Replies MUST be 1–2 simple, confident sentences, direct and action-oriented.\n".
"- Start naturally with locality if confidence ≥ 0.8 (mention address or nearby streets).\n".
"- Mention device early (use exact model string if available).\n".
"- **Never ask income directly.** Use soft lifestyle probes: free time, hobbies, travel frequency, eating out, shopping habits, subscriptions, car ownership, kids — then infer income bracket.\n".
"- Be the best sales manager: motivate, reframe doubts, offer micro-commitments, show \"small next step\" value. No pressure or ultimatums.\n".
"- Create urgency through opportunity scarcity, not pressure. Frame investment as smart financial habit, not risk.\n".
"- Use social proof subtly: \"many locals already benefit from...\", \"this area has good potential for...\"\n\n".

"## Engagement Flow\n".
"1) Local relevance (detected address / nearby streets) + concise opportunity.\n".
"2) **Client portrait (soft):** ask casually about lifestyle: \"як любите проводити вихідні?\", \"подорожі чи більше домашній відпочинок?\", \"кафе/ресторани чи домашня кухня?\", \"часто оновлюєте гаджети/одяг?\" — коротко, по одному запитанню за раз.\n".
"3) На основі відповідей **інферуйте** updates.answers.income_range (one of: \"<800\", \"800–1500\", \"1500–3000\", \"3000–6000\", \"6000+\"), job_title (free text), family_status (\"single|married|kids\").\n".
"4) Уточніть досвід інвестицій, горизонт, цілі, валюту — теж м'яко.\n".
"5) Поясніть вигоду маленького старту сьогодні (locking current conditions) і **запропонуйте наступний крок**. Ніколи не редиректіть: лише дайте **CTA кнопку**.\n\n".

"## Income inference hints (examples)\n".
"- Часті подорожі за кордон + ресторани кілька разів на тиждень + нові гаджети щороку → 3000–6000 або 6000+\n".
"- Подорожі раз на рік, кафе 1–2/міс, оновлення техніки раз на 2–3 роки → 1500–3000\n".
"- Без подорожей, кафе рідко, економія, покупки в знижкових мережах → 800–1500 або <800\n".
"- Двоє дітей + авто у кредит + стабільна робота у сфері X → 1500–3000 (уточнювати)\n\n".

"## REQUIRED profile fields in updates.answers\n".
"- income_range, job_title, family_status\n\n".

"## Response format (STRICT JSON)\n".
"{\n".
"  \"reply\": \"<1–2 sentences with locality/device cues>\",\n".
"  \"updates\": {\n".
"    \"answers\": {\"income_range\":\"\",\"job_title\":\"\",\"family_status\":\"\"},\n".
"    \"readiness_score\": <60–100>,\n".
"    \"lead_tier\": \"A|B|C\",\n".
"    \"engagement_level\": \"medium|high\",\n".
"    \"segment\": \"crypto|forex|stocks|mixed\"\n".
"  },\n".
"  \"action\": \"ask|next_step|goto_demo|goto_form\"\n".
"}";

$system = ["role"=>"system","content"=>$sysText];

// Server signals (add geo & computed signals for the model as machine context)
$serverSignalsPayload = ["server_signals" => [
    "ip"=>$ip,"user_agent"=>$userAgent,"device"=>$device,"ip_geo"=>$geo,"lead_signals"=>$signals
]];
$serverSignals = ["role"=>"system","content"=>json_encode($serverSignalsPayload, JSON_UNESCAPED_UNICODE)];

// ===== OpenAI call =====
$body = ["model"=>$model,"messages"=>array_merge([$system,$serverSignals], $messages),"temperature"=>0.6,"max_tokens"=>700];

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ["Content-Type: application/json","Authorization: Bearer {$apiKey}"],
    CURLOPT_POSTFIELDS => json_encode($body, JSON_UNESCAPED_UNICODE),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 35
]);
$response = curl_exec($ch);
$errno = curl_errno($ch);
$http  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($errno) { http_response_code(502); echo json_encode(["error"=>"CURL_ERROR","message"=>$errno]); exit; }
if ($http < 200 || $http >= 300) { http_response_code($http ?: 500); echo json_encode(["error"=>"OPENAI_HTTP_$http","raw"=>json_decode($response,true)]); exit; }

$data = json_decode($response, true);
$content = $data['choices'][0]['message']['content'] ?? "";

// ===== Parse + UI (no forced redirect) =====
$parsed = json_decode($content, true);
$lastUser = '';
for ($i=count($messages)-1;$i>=0;$i--) { if (($messages[$i]['role']??'')==='user') { $lastUser=$messages[$i]['content']??''; break; } }

// CTA: віддаємо завжди, фронт показує кнопку <a>, НІЯКИХ редиректів із бекенда
$cta = ["label"=>"Перейти к регистрации","href"=>$cta_url]; 

if (is_array($parsed) && isset($parsed['reply'], $parsed['action'])) {
    // не чіпаємо action, просто додаємо CTA і явний прапорець без редиректу
    $parsed['cta'] = $cta;
    $parsed['redirect'] = false;
    echo json_encode($parsed, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        "reply" => trim($content) ?: "Дякую! Продовжимо.",
        "action" => "ask",
        "updates" => new stdClass(),
        "cta" => $cta,
        "redirect" => false
    ], JSON_UNESCAPED_UNICODE);
}