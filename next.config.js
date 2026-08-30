/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  /* Feste Build-ID statt Zufallswert: sonst wechselt der Ordner unter
     _next/static/ bei jedem Build, jeder Commit zeigt hunderte
     "geloescht/neu"-Eintraege und der dist-site-Abgleich in der CI
     wuerde immer fehlschlagen. */
  generateBuildId: () => 'rokabo',
  images: {
    unoptimized: true,
  }
};

module.exports = nextConfig;
