export const siteConfig = {
  name: 'rokabo',
  legalName: 'rokabo by Thomas Rockstroh',
  baseUrl: 'https://rokabo.de',
  defaultLocale: 'de-DE',
  locales: ['de-DE'] as const,
  defaultTitle: 'rokabo | Websites im Abo mit WordPress und Next.js',
  defaultDescription:
    'rokabo erstellt moderne Websites im Abo für kleine Unternehmen: WordPress-Lösungen und individuelle Webentwicklung mit Next.js und TypeScript.',
  organization: {
    '@type': 'Organization',
    name: 'rokabo',
    url: 'https://rokabo.de',
    logo: 'https://rokabo.de/images/ROKABO.png',
    email: 'info@rokabo.de',
    telephone: '+49 175 6240804',
    sameAs: ['https://www.rokabo.de']
  },
  localBusiness: {
    '@type': 'LocalBusiness',
    name: 'rokabo',
    url: 'https://rokabo.de',
    image: 'https://rokabo.de/images/ROKABO.png',
    email: 'info@rokabo.de',
    telephone: '+49 175 6240804',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Am Anger 35',
      postalCode: '15518',
      addressLocality: 'Steinhöfel',
      addressCountry: 'DE'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    ],
    areaServed: 'DE'
  }
} as const;

export const siteRoutes = [
  '/',
  '/leistungen',
  '/preise',
  '/portfolio',
  '/faq',
  '/ueber-uns',
  '/kontakt',
  '/impressum',
  '/datenschutz',
  '/sitemap'
] as const;

export type SiteRoute = (typeof siteRoutes)[number];
