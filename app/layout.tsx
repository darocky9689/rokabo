import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rokabo.de'),
  title: 'rokabo | Websites im Abo',
  description:
    'rokabo erstellt moderne Websites im Abo für kleine Unternehmen. Ohne hohe Startkosten, mit laufender Betreuung und planbaren monatlichen Preisen.',
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
      <body>
        <a className="skip-link" href="#main-content">Direkt zum Inhalt</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
