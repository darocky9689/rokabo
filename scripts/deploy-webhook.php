<?php
/**
 * GitHub Webhook Receiver für rokabo Deployment
 * Empfängt Push Events von GitHub und triggert deploy.sh auf Plesk
 */

// GitHub Webhook Secret (von GitHub Settings → Webhooks)
define('WEBHOOK_SECRET', getenv('GITHUB_WEBHOOK_SECRET') ?: 'change-me-to-random-string');
define('DEPLOY_SCRIPT', '/rokabo/repo/scripts/deploy.sh');

header('Content-Type: application/json');

// Verify GitHub Signature
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$payload = file_get_contents('php://input');
$hash = 'sha256=' . hash_hmac('sha256', $payload, WEBHOOK_SECRET);

if (!hash_equals($hash, $signature)) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$event = json_decode($payload, true);

// Nur auf main branch reagieren
if ($event['ref'] !== 'refs/heads/main') {
    http_response_code(200);
    echo json_encode(['message' => 'Not main branch, skipping']);
    exit;
}

// Deploy-Script ausführen
exec(DEPLOY_SCRIPT . ' 2>&1', $output, $return_var);

if ($return_var === 0) {
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Deployment triggered successfully',
        'output' => implode("\n", array_slice($output, -10))
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Deployment failed',
        'output' => implode("\n", $output)
    ]);
}
?>
