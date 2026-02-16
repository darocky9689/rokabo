# GitHub Secrets Setup für Plesk Deployment

## Erforderliche Secrets in GitHub:

Gehe zu: **Settings → Secrets and variables → Actions → New repository secret**

Füge folgende Secrets hinzu:

### 1. PLESK_HOST
**Wert:** `shared49.cloud86-host.nl` (oder dein Plesk-Server)

### 2. PLESK_USER
**Wert:** Dein Plesk SFTP/FTP Benutzer (z.B. `plesk-user` oder `domain@domain.de`)

### 3. PLESK_PASSWORD
**Wert:** Dein Plesk SFTP/FTP Passwort

### 4. PLESK_PORT (Optional)
**Wert:** SFTP Port (Standard: `22`)
Wenn nicht gesetzt, wird Standardwert `22` verwendet.

## Nach jedem Push:
1. Code wird zu GitHub gepusht
2. GitHub Actions startet automatisch
3. Build wird erstellt
4. `dist-site/` wird via SFTP zu `/rokabo.de/httpdocs/` hochgeladen
5. Website ist live! 🚀

## Debug:
- Gehe zu: **Actions Tab** → Letzer Run → Klick auf Job
- Dort siehst du alle Logs der Deployment
