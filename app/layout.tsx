import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Lora, Montserrat } from 'next/font/google';
import { AnalyticsScripts } from '@/components/seo/analytics';
import { JsonLdScript } from '@/components/seo/json-ld';
import { buildAlternates } from '@/lib/seo/metadata';
import { localBusinessSchema, organizationSchema, webSiteSchema } from '@/lib/seo/schema';
import { siteConfig } from '@/lib/seo/site';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

/* Google Fonts über next/font: zur Build-Zeit heruntergeladen und aus dem
   eigenen Export ausgeliefert. Kein Laufzeit-Request an Google (DSGVO), und
   der statische Export bleibt ohne externe Abhaengigkeit.

   Montserrat = Interface: Ueberschriften, Navigation, Buttons, Formulare,
   Labels und hervorgehobene UI-Texte.
   Lora = Lesetext: Absaetze, Listen und laengere beschreibende Inhalte. */
const headingFont = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700'],
  variable: '--font-heading',
});

const bodyFont = Lora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600'],
  variable: '--font-body',
});

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
    'Website erstellen lassen',
    'Website Betreuung',
    'WordPress Website',
    'Website für Handwerker'
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
        url: '/images/og-rokabo.png',
        width: 1200,
        height: 630,
        alt: 'rokabo - eine Website, um die sich jemand kümmert. Ab 49 € im Monat.'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [
      {
        url: '/images/og-rokabo.png',
        alt: 'rokabo - eine Website, um die sich jemand kümmert. Ab 49 € im Monat.'
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
    <html lang="de" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head>
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
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
