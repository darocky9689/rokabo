import type { Metadata } from 'next';
import { siteConfig, type SiteRoute } from './site';

function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

function trimToLength(input: string, maxLength: number): string {
  if (input.length <= maxLength) return input;
  return `${input.slice(0, maxLength - 1).trimEnd()}…`;
}

function withKeyword(description: string, keyword?: string): string {
  if (!keyword) return description;
  if (description.toLowerCase().includes(keyword.toLowerCase())) return description;
  return `${description} Fokus: ${keyword}.`;
}

export function absoluteUrl(path: string): string {
  const normalizedPath = normalizePath(path);
  return `${siteConfig.baseUrl}${normalizedPath}`;
}

export function buildAlternates(path: SiteRoute | string): Metadata['alternates'] {
  const normalizedPath = normalizePath(path);
  return {
    canonical: normalizedPath,
    languages: {
      'de-DE': normalizedPath,
      'x-default': normalizedPath
    }
  };
}

export type SeoMetadataInput = {
  title: string;
  description: string;
  path: SiteRoute | string;
  keyword?: string;
  noindex?: boolean;
  imagePath?: string;
};

export function buildPageMetadata(input: SeoMetadataInput): Metadata {
  const normalizedPath = normalizePath(input.path);
  const pageTitle = trimToLength(input.title, 60);
  const pageDescription = trimToLength(withKeyword(input.description, input.keyword), 160);
  const imageUrl = input.imagePath ? absoluteUrl(input.imagePath) : absoluteUrl('/images/ROKABO.png');

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: buildAlternates(normalizedPath),
    robots: input.noindex
      ? { index: false, follow: true, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: siteConfig.defaultLocale,
      siteName: siteConfig.name,
      url: absoluteUrl(normalizedPath),
      title: pageTitle,
      description: pageDescription,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${pageTitle} – ${siteConfig.name}` }]
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl]
    }
  };
}
