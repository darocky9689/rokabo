import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Über uns | rokabo',
  description:
    'rokabo baut Websites im Abo für kleine Unternehmen: klar planbar, persönlich betreut und auf mehr Anfragen ausgerichtet.',
  alternates: { canonical: '/ueber-uns' }
};

export default function UeberUnsPage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="section-title">Über uns</h1>
        <p className="section-subtitle">
          Wir bauen Websites für kleine Unternehmen, die neue Kunden gewinnen wollen.
          Klar im Aufbau, leicht zu pflegen und mit laufender Betreuung.
        </p>

        <div className="grid grid-2">
          <article className="card">
            <h3>Warum rokabo?</h3>
            <ul className="check-list">
              <li>Keine hohe Einmalzahlung am Anfang</li>
              <li>Feste Monatskosten, einfach planbar</li>
              <li>Persönlicher Ansprechpartner</li>
              <li>Laufende Betreuung statt einmaliger Übergabe</li>
              <li>Website mit Fokus auf Sichtbarkeit und Anfragen</li>
            </ul>
          </article>
          <article className="card">
            <h3>Vorteile für dein Unternehmen</h3>
            <p className="muted">
              Du bekommst eine Website, die professionell wirkt und Vertrauen schafft.
              Änderungen, Sicherheit und Technik sind bereits eingeplant.
            </p>
            <p className="muted">
              Je nach Ziel setzen wir auf WordPress oder eine individuelle Lösung.
              So bleibt deine Website schnell und kann mit deinem Unternehmen wachsen.
            </p>
            <Link className="btn btn-primary" href="/kontakt">Kostenloses Erstgespräch buchen</Link>
          </article>
        </div>

        <section className="section" aria-label="So arbeiten wir">
          <div className="grid grid-2">
            <article className="card">
              <h3>So arbeiten wir</h3>
              <ul className="check-list">
                <li>Kurz sprechen, Ziele festlegen</li>
                <li>Website klar aufbauen und gemeinsam abstimmen</li>
                <li>Online gehen und laufend betreuen</li>
              </ul>
            </article>
            <article className="card">
              <h3>Unser Fokus</h3>
              <p className="muted">
                Für uns zählt nicht nur, dass eine Seite schön aussieht.
                Wichtig sind Ergebnisse: mehr Sichtbarkeit, mehr Vertrauen und mehr Anfragen.
              </p>
              <Link className="btn btn-secondary" href="/preise">Pakete vergleichen</Link>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
