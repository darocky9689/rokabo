# rokabo Website (Next.js + TypeScript)

Diese Website wurde auf eine moderne Next.js-Basis mit TypeScript umgestellt.

## Stack

- Next.js 14
- TypeScript
- App Router
- zentrales Layout mit Header/Footer

## Lokale Entwicklung

1. Abhängigkeiten installieren
   - `npm install`
2. Dev-Server starten
   - `npm run dev`
3. Build testen
   - `npm run build`
4. Produktionsstart lokal
   - `npm run start`

## Fester Prozess (einfach, ohne OneDrive)

1. Entwickeln + lokal prüfen
   - `npm run preview:local`
2. Release-Check lokal
   - `npm run release:check`
3. Go Live (nur wenn alles passt)
   - `npm run release:live -- "Kurze Release-Nachricht"`

Optional mit SEO-Check:
- `npm run release:live:seo -- "Kurze Release-Nachricht"`

Damit gilt immer: **Build, Test (lokal), Go Live (rokabo.de & git)**.

## Wichtige Struktur

- `app/layout.tsx` globales Layout
- `app/page.tsx` Startseite
- `app/leistungen/page.tsx`
- `app/preise/page.tsx`
- `app/ueber-uns/page.tsx`
- `app/kontakt/page.tsx`
- `app/impressum/page.tsx`
- `app/datenschutz/page.tsx`
- `components/site-header.tsx`
- `components/site-footer.tsx`
- `components/contact-form.tsx`
- `app/globals.css`
- `app/robots.ts`
- `app/sitemap.ts`
- `public/images/ROKABO.png`

## SEO

- Metadaten pro Seite via Next Metadata API
- robots und sitemap als Next-Routes
- strukturierte Daten (JSON-LD) in den relevanten Seiten

## CI

GitHub Actions Workflow baut das Next.js-Projekt bei Push auf `main`:
- `.github/workflows/deploy.yml`

## Plesk Deployment Hinweis

Diese Migration nutzt **Static Export** (`output: 'export'`).
Dadurch ist kein dauerhaft laufender Node-Prozess nötig.

### Option B, ohne Node.js auf Plesk (empfohlen bei Shared Hosting)

Wenn auf Plesk kein `npm` verfügbar ist, wird die statische Version lokal gebaut und als `dist-site/` ins Repository committed.

### Wichtige Trennung bei mehreren Websites im gleichen Webspace

Wenn `grundschule-spreenhagen.de` als WordPress in `httpdocs` läuft, muss `rokabo.de` zwingend getrennt werden:

- `grundschule-spreenhagen.de` Dokumentenstamm: `httpdocs`
- `rokabo.de` Dokumentenstamm: `rokabo/httpdocs`
- `rokabo.de` Git-Checkout-Ziel: `rokabo/repo` (nicht `rokabo/httpdocs`)

#### Lokal vor jedem Push

1. `npm install`
2. `npm run build:dist`
3. `git add dist-site`
4. Commit + Push

Optional lokal testen (kopiert `dist-site` nach `../httpdocs`):

- `npm run deploy:static-local`

#### Plesk Deployment Action

Nur statisch deployen, kein npm (im Git-Checkout-Ordner `rokabo/repo`):

```sh
[ -f dist-site/index.html ] || { echo "dist-site fehlt"; exit 1; }
mkdir -p ../httpdocs
rm -rf ../httpdocs/*
cp -R dist-site/. ../httpdocs/
[ -f ../httpdocs/index.html ] || { echo "Deploy fehlgeschlagen"; exit 1; }
```

Wenn `dist-site` nicht in den Live-Ordner von `rokabo.de` kopiert wird, liefert die Domain 404.

### Niemals tun

- Kein Deployment mit absoluten Pfaden auf `grundschule-spreenhagen.de/httpdocs`
- Kein Git-Checkout von Rokabo direkt in `rokabo/httpdocs`
- Keine gemeinsame Deploy-Action für beide Domains
