<?php
/**
 * rokabo Deployment Script (safe copy mode)
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

// Validate paths first
$source = REPO_PATH . '/dist-site';
$sourceReal = realpath($source);
$targetReal = realpath(WEB_ROOT);

if ($sourceReal === false || !is_dir($sourceReal)) {
    die("✗ Error: Source directory not found: {$source}\n");
}

if ($targetReal === false || !is_dir($targetReal)) {
    die("✗ Error: Target directory not found: " . WEB_ROOT . "\n");
}

if (strpos($targetReal, '/httpdocs') === false) {
    die("✗ Error: Refusing deploy, target is not an httpdocs directory: {$targetReal}\n");
}

echo "✓ Source: {$sourceReal}\n";
echo "✓ Target: {$targetReal}\n";

echo "\n→ Copying files (safe mode, no delete)...\n";

$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($sourceReal, FilesystemIterator::SKIP_DOTS),
    RecursiveIteratorIterator::SELF_FIRST
);

$copied = 0;
foreach ($iterator as $item) {
    $relativePath = substr($item->getPathname(), strlen($sourceReal) + 1);
    $destPath = $targetReal . DIRECTORY_SEPARATOR . $relativePath;

    if ($item->isDir()) {
        if (!is_dir($destPath) && !mkdir($destPath, 0755, true)) {
            die("✗ Error: Cannot create directory: {$destPath}\n");
        }
        continue;
    }

    $destDir = dirname($destPath);
    if (!is_dir($destDir) && !mkdir($destDir, 0755, true)) {
        die("✗ Error: Cannot create directory: {$destDir}\n");
    }

    if (!copy($item->getPathname(), $destPath)) {
        die("✗ Error: Cannot copy file: {$relativePath}\n");
    }

    $copied++;
}

echo "✓ Files copied: {$copied}\n";
echo "\n✅ Deployment completed successfully at " . date('Y-m-d H:i:s') . "\n";
echo "📍 Website: https://rokabo.de\n";
?>
