#!/bin/bash

# Post-merge hook for automatic deployment
# Place this in: /rokabo/repo/.git/hooks/post-merge
# Make executable: chmod +x /rokabo/repo/.git/hooks/post-merge

set -e

REPO_PATH="/rokabo/repo"
WEB_ROOT="/rokabo.de/httpdocs"
LOG_FILE="/var/log/rokabo-deploy.log"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Git merge detected - syncing dist-site..." >> "$LOG_FILE"

cd "$REPO_PATH"

# Check if dist-site exists
if [ ! -d "$REPO_PATH/dist-site" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: dist-site not found!" >> "$LOG_FILE"
    exit 1
fi

# Sync to web root
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Copying dist-site to httpdocs..." >> "$LOG_FILE"
rm -rf "$WEB_ROOT"/*
cp -r "$REPO_PATH/dist-site"/* "$WEB_ROOT"/ 2>> "$LOG_FILE"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Deployment completed!" >> "$LOG_FILE"
