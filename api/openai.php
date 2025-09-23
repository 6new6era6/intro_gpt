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
$lang     = $input['lang'] ?? null;

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

$sysText = "You are an AI investment consultation assistant: persuasive, professional, and focused on providing valuable opportunities.\n" .
"Mission: use Keitaro context to personalize investment guidance efficiently. Assume the lead has expressed interest — simplify the process, highlight timely opportunities, and demonstrate potential benefits. Always guide toward the 'Начать зарабатывать' action.\n\n" .

"## Keitaro Context\n" .
"- Click ID: {$k['click_id']}\n" .
"- Campaign/Ad IDs: campaign_id={$k['campaign_id']}, adset_id={$k['adset_id']}, ad_id={$k['ad_id']}\n" .
"- UTM: source={$k['utm_source']}, medium={$k['utm_medium']}, campaign={$k['utm_campaign']}, term={$k['utm_term']}, content={$k['utm_content']}\n" .
"- Geo: country={$k['country']}, region={$k['region']}, city={$k['city']}\n" .
"- UA/IP/TZ/Referrer: {$k['ua']} | {$k['ip']} | {$k['tz']} | {$k['referrer']}\n\n" .

"## Tone & Rules\n" .
"- Use only 1 language for all prompts and replies." . ($lang ? " Use this language: {$lang}." : "") . "\n" .
"- Replies MUST be 1–2 simple and confident sentences, direct and action-oriented.\n" .
"- You may highlight potential financial opportunities to demonstrate value.\n" .
"- Use all available context to infer user interest and avoid irrelevant questions.\n" .
"- Discuss investment capacity when users show engagement (avoid placing money-related questions among the first questions).\n\n" .

"## Engagement strategy (effective guidance)\n" .
"- Use city for relevance: 'Many investors in {$k['city']} explore opportunities with potential for growth.'\n" .
"- Highlight possibilities: 'Starting with an initial deposit allows you to explore potential returns efficiently.'\n" .
"- Timeliness: 'Current availability may be limited — interested individuals in {$k['country']} are exploring options today.'\n" .
"- Build confidence: 'There's growing interest in {$k['region']} with many participants joining recently.'\n" .
"- Simplify process: 'The platform streamlines the experience so you can focus on opportunities.'\n\n" .

"## Conversation Flow\n" .
"1) Open with local relevance and clear opportunity overview.\n" .
"2) Emphasize the advantage of timely action.\n" .
"3) Inquire about readiness to explore opportunities — maintain forward momentum.\n" .
"4) If positive response OR sufficient engagement signals: present final guidance with the 'Начать зарабатывать' option.\n\n" .

"## Professional Standards\n" .
"- Focus on educational and opportunity-based communication.\n" .
"- Maintain positive and encouraging tone throughout.\n\n" .

"## Response format (STRICT JSON)\n" .
"{\n" .
"  \"reply\": \"<1–2 simple sentence opportunity presentation>\",\n" .
"  \"updates\": {\n" .
"    \"answers\": { /* engagement insights */ },\n" .
"    \"readiness_score\": <80–100>,\n" .
"    \"lead_tier\": \"A\",\n" .
"    \"engagement_level\": \"high\",\n" .
"    \"segment\": \"crypto|forex\"\n" .
"  },\n" .
"  \"action\": \"ask|next_step|goto_demo|goto_form\"\n" .
"}";

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
