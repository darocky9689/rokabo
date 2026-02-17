#!/usr/bin/env node
/* eslint-disable no-console */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const distDir = join(process.cwd(), 'dist-site');
const keyword = (process.argv[2] || 'website').toLowerCase();

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

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function estimateReadingEase(text) {
  const sentences = Math.max(1, (text.match(/[.!?]+/g) || []).length);
  const words = text.split(/\s+/).filter(Boolean);
  const syllables = words.reduce((count, word) => {
    const clean = word.toLowerCase().replace(/[^a-zäöüß]/g, '');
    const groups = clean.match(/[aeiouyäöü]+/g);
    return count + Math.max(1, groups ? groups.length : 1);
  }, 0);

  const wordsPerSentence = words.length / sentences;
  const syllablesPerWord = syllables / Math.max(1, words.length);

  return 180 - wordsPerSentence - 58.5 * syllablesPerWord;
}

function checkHeadingHierarchy(html) {
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>/gi)].map((match) => Number(match[1]));
  const issues = [];

  if (!headings.includes(1)) {
    issues.push('Fehlendes H1');
  }

  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index] - headings[index - 1] > 1) {
      issues.push(`Sprung von H${headings[index - 1]} auf H${headings[index]}`);
    }
  }

  return issues;
}

function checkImageAltCoverage(html) {
  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const missingAlt = imageTags.filter((imgTag) => !/\balt\s*=\s*['"][^'"]*['"]/i.test(imgTag));
  return { total: imageTags.length, missing: missingAlt.length };
}

function keywordDensity(text, targetKeyword) {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 0;

  const matches = words.filter((word) => word.includes(targetKeyword)).length;
  return (matches / words.length) * 100;
}

if (!statSync(distDir, { throwIfNoEntry: false })) {
  console.error('dist-site nicht gefunden. Bitte zuerst `npm run build:dist` ausführen.');
  process.exit(1);
}

const htmlFiles = walkHtmlFiles(distDir);
let hasFailures = false;

console.log(`SEO Content Audit für ${htmlFiles.length} HTML-Dateien (Keyword: ${keyword})`);

for (const filePath of htmlFiles) {
  const html = readFileSync(filePath, 'utf8');
  const text = stripTags(html);
  const readability = estimateReadingEase(text);
  const headingIssues = checkHeadingHierarchy(html);
  const altInfo = checkImageAltCoverage(html);
  const density = keywordDensity(text, keyword);

  const issues = [];

  if (headingIssues.length > 0) issues.push(...headingIssues);
  if (altInfo.missing > 0) issues.push(`${altInfo.missing} Bilder ohne Alt-Attribut`);
  if (density < 0.2 || density > 3.5) issues.push(`Keyword-Dichte außerhalb Zielbereich (0.2%-3.5%): ${density.toFixed(2)}%`);
  if (readability < 35) issues.push(`Niedrige Lesbarkeit (geschätzt): ${readability.toFixed(1)}`);

  if (issues.length > 0) {
    hasFailures = true;
    console.log(`\n[WARN] ${filePath}`);
    for (const issue of issues) {
      console.log(`  - ${issue}`);
    }
  }
}

if (!hasFailures) {
  console.log('\nOK: Keine offensichtlichen SEO-Content-Probleme gefunden.');
}
