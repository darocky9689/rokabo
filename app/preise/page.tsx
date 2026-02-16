import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Preise | rokabo',
  description:
    'Transparente Preise für Websites im Abo: WordPress-Pakete und individuelle Webentwicklung mit Next.js und TypeScript im Vergleich.',
  alternates: { canonical: '/preise' }
};

export default function PreisePage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="section-title">Preise</h1>
        <p className="section-subtitle">
          Klare Pakete, klare monatliche Kosten, keine hohe Anfangsinvestition. Je nach Ziel mit WordPress oder
          individuellen Next.js- und TypeScript-Komponenten.
        </p>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Leistung</th>
                <th>Light</th>
                <th>Professional</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Monatlicher Preis</td><td>ab 15 €</td><td>ab 79 €</td><td>ab 119 €</td></tr>
              <tr><td>Jahresbetrag</td><td>ab 160,00 €</td><td>ab 900,00 €</td><td>ab 1200,00 €</td></tr>
              <tr><td>Website</td><td>Nein</td><td>Ja</td><td>Ja</td></tr>
              <tr><td>SEO</td><td>Nein</td><td>Basic SEO</td><td>Advanced SEO</td></tr>
              <tr><td>CareCoins</td><td>Keine</td><td>6</td><td>12</td></tr>
            </tbody>
          </table>
        </div>

        <div className="btn-row" style={{ marginTop: '1rem' }}>
          <Link className="btn btn-primary" href="/kontakt">Kostenloses Erstgespräch buchen</Link>
        </div>
      </div>
    </main>
  );
}
