#!/usr/bin/env node
/*
 * Meldet Farbliterale (#hex, rgb(), rgba()) in globals.css, die ausserhalb
 * der :root-Bloecke stehen.
 *
 * Warum: Eine Farbe, die direkt in einer Regel steht, hat kein
 * Light-Mode-Pendant. Genau daraus sind hier schon mehrfach unlesbare
 * Stellen im hellen Design entstanden. Farben gehoeren in ein Token.
 *
 * Der Bestand ist gross gewachsen, deshalb arbeitet die Pruefung als
 * Ratsche: scripts/farbliterale-baseline.json friert ein, was es heute
 * gibt. Neue oder haeufigere Literale schlagen fehl, weniger werdende
 * melden sich als Hinweis zum Nachziehen der Basislinie.
 *
 *   node scripts/check-farbliterale.mjs            pruefen
 *   node scripts/check-farbliterale.mjs --update   Basislinie neu schreiben
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const cssDatei = join(process.cwd(), 'app', 'globals.css');
const basisDatei = join(process.cwd(), 'scripts', 'farbliterale-baseline.json');

const LITERAL = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g;

function sammle() {
  const zeilen = readFileSync(cssDatei, 'utf8').split('\n');
  const funde = [];
  let inRoot = false;

  for (let i = 0; i < zeilen.length; i += 1) {
    const zeile = zeilen[i];
    const knapp = zeile.trim();

    /* :root und :root[data-theme="light"] sind der Ort, an dem Farben
       stehen duerfen - alles darin wird uebersprungen. */
    if (/^:root[^{]*\{/.test(knapp)) {
      inRoot = true;
      continue;
    }
    if (inRoot) {
      if (knapp === '}') inRoot = false;
      continue;
    }
    if (knapp.startsWith('/*') || knapp.startsWith('*')) continue;

    for (const treffer of knapp.matchAll(LITERAL)) {
      funde.push({ zeile: i + 1, wert: treffer[0].replace(/\s+/g, ' ') });
    }
  }

  return funde;
}

function zaehle(funde) {
  const zaehler = {};
  for (const { wert } of funde) {
    zaehler[wert] = (zaehler[wert] ?? 0) + 1;
  }
  return zaehler;
}

const funde = sammle();
const jetzt = zaehle(funde);

if (process.argv.includes('--update')) {
  const sortiert = Object.fromEntries(Object.entries(jetzt).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(basisDatei, `${JSON.stringify(sortiert, null, 2)}\n`, 'utf8');
  console.log(`Basislinie geschrieben: ${funde.length} Literale, ${Object.keys(jetzt).length} verschiedene.`);
  process.exit(0);
}

if (!existsSync(basisDatei)) {
  console.error('Keine Basislinie gefunden. Einmalig anlegen:');
  console.error('  node scripts/check-farbliterale.mjs --update');
  process.exit(1);
}

const basis = JSON.parse(readFileSync(basisDatei, 'utf8'));
const neu = [];

for (const [wert, anzahl] of Object.entries(jetzt)) {
  const erlaubt = basis[wert] ?? 0;
  if (anzahl > erlaubt) {
    const zeilen = funde.filter((f) => f.wert === wert).map((f) => f.zeile);
    neu.push({ wert, anzahl, erlaubt, zeilen });
  }
}

if (neu.length > 0) {
  console.error('Neue Farbliterale ausserhalb der :root-Bloecke:\n');
  for (const { wert, anzahl, erlaubt, zeilen } of neu) {
    console.error(`  ${wert}  (${anzahl}x, erlaubt ${erlaubt}) – app/globals.css:${zeilen.join(', ')}`);
  }
  console.error('\nEine Farbe direkt in einer Regel hat kein Light-Mode-Pendant.');
  console.error('Lege ein Token in beiden :root-Bloecken an und nutze var(--…).');
  console.error('Nur wenn das begruendet nicht geht: node scripts/check-farbliterale.mjs --update');
  process.exit(1);
}

const basisSumme = Object.values(basis).reduce((a, b) => a + b, 0);
if (funde.length < basisSumme) {
  console.log(`Farbliterale: ${funde.length} (Basislinie ${basisSumme}) – weniger geworden.`);
  console.log('Basislinie nachziehen: node scripts/check-farbliterale.mjs --update');
} else {
  console.log(`Farbliterale: ${funde.length}, keine neuen.`);
}
