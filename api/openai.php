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

// Серверні сигнали
$ip        = $_SERVER['REMOTE_ADDR'] ?? null;
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;
$device    = (preg_match('/iphone|ipad|android|mobile/i', $userAgent ?? '')) ? 'mobile' : 'desktop';

// Системний промпт (JSON-протокол керування етапами)
$system = [
    "role" => "system",
    "content" => implode(" ", [
        "Ти — AI-аналітик інвест-профілю, що керує воронкою (опитування→аналіз→демо→постдемо→форма).",
        "ВІДПОВІДАЙ СТРОГО У JSON без зайвого тексту:",
        '{ "reply":"<укр текст>", "action":"ask|show_analysis|goto_demo|postdemo|goto_form",',
        '  "updates":{ "answers":{...}, "readiness_score":<num>, "lead_tier":"A|B|C", "chance_range":"70–95%", "segment":"...", "currency":"UAH|PLN|USD|EUR|TRY" },',
        '  "demo":{ "asset":"BTC/UAH" } }',
        "Не давай фінансових гарантій; вживай \"оцінний діапазон\", \"симуляція\", \"не гарантія\". Мова — українська."
    ])
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
