import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { AnalyticsScripts } from '@/components/seo/analytics';
import { JsonLdScript } from '@/components/seo/json-ld';
import { WebVitalsMonitor } from '@/components/seo/web-vitals-monitor';
import { buildAlternates } from '@/lib/seo/metadata';
import { localBusinessSchema, organizationSchema, webSiteSchema } from '@/lib/seo/schema';
import { siteConfig } from '@/lib/seo/site';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: '%s | rokabo'
  },
  description: siteConfig.defaultDescription,
  alternates: buildAlternates('/'),
  category: 'technology',
  keywords: [
    'Website im Abo',
    'WordPress Website',
    'Next.js Agentur',
    'Technische SEO',
    'Webentwicklung für kleine Unternehmen'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [
      {
        url: '/images/ROKABO.png',
        width: 1200,
        height: 630,
        alt: 'Logo von rokabo, Anbieter für moderne Websites im Abo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [
      {
        url: '/images/ROKABO.png',
        alt: 'Logo von rokabo, Anbieter für moderne Websites im Abo'
      }
    ]
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined
  },
  icons: {
    icon: '/images/ROKABO.png',
    apple: '/images/ROKABO.png'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#3B0A45' },
    { media: '(prefers-color-scheme: light)', color: '#f5e6f0' }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://www.rokabo.de" />
        <link rel="dns-prefetch" href="https://www.rokabo.de" />
        <link rel="preload" as="image" href="/images/ROKABO.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Direkt zum Inhalt</a>
        <JsonLdScript id="org-schema" schema={organizationSchema()} />
        <JsonLdScript id="localbusiness-schema" schema={localBusinessSchema()} />
        <JsonLdScript id="website-schema" schema={webSiteSchema()} />
        <AnalyticsScripts />
        <WebVitalsMonitor />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
