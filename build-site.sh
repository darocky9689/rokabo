#!/bin/bash
set -e

echo "🔨 Building Next.js static site..."
npm run build

echo "📦 Moving build output..."
rm -rf dist-site
mv out dist-site

echo "✅ Build complete! Site ready in ./dist-site"
echo ""
echo "To view locally: open dist-site/index.html"
