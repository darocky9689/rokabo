import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Preise | rokabo',
  description:
    'Einfache Paketpreise für deine Website im Abo: feste Monatskosten, klare Leistungen und persönliche Betreuung.',
  alternates: { canonical: '/preise' }
};

export default function PreisePage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="section-title">Preise</h1>
        <p className="section-subtitle">
          Wähle das Paket, das zu deinem Ziel passt. Du zahlst monatlich, ohne hohe Startkosten,
          und wir kümmern uns um deine Website.
        </p>
        <p className="muted">Starter - Single Page: ideal für Einsteiger. Professional: unsere Empfehlung für die meisten Unternehmen.</p>

        <div className="table-wrap">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Leistung</th>
                <th>Starter - Single Page (Ideal für Einsteiger)</th>
                <th>Professional (Empfohlen)</th>
                <th>Premium</th>
                <th>Basic</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Monatlicher Preis</td><td>ab 49 €</td><td>ab 79 €</td><td>ab 119 €</td><td>ab 15 €</td></tr>
              <tr><td>Preis pro Jahr</td><td>ab 399,00 €</td><td>ab 900,00 €</td><td>ab 1200,00 €</td><td>ab 160,00 €</td></tr>
              <tr><td>Eigene Website</td><td>Ja - eine (Single Site)</td><td>Ja</td><td>Ja</td><td>Nein</td></tr>
              <tr><td>Google-Optimierung (SEO)</td><td>Nein</td><td>SEO Basis</td><td>SEO Plus</td><td>Nein</td></tr>
              <tr>
                <td><Link className="inline-link" href="/faq#care-coins">Care Coins</Link></td>
                <td>Keine</td>
                <td>6</td>
                <td>12</td>
                <td>Keine</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="btn-row" style={{ marginTop: '1rem' }}>
          <Link className="btn btn-primary" href="/kontakt">Passendes Paket kostenlos besprechen</Link>
        </div>

        <section className="section" aria-label="Drei Gründe für rokabo">
          <div className="card">
            <h2 className="section-title" style={{ fontSize: '1.3rem' }}>3 Gründe für rokabo</h2>
            <ul className="check-list">
              <li>Du startest ohne hohe Einmalzahlung und behältst die Kosten im Griff.</li>
              <li>Wir begleiten dich dauerhaft, damit deine Website aktuell und stark bleibt.</li>
              <li>Deine Website ist klar auf Sichtbarkeit und neue Anfragen ausgerichtet.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
