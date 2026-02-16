<?php
/**
 * rokabo Deployment Script
 * Place this in /rokabo.de/httpdocs/deploy.php
 * Access via browser: https://rokabo.de/deploy.php?token=YOUR_SECRET_TOKEN
 */

define('SECRET_TOKEN', 'your-secret-token-change-me');
define('REPO_PATH', '/rokabo/repo');
define('WEB_ROOT', '/rokabo.de/httpdocs');

header('Content-Type: text/plain');

// Verify token
if (!isset($_GET['token']) || $_GET['token'] !== SECRET_TOKEN) {
    http_response_code(401);
    die("Unauthorized\n");
}

echo "=== rokabo Deployment Script ===\n";
echo "Starting deployment at " . date('Y-m-d H:i:s') . "\n\n";

// Change to repo directory
if (!chdir(REPO_PATH)) {
    die("Error: Cannot access repository at " . REPO_PATH . "\n");
}

echo "✓ Working directory: " . getcwd() . "\n";

// Pull latest code
echo "\n→ Pulling latest code from GitHub...\n";
$output = [];
$return_var = 0;
exec('git pull origin main 2>&1', $output, $return_var);
if ($return_var !== 0) {
    echo "✗ Git pull failed:\n";
    echo implode("\n", $output) . "\n";
    die();
}
echo implode("\n", $output) . "\n";

// Install dependencies
echo "\n→ Installing npm dependencies...\n";
$output = [];
exec('npm install 2>&1', $output, $return_var);
if ($return_var !== 0) {
    echo "✗ npm install failed\n";
    // Don't die - continue anyway
}
echo "Done\n";

// Build project
echo "\n→ Building Next.js project...\n";
$output = [];
exec('npm run build:dist 2>&1', $output, $return_var);
if ($return_var !== 0) {
    echo "✗ Build failed:\n";
    echo implode("\n", $output) . "\n";
    die();
}
echo "✓ Build completed successfully\n";

// Deploy to web root
echo "\n→ Deploying to web root...\n";
if (!is_dir(REPO_PATH . '/dist-site')) {
    die("✗ Error: dist-site directory not found\n");
}

// Clear old files
echo "  Clearing old files...\n";
exec('rm -rf ' . escapeshellarg(WEB_ROOT) . '/* 2>&1');

// Copy new files
echo "  Copying new files...\n";
exec('cp -r ' . escapeshellarg(REPO_PATH . '/dist-site') . '/* ' . escapeshellarg(WEB_ROOT) . '/ 2>&1', $output, $return_var);

if ($return_var !== 0) {
    echo "✗ Copy failed\n";
    die();
}

echo "✓ Files deployed\n";
echo "\n✅ Deployment completed successfully at " . date('Y-m-d H:i:s') . "\n";
echo "📍 Website: https://rokabo.de\n";
?>
