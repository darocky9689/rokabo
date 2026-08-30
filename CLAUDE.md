# CLAUDE.md

Kontext für Claude Code in diesem Repository. Sprache im Projekt und in Commits: **Deutsch**.

## Projekt

**rokabo Website** – Marketing-Website für „Websites im Abo" von
rokabo by Thomas Rockstroh, Am Anger 35, 15518 Steinhöfel.
Kontakt: `info@rokabo.de`, `+49 175 6240804`.

**Kanonische Domain ist `https://www.rokabo.de` – mit `www`.** Der Server leitet
jede Nicht-www-Adresse per 301 dorthin. `siteConfig.baseUrl` muss das abbilden, sonst
zeigen Canonical, `og:url`, `sitemap.xml`, `robots.txt` und JSON-LD auf eine URL, die
zurück auf die Seite leitet – genau das war schon einmal die Ursache von rund 18
gemeldeten Canonical-Fehlern.

Stack: **Next.js 14.2.32 (App Router) + React 18 + TypeScript 5.8**, `output: 'export'`
(rein statischer Export, kein Node-Prozess auf dem Server). **Kein Tailwind, keine
UI-Library, keine State-Library** – eine einzige handgeschriebene CSS-Datei
([app/globals.css](app/globals.css), ~1900 Zeilen) mit CSS Custom Properties.
Dependencies bewusst minimal halten (nur `next`, `react`, `react-dom`).

Remote: `https://github.com/darocky9689/rokabo.git`, Branch **`main`** (kein Feature-Branch-Flow).

## Befehle

```bash
npm run dev            # Dev-Server (localhost:3000)
npm run build:dist     # rm -rf dist-site && next build && mv out dist-site   ← der relevante Build
npm run check:dist     # prüft, ob das committete dist-site zum Quellstand passt
npm run lint           # next lint
npm run seo:audit      # build:dist + Content-, Broken-Link- und Bild-Audit
npm run release:live -- "Commit-Nachricht"      # Build + git add -A + commit + push origin main
npm run release:live:seo -- "Commit-Nachricht"  # dito, zusätzlich mit SEO-Audit
```

`npm run build` allein reicht nie – der Output muss als `dist-site/` im Repo landen.

**Deploye immer über `npm run release:live`, nicht über `git push` von Hand** (auch nicht
über die VSCode-Oberfläche). Nur so ist sicher, dass `dist-site/` zum Quellstand passt.

## Deployment (wichtig zu verstehen)

Plesk (Shared Hosting, `shared49.cloud86-host.nl`) hat **kein Node/npm**. Deshalb:

1. Build läuft **lokal**, Ergebnis `dist-site/` wird **ins Git committed**
   (`.gitignore` ignoriert nur `out`/`dist`, **nicht** `dist-site`).
2. Plesk zieht per Git-Checkout nach `rokabo/repo` und kopiert `dist-site/` nach `rokabo/httpdocs`.
3. GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) lintet, baut
   und ruft `npm run check:dist` – deployt aber nichts.

Konsequenz: **Nach jeder Änderung an `app/`, `components/`, `lib/` oder `public/` muss
`npm run build:dist` laufen und `dist-site/` mitcommittet werden.** Sonst ist die Live-Seite
veraltet oder liefert 404.

`dist-site/`-Dateien niemals von Hand editieren – sie sind generiert und werden beim nächsten
Build überschrieben.

### Die Build-Absicherung

Drei Stufen, alle aktiv:

- **`core.hooksPath` ist auf `.githooks` gesetzt.** Der pre-push-Hook läuft also und
  ruft `check:prepush` (= `build:dist && check:dist`). Ein Push mit vergessenem Rebuild
  wird lokal blockiert.
- **[scripts/check-dist-drift.mjs](scripts/check-dist-drift.mjs)** vergleicht die gebauten
  HTML-Dateien mit der Fassung aus `HEAD`. Ein byte-genauer Vergleich ist **nicht** möglich:
  webpack sortiert die Chunk-ID-Liste pro Build unterschiedlich, wodurch einzelne
  Chunk-Dateinamen ohne inhaltliche Änderung wechseln. Das Skript vereinheitlicht die
  Hashes und prüft nur die HTML-Ausgabe. Die `.js`-Chunks bleiben bewusst ungeprüft.
