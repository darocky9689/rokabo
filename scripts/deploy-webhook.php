#!/usr/bin/env sh
# Webhook receiver für GitHub Push Events
# Platzieren auf: /home/yourdomain/public_html/deploy-webhook.php

<?php

// GitHub Secret (generiere einen zufälligen String und nutze ihn als WEBHOOK_SECRET)
define('WEBHOOK_SECRET', getenv('GITHUB_WEBHOOK_SECRET') ?: 'change-me-to-random-string');

// Authentifizierung via GitHub Signature
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$payload = file_get_contents('php://input');
$hash = 'sha256=' . hash_hmac('sha256', $payload, WEBHOOK_SECRET);

if (!hash_equals($hash, $signature)) {
    http_response_code(401);
    die(json_encode(['error' => 'Unauthorized']));
}

$event = json_decode($payload, true);

// Nur auf main branch reagieren
if ($event['ref'] !== 'refs/heads/main') {
    http_response_code(200);
    die(json_encode(['message' => 'Not main branch']));
}

// Deploy-Skript ausführen
$output = shell_exec('cd /home/yourdomain/rokabo-website && sh scripts/deploy.sh 2>&1');

http_response_code(200);
header('Content-Type: application/json');
echo json_encode([
    'status' => 'success',
    'message' => 'Deployment triggered',
    'output' => $output
]);

?>
