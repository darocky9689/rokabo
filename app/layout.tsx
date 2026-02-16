import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rokabo.de'),
  title: 'rokabo | Websites im Abo mit WordPress, Next.js & TypeScript',
  description:
    'rokabo erstellt moderne Websites im Abo für kleine Unternehmen: WordPress-Lösungen und individuelle Webentwicklung mit Next.js und TypeScript. Ohne hohe Startkosten, mit laufender Betreuung.',
  robots: {
    index: true,
    follow: true
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
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
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
