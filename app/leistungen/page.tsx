import type { Metadata } from 'next';
import Link from 'next/link';
import LeistungenJourney from '../../components/leistungen-journey';

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

        <section className="journey-section" aria-label="Interaktive Projektreise">
          <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
            Interaktive Projektreise: In 4 Schritten zur Live-Website
          </h2>
          <p className="section-subtitle">
            Sieh dir an, wie wir Projekte strukturiert von der Idee bis zur laufenden Betreuung umsetzen.
            Klick dich durch die Schritte oder lass die Reise automatisch laufen.
          </p>
          <LeistungenJourney />
        </section>

        <div className="grid grid-3">
          <article className="card">
            <h3>Starter - Single Page</h3>
            <ul className="check-list">
              <li>Ideal für Einsteiger</li>
              <li>Eine Website als Single Site</li>
              <li>Wenig Kosten für den Start</li>
            </ul>
          </article>
          <article className="card">
            <h3>Basic</h3>
            <ul className="check-list">
              <li>E-Mail-Einrichtung und Start-Betreuung</li>
              <li>Eigene Domain</li>
              <li>Sauberer, professioneller Auftritt</li>
            </ul>
          </article>
          <article className="card recommended">
            <h3>Professional</h3>
            <ul className="check-list">
              <li>Alles aus Basic</li>
              <li>Hosting & eigene Domain</li>
              <li>Eigene Website mit bis zu 5 Seiten</li>
              <li>6 <Link className="inline-link" href="/faq#care-coins">Care Coins</Link> pro Jahr</li>
            </ul>
          </article>
          <article className="card">
            <h3>Premium</h3>
            <ul className="check-list">
              <li>Alles aus Professional</li>
              <li>Individuelle Website mit bis zu 10 Seiten</li>
              <li>Stärkere Google-Optimierung</li>
              <li>12 <Link className="inline-link" href="/faq#care-coins">Care Coins</Link> pro Jahr</li>
            </ul>
          </article>
        </div>

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
