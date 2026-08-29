import type { Metadata } from 'next';
import Image from 'next/image';
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
            <h1>Mehr Anfragen über deine Website. Einfach, planbar und ohne hohe Startkosten.</h1>
            <p>
              Deine Website soll verkaufen, nicht nur gut aussehen.
              Mit rokabo bekommst du eine klare Website, die Vertrauen schafft und neue Kunden anspricht.
              Du zahlst monatlich, wir kümmern uns um Technik, Pflege und Sichtbarkeit bei Google.
            </p>
            <p className="hero-price">
              <strong>ab 49 € im Monat</strong>
              <span className="hero-price-note">ohne hohe Einmalzahlung zum Start</span>
            </p>
            <div className="btn-row">
              <Link className="btn btn-accent" href="/kontakt">Kostenloses Erstgespräch anfragen</Link>
              <Link className="btn btn-quiet" href="/preise">Pakete ansehen</Link>
            </div>
          </div>
          <aside className="hero-card" aria-label="Vorteile auf einen Blick">
            <h2 className="card-title">Dein Vorteil mit rokabo</h2>
            <ul className="check-list">
              <li>Feste Monatskosten, klar planbar</li>
              <li>Persönliche Betreuung statt Alleingang</li>
              <li>Texte und Aufbau mit Fokus auf Anfragen</li>
              <li>Hosting, Sicherheit und Updates inklusive</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="trust-strip">
            <p>
              <strong>12 Monate feste Betreuung</strong>
              danach 3 Monate Kündigungsfrist.
            </p>
            <p>
              <strong>Keine hohe Einmalzahlung</strong>
              Du startest mit der Monatsrate, nicht mit einer Rechnung über Tausende.
            </p>
            <p>
              <strong>Hosting, Sicherheit und Updates inklusive</strong>
              Ohne Zusatzrechnung, ohne dass du dich darum kümmern musst.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container process-section" aria-label="Projektablauf in vier Phasen">
          <h2 className="section-title">
            So einfach kommst du mit rokabo zu deiner Website
          </h2>
          <p className="section-subtitle">
            Klarer 4-Schritte-Ablauf, persönliche Begleitung und schnelle Umsetzung - damit deine Website ohne Stress live geht.
          </p>
          <ProcessTimeline />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Passt das auch zu deinem Betrieb?</h2>
          <p className="section-subtitle">
            Zwei typische Ausgangslagen - die passende technische Umsetzung suchen wir dir aus,
            das musst du nicht entscheiden.
          </p>
          <div className="grid grid-2">
            <article className="card">
              <h3 className="card-title">Du brauchst schnell eine erste Seite</h3>
              <p className="muted">
                Klare Struktur, einfache Pflege und eine solide Basis, damit dich Kunden
                in der Region bei Google finden. In der Regel in wenigen Wochen online.
              </p>
            </article>
            <article className="card">
              <h3 className="card-title">Dein Angebot ist erklärungsbedürftig</h3>
              <p className="muted">
                Wenn Standard nicht reicht: individuelle Umsetzung, hohe Geschwindigkeit
                und später erweiterbar, ohne dass alles neu gebaut werden muss.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-band">
        <div className="container">
          <h2 className="section-title">Schon live: echte Projekte aus der Region</h2>
          <p className="section-subtitle">
            Zwei Beispiele, die du dir direkt ansehen kannst - beide von rokabo umgesetzt und betreut.
          </p>
          <div className="proof-grid">
            <article className="proof-item">
              <Image
                className="proof-image"
                src="/images/juro-fotografie.webp"
                alt="Website-Vorschau von juro-fotografie.de"
                width={2880}
                height={1800}
              />
              <div className="proof-body">
                <p className="proof-place">Fotografie</p>
                <h3>juro-fotografie.de</h3>
                <p>Portfolio-Website mit klarer Bildsprache und schneller Navigation.</p>
                <a className="proof-link" href="https://juro-fotografie.de" target="_blank" rel="noopener noreferrer">
                  Website ansehen<span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </div>
            </article>
            <article className="proof-item">
              <Image
                className="proof-image"
                src="/images/grundschule-spreenhagen.webp"
                alt="Website-Vorschau von grundschule-spreenhagen.de"
                width={2880}
                height={1800}
              />
              <div className="proof-body">
                <p className="proof-place">Bildung · Spreenhagen</p>
                <h3>grundschule-spreenhagen.de</h3>
                <p>Informations-Website mit übersichtlicher Struktur für Eltern, Kinder und Lehrkräfte.</p>
                <a className="proof-link" href="https://grundschule-spreenhagen.de" target="_blank" rel="noopener noreferrer">
                  Website ansehen<span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </div>
            </article>
          </div>
          <div className="btn-row" style={{ marginTop: 'var(--space-2)' }}>
            <Link className="btn btn-quiet" href="/portfolio">Alle Projekte ansehen</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2 className="card-title">Offene Fragen zu Kosten, Laufzeit und Ablauf?</h2>
          <p className="section-subtitle">
            Im FAQ stehen die Antworten - inklusive Laufzeit, Kündigungsfrist und Betreuung.
          </p>
          <div className="btn-row">
            <Link className="btn btn-quiet" href="/faq">FAQ ansehen</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-banner">
          <h2>Lass uns über deine neue Website sprechen</h2>
          <p>In 20 Minuten klären wir, wie du mehr passende Anfragen bekommst.</p>
          <p>
            Hinter rokabo steht Thomas Rockstroh aus Steinhöfel - du sprichst direkt
            mit der Person, die deine Website baut und betreut.
          </p>
          <div className="btn-row cta-actions">
            <Link className="btn btn-accent" href="/kontakt">Kostenloses Gespräch anfragen</Link>
            <a className="btn btn-quiet" href="tel:+491756240804">Lieber anrufen: +49 175 624 0804</a>
          </div>
        </div>
      </section>
    </main>
  );
}
