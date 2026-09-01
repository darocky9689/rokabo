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

Stack: **Next.js 16.3.3 (App Router, Turbopack) + React 19 + TypeScript 5.8**, `output: 'export'`
(rein statischer Export, kein Node-Prozess auf dem Server). **Kein Tailwind, keine
UI-Library, keine State-Library** – eine einzige handgeschriebene CSS-Datei
([app/globals.css](app/globals.css), ~1200 Zeilen) mit CSS Custom Properties.
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
2. Plesk zieht per Git-Checkout nach `rokabo/repo` und kopiert `dist-site/` nach `rokabo.de/httpdocs`.
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
- **[scripts/check-dist-drift.mjs](scripts/check-dist-drift.mjs)** vergleicht `dist-site/`
  **byte-genau** gegen den committeten Stand. Unter webpack ging das nicht – dort wechselte
  die Chunk-Reihenfolge pro Build, weshalb das Skript lange nur normalisiertes HTML prüfte.
  Turbopack baut reproduzierbar: gemessen über drei Builds, davon einer nach gelöschtem
  `.next`-Cache, waren alle 112 Ausgabedateien identisch. Schlägt die Prüfung eines Tages
  bei jedem Build fehl, obwohl nichts geändert wurde, ist diese Reproduzierbarkeit weg –
  dann gehört der Vergleich auf die HTML-Ebene zurück, **nicht** abgeschaltet.
- **`generateBuildId: () => 'rokabo'`** in [next.config.js](next.config.js). Hält den Ordner
  unter `_next/static/` stabil. Seit Turbopack sind auch die Chunk-Dateinamen stabil –
  „gelöscht/neu"-Einträge in `git status` sind jetzt ein echtes Signal, kein Rauschen.

Doku: [DEPLOYMENT_SETUP.md](DEPLOYMENT_SETUP.md), [PLESK-GIT-SETUP.md](PLESK-GIT-SETUP.md),
[PLESK-SETUP.md](PLESK-SETUP.md), [GIT-HOOK-SETUP.md](GIT-HOOK-SETUP.md).

### Zwei Domains im selben Webspace – nie vermischen

`grundschule-spreenhagen.de` (WordPress) liegt im gleichen Plesk-Space:

