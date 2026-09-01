import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLdScript } from '@/components/seo/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { articleSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { ratgeberArtikel } from '@/lib/ratgeber/artikel';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ratgeberArtikel.map((artikel) => ({ slug: artikel.slug }));
}

function findArtikel(slug: string) {
  return ratgeberArtikel.find((eintrag) => eintrag.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artikel = findArtikel(slug);
  if (!artikel) return {};

  return buildPageMetadata({
    title: artikel.title,
    description: artikel.description,
    keyword: artikel.keyword,
    path: `/ratgeber/${artikel.slug}`
  });
}

function formatDatum(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function RatgeberArtikelPage({ params }: Props) {
  const { slug } = await params;
  const artikel = findArtikel(slug);
  if (!artikel) notFound();

  return (
    <main id="main-content" className="section">
      <JsonLdScript
        id="breadcrumb-schema"
        schema={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Ratgeber', path: '/ratgeber' },
          { name: artikel.title, path: `/ratgeber/${artikel.slug}` }
        ])}
      />
      <JsonLdScript
        id="article-schema"
        schema={articleSchema({
          title: artikel.title,
          description: artikel.description,
          slug: artikel.slug,
          datePublished: artikel.datePublished
        })}
      />

      <div className="container">
        <p className="ratgeber-meta">{formatDatum(artikel.datePublished)}</p>
        <h1 className="section-title">{artikel.title}</h1>

        <div className="ratgeber-content">
          {artikel.sections.map((section, index) => (
            <div key={section.heading ?? `abschnitt-${index}`}>
              {section.heading ? <h2>{section.heading}</h2> : null}
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="btn-row btn-row-spaced">
          <Link className="btn btn-primary" href="/kontakt">Kostenloses Erstgespräch anfragen</Link>
          <Link className="btn btn-secondary" href="/preise">Preise ansehen</Link>
        </div>
      </div>
    </main>
  );
}
