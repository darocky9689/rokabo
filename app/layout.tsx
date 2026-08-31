import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Fraunces, Instrument_Sans } from 'next/font/google';
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

   Fraunces = Display: ausschliesslich die Ueberschriften.
   Instrument Sans = alles andere: Fliesstext, Navigation, Buttons, Formulare.

   Die Rollen sind gegenueber Montserrat/Lora vertauscht - die Interface-
   Schrift ist jetzt der Standard, der Serif das Opt-in. Weiterhin vier
   Schnitte. Hinweis: weight und axes schliessen sich in next/font/google
   gegenseitig aus; 600 ist bei Fraunces ein statischer Schnitt, die
   SOFT/WONK-Achsen brauchen wir nicht. */
const displayFont = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600'],
  variable: '--font-display',
});

const bodyFont = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
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
    { media: '(prefers-color-scheme: dark)', color: '#141218' },
    { media: '(prefers-color-scheme: light)', color: '#fbfaf7' }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/rokabo-mark.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                /* Gespeicherte Wahl schlaegt alles. Ohne sie entscheidet die
                   Systemeinstellung - viewport.themeColor deklariert das
                   ohnehin schon, die Seite selbst hat es bisher ignoriert.
                   Ohne Angabe wird es hell: die helle Fassung ist die
                   durchgestaltete. */
                var gespeichert = localStorage.getItem('theme');
                var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', gespeichert || system);
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
