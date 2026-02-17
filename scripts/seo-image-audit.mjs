#!/usr/bin/env node
/* eslint-disable no-console */
import { readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const publicImagesDir = join(process.cwd(), 'public', 'images');
const maxRecommendedSizeBytes = 350 * 1024;

function walkFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
      continue;
    }
    files.push(fullPath);
  }

  return files;
}

if (!statSync(publicImagesDir, { throwIfNoEntry: false })) {
  console.error('Verzeichnis public/images nicht gefunden.');
  process.exit(1);
}

const files = walkFiles(publicImagesDir);
let warnings = 0;

for (const filePath of files) {
  const stats = statSync(filePath);
  const extension = extname(filePath).toLowerCase();

  if (!['.webp', '.jpg', '.jpeg', '.png', '.avif', '.svg'].includes(extension)) {
    continue;
  }

  if (extension !== '.webp' && extension !== '.avif' && extension !== '.svg') {
    warnings += 1;
    console.log(`[HINT] ${relative(process.cwd(), filePath)} ist ${extension}. Für SEO/CWV bevorzugt WebP/AVIF.`);
  }

  if (stats.size > maxRecommendedSizeBytes) {
    warnings += 1;
    console.log(`[HINT] ${relative(process.cwd(), filePath)} ist ${(stats.size / 1024).toFixed(0)}KB groß. Empfehlung: <= 350KB.`);
  }
}

if (warnings === 0) {
  console.log('OK: Bildformat- und Größenempfehlungen eingehalten.');
} else {
  console.log(`Hinweise gesamt: ${warnings}`);
}