- **`generateBuildId: () => 'rokabo'`** in [next.config.js](next.config.js). Ohne feste
  Build-ID wechselt der Ordner unter `_next/static/` bei jedem Build und der Abgleich
  wäre wertlos. Einzelne Chunk-Dateinamen wechseln weiterhin – „gelöscht/neu"-Einträge
  in `git status` sind für die Chunks normal, für den `rokabo/`-Ordner nicht.

Doku: [DEPLOYMENT_SETUP.md](DEPLOYMENT_SETUP.md), [PLESK-GIT-SETUP.md](PLESK-GIT-SETUP.md),
[PLESK-SETUP.md](PLESK-SETUP.md), [GIT-HOOK-SETUP.md](GIT-HOOK-SETUP.md).

### Zwei Domains im selben Webspace – nie vermischen

`grundschule-spreenhagen.de` (WordPress) liegt im gleichen Plesk-Space:

- `grundschule-spreenhagen.de` → Docroot `httpdocs`
- `rokabo.de` → Docroot `rokabo/httpdocs`, Git-Checkout `rokabo/repo`
- Deployment-Aktionen **nur** bei `rokabo.de` eintragen, nie eine gemeinsame Action.

## Architektur

```
app/                    App Router, eine page.tsx je Route (Server Components)
  layout.tsx            Metadata-Defaults, Viewport, Theme-Init-Script, JSON-LD, Header/Footer
  globals.css           komplettes Styling des Projekts
  robots.ts, sitemap.ts als Next-Routes generiert
  <route>/page.tsx      leistungen, preise, portfolio, faq, ueber-uns, kontakt,
                        impressum, datenschutz, sitemap
components/             'use client' nur wo Interaktivität nötig ist
  site-header.tsx       Nav + Mobile-Toggle + ThemeToggle
  theme-toggle.tsx      schreibt localStorage['theme'] + data-theme auf <html>
  process-timeline.tsx  4-Schritte-Ablauf auf der Startseite
  leistungen-tabelle.tsx Paketvergleich
  contact-form.tsx      Validierung + POST an /kontakt.php, mailto nur als Fallback
  seo/                  json-ld, analytics (GA4/GTM)
lib/seo/
  site.ts               siteConfig (Firmendaten, Schema-Bausteine) + siteRoutes
  metadata.ts           buildPageMetadata(): Titel ≤60, Description ≤160, OG/Twitter, canonical
  schema.ts             JSON-LD-Builder mit safeSchema()-Validierung
scripts/                release-live.sh, deploy-without-onedrive.sh, check-dist-drift.mjs, seo-*.mjs
public/                 images/, .htaccess, kontakt.php (PHP-Endpoint des Formulars)
```

Import-Alias: `@/*` → Projektwurzel (z. B. `@/components/site-header`).

## Konventionen

- **Neue Route anlegen** heißt immer drei Dinge: `app/<route>/page.tsx`, Eintrag in
  `siteRoutes` ([lib/seo/site.ts](lib/seo/site.ts)) und ggf. `navItems` in
  [components/site-header.tsx](components/site-header.tsx). `sitemap.ts` liest `siteRoutes`
  und filtert die `noindex`-Seiten (Impressum, Datenschutz) heraus.
- **Metadata immer über `buildPageMetadata()`** – alle Seiten tun das. Wer `metadata` von
  Hand schreibt, erbt den `openGraph`-Block des Layouts, und `og:url` zeigt dann auf die
  Startseite statt auf die eigene Seite. Das war schon einmal auf sechs Seiten der Fall.
- **Seitentitel ohne `| rokabo`.** Das Layout hat ein Title-Template, das den Marken-Suffix
  anhängt. Wer ihn selbst mitschreibt, bekommt „Titel | rokabo | rokabo".
- **Styling**: neue Klassen in `globals.css` ergänzen, Farben/Abstände über die Custom
  Properties (`--color-primary: #3b0a45`, `--color-accent: #40e0d0`, `--space-1..4`,
  `--radius-*`). Keine Inline-Styles außer für Einzelfälle, wie sie im Code schon vorkommen.
- **Dark Mode ist Default.** Light Mode = `:root[data-theme="light"]`. Jede neue
  farbige Regel braucht ihr Light-Mode-Pendant, sonst wird sie im Light Mode unlesbar –
  das war schon mehrfach Ursache für Nacharbeit. **`npm run lint` prüft das mit**:
  [scripts/check-farbliterale.mjs](scripts/check-farbliterale.mjs) meldet jede Farbe, die
  ausserhalb der `:root`-Blöcke steht. Der Altbestand (85 Literale) ist in
  `scripts/farbliterale-baseline.json` eingefroren – neue schlagen fehl. Wird es weniger,
  meldet der Check das und die Basislinie gehört mit `--update` nachgezogen.
