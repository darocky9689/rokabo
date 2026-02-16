#!/bin/bash

# rokabo Website Deploy Script
# Buildet lokal und uploaded zu Plesk via SSH/rsync

set -e

# Konfiguration
PLESK_HOST="shared49.cloud86-host.nl"
PLESK_USER="rokabo_ssh"
PLESK_PATH="/rokabo.de/httpdocs"
LOCAL_BUILD="./dist-site"

echo "🚀 rokabo Website Deployment"
echo "================================"

# 1. Build lokal
echo "📦 Building locally..."
npm run build:dist

if [ ! -d "$LOCAL_BUILD" ]; then
    echo "❌ Error: dist-site folder not found!"
    exit 1
fi

echo "✅ Build completed"

# 2. Upload zu Plesk via rsync
echo ""
echo "📤 Uploading to Plesk..."
echo "   Host: $PLESK_HOST"
echo "   Path: $PLESK_PATH"
echo ""

rsync -avz --delete "$LOCAL_BUILD/" "${PLESK_USER}@${PLESK_HOST}:${PLESK_PATH}/" 

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ =========================================="
    echo "✅ Deployment successful!"
    echo "✅ Website: https://rokabo.de"
    echo "✅ =========================================="
else
    echo ""
    echo "❌ Upload failed!"
    exit 1
fi
