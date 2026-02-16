# Plesk Git Deployment Setup

## 📋 Plesk Konfiguration

### Schritt 1: Plesk Git-Einstellungen öffnen

1. Einloggen in Plesk: `https://shared49.cloud86-host.nl:8443`
2. Gehe zu: **Git** (in der Sidebar)
3. Wähle das Repository: **rokabo** (`/rokabo/repo`)
4. Klick auf **"Erweiterte Einstellungen anzeigen"** oder **"Additional deployment actions"**

### Schritt 2: Deployment-Script eintragen

**Da Node.js nicht auf Plesk verfügbar ist, builden wir lokal und committen die fertigen Files.**

Im Feld **"Additional deployment actions"** oder **"Actions for deploying the repository"** trage folgendes ein:

```bash
REPO_DIR="/rokabo/repo"
WEB_ROOT="/rokabo.de/httpdocs"

rm -rf "$WEB_ROOT"/*
cp -r "$REPO_DIR/dist-site/"* "$WEB_ROOT/"
```

Das war's! Das Script kopiert nur die fertigen Build-Files.

### Schritt 3: Speichern und testen

1. **Speichern** der Einstellungen
2. In Plesk auf **"Pull Updates"** klicken zum Testen
3. Logs checken in `/var/log/rokabo-deploy.log`

---

## 🚀 Workflow nach Setup

```bash
# 1. Lokal entwickeln
cd ~/Projects/rokabo-website
# ... Änderungen machen ...

# 2. Lokal builden
npm run build:dist

# 3. Build-Files committen und pushen
git add -A
git commit -m "deine änderungen"
git push origin main

# 4. In Plesk auf "Pull Updates" klicken
# → Plesk pullt das Repo
# → Kopiert dist-site/* zu httpdocs/
# → rokabo.de ist aktuell! ✅
```

---

## 🔍 Alternative: Automatisches Pulling

Wenn du willst dass Plesk **automatisch** bei jedem Push pullt:

1. In Plesk Git-Settings: **"Enable automatic deployment"** aktivieren
2. Webhook-URL von Plesk kopieren
3. In GitHub unter **Settings → Webhooks → Add webhook** die Plesk-URL eintragen

Dann deployed es automatisch bei jedem `git push`!

---

## 📝 Hinweise

- Das Script läuft auf dem Plesk-Server unter dem Plesk-User
- Build erfolgt lokal, Plesk kopiert nur die fertigen Files
- Der Deploy-Prozess dauert nur wenige Sekunden