- **Drei Flächenebenen, nicht eine Formel.** Jede Ebene fügt genau eine Sache hinzu:
  **1 ruhig** = nur Hintergrund (`.trust-strip`, `.faq-item`, `.process-accordion`);
  **2 gehoben** = + Rahmen + `--shadow-1` (`.card`, `.form`, `.hero-card`, `.proof-item`);
  **3 Akzent** = + getönter Grund + `--border-accent` + `--shadow-2`. Ebene 3 trägt
  **genau eine Fläche pro Seite** (`.cta-banner`) – das ist der Mechanismus, der den einen
  Weg sichtbar macht. Keine weiteren `box-shadow`-Literale für Flächen anlegen.
  Die Interaktions-Glows (türkis, pflaume) sind davon unberührt: das sind Farbeffekte,
  keine Ebenen.
- **Überschriften-Ebenen nie überspringen.** Der Footer nutzt `h2`, weil seine Spalten
  die oberste Ebene im `footer`-Landmark sind. Kartenüberschriften sind `h3` und brauchen
  über sich ein `h2` im selben Abschnitt. `h2` und `h3` haben **keine eigene Schriftgröße**
  im CSS – ein Umstufen ändert also die Optik. Lieber eine Abschnittsüberschrift ergänzen
  als eine Karte hochstufen.
- Server Components sind Standard; `'use client'` nur bei State, Effects oder Event-Handlern.
- Bilder über `next/image` (Optimierung ist wegen Static Export deaktiviert), Links über
  `next/link`.

### Schriftsystem

**Montserrat** = Interface, **Lora** = Lesetext. Geladen sind vier Schnitte
(Montserrat 600/700, Lora 400/600) – keine weiteren ergänzen ohne Grund.

Die Zuweisung ist **opt-in, nicht opt-out**:

- **Lesetext ist der Standard** (`body`). Wer eine neue Klasse anlegt und nichts tut,
  bekommt Lora – die harmlose Variante.
- **Interface bekommt, wer sich meldet**: `h1–h6`, native Bedienelemente
  (`button, input, select, textarea, label, th`), die stabilen Klassen
  `.brand`, `.nav-link`, `.btn` – und alles mit der Utility-Klasse **`.ui`**.
- **`.text` ist das Gegenstück**: holt Lesetext zurück, wo Fließtext in einem
  Interface-Element steht. Zwei Buttons dienen als Inhaltskachel und tragen ganze
  Beschreibungen (Timeline-Schritt, Paketkachel) – sie brauchen `.text`.

Im gebauten Stylesheet stehen dadurch **drei** `font-family`-Deklarationen. Keine
Erlaubnisliste mit Einzelselektoren wieder aufbauen.

## Ansprache und Positionierung

- **Zielgruppe: bundesweit**, keine regionale Zuspitzung. Drei gleichrangige Segmente –
  Handwerk, Fotografen und Kreative, Schulen und Einrichtungen. Segmentseiten unter
  flachen URLs (`/website-fuer-handwerker` usw.) sind geplant, aber noch nicht gebaut.
- **Die Klammer ist das Betriebsmodell**, nicht ein Ergebnisversprechen: gebaut, betreut,
  dauerhaft aktuell. **„Mehr Anfragen" gehört nicht aufs Dach** – es schließt Schulen und
  Vereine aus. Auf den Segmentseiten, wo es zutrifft, ist es richtig.
