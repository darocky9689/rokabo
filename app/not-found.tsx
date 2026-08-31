import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/metadata';

/* Ohne eigene Metadata erbt die 404-Seite das Canonical der Startseite und
   erklaert damit jede nicht existierende URL zur Startseite. */
export const metadata: Metadata = buildPageMetadata({
  title: 'Seite nicht gefunden',
  description: 'Diese Seite existiert nicht oder wurde verschoben.',
  path: '/404',
  noindex: true
});

export default function NotFound() {
  return (
    <main id="main-content" className="section">
      <div className="container card is-centered">
        <h1 className="section-title">Seite nicht gefunden (404)</h1>
        <p className="section-subtitle">
          Die angeforderte Seite existiert nicht oder wurde verschoben. Nutze die Navigation oder gehe zur Startseite.
        </p>
        <div className="btn-row">
          <Link className="btn btn-primary" href="/">
            Zur Startseite
          </Link>
          <Link className="btn btn-secondary" href="/sitemap">
            Zur Sitemap
          </Link>
        </div>
      </div>
    </main>
  );
}
