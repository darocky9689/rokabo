#!/usr/bin/env node
/*
 * Prueft, ob das committete dist-site/ zum aktuellen Quellstand passt.
 *
 * Ablauf: erst "npm run build:dist" laufen lassen, dann dieses Skript.
 *
 * Der Vergleich ist byte-genau. Unter webpack war das nicht moeglich: dort
 * wechselte die Reihenfolge der Chunk-ID-Liste pro Build, wodurch sich
 * einzelne Dateinamen ohne inhaltliche Aenderung verschoben. Dieses Skript
 * verglich deshalb frueher nur die HTML-Ausgabe mit vereinheitlichten Hashes
 * und musste die JS-Chunks auslassen.
 *
 * Mit Next 16 baut Turbopack. Gemessen ueber drei Builds - zweimal warm,
 * einmal nach geloeschtem .next-Cache - waren alle 112 Ausgabedateien
 * byte-identisch. Der strengere Vergleich ist damit moeglich und erfasst
 * jetzt auch die JS- und CSS-Chunks.
 *
 * Sollte das hier eines Tages bei jedem Build fehlschlagen, obwohl nichts
 * geaendert wurde, ist die Reproduzierbarkeit verlorengegangen - dann gehoert
 * der Vergleich auf die HTML-Ebene zurueck, nicht abgeschaltet.
 */
import { execFileSync } from 'node:child_process';

function git(...argumente) {
  return execFileSync('git', argumente, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

const abweichungen = git('status', '--porcelain', '--', 'dist-site')
  .split('\n')
  .map((zeile) => zeile.trim())
  .filter(Boolean);

if (abweichungen.length === 0) {
  const anzahl = git('ls-files', '--', 'dist-site').split('\n').filter(Boolean).length;
  console.log(`dist-site/ ist aktuell (${anzahl} Dateien geprueft).`);
  process.exit(0);
}

console.error('dist-site/ passt nicht zum Quellstand.\n');
for (const zeile of abweichungen.slice(0, 40)) {
  console.error(`  ${zeile}`);
}
if (abweichungen.length > 40) {
  console.error(`  … und ${abweichungen.length - 40} weitere`);
}
console.error('\nBehebung: "npm run build:dist" ausfuehren und dist-site/ mitcommitten.');
console.error('Besser: immer ueber "npm run release:live -- \'Nachricht\'" deployen.');
process.exit(1);
