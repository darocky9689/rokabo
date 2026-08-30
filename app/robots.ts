import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo/site';

/* Next 16 verlangt bei output: 'export' die ausdrueckliche Kennzeichnung
   als statisch - Metadata-Routen gelten sonst als dynamisch und der Build
   bricht ab. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
    host: siteConfig.baseUrl
  };
}