- `grundschule-spreenhagen.de` → Docroot `httpdocs`
- `rokabo.de` → Docroot **`rokabo.de/httpdocs`** – mit Punkt-de
- Git-Checkout-Ziel: **`/rokabo/repo`** – ohne Punkt-de

  **Die beiden Pfade folgen verschiedenen Schemata, das ist kein Tippfehler.** Der
  Docroot heißt nach der Domain, das Git-Verzeichnis nicht. In der Doku stand der
  Docroot lange fälschlich als `rokabo/httpdocs`; das hat beim Einrichten der
  Musterprojekt-Subdomain eine Fehlersuche gekostet, weil dieser Pfad schlicht nicht
  existiert. Beide Angaben sind in Plesk verifiziert.
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
- **Styling**: neue Klassen in `globals.css` ergänzen, Farben/Abstände/Schriftgrößen
  ausschließlich über die Custom Properties (`--ink`, `--paper`, `--rule`, `--accent`,
  `--space-1..4`, `--step--1..4`). **Keine Inline-Styles** – es gibt genau einen im
  Projekt, und der setzt eine dynamische Variable
  ([process-timeline.tsx:103](components/process-timeline.tsx#L103)).
- **Die redaktionelle Richtung ist Papier und Tinte, kein Verlauf.** Keine
  `box-shadow`, keine `backdrop-filter`, keine Flächenverläufe, Radius ist `2px`.
  Trennung entsteht durch Haarlinien (`--rule`) und Weißraum. Wer einen Schatten
  anlegt, bricht das System – die Betonung kommt aus Umkehrung, nicht aus Tiefe.
- **`--mark` ist Fläche, nie Schrift.** Das Logo-Türkis `#40e0d0` darf nur in
  `background`, `border-color` und `::marker` stehen. Auf Papier hat es 1,6:1
  Kontrast; als Fläche mit `--on-mark` darauf rund 11:1. Diese Regel wurde beim
  Umbau schon einmal gebrochen (`.cta-banner .btn-quiet:hover`) – dort wäre es im
  Dark Mode auf nahezu weißem Grund gelandet.
- **Light ist Default, Dark die Zweitfassung.** Beim Erstbesuch entscheidet
  `prefers-color-scheme`, ohne Angabe wird es hell; eine gespeicherte Wahl schlägt
  beides ([layout.tsx](app/layout.tsx), Inline-Script). **Farben stehen
  ausschließlich in den zwei `:root`-Blöcken** – es gibt keinen einzigen
  Theme-Override an einem Selektor mehr. Früher hingen daran rund 20 Stellen, und
  jede vergessene war im falschen Modus unlesbar. **`npm run lint` prüft das mit**:
  [scripts/check-farbliterale.mjs](scripts/check-farbliterale.mjs) meldet jede Farbe
  außerhalb der `:root`-Blöcke. Die Basislinie steht auf **0** – jedes neue Literal
  schlägt fehl. Das ist Absicht und gehört nicht mit `--update` weggedrückt.
- **Drei Flächenebenen, keine baut auf Rahmen und Schatten.** **0 Papier** =
  keine Füllung, `border-top: 1px solid var(--rule)` (`.card`, `.hero-card`,
  `.trust-strip`, `.proof-item`, `.faq-item`, `.process-step`, `.services-tile`);
  **1 gedeckt** = `--surface`, kein Rahmen (`.form`, `.services-details`,
  `.section-band`, `footer`); **2 invertiert** = `--ink` als Grund, `--paper` als
  Schrift. Ebene 2 trägt **genau eine Fläche pro Seite** (`.cta-banner`) – das ist
  der Mechanismus, der den einen Weg sichtbar macht. Ebene 0 ist der Standard: wer
  eine neue Fläche anlegt und nichts tut, bekommt die ruhige.
- **Überschriften-Ebenen nie überspringen.** Der Footer nutzt `h2`, weil seine Spalten
  die oberste Ebene im `footer`-Landmark sind. Kartenüberschriften sind `h3` und brauchen
  über sich ein `h2` im selben Abschnitt. `h2` und `h3` haben **global keine eigene
  Schriftgröße** – die kommt aus Klassen (`.section-title`, `.section-title-sm`,
  `.card-title`) und aus zwei gescopten Regeln (`.card h2, .card h3`). Ein Umstufen
  ändert die Optik also nur innerhalb von `.card`. Lieber eine Abschnittsüberschrift
  ergänzen als eine Karte hochstufen.
- Server Components sind Standard; `'use client'` nur bei State, Effects oder Event-Handlern.
- Bilder über `next/image` (Optimierung ist wegen Static Export deaktiviert), Links über
  `next/link`.

### Schriftsystem

**Fraunces** = Display, **Instrument Sans** = alles andere. Geladen sind vier Schnitte
(Fraunces 600, Instrument Sans 400/500/600) – keine weiteren ergänzen ohne Grund.

Die Zuweisung ist **denkbar knapp**:

- **Instrument Sans ist der Standard** (`body`) – Fließtext, Navigation, Buttons,
  Formulare. Bedienelemente holen ihn über `button, input, select, textarea
  { font: inherit }`; ohne diese Regel fallen sie auf die Systemschrift zurück.
- **Fraunces bekommen nur `h1–h6`** sowie punktuell `.brand-wort`, `.process-title`,
  `.faq-item summary`, `.hero-price strong` und `.pricing-mobile-item summary strong`.

Gegenüber Montserrat/Lora sind die Rollen **vertauscht**: die Interface-Schrift ist
jetzt der Standard, der Serif das Opt-in. Damit sind die früheren Utility-Klassen
`.ui` und `.text` gegenstandslos und **restlos entfernt** – `.ui` stand an 21
Stellen, darunter Satzanfänge im Fließtext und ganze Statusmeldungen. Keine
Erlaubnisliste mit Einzelselektoren wieder aufbauen, und keine neue Schrift-Utility.

**Das Logo ist zweiteilig**: `public/images/rokabo-mark.png` (nur der Kreis, aus
`ROKABO.png` mit `sips -c 384 384 --cropOffset 3 58` geschnitten) plus die Wortmarke
als **echter Text** in `.brand-wort`. Das alte PNG trug die Wortmarke eingebacken –
zusammen mit dem Textknoten daneben stand „rokabo" doppelt im Header, und die
eingebackene Fassung zwang ihn auf 90 px Höhe. `ROKABO.png` bleibt Favicon,
Apple-Touch-Icon und Schema-Logo. Achtung bei `sips`: eine `0` im `--cropOffset`
lässt es auf einen zentrierten Schnitt zurückfallen.

## Ansprache und Positionierung

- **Zielgruppe: bundesweit**, keine regionale Zuspitzung. Drei gleichrangige Segmente mit
  je einer eigenen Seite unter flacher URL: `/website-fuer-handwerker`,
  `/website-fuer-fotografen`, `/website-fuer-schulen` (letztere deckt Schulen, Kitas und
  Vereine ab). Sie stehen **nicht** in der Hauptnavigation – erreichbar über die
  Orientierungszeile auf der Startseite und die Sitemap (der Footer-Block „Für wen" wurde
  entfernt, damit der Footer bei drei Spalten in einer Zeile bleibt).

  **Jede Segmentseite muss substanziell eigenständig sein**, sonst sind es Doorway Pages:
  eigenes Versprechen, eigene Problembeschreibung in der Sprache des Segments, eigener
  Beweis, eigenes empfohlenes Paket, eigene FAQ mit eigenem `faqSchema()`. Gemessen liegt
  die Wortüberlappung zwischen je zwei Seiten bei 23–26 %, wortgleich ist nur die
  CTA-Zeile. Wer eine vierte Seite ergänzt, hält diesen Abstand ein.
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

## Musterprojekt unter public/muster/

Ein erfundener Elektrobetrieb („Elektro Musterhand") als Verkaufswerkzeug fürs
Erstgespräch – vier Seiten, ausschließlich handgeschriebenes HTML und eigenes CSS.

**Bewusst nicht Teil der Next-App.** Ein Muster, das `globals.css` benutzt, sieht aus
wie rokabo – Pflaume, Türkis, Dark Mode – und beweist damit nichts. Es hat ein eigenes
Gesicht: helles Design, Signalgelb und Petrol, System-Schriften, keine externen Requests.

- liegt in `public/muster/` und wird beim Build unverändert nach `dist-site/muster/` kopiert
- erreichbar über **`https://muster.rokabo.de/`** (Plesk-Subdomain, Docroot
  `rokabo.de/httpdocs/muster`, Let's-Encrypt-Zertifikat, 301 von http auf https) und
  weiterhin über `rokabo.de/muster/`. Beide zeigen auf denselben Ordner, das Portfolio
  verlinkt die Subdomain.
- **`noindex, nofollow`** in jeder Seite plus `X-Robots-Tag` in `public/muster/.htaccess`
- keine Rewrite-Regeln in dieser `.htaccess` – die Seiten verlinken sich mit expliziter
  `.html`-Endung, damit nichts mit den Regeln der Hauptdomain kollidiert
- steht **nicht** in `siteRoutes` und taucht deshalb weder in `sitemap.xml` noch in der
  Navigation auf. Das soll so bleiben.
- alle Angaben sind erfunden (Name, Anschrift, Telefonnummer). Jede Seite trägt oben und
  unten einen sichtbaren Hinweis darauf – der darf nicht entfernt werden.

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
- **`next lint` gibt es nicht mehr.** Mit Next 16 ist das Kommando entfallen; `npm run lint`
  ruft ESLint direkt. Konfiguration ist [eslint.config.mjs](eslint.config.mjs) im
  Flat-Format – die alte `.eslintrc.json` ist kein gültiges Format mehr.
  **ESLint 10 funktioniert nicht**: Das in `eslint-config-next` gebündelte
  `eslint-plugin-react` nutzt eine API, die dort entfallen ist, und der Lauf bricht mit
  `contextOrFilename.getFilename is not a function` ab. Die Peer-Angabe `>=9.0.0` ist zu
  optimistisch – auf ESLint 9 bleiben.
- **Metadata-Routen brauchen `export const dynamic = 'force-static'`.** Seit Next 16 gelten
  [app/sitemap.ts](app/sitemap.ts) und [app/robots.ts](app/robots.ts) sonst als dynamisch,
  und der Build bricht bei `output: 'export'` ab.
- **Node ≥ 20.9** wird von Next 16 verlangt; die CI läuft auf 22.
- **Next 16 legt neben `preise.html` zusätzlich ein Verzeichnis `preise/` an** – darin
  liegen die Prefetch-Daten der Client-Navigation. Die Rewrite-Regeln in
  [public/.htaccess](public/.htaccess) dürfen Verzeichnisse deshalb **nur dann** an
  `mod_dir` durchreichen, wenn sie eine eigene `index.html` haben. Sonst leitet Apache
  `/preise` per 301 auf `/preise/` um – und der Canonical zeigt auf die Fassung ohne
  Schrägstrich. Genau dieses „Canonical zeigt auf eine Weiterleitung" war schon einmal
  die Ursache von rund 18 gemeldeten SEO-Fehlern.

  Die Bedingung `-d` allein wegzulassen reicht **nicht**: Die Wurzel der
  Musterprojekt-Subdomain ist selbst ein Verzeichnis mit `index.html`, der angefragte
  Pfad ist dort leer, und keine Regel mit `^(.+?)` kann greifen. Beide Fälle wurden live
  gemessen, bevor die Regeln so stehen blieben.
- Es gibt **keine Tests**. Verifikation = `npm run lint`, `npx tsc --noEmit`,
  `npm run build:dist`, `npm run check:dist`, optional `npm run seo:audit`, und lokal
  im Browser anschauen.
- **`npx tsc --noEmit` braucht einen vorherigen Build.** Seit Next 16 verweist
  `next-env.d.ts` auf Typdateien unter `.next/types/`, und `.next` ist ignoriert. Nach
  einem frischen Klon also erst `npm run build:dist`, dann typprüfen.
- **Nach einem Major-Upgrade `.next` löschen.** Ein alter Cache erzeugt sonst irreführende
  Fehler wie `Cannot find module for page: /impressum`. `build:dist` räumt nur `dist-site`
  auf, nicht `.next`.
- Der Quellordner liegt beim Nutzer teils in OneDrive; `scripts/deploy-without-onedrive.sh`
  synct nach `~/dev/rokabo-website-github` und pusht von dort. Dieses Repo *ist* das Ziel-Repo.
- Push nutzt `http.version=HTTP/1.1` und großen `postBuffer` – dist-site macht die Pushes groß.

## Offene Punkte

- **`/preise`, `/preise.html` und `/preise/`** liefern alle 200. Der Canonical löst das
  für Google auf; 301-Weiterleitungen auf die kurze Form wären sauberer, bergen aber
  Schleifenrisiko in den Rewrite-Regeln.
- **Barrierefreiheit** wird auf `/website-fuer-schulen` als Kompetenz benannt, aber
  bewusst eng gefasst: „an den Anforderungen der BITV 2.0 ausgerichtet", ausdrücklich
  **ohne** Zusage einer förmlichen Konformitätsprüfung. Diese Grenze nicht aufweichen,
  ohne dass die Prüfung auch geliefert werden kann.
- **Das OG-Bild ist reproduzierbar, kein loses Binärobjekt.**
  `public/images/og-rokabo.png` (1200 × 630) wird aus
  [scripts/og-bild.html](scripts/og-bild.html) mit Headless Chrome gerendert – das
  Kommando steht als Kommentar in der Datei. Wer die Maße ändert, muss sie in
  [lib/seo/metadata.ts](lib/seo/metadata.ts) **und** [app/layout.tsx](app/layout.tsx)
  nachziehen, sonst stimmt die Deklaration nicht mehr mit der Datei überein.
  `ROKABO.png` bleibt Favicon und Apple-Touch-Icon, ist aber nicht mehr das
  Vorschaubild – ein quadratisches Logo passt nicht zu `summary_large_image`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
