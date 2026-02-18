import type { Metadata } from 'next';
import Link from 'next/link';
import ProcessTimeline from '@/components/process-timeline';

export const metadata: Metadata = {
  title: 'rokabo | Website im Abo für mehr Anfragen',
  description:
    'Mehr Kundenanfragen mit einer klaren Website im Abo: ohne hohe Startkosten, mit festen Monatskosten und laufender Betreuung.',
  alternates: { canonical: '/' }
};

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <p className="kicker">Websites im Abo</p>
            <h1>Mehr Anfragen über deine Website. Einfach, planbar und ohne hohe Startkosten.</h1>
            <p>
              Deine Website soll verkaufen, nicht nur gut aussehen.
              Mit rokabo bekommst du eine klare Website, die Vertrauen schafft und neue Kunden anspricht.
              Du zahlst monatlich, wir kümmern uns um Technik, Pflege und Sichtbarkeit bei Google.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/kontakt">Kostenloses Erstgespräch buchen</Link>
              <Link className="btn btn-secondary" href="/preise">Pakete ansehen</Link>
            </div>
          </div>
          <aside className="hero-card" aria-label="Vorteile auf einen Blick">
            <h2 className="section-title">Dein Vorteil mit rokabo</h2>
            <ul className="check-list">
              <li>Keine hohe Einmalzahlung zum Start</li>
              <li>Feste Monatskosten, klar planbar</li>
              <li>Persönliche Betreuung statt Alleingang</li>
              <li>Texte und Aufbau mit Fokus auf Anfragen</li>
              <li>Hosting, Sicherheit und Updates inklusive</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container process-section" aria-label="Projektablauf in vier Phasen">
          <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
            So einfach kommst du mit rokabo zu deiner Website
          </h2>
          <p className="section-subtitle">
            Klarer 4-Schritte-Ablauf, persönliche Begleitung und schnelle Umsetzung - damit deine Website ohne Stress live geht.
          </p>
          <ProcessTimeline />
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <article className="card">
            <h2 className="section-title">WordPress: schnell online</h2>
            <p className="muted">
              Ideal, wenn du schnell starten willst. Klare Seitenstruktur,
              einfache Pflege und eine solide Basis für lokale Google-Sichtbarkeit.
            </p>
          </article>
          <article className="card">
            <h2 className="section-title">Individuell: für mehr Möglichkeiten</h2>
            <p className="muted">
              Wenn dein Angebot mehr braucht als Standard: individuelle Umsetzung,
              hohe Geschwindigkeit und flexibel erweiterbar.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container cta-banner">
          <h2>Lass uns über deine neue Website sprechen</h2>
          <p>In 20 Minuten klären wir, wie du mehr passende Anfragen bekommst.</p>
          <Link className="btn btn-accent" href="/kontakt">Kostenloses Gespräch anfragen</Link>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2 className="section-title">Noch unsicher?</h2>
          <p className="section-subtitle">
            Im FAQ findest du klare Antworten zu Kosten, Laufzeit, Ablauf und Betreuung.
          </p>
          <div className="btn-row">
            <Link className="btn btn-primary" href="/faq">FAQ ansehen</Link>
            <Link className="btn btn-secondary" href="/kontakt">Direkt Kontakt aufnehmen</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