- **Handelnder ist „rokabo", nicht „wir" und nicht „ich".** Kein Agentur-Wir (es ist eine
  Person), keine Ich-Form (zu exponiert). Wo „rokabo" monoton würde: `du` als Satzsubjekt
  oder unpersönlich formulieren („Entschieden wird nach deinem Fall"). Das einschließende
  Wir („Lass uns sprechen") ist erlaubt, ebenso die Ich-Form des **Besuchers**
  („Kann ich später wechseln?").
- Kein Foto, Name zurückhaltend – er steht nur in Impressum und Datenschutz.
- Texte auf Deutsch, Du-Ansprache, verkaufsorientiert, aber ohne Eigenlob.

## Pakete (Stand jetzt, in Texten konsistent halten)

| Paket | Preis/Monat | Umfang | SEO | Care Coins |
|---|---|---|---|---|
| Starter – Single Page | ab 49 € | Single Page | SEO Basis | – |
| Professional (empfohlen) | ab 79 € | bis 5 Seiten | SEO erweitert | 6 / Jahr |
| Premium | ab 119 € | bis 10 Seiten | SEO stark | 12 / Jahr |

**Basic (Mail-Hosting und Domain ohne Website, ab 15 €/Monat) steht bewusst nicht mehr in
der Preistabelle** – er lenkte Erstbesucher auf den billigsten Einstieg ohne Website. Er
existiert weiter als Fußnote auf der Preisseite und als Formularoption „Nur E-Mail und Domain".

**Ein Care Coin = eine Änderung bis 30 Minuten.** Mehrere Wünsche zählen einzeln, nicht
genutzte Coins verfallen zum Jahresende, größere Änderungen werden vorher abgestimmt.

Laufzeit: 12 Monate feste Betreuung, danach 3 Monate Kündigungsfrist. Angebot **innerhalb
von zwei Werktagen** (nicht mehr „48h").

Preise und Paketangaben stehen an mehreren Stellen ([app/preise/page.tsx](app/preise/page.tsx),
[components/leistungen-tabelle.tsx](components/leistungen-tabelle.tsx), FAQ) – bei Änderungen
**alle** Vorkommen prüfen. Die drei Quellen haben sich schon zweimal widersprochen.

## Stolperfallen

- **Das Kontaktformular hat ein Backend, aber keine Next-API-Route**:
  [public/kontakt.php](public/kontakt.php) wandert beim Build nach `dist-site/` und wird von
  LiteSpeed direkt an PHP übergeben. Der Static Export bleibt unberührt – **keine
  Next-API-Route vorschlagen**, die würde `output: 'export'` brechen.
  Absender ist `info@rokabo.de` (muss eine Adresse der eigenen Domain sein, sonst scheitert
  SPF), der Besucher steht im `Reply-To`. **`mail()` stellt auf diesem Server nachweislich
  zu** – am 30.08.2026 end-to-end geprüft, kein SMTP nötig. Schlägt `mail()` fehl, zeigt das Formular einen
  echten Fehler samt Telefonnummer statt einer falschen Erfolgsmeldung.
- **Anfrage-Log**: `kontakt.php` schreibt eine Zeile nach `../rokabo-anfragen.log`, also
  **oberhalb** des Docroots. Bewusst ohne Name, E-Mail und IP – nur Zeitstempel, Paket,
  Website-Status und Referrer. Das ist die Konversionsmessung; Browser-Analytics gibt es nicht.
- **Kein Browser-Analytics gewollt.** [components/seo/analytics.tsx](components/seo/analytics.tsx)
  existiert und bindet GA4/GTM nur mit gesetzten Env-Variablen ein – die sind bewusst nicht
  gesetzt. Gemessen wird über Search Console und später über ein serverseitiges Anfrage-Log.
  Kein Consent-Banner nötig, solange das so bleibt.
- **Nur `next.config.js`** – keine parallele `next.config.mjs` anlegen.
- Es gibt **keine Tests**. Verifikation = `npm run lint`, `npx tsc --noEmit`,
  `npm run build:dist`, `npm run check:dist`, optional `npm run seo:audit`, und lokal
  im Browser anschauen.
- Der Quellordner liegt beim Nutzer teils in OneDrive; `scripts/deploy-without-onedrive.sh`
  synct nach `~/dev/rokabo-website-github` und pusht von dort. Dieses Repo *ist* das Ziel-Repo.
- Push nutzt `http.version=HTTP/1.1` und großen `postBuffer` – dist-site macht die Pushes groß.

## Offene Punkte

- **OG-Bild**: `public/images/ROKABO.png` ist 500 × 500 und wird ehrlich als solches
  deklariert. Für ansprechende Vorschauen fehlt eine echte 1200 × 630-Grafik.
- **`/preise`, `/preise.html` und `/preise/`** liefern alle 200. Der Canonical löst das
  für Google auf; 301-Weiterleitungen auf die kurze Form wären sauberer, bergen aber
  Schleifenrisiko in den Rewrite-Regeln.
- **Segmentseiten** (Handwerk, Fotografen, Schulen) und ein **Musterprojekt** als
  Handwerks-Referenz sind beschlossen, aber nicht gebaut.
- **Framework-Upgrade** auf Next 16 / React 19 ist bewusst zurückgestellt, bis der
  inhaltliche Backlog steht – dann als eigener Commit ohne Feature-Änderung.
