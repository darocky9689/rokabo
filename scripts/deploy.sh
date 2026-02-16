#!/usr/bin/env sh
# Deploy Script für Plesk
# Wird vom Webhook aufgerufen

set -eu

REPO_DIR="/home/yourdomain/rokabo-website"
LOG_FILE="/home/yourdomain/deploy.log"

echo "=== Deployment started at $(date) ===" >> "$LOG_FILE"

# 1. Repository aktualisieren
cd "$REPO_DIR"
echo "Pulling from Git..." >> "$LOG_FILE"
git pull origin main >> "$LOG_FILE" 2>&1

# 2. Dependencies installieren
echo "Installing dependencies..." >> "$LOG_FILE"
npm install >> "$LOG_FILE" 2>&1

# 3. Build durchführen
echo "Building website..." >> "$LOG_FILE"
npm run build:dist >> "$LOG_FILE" 2>&1

# 4. Auf Plesk deployen
echo "Deploying to httpdocs..." >> "$LOG_FILE"
sh scripts/plesk-deploy-static.sh >> "$LOG_FILE" 2>&1

echo "=== Deployment completed successfully ===" >> "$LOG_FILE"
