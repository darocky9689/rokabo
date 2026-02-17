# Git Hook Setup (lokal testen vor Push)

Ziel: Immer erst lokal testen, dann erst pushen.

## Aktivierter Workflow

Der lokale `pre-push` Hook prüft automatisch:

1. `npm run build:dist` läuft erfolgreich
2. `dist-site/` ist nach dem Build aktuell und sauber

Wenn der Hook Änderungen in `dist-site/` erkennt, wird der Push blockiert.

## Täglicher Ablauf

1. Lokal starten und prüfen
```bash
npm run dev
```

2. Änderungen committen
```bash
git add -A
git commit -m "deine änderungen"
```

3. Push ausführen
```bash
git push origin main
```

Beim Push läuft der Hook automatisch. Falls `dist-site/` nicht aktuell ist, bekommst du eine Meldung und der Push stoppt.

## Falls Push blockiert wird

```bash
npm run build:dist
git add dist-site
git commit -m "build: update dist-site"
git push origin main
```

