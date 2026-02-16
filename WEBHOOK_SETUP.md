# Automatisches Deployment via GitHub Webhook

Diese Anleitung erklärt, wie du automatisches Deployment auf Plesk einrichtest.

## 1. Webhook Secret generieren

Generiere einen zufälligen String (z.B. mit OpenSSL):
```bash
openssl rand -hex 32
# Beispiel Output: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

## 2. Auf Plesk vorbereiten

### 2.1 Deploy-Script auf Plesk hochladen

Folgende Dateien müssen auf den Plesk Server:
- `scripts/deploy-webhook.php` → `/home/yourdomain/public_html/deploy-webhook.php`
- `scripts/deploy.sh` → `/home/yourdomain/rokabo-website/scripts/deploy.sh`

### 2.2 Umgebungsvariable auf Plesk setzen

In Plesk Panel unter `Performance` > `Environment Variables`:
```
GITHUB_WEBHOOK_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

Oder direkt in `deploy-webhook.php` ändern (nicht empfohlen):
```php
define('WEBHOOK_SECRET', 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6');
```

### 2.3 Script ausführbar machen

```bash
chmod +x /home/yourdomain/rokabo-website/scripts/deploy.sh
chmod 755 /home/yourdomain/public_html/deploy-webhook.php
```

### 2.4 PHP-CLI konfigurieren

Die `deploy.sh` braucht Node.js und npm. Stelle sicher, dass diese in Plesk verfügbar sind:
```bash
which node  # sollte etwas zurückgeben
which npm
```

## 3. GitHub Webhook konfigurieren

### 3.1 GitHub Repository öffnen

Gehe zu: **Settings** → **Webhooks** → **Add webhook**

### 3.2 Webhook Payload URL

```
https://yourdomain.de/deploy-webhook.php
```

### 3.3 Webhook Secret

Gib hier das generierte Secret ein:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 3.4 Content type

- Wähle: **application/json**

### 3.5 Events

- Wähle: **Just the push event**

### 3.6 Webhook aktivieren

- Häkchen bei "Active" setzen
- **Add webhook** klicken

## 4. Test

Mache einen Test-Commit:
```bash
git commit --allow-empty -m "test: webhook deployment"
git push origin main
```

Überprüfe:
- GitHub Actions sollten grün sein
- In Plesk: `tail -f /home/yourdomain/deploy.log` sollte neue Einträge zeigen
- Website auf yourdomain.de sollte aktualisiert sein

## 5. Troubleshooting

### Webhook wird nicht ausgelöst?
- Überprüfe GitHub Webhook Logs: **Settings** → **Webhooks** → **Recent Deliveries**
- Status sollte 200 sein
- Response sollte `{"status":"success"}`

### Deploy fehlgeschlagen?
- SSH auf Plesk: `tail -f /home/yourdomain/deploy.log`
- Überprüfe Node.js/npm Verfügbarkeit
- Überprüfe Git SSH Keys auf Plesk

### Permission denied?
- `chmod +x scripts/deploy.sh`
- Überprüfe Plesk User Permissions (www-data muss ausführen können)

## Workflow

Jetzt funktioniert es so:

```
1. git push → GitHub
2. GitHub Actions validiert Code
3. GitHub triggert Webhook → yourdomain.de/deploy-webhook.php
4. PHP-Script authentifiziert via Secret
5. Führt deploy.sh aus
6. Script pullt Code, buildet, deployt zu httpdocs
7. Website ist live!
```

Done! 🚀
