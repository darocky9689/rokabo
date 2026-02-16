#!/bin/bash

# Post-Receive Hook für Plesk Git Deployment
# Dieses Script wird nach jedem git pull ausgeführt

set -e

REPO_PATH="/rokabo/repo"
WEB_ROOT="/rokabo.de/httpdocs"
LOG_FILE="/rokabo/deploy.log"

echo "[$(date)] Starting deployment..." >> "$LOG_FILE"

cd "$REPO_PATH"

# Pull latest changes
echo "Pulling latest code..." >> "$LOG_FILE"
git pull origin main >> "$LOG_FILE" 2>&1

# Install dependencies
echo "Installing dependencies..." >> "$LOG_FILE"
npm install >> "$LOG_FILE" 2>&1

# Build the project
echo "Building project..." >> "$LOG_FILE"
npm run build:dist >> "$LOG_FILE" 2>&1

# Deploy to web root
echo "Deploying to httpdocs..." >> "$LOG_FILE"
rm -rf "$WEB_ROOT"/*
cp -r dist-site/* "$WEB_ROOT/"

echo "[$(date)] Deployment completed successfully!" >> "$LOG_FILE"
