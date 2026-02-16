#!/bin/bash

# Quick sync script - kopiert dist-site zu httpdocs
# Erfordert SSH Zugang zu Plesk

REPO_PATH="/rokabo/repo"
WEB_ROOT="/rokabo.de/httpdocs"

echo "🔄 Syncing dist-site to httpdocs..."

# Ensure dist-site exists
if [ ! -d "$REPO_PATH/dist-site" ]; then
    echo "❌ Error: dist-site not found at $REPO_PATH/dist-site"
    exit 1
fi

# Clear and copy
rm -rf "$WEB_ROOT"/*
cp -r "$REPO_PATH/dist-site"/* "$WEB_ROOT"/ 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Sync completed!"
    echo "📍 Website: https://rokabo.de"
else
    echo "❌ Sync failed!"
    exit 1
fi
