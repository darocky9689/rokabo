#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="${ROKABO_SOURCE:-$HOME/Library/CloudStorage/OneDrive-b-4runGmbH/__Business/_Meine Ablage/dev/Rokabo Website/rokabo-website}"
TARGET_DIR="${ROKABO_TARGET:-$HOME/dev/rokabo-website-github}"
COMMIT_MESSAGE="${1:-Deploy: update site and dist-site}"

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "Source directory not found: $SOURCE_DIR"
  exit 1
fi

if [[ ! -d "$TARGET_DIR/.git" ]]; then
  echo "Target git repo not found: $TARGET_DIR"
  echo "Run once: git clone https://github.com/darocky9689/rokabo.git \"$TARGET_DIR\""
  exit 1
fi

echo "Sync source -> target"
rsync -a --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.next' \
  "$SOURCE_DIR/" "$TARGET_DIR/"

cd "$TARGET_DIR"

echo "Install deps"
npm install

echo "Build dist-site"
npm run build:dist

echo "Commit changes"
git add -A
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "$COMMIT_MESSAGE"
fi

echo "Push to GitHub"
git -c http.version=HTTP/1.1 -c http.postBuffer=524288000 push origin main

echo "Done: deploy flow completed outside OneDrive."
