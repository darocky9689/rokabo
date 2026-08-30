import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { siteRoutes } from '@/lib/seo/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Sitemap: alle Seiten im Überblick',
  description: 'Übersicht aller Seiten von rokabo - für schnelle Orientierung und bessere Auffindbarkeit.',
  keyword: 'HTML Sitemap',
  path: '/sitemap'
});

const routeLabels: Record<string, string> = {
  '/': 'Startseite',
  '/website-fuer-handwerker': 'Handwerk und Bau',
  '/website-fuer-fotografen': 'Fotografie und Kreative',
  '/website-fuer-schulen': 'Schulen, Kitas und Vereine',
  '/leistungen': 'Leistungen',
  '/preise': 'Preise',
  '/portfolio': 'Portfolio',
  '/faq': 'FAQ',
  '/ueber-uns': 'Über rokabo',
  '/kontakt': 'Kontakt',
  '/impressum': 'Impressum',
  '/datenschutz': 'Datenschutz',
  '/sitemap': 'Sitemap'
};

export default function HtmlSitemapPage() {
  return (
    <main id="main-content" className="section">
      <div className="container card">
        <h1 className="section-title">Sitemap</h1>
        <p className="section-subtitle">Alle wichtigen Seiten im Überblick.</p>
        <ul className="check-list" aria-label="Sitemap Links">
          {siteRoutes.map((route) => (
            <li key={route}>
              <Link href={route}>{routeLabels[route] ?? route}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
