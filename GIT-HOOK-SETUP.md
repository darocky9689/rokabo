# Git Hook Installation für rokabo.de

## Automatisches Deployment nach Git Pull

Dieses Script sorgt dafür, dass nach jedem `git pull` automatisch `dist-site/` zu `/rokabo.de/httpdocs` kopiert wird.

### Installation auf Plesk Server

1. **SSH zu Plesk Server** (oder Terminal in Plesk)

2. **Hook-Script erstellen:**
```bash
cat > /rokabo/repo/.git/hooks/post-merge << 'EOF'
#!/bin/bash
set -e
REPO_PATH="/rokabo/repo"
WEB_ROOT="/rokabo.de/httpdocs"
LOG_FILE="/var/log/rokabo-deploy.log"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Git merge detected - syncing dist-site..." >> "$LOG_FILE"
cd "$REPO_PATH"

if [ ! -d "$REPO_PATH/dist-site" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: dist-site not found!" >> "$LOG_FILE"
    exit 1
fi

rm -rf "$WEB_ROOT"/*
cp -r "$REPO_PATH/dist-site"/* "$WEB_ROOT"/ 2>> "$LOG_FILE"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Deployment completed!" >> "$LOG_FILE"
EOF
```

3. **Executable machen:**
```bash
chmod +x /rokabo/repo/.git/hooks/post-merge
```

4. **Fertig!** Nach nächstem Git Pull wird automatisch deployed ✅

### Workflow dann:

1. Lokal ändern
2. `npm run build:dist` ausführen
3. `git add -A && git commit -m "..." && git push origin main`
4. Plesk Git Pull triggern (manuell oder via Webhook)
5. **Automatisch:** dist-site/ wird zu httpdocs/ kopiert
6. Website ist live! 🚀

### Debug:

Log ansehen:
```bash
tail -f /var/log/rokabo-deploy.log
```

