#!/usr/bin/env node
/* eslint-disable no-console */
/*
 * Prueft, ob das committete dist-site/ zum aktuellen Quellstand passt.
 *
 * Ablauf: erst "npm run build:dist" laufen lassen, dann dieses Skript. Es
 * vergleicht jede gebaute HTML-Datei mit der Fassung aus HEAD.
 *
 * Warum nicht einfach "git status --porcelain dist-site":
 * Webpack sortiert die Chunk-ID-Liste pro Build unterschiedlich
 * ([[210,160,565,62,799]] vs [[210,160,799,62,565]]), wodurch sich die
 * Dateinamen einiger Chunks bei jedem Build aendern - ohne inhaltlichen
 * Unterschied. Gemessen ueber vier Builds: die HTML-Dateien sind identisch,
 * sobald man die Chunk-Hashes vereinheitlicht. Genau das macht dieses Skript.
 *
 * Die .js-Chunks werden bewusst nicht geprueft: Ihr Inhalt ist nicht
 * reproduzierbar, und ein veralteter Stand schlaegt ohnehin im HTML durch.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, extname, sep } from 'node:path';

const distDir = join(process.cwd(), 'dist-site');

/* Vergleichsstand. Standard ist HEAD; ein anderer Ref ist vor allem zum
   Testen des Skripts selbst nuetzlich. */
const ref = process.argv[2] ?? 'HEAD';

function walkHtmlFiles(dir) {
  const files = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkHtmlFiles(fullPath));
      continue;
    }
    if (extname(fullPath) === '.html') {
      files.push(fullPath);
    }
  }

  return files;
}

/* Vereinheitlicht alles, was sich von Build zu Build ohne inhaltliche
   Aenderung verschiebt. */
function normalize(text) {
  return text
    .replace(/-[0-9a-f]{16}\.js/g, '-HASH.js')
    .replace(/<lastmod>[^<]*<\/lastmod>/g, '<lastmod>X</lastmod>');
}

function committedVersion(relPath) {
  try {
    return execFileSync('git', ['show', `${ref}:${relPath}`], {
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
    });
  } catch {
    return null;
  }
}

const built = walkHtmlFiles(distDir);
const missing = [];
const changed = [];

for (const file of built) {
  const relPath = relative(process.cwd(), file).split(sep).join('/');
  const committed = committedVersion(relPath);

  if (committed === null) {
    missing.push(relPath);
    continue;
  }

  if (normalize(readFileSync(file, 'utf8')) !== normalize(committed)) {
    changed.push(relPath);
  }
}

if (missing.length === 0 && changed.length === 0) {
  console.log(`dist-site/ ist aktuell (${built.length} HTML-Dateien geprueft).`);
  process.exit(0);
}

console.error('dist-site/ passt nicht zum Quellstand.\n');

if (missing.length > 0) {
  console.error('Neu gebaut, aber nicht committet:');
  for (const file of missing) console.error(`  + ${file}`);
  console.error('');
}

if (changed.length > 0) {
  console.error('Inhaltlich veraendert:');
  for (const file of changed) console.error(`  ~ ${file}`);
  console.error('');
}

console.error('Behebung: "npm run build:dist" ausfuehren und dist-site/ mitcommitten.');
console.error('Besser: immer ueber "npm run release:live -- \'Nachricht\'" deployen.');
process.exit(1);
