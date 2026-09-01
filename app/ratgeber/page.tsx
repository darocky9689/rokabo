import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLdScript } from '@/components/seo/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { ratgeberArtikel } from '@/lib/ratgeber/artikel';

export const metadata: Metadata = buildPageMetadata({
  title: 'Ratgeber: Website im Abo verständlich erklärt',
  description:
    'Antworten und Vergleiche rund um Website, Baukasten und Betreuung - verständlich erklärt, ohne Fachchinesisch.',
  keyword: 'Website Ratgeber',
  path: '/ratgeber'
});

function formatDatum(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function RatgeberPage() {
  return (
    <main id="main-content" className="section">
      <JsonLdScript
        id="breadcrumb-schema"
        schema={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Ratgeber', path: '/ratgeber' }
        ])}
      />

      <div className="container">
        <h1 className="section-title">Ratgeber</h1>
        <p className="section-subtitle">
          Fragen, die vor einer Entscheidung für oder gegen eine eigene Website häufig
          aufkommen - verständlich beantwortet, ohne Fachchinesisch.
        </p>

        <div className="ratgeber-grid">
          {ratgeberArtikel.map((artikel) => (
            <article className="ratgeber-item" key={artikel.slug}>
              <p className="ratgeber-meta">{formatDatum(artikel.datePublished)}</p>
              <h2>{artikel.title}</h2>
              <p>{artikel.teaser}</p>
              <Link className="ratgeber-link" href={`/ratgeber/${artikel.slug}`}>
                Weiterlesen
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
