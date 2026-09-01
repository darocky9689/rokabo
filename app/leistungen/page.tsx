import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { JsonLdScript } from '@/components/seo/json-ld';
import Link from 'next/link';
import LeistungenTabelle from '@/components/leistungen-tabelle';

export const metadata: Metadata = buildPageMetadata({
  title: 'Leistungen: was im Website-Abo steckt',
  description:
    'Die Leistungen im Website-Abo: klare Pakete, feste Monatskosten und Betreuung aus einer Hand.',
  keyword: 'Website Leistungen',
  path: '/leistungen'
});

export default function LeistungenPage() {
  return (
    <main id="main-content" className="section">
      <JsonLdScript
        id="breadcrumb-schema"
        schema={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Leistungen', path: '/leistungen' }
        ])}
      />

      <div className="container">
        <h1 className="section-title">Leistungen im Website-Abo</h1>
        <p className="section-subtitle">
          Alles, was eine Website braucht, um zu funktionieren und zu bleiben:
          Aufbau, Inhalte, Technik und laufende Pflege. Klar im Paket, klar im Preis.
        </p>

        <section className="services-table-section" aria-label="Dynamische Leistungenstabelle">
          <h2 className="section-title section-title-sm">
            Leistungen im Vergleich
          </h2>
          <p className="section-subtitle">
            Klick ein Paket an, um Details zu sehen.
          </p>
          <LeistungenTabelle />
        </section>

        <section className="section" aria-label="Technologien und individuelle Möglichkeiten">
          <div className="grid grid-2">
            <article className="card">
              <h2 className="section-title section-title-sm">Womit rokabo deine Website baut</h2>
              <ul className="check-list">
                <li>WordPress, wenn du selbst Inhalte pflegen willst</li>
                <li>Individuelle Entwicklung, wenn du mehr brauchst</li>
                <li>Schnelle Ladezeiten für bessere Nutzererfahrung</li>
                <li>SEO je nach Paket inklusive</li>
              </ul>
            </article>
            <article className="card">
              <h2 className="section-title section-title-sm">Wenn du etwas Besonderes brauchst</h2>
              <p className="muted">
                Ob spezielle Funktionen, Anbindungen oder eigene Abläufe: Sag, was
                gebraucht wird - du bekommst eine ehrliche Einschätzung, ob und wie
                es sich lohnt.
              </p>
            </article>
          </div>
        </section>

        <section className="section" aria-label="Passendes Paket nach Branche">
          <h2 className="section-title section-title-sm">Passendes Paket nach Branche</h2>
          <p className="section-subtitle">
            Für drei Branchen gibt es eine eigene Seite mit passendem Paketvorschlag und Beispiel.
          </p>
          <ul className="check-list">
            <li><Link className="inline-link" href="/website-fuer-handwerker">Website für Handwerksbetriebe</Link></li>
            <li><Link className="inline-link" href="/website-fuer-fotografen">Website für Fotografen und Kreative</Link></li>
            <li><Link className="inline-link" href="/website-fuer-schulen">Schulwebsite für Schulen, Kitas und Vereine</Link></li>
          </ul>
        </section>

        <div className="btn-row btn-row-spaced">
          <Link className="btn btn-primary" href="/kontakt">Kostenlos beraten lassen</Link>
          <Link className="btn btn-secondary" href="/preise">Preise vergleichen</Link>
        </div>
      </div>
    </main>
  );
}
