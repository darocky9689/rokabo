import type { Metadata } from 'next';
import Link from 'next/link';
import LeistungenTabelle from '@/components/leistungen-tabelle';

export const metadata: Metadata = {
  title: 'Leistungen | rokabo',
  description:
    'Unsere Leistungen für deine Website im Abo: klare Pakete, feste Monatskosten und Betreuung aus einer Hand.',
  alternates: { canonical: '/leistungen' }
};

export default function LeistungenPage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="section-title">Leistungen</h1>
        <p className="section-subtitle">
          Du bekommst alles, was du für eine Website brauchst, die Vertrauen schafft und Anfragen bringt.
          Klar im Paket, klar im Preis.
        </p>

        <section className="services-table-section" aria-label="Dynamische Leistungenstabelle">
          <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
            Leistungen im Vergleich
          </h2>
          <p className="section-subtitle">
            Klicke ein Paket an, um Details zu sehen. Reihenfolge: Basic, Starter, Professional, Premium.
          </p>
          <LeistungenTabelle />
        </section>

        <section className="section" aria-label="Technologien und individuelle Möglichkeiten">
          <div className="grid grid-2">
            <article className="card">
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>So setzen wir deine Website um</h2>
              <ul className="check-list">
                <li>WordPress, wenn du schnell online sein willst</li>
                <li>Individuelle Entwicklung, wenn du mehr brauchst</li>
                <li>Schnelle Ladezeiten für bessere Nutzererfahrung</li>
                <li>SEO je nach Paket inklusive</li>
              </ul>
            </article>
            <article className="card">
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>Wenn du etwas Besonderes brauchst</h2>
              <p className="muted">
                Ob spezielle Funktionen, Anbindungen oder eigene Abläufe:
                Wir bauen die Lösung, die zu deinem Angebot und deinen Kunden passt.
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
