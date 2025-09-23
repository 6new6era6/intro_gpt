<?php
// Safe: read OpenAI API key from environment. Do NOT hardcode secrets here.
$envKey = getenv('OPENAI_API_KEY');
return $envKey ? trim($envKey) : '';
?>
