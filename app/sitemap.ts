import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://rokabo.de';

  return [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/leistungen`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/preise`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/ueber-uns`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/kontakt`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/impressum`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/datenschutz`, changeFrequency: 'yearly', priority: 0.2 }
  ];
}
