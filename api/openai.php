<?php
// api/openai.php — JSON proxy (без стрімінгу)
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

$apiKey = getenv('OPENAI_API_KEY');
if (!$apiKey) {
    // опційний локальний файл ключа
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

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['messages']) || !is_array($input['messages'])) {
    http_response_code(400);
    echo json_encode(["error" => "INVALID_INPUT"]);
    exit;
}

$messages = $input['messages'];
$model    = $input['model'] ?? 'gpt-4o-mini';
$keitaro  = $input['keitaro'] ?? [];

// Серверні сигнали
$ip        = $_SERVER['REMOTE_ADDR'] ?? null;
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;
$device    = (preg_match('/iphone|ipad|android|mobile/i', $userAgent ?? '')) ? 'mobile' : 'desktop';

// Побудова системного промпта з Keitaro-контекстом
$k = array_merge([
    'click_id' => '', 'external_id' => '', 'campaign_id' => '', 'adset_id' => '', 'ad_id' => '',
    'utm_source' => '', 'utm_medium' => '', 'utm_campaign' => '', 'utm_term' => '', 'utm_content' => '', 'utm_id' => '',
    'fbclid' => '', 'gclid' => '', 'yclid' => '', 'ttclid' => '', 'msclkid' => '',
    'aff_sub1' => '', 'aff_sub2' => '', 'aff_sub3' => '', 'aff_sub4' => '', 'aff_sub5' => '',
    'country' => '', 'region' => '', 'city' => '', 'ip' => '', 'ua' => '', 'tz' => '', 'referrer' => ''
], is_array($keitaro) ? $keitaro : []);

$sysText = "You are an AI investment consultant acting as a conversational assistant.\n" .
"Your role is to gather the user’s financial goals, risk tolerance, income level, and readiness to invest, while making the conversation engaging and personalized.\n\n" .
"## Context data (Keitaro click tracking)\n" .
"The following signals are provided for this user:\n" .
"- Click ID: {$k['click_id']}\n" .
"- Campaign / Ad IDs: campaign_id={$k['campaign_id']}, adset_id={$k['adset_id']}, ad_id={$k['ad_id']}\n" .
"- UTM tags: source={$k['utm_source']}, medium={$k['utm_medium']}, campaign={$k['utm_campaign']}, term={$k['utm_term']}, content={$k['utm_content']}\n" .
"- Tracking IDs: fbclid={$k['fbclid']}, gclid={$k['gclid']}, yclid={$k['yclid']}\n" .
"- Affiliate subs: aff_sub1={$k['aff_sub1']}, aff_sub2={$k['aff_sub2']}\n" .
"- Geo: country={$k['country']}, region={$k['region']}, city={$k['city']}\n" .
"- IP: {$k['ip']}\n" .
"- User agent: {$k['ua']}\n" .
"- Timezone: {$k['tz']}\n" .
"- Referrer: {$k['referrer']}\n\n" .
"## How to use this data\n" .
"1. Personalize the first 2–3 replies with geo/currency/device hints (e.g. “In {$k['country']}, many investors are focusing on crypto this year”).\n" .
"2. Adapt tone depending on device (mobile = fast & simple, desktop = analytical).\n" .
"3. Highlight campaign context if available (“You came from our {$k['utm_campaign']} program”).\n" .
"4. Use timezone to sound context-aware (“Nice to connect with you this evening”).\n" .
"5. Leverage referrer if social media (e.g. “Many of our clients also came from Facebook”).\n" .
"6. Use signals for lead scoring: country → income tier, device → adoption style, campaign/adset → interest.\n\n" .
"## Output rules\n" .
"- Always ask clarifying questions if answers are vague.\n" .
"- Build trust and motivation naturally, not aggressively.\n" .
"- End with clear CTA when readiness is high.\n\n" .
"## Response format\n" .
"Always reply in JSON:\n" .
"{\n  \"reply\": \"<message to user>\",\n  \"updates\": {\n    \"answers\": {...},\n    \"readiness_score\": <number>,\n    \"lead_tier\": \"A|B|C\",\n    \"chance_range\": \"70–95%\",\n    \"segment\": \"crypto|stocks|real_estate|forex\"\n  },\n  \"action\": \"ask|goto_form|goto_demo\"\n}";

$system = [
  "role" => "system",
  "content" => $sysText
];

$serverSignals = [
    "role" => "system",
    "content" => json_encode([
        "server_signals" => [
            "ip" => $ip,
            "user_agent" => $userAgent,
            "device" => $device
        ]
    ], JSON_UNESCAPED_UNICODE)
];

$body = [
    "model" => $model,
    "messages" => array_merge([$system, $serverSignals], $messages),
    "temperature" => 0.6,
    "max_tokens" => 700
];

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Authorization: Bearer {$apiKey}"
    ],
    CURLOPT_POSTFIELDS => json_encode($body, JSON_UNESCAPED_UNICODE),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 35
]);

$response = curl_exec($ch);
$errno = curl_errno($ch);
$http  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($errno) {
    http_response_code(502);
    echo json_encode(["error" => "CURL_ERROR", "message" => $errno]);
    exit;
}

if ($http < 200 || $http >= 300) {
    http_response_code($http ?: 500);
    echo json_encode(["error" => "OPENAI_HTTP_$http", "raw" => json_decode($response, true)]);
    exit;
}

$data = json_decode($response, true);
$content = $data['choices'][0]['message']['content'] ?? "";

// Очікуємо валідний JSON від моделі
$parsed = json_decode($content, true);
if (is_array($parsed) && isset($parsed['reply'], $parsed['action'])) {
    echo json_encode($parsed, JSON_UNESCAPED_UNICODE);
} else {
    // Фолбек: загорнути як ask
    echo json_encode([
        "reply" => trim($content) ?: "Дякую! Продовжимо—додайте трохи деталей.",
        "action" => "ask",
        "updates" => new stdClass(),
        "demo" => new stdClass()
    ], JSON_UNESCAPED_UNICODE);
}
?>
