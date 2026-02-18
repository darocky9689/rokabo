#!/usr/bin/env bash
set -euo pipefail

COMMIT_MESSAGE="${1:-Release: lokal getestet und freigegeben}"

if [[ ! -d .git ]]; then
  echo "Bitte im Repository-Root ausführen."
  exit 1
fi

echo "[1/4] Build prüfen (dist-site)"
npm run build:dist

if [[ "${RUN_SEO_AUDIT:-0}" == "1" ]]; then
  echo "[2/4] SEO-Audit"
  npm run seo:audit
else
  echo "[2/4] SEO-Audit übersprungen"
fi

echo "[3/4] Änderungen committen"
git add -A
if git diff --cached --quiet; then
  echo "Keine Änderungen zum Committen."
  exit 0
fi
git commit -m "$COMMIT_MESSAGE"

echo "[4/4] Push nach main"
git -c http.version=HTTP/1.1 -c http.postBuffer=524288000 push origin main

echo "Fertig: Neuer Stand live auf Git + Deployment-Target."
