#!/bin/bash
# Deploy Script für Plesk
# Wird vom Webhook aufgerufen

set -e

REPO_DIR="/rokabo/repo"
WEB_ROOT="/rokabo.de/httpdocs"
LOG_FILE="/var/log/rokabo-deploy.log"

echo "[$(date)] === Deployment started ===" >> "$LOG_FILE"

# 1. Repository aktualisieren
cd "$REPO_DIR"
echo "[$(date)] Pulling from Git..." >> "$LOG_FILE"
git pull origin main >> "$LOG_FILE" 2>&1

# 2. Dependencies installieren
echo "[$(date)] Installing dependencies..." >> "$LOG_FILE"
npm install >> "$LOG_FILE" 2>&1

# 3. Build durchführen
echo "[$(date)] Building website..." >> "$LOG_FILE"
npm run build:dist >> "$LOG_FILE" 2>&1

# 4. Auf Plesk deployen
echo "[$(date)] Deploying to httpdocs..." >> "$LOG_FILE"
rm -rf "$WEB_ROOT"/*
cp -r "$REPO_DIR/dist-site"/* "$WEB_ROOT"/ >> "$LOG_FILE" 2>&1

echo "[$(date)] === Deployment completed successfully ===" >> "$LOG_FILE"
