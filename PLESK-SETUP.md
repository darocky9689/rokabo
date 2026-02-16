# Rokabo Website - Plesk Deployment Setup

## ⚙️ Plesk Konfiguration erforderlich

Damit der automatische Deployment funktioniert, musst du folgende Steps in Plesk machen:

### Schritt 1: Deploy-Webhook Script hochladen

1. SSH zu Plesk Server oder nutze Plesk File Manager
2. Erstelle/lade folgende Dateien hoch:

```
/rokabo/repo/scripts/deploy-webhook.php
/rokabo/repo/scripts/deploy.sh
```

Diese findest du im Repository unter `scripts/`

**Wichtig:** Mache `deploy.sh` executable:
```bash
chmod +x /rokabo/repo/scripts/deploy.sh
```

### Schritt 2: Umgebungsvariablen setzen

Setze in Plesk die Umgebungsvariable für das GitHub Webhook Secret:

```bash
export GITHUB_WEBHOOK_SECRET="dein-zufälliger-secret-key"
```

Oder bearbeite die Datei `/rokabo/repo/scripts/deploy-webhook.php` und setze:
```php
define('WEBHOOK_SECRET', 'dein-zufälliger-secret-key');
```

### Schritt 3: GitHub Webhook konfigurieren

1. Gehe zu: **https://github.com/darocky/rokabo/settings/hooks**
2. Klick "Add webhook"
3. Fülle folgende Felder aus:

**Payload URL:**
```
https://shared49.cloud86-host.nl:8443/rokabo/scripts/deploy-webhook.php
```

**Content type:** `application/json`

**Secret:** 
```
dein-zufälliger-secret-key
```
(Muss mit `GITHUB_WEBHOOK_SECRET` / `WEBHOOK_SECRET` übereinstimmen!)

**Events:** Nur "Push events" auswählen

4. Klick "Add webhook"

### Schritt 4: Test

Mache einen Test-Commit:
```bash
cd ~/Projects/rokabo-website
echo "test" > test.txt
git add test.txt
git commit -m "test webhook"
git push origin main
```

Gehe dann zu GitHub → Settings → Webhooks → Recent Deliveries
Dort solltest du sehen ob der Webhook getriggert wurde.

### Schritt 5: Deploy-Log überprüfen

Die Deployment-Logs werden geschrieben zu:
```
/var/log/rokabo-deploy.log
```

Um zu checken ob alles funktioniert:
```bash
tail -f /var/log/rokabo-deploy.log
```

---

## 🚀 Workflow nach Setup

```bash
# 1. Lokal entwickeln
cd ~/Projects/rokabo-website
# ... Änderungen machen ...

# 2. Lokal bauen
npm run build:dist

# 3. Zu GitHub pushen
git add -A
git commit -m "deine änderungen"
git push origin main

# 4. Automatisch:
# → GitHub triggert Webhook
# → Plesk pullt Code
# → Plesk buildt und deployed
# → rohabo.de ist aktuell! ✅
```

---

## 🔍 Troubleshooting

**Webhook wird nicht getriggert?**
- Check: Ist die Payload URL erreichbar? `https://shared49.cloud86-host.nl:8443/rokabo/scripts/deploy-webhook.php`
- Check: GitHub Webhook Recent Deliveries - welcher Status?
- Check: Ist das Secret korrekt configuriert?

**Deploy funktioniert nicht?**
- Check: Logs in `/var/log/rokabo-deploy.log`
- Check: Haben die Scripts Ausführungsrechte? `chmod +x /rokabo/repo/scripts/deploy.sh`
- Check: Existiert `/rokabo/repo` mit Git repository?

**Deploy funktioniert aber Website nicht aktuell?**
- Check: Wird `dist-site/` zu `/rokabo.de/httpdocs/` kopiert?
- Check: Browser-Cache löschen (Cmd+Shift+R auf Mac)
