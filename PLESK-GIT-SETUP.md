# Plesk Git Deployment Setup

## 🚨 Notfall: Domains wiederherstellen (AH00543)

Wenn Plesk meldet `bad user name rokabo_ssh`, ist bei mindestens einer Domain ein ungültiger Systembenutzer hinterlegt.

### Sofort-Fix (für beide Domains)

1. In Plesk zu **"Websites & Domains"** gehen
2. Domain **grundschule-spreenhagen.de** öffnen
3. **"Hosting-Einstellungen"** öffnen
4. Bei **"Systembenutzer"** einen gültigen Benutzer auswählen (nicht `rokabo_ssh`)
5. Speichern
6. Dasselbe für **rokabo.de** wiederholen

### Danach neu anwenden

1. Für beide Domains **"Apache & nginx-Einstellungen"** öffnen
2. Speichern (ohne weitere Änderungen), damit Plesk die Konfiguration neu schreibt
3. In **"Websites & Domains"** auf **"Reparieren"** / **"Neu konfigurieren"** klicken (falls verfügbar)

### Wenn es weiter fehlschlägt

- Prüfen, ob irgendwo manuell `rokabo_ssh` eingetragen wurde (vHost- oder zusätzliche Apache-Direktiven)
- Falls vorhanden: Eintrag entfernen, speichern, erneut neu konfigurieren

### Wichtig zur Trennung der Domains

- Deployment-Aktionen nur bei **rokabo.de** eintragen
- Bei **grundschule-spreenhagen.de** Git-Aktionen und automatische Bereitstellung deaktivieren
- Für **grundschule-spreenhagen.de** muss der ursprüngliche Document Root/Anwendungsordner aktiv sein

## 📋 Plesk Konfiguration

### Schritt 1: Git Repository in Plesk hinzufügen

1. Einloggen in Plesk: `https://shared49.cloud86-host.nl:8443`
2. Gehe zu **"Websites & Domains"** → **rokabo.de**
3. Klick auf **"Git"**
4. Klick auf **"Repository hinzufügen"** oder **"Add Repository"**
5. Fülle die Felder aus:
   - **Repository Name:** `rokabo`
   - **Repository URL:** `https://github.com/darocky9689/rokabo.git`
   - **Repository Path:** `/rokabo/repo` (oder lass Plesk den Pfad wählen)
   - **Branch:** `main`
6. **"OK"** oder **"Hinzufügen"** klicken
7. Plesk klont jetzt das Repository

### Schritt 2: Deployment-Script eintragen

Nachdem das Repository geklont wurde:

1. Klick auf das Repository **rokabo** in der Liste
2. Klick auf **"Erweiterte Einstellungen anzeigen"** oder **"Additional deployment actions"**

**Da Node.js nicht auf Plesk verfügbar ist, builden wir lokal und committen die fertigen Files.**

Im Feld **"Additional deployment actions"** trage folgendes ein:

```bash
# SICHERES Deployment - kopiert nur, löscht nichts!
cp -rfp dist-site/* httpdocs/
```

**WICHTIG:** Kein `rm -rf` verwenden! Das ist zu gefährlich in Plesk.

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
