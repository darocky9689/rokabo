import type { Metadata } from 'next';
import Link from 'next/link';
import LeistungenTabelle from '@/components/leistungen-tabelle';

export const metadata: Metadata = {
  title: 'Leistungen | rokabo',
  description:
    'Die Leistungen im Website-Abo: klare Pakete, feste Monatskosten und Betreuung aus einer Hand.',
  alternates: { canonical: '/leistungen' }
};

export default function LeistungenPage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="section-title">Leistungen</h1>
        <p className="section-subtitle">
          Alles, was eine Website braucht, um zu funktionieren und zu bleiben:
          Aufbau, Inhalte, Technik und laufende Pflege. Klar im Paket, klar im Preis.
        </p>

        <section className="services-table-section" aria-label="Dynamische Leistungenstabelle">
          <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
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
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>Womit ich deine Website baue</h2>
              <ul className="check-list">
                <li>WordPress, wenn du selbst Inhalte pflegen willst</li>
                <li>Individuelle Entwicklung, wenn du mehr brauchst</li>
                <li>Schnelle Ladezeiten für bessere Nutzererfahrung</li>
                <li>SEO je nach Paket inklusive</li>
              </ul>
            </article>
            <article className="card">
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>Wenn du etwas Besonderes brauchst</h2>
              <p className="muted">
                Ob spezielle Funktionen, Anbindungen oder eigene Abläufe: Sag mir, was
                gebraucht wird - ich sage dir ehrlich, ob und wie es sich lohnt.
              </p>
            </article>
          </div>
        </section>

        <div className="btn-row" style={{ marginTop: '1rem' }}>
          <Link className="btn btn-primary" href="/kontakt">Kostenlos beraten lassen</Link>
          <Link className="btn btn-secondary" href="/preise">Preise vergleichen</Link>
        </div>
      </div>
    </main>
  );
}
