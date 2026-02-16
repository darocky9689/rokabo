#!/bin/bash

# Manual deployment script for rokabo website to Plesk
# Run locally to sync latest build to Plesk

set -e

PLESK_HOST="shared49.cloud86-host.nl"
PLESK_USER="you@yourdomain.de"  # Update with your Plesk user
PLESK_PATH="/home/yourdomain/public_html"  # Update with your actual Plesk path

echo "🔄 Building site locally..."
npm run build:dist

echo "📦 Syncing dist-site to Plesk via SSH..."
rsync -avz --delete dist-site/ "${PLESK_USER}@${PLESK_HOST}:${PLESK_PATH}/"

echo "✅ Deployment complete!"
echo "📍 Website updated at: https://rokabo.de"
