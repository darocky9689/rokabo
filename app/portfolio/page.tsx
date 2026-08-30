import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Referenzen: Websites, die du ansehen kannst',
  description:
    'Websites, die du dir direkt ansehen kannst: ein Musterprojekt für einen Elektrobetrieb, juro-fotografie.de und die Grundschule Spreenhagen.',
  keyword: 'Website Referenzen',
  path: '/portfolio'
});

interface Projekt {
  titel: string;
  beschreibung: string;
  bild: string;
  url: string;
  merkmale: string[];
  /* Gesetzt, wenn es kein echter Kundenauftrag ist. Wird als Marke ueber
     dem Titel ausgegeben, damit ein Muster nie wie eine Referenz wirkt. */
  hinweis?: string;
}

interface Segment {
  titel: string;
  projekte: Projekt[];
}

/* Gruppiert nach den drei Segmenten. Leere Gruppen werden nicht gerendert -
   eine Ueberschrift ohne Projekte darunter macht die Luecke sichtbarer als
   ihr Fehlen. Wer ein "hinweis"-Feld setzt, markiert das Projekt als Muster:
   es bekommt eine Marke ueber dem Titel und einen eigenen Linktext. */
const segmente: Segment[] = [
  {
    titel: 'Handwerk und Bau',
    projekte: [
      {
        titel: 'Elektro Musterhand',
        beschreibung:
          'Vierseitiger Auftritt für einen Elektromeisterbetrieb: Leistungen, Ablauf, Notdienst und Kontakt. Ein Musterprojekt ohne realen Auftraggeber - gebaut, um zu zeigen, wie so eine Seite aussieht.',
        bild: '/images/muster-elektro.png',
        url: 'https://muster.rokabo.de/',
        merkmale: ['Vier Seiten', 'Notdienst-Anker', 'Ohne Fotos gebaut'],
        hinweis: 'Musterprojekt',
      },
    ],
  },
  {
    titel: 'Fotografie und Kreative',
    projekte: [
      {
        titel: 'juro-fotografie.de',
        beschreibung:
          'Portfolio für Fotografie mit klarer Bildsprache und schneller Navigation.',
        bild: '/images/juro-fotografie.webp',
        url: 'https://juro-fotografie.de',
        merkmale: ['Portfolio', 'Bildsprache', 'Branding'],
      },
    ],
  },
  {
    titel: 'Schulen und Einrichtungen',
    projekte: [
      {
        titel: 'grundschule-spreenhagen.de',
        beschreibung:
          'Informationsseite einer Schule mit übersichtlicher Struktur für Eltern, Kinder und Lehrkräfte.',
        bild: '/images/grundschule-spreenhagen.webp',
        url: 'https://grundschule-spreenhagen.de',
        merkmale: ['Informationsarchitektur', 'Redaktion', 'CMS'],
      },
    ],
  },
];

export default function PortfolioPage() {
  const gefuellt = segmente.filter((segment) => segment.projekte.length > 0);

  return (
    <main id="main-content">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Portfolio</h1>
          <p className="section-subtitle">
            Websites, die du dir direkt ansehen kannst - gebaut und bis heute betreut.
          </p>

          {gefuellt.map((segment) => (
            <section className="section-tight" key={segment.titel}>
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>{segment.titel}</h2>
              <div className="proof-grid">
                {segment.projekte.map((projekt) => (
                  <article className="proof-item" key={projekt.url}>
                    <Image
                      className="proof-image"
                      src={projekt.bild}
                      alt={`Vorschau von ${projekt.titel}`}
                      width={2880}
                      height={1800}
                    />
                    <div className="proof-body">
                      {projekt.hinweis ? (
                        <p className="proof-place ui">{projekt.hinweis}</p>
                      ) : null}
                      <h3>{projekt.titel}</h3>
                      <p>{projekt.beschreibung}</p>
                      <div className="portfolio-tags">
                        {projekt.merkmale.map((merkmal) => (
                          <span className="portfolio-tag ui" key={merkmal}>{merkmal}</span>
                        ))}
                      </div>
                      <a
                        className="proof-link"
                        href={projekt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {projekt.hinweis ? 'Muster ansehen' : 'Seite ansehen'}
                        <span className="sr-only"> (öffnet in neuem Tab)</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container cta-banner">
          <h2>Wird deine Website die nächste hier?</h2>
          <p>
            Erzähl kurz, worum es geht. Das Erstgespräch kostet nichts und dauert 20 Minuten.
          </p>
          <div className="btn-row cta-actions">
            <Link className="btn btn-accent" href="/kontakt">Kostenloses Erstgespräch</Link>
            <Link className="btn btn-quiet" href="/leistungen">Leistungen ansehen</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
