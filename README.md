# rokabo Website

Statische Website für rokabo, optimiert auf Lead-Generierung für das Abo-Modell.
Deployment läuft per GitHub Repository und automatischem Pull in Plesk.

## Projektstruktur

- `index.html` Startseite
- `leistungen.html` Leistungsübersicht
- `preise.html` Paket- und Preisvergleich
- `ueber-uns.html` Positionierung und Werte
- `kontakt.html` Kontaktformular und CTA
- `impressum.html` Impressum
- `datenschutz.html` Datenschutzerklärung
- `css/styles.css` globales Styling
- `js/main.js` Interaktionen, Formular-Validierung und Laden zentraler Layout-Teile
- `partials/header.html` zentral gepflegter Header
- `partials/footer.html` zentral gepflegter Footer
- `.github/workflows/deploy.yml` Quality Checks vor Pull-Deployment

---

## 1) GitHub Repository Setup

### 1.1 Neues Repository erstellen
1. Bei GitHub ein neues Repository anlegen, zum Beispiel `rokabo-website`.
2. Repository auf **Public** oder **Private** setzen, je nach Bedarf.
3. Keine automatische README-Datei erstellen, da diese Datei bereits vorhanden ist.

### 1.2 Lokale Kopie initialisieren und pushen
1. Terminal im Projektordner öffnen.
2. Repository initialisieren und mit GitHub verbinden.
3. Dateien committen und auf `main` pushen.

Beispielablauf:
- `git init`
- `git add .`
- `git commit -m "Initial rokabo website"`
- `git branch -M main`
- `git remote add origin git@github.com:DEIN-ACCOUNT/rokabo-website.git`
- `git push -u origin main`

---

## 2) Plesk Konfiguration für Git Pull Deployment

### 2.1 Domain in Plesk öffnen
1. In Plesk zur Ziel-Domain wechseln.
2. Unter **Websites & Domains** die Domain auswählen, auf der die Seite laufen soll.

### 2.2 Git-Integration aktivieren
1. Menüpunkt **Git** öffnen.
2. Repository-URL eintragen, zum Beispiel:
   - SSH: `git@github.com:DEIN-ACCOUNT/rokabo-website.git`
3. Branch auf `main` setzen.
4. Deployment-Pfad setzen, meistens `httpdocs/`.
5. Option **Automatically deploy after pull** aktivieren.

### 2.3 Deployment Actions definieren
Im Feld für Deployment-Commands optional eintragen:
- `cp -r . /var/www/vhosts/DEINE-DOMAIN/httpdocs`

Hinweis: Viele Plesk-Setups deployen direkt in den gesetzten Arbeitsordner. Dann ist kein zusätzlicher Copy-Befehl nötig.

---

## 3) Webhook-Konfiguration für automatische Pulls

### 3.1 Webhook-URL in Plesk kopieren
1. In Plesk im Git-Bereich die Webhook-URL suchen.
2. URL kopieren.

### 3.2 GitHub Webhook anlegen
1. In GitHub im Repository auf **Settings > Webhooks > Add webhook**.
2. Payload URL aus Plesk einfügen.
3. Content type auf `application/json` setzen.
4. Secret vergeben und notieren.
5. Event-Auswahl: **Just the push event**.
6. Speichern.

### 3.3 Secret in Plesk hinterlegen
1. In Plesk denselben Webhook-Secret hinterlegen.
2. Test-Ping senden und prüfen, ob Plesk den Hook akzeptiert.

---

## 4) SSH-Key Setup zwischen GitHub und Plesk

### 4.1 SSH-Key auf dem Plesk-Server erzeugen
Auf dem Plesk-Server als passender User:
- `ssh-keygen -t ed25519 -C "plesk-deploy"`

Optional ohne Passphrase für automatisierten Pull.

### 4.2 Public Key in GitHub eintragen
1. Public Key anzeigen: `cat ~/.ssh/id_ed25519.pub`
2. GitHub Repository öffnen: **Settings > Deploy keys > Add deploy key**
3. Key einfügen.
4. **Allow write access** deaktiviert lassen, Read-Only reicht.

### 4.3 Host-Fingerprint vertrauen
Einmalig auf dem Server:
- `ssh -T git@github.com`

Damit landet der GitHub Host-Key in `known_hosts`.

---

## 5) Deployment-Prozess testen

1. Lokal kleine Änderung vornehmen, zum Beispiel Text in `index.html`.
2. Commit und Push auf `main`.
3. GitHub Actions in `.github/workflows/deploy.yml` prüfen, ob Quality Checks grün sind.
4. In Plesk Git-Log prüfen, ob Pull ausgelöst wurde.
5. Website im Browser laden und Änderung kontrollieren.
6. Browser-Cache bei Bedarf hart neu laden.

---

## 6) Troubleshooting häufiger Probleme

### Problem: Plesk kann nicht auf GitHub zugreifen
- Prüfen, ob Deploy Key korrekt in GitHub hinterlegt ist.
- Prüfen, ob Repository-URL in Plesk SSH-basiert ist.
- Prüfen, ob `known_hosts` den GitHub Fingerprint enthält.

### Problem: Webhook kommt an, aber kein Deployment
- Prüfen, ob in Plesk **Automatically deploy after pull** aktiv ist.
- Prüfen, ob der richtige Branch gesetzt ist.
- Plesk Event-Log und Git-Log auf Fehler prüfen.

### Problem: Dateien liegen nicht im Webroot
- Deployment-Pfad in Plesk auf `httpdocs/` kontrollieren.
- Deployment Action prüfen, falls ein Copy-Befehl genutzt wird.

### Problem: Änderungen sichtbar erst verzögert
- Browser-Cache leeren.
- CDN-Cache leeren, falls aktiv.
- Sicherstellen, dass die richtige Domain und nicht eine Staging-URL getestet wird.

### Problem: GitHub Action fehlschlägt
- Action-Log öffnen und die erste rote Stelle prüfen.
- Fehlende Pflichtdatei nachziehen oder HTML/CSS/JS Checks korrigieren.

---

## Hinweise für den Betrieb

- Kontaktformular läuft frontendseitig mit Validierung und Mailto-Fallback.
- Für produktiven Formversand ohne E-Mail-Client sollte später ein Server-Endpunkt oder ein DSGVO-konformer Form-Service ergänzt werden.
- Bilder können im Ordner `images/` abgelegt und direkt in den HTML-Seiten referenziert werden.
