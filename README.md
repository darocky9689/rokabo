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

#### Lokal vor jedem Push

1. `npm install`
2. `npm run build:dist`
3. `git add dist-site`
4. Commit + Push

#### Plesk Deployment Action

Nur statisch deployen, kein npm:

1. `rm -rf httpdocs/*`
2. `cp -R dist-site/* httpdocs/`

Wenn `dist-site` nicht in `httpdocs` kopiert wird, liefert die Domain 404.
