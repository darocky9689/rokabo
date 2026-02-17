import type { MetadataRoute } from 'next';
import { siteConfig, siteRoutes } from '@/lib/seo/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const priorityByRoute: Record<string, number> = {
    '/': 1,
    '/leistungen': 0.9,
    '/preise': 0.9,
    '/portfolio': 0.85,
    '/faq': 0.8,
    '/kontakt': 0.8,
    '/ueber-uns': 0.7,
    '/impressum': 0.2,
    '/datenschutz': 0.2,
    '/sitemap': 0.3
  };

  const frequencyByRoute: Record<string, MetadataRoute.Sitemap[number]['changeFrequency']> = {
    '/': 'weekly',
    '/leistungen': 'monthly',
    '/preise': 'weekly',
    '/portfolio': 'monthly',
    '/faq': 'monthly',
    '/kontakt': 'weekly',
    '/ueber-uns': 'monthly',
    '/impressum': 'yearly',
    '/datenschutz': 'yearly',
    '/sitemap': 'monthly'
  };

  return siteRoutes.map((route) => ({
    url: `${siteConfig.baseUrl}${route}`,
    lastModified: now,
    changeFrequency: frequencyByRoute[route] ?? 'monthly',
    priority: priorityByRoute[route] ?? 0.5
  }));
}
