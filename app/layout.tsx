import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rokabo.de'),
  title: {
    default: 'rokabo | Websites im Abo mit WordPress, Next.js & TypeScript',
    template: '%s | rokabo'
  },
  description:
    'rokabo erstellt moderne Websites im Abo für kleine Unternehmen: WordPress-Lösungen und individuelle Webentwicklung mit Next.js und TypeScript. Ohne hohe Startkosten, mit laufender Betreuung.',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://rokabo.de',
    siteName: 'rokabo',
    title: 'rokabo | Websites im Abo mit WordPress, Next.js & TypeScript',
    description:
      'Moderne Websites im Abo für kleine Unternehmen: WordPress oder individuelle Next.js- und TypeScript-Lösungen mit laufender Betreuung.',
    images: [
      {
        url: '/images/ROKABO.png',
        width: 512,
        height: 512,
        alt: 'rokabo Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'rokabo | Websites im Abo',
    description: 'Websites im Abo: WordPress oder individuell mit Next.js und TypeScript.',
    images: ['/images/ROKABO.png']
  },
  icons: {
    icon: '/images/ROKABO.png',
    apple: '/images/ROKABO.png'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
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
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
