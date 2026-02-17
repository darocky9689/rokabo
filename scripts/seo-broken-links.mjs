#!/usr/bin/env node
/* eslint-disable no-console */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const distDir = join(process.cwd(), 'dist-site');

function walkHtmlFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
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

function normalizeInternalHref(href) {
  const pathOnly = href.split('#')[0].split('?')[0];
  if (!pathOnly || pathOnly === '/') return '/index.html';
  const normalized = pathOnly.endsWith('/') ? `${pathOnly}index.html` : `${pathOnly}.html`;
  return normalized.replace(/^\//, '/');
}

if (!statSync(distDir, { throwIfNoEntry: false })) {
  console.error('dist-site nicht gefunden. Bitte zuerst `npm run build:dist` ausführen.');
  process.exit(1);
}

const htmlFiles = walkHtmlFiles(distDir);
const existingPaths = new Set(htmlFiles.map((filePath) => `/${relative(distDir, filePath)}`));
let brokenCount = 0;

for (const filePath of htmlFiles) {
  const html = readFileSync(filePath, 'utf8');
  const links = [...html.matchAll(/<a\b[^>]*href=['"]([^'"]+)['"][^>]*>/gi)].map((match) => match[1]);

  for (const href of links) {
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue;
    }

    const target = normalizeInternalHref(href);
    if (!existingPaths.has(target)) {
      brokenCount += 1;
      console.log(`[BROKEN] ${relative(distDir, filePath)} -> ${href} (erwartet: ${target})`);
    }
  }
}

if (brokenCount === 0) {
  console.log('OK: Keine defekten internen Links gefunden.');
} else {
  console.error(`Gefundene defekte Links: ${brokenCount}`);
  process.exit(1);
}
