import type { MetadataRoute } from 'next';
import { siteConfig, siteRoutes } from '@/lib/seo/site';
import { ratgeberArtikel } from '@/lib/ratgeber/artikel';

/* Next 16 verlangt bei output: 'export' die ausdrueckliche Kennzeichnung
   als statisch - Metadata-Routen gelten sonst als dynamisch und der Build
   bricht ab. */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const priorityByRoute: Record<string, number> = {
    '/': 1,
    '/website-fuer-handwerker': 0.9,
    '/website-fuer-fotografen': 0.9,
    '/website-fuer-schulen': 0.9,
    '/leistungen': 0.9,
    '/preise': 0.9,
    '/portfolio': 0.85,
    '/ratgeber': 0.8,
    '/faq': 0.8,
    '/kontakt': 0.8,
    '/ueber-uns': 0.7,
    '/impressum': 0.2,
    '/datenschutz': 0.2,
    '/sitemap': 0.3
  };

  const frequencyByRoute: Record<string, MetadataRoute.Sitemap[number]['changeFrequency']> = {
    '/': 'weekly',
    '/website-fuer-handwerker': 'monthly',
    '/website-fuer-fotografen': 'monthly',
    '/website-fuer-schulen': 'monthly',
    '/leistungen': 'monthly',
    '/preise': 'weekly',
    '/portfolio': 'monthly',
    '/ratgeber': 'weekly',
    '/faq': 'monthly',
    '/kontakt': 'weekly',
    '/ueber-uns': 'monthly',
    '/impressum': 'yearly',
    '/datenschutz': 'yearly',
    '/sitemap': 'monthly'
  };

  /* Impressum und Datenschutz tragen noindex - sie gehoeren nicht in eine
     Sitemap, die dem Crawler sagt "bitte indexieren". */
  const indexableRoutes = siteRoutes.filter(
    (route) => route !== '/impressum' && route !== '/datenschutz'
  );

  const routeEntries = indexableRoutes.map((route) => ({
    url: `${siteConfig.baseUrl}${route}`,
    changeFrequency: frequencyByRoute[route] ?? 'monthly',
    priority: priorityByRoute[route] ?? 0.5
  }));

  /* Einzelne Ratgeber-Artikel sind dynamische Routen und deshalb nicht Teil
     von siteRoutes - ihre Sitemap-Eintraege kommen direkt aus der
     Artikel-Datenliste. */
  const ratgeberEntries = ratgeberArtikel.map((artikel) => ({
    url: `${siteConfig.baseUrl}/ratgeber/${artikel.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  return [...routeEntries, ...ratgeberEntries];
}
