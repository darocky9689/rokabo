import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata: Metadata = buildPageMetadata({
  title: 'Preise: Website im Abo ab 49 € im Monat',
  description:
    'Feste Monatskosten für deine Website im Abo: drei Pakete, klare Leistungen, keine hohe Einmalzahlung zum Start.',
  keyword: 'Website im Abo Preise',
  path: '/preise'
});

export default function PreisePage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="section-title">Preise</h1>
        <p className="section-subtitle">
          Drei Pakete mit festen Monatskosten. Du zahlst monatlich, ohne hohe Startkosten -
          rokabo kümmert sich um Technik, Pflege und Sichtbarkeit.
        </p>
        <p className="muted">
          Starter für den schnellen Start mit einer Seite. Professional ist die Empfehlung für
          die meisten. Premium, wenn Umfang und Sichtbarkeit zählen.
        </p>

        <div className="table-wrap">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Leistung</th>
                <th>Starter - Single Page</th>
                <th>Professional (Empfohlen)</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Monatlicher Preis</td><td>ab 49 €</td><td>ab 79 €</td><td>ab 119 €</td></tr>
              <tr><td>Seitenumfang</td><td>Single Page</td><td>bis 5 Seiten</td><td>bis 10 Seiten</td></tr>
              <tr><td>Google-Optimierung (SEO)</td><td>SEO Basis</td><td>SEO erweitert</td><td>SEO stark</td></tr>
              <tr>
                <td><Link className="inline-link" href="/faq#care-coins">Care Coins</Link> pro Jahr</td>
                <td>Keine</td>
                <td>6</td>
                <td>12</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pricing-mobile-accordion" aria-label="Preise als Akkordeon">
          <details className="pricing-mobile-item">
            <summary>
              <span>Starter - Single Page</span>
              <strong>ab 49 € / Monat</strong>
            </summary>
            <ul className="pricing-mobile-list">
              <li><span>Seitenumfang</span><strong>Single Page</strong></li>
              <li><span>Google-Optimierung (SEO)</span><strong>SEO Basis</strong></li>
              <li><span>Care Coins pro Jahr</span><strong>Keine</strong></li>
            </ul>
          </details>

          <details className="pricing-mobile-item" open>
            <summary>
              <span>Professional (Empfohlen)</span>
              <strong>ab 79 € / Monat</strong>
            </summary>
            <ul className="pricing-mobile-list">
              <li><span>Seitenumfang</span><strong>bis 5 Seiten</strong></li>
              <li><span>Google-Optimierung (SEO)</span><strong>SEO erweitert</strong></li>
              <li><span>Care Coins pro Jahr</span><strong>6</strong></li>
            </ul>
          </details>

          <details className="pricing-mobile-item">
            <summary>
              <span>Premium</span>
              <strong>ab 119 € / Monat</strong>
            </summary>
            <ul className="pricing-mobile-list">
              <li><span>Seitenumfang</span><strong>bis 10 Seiten</strong></li>
              <li><span>Google-Optimierung (SEO)</span><strong>SEO stark</strong></li>
              <li><span>Care Coins pro Jahr</span><strong>12</strong></li>
            </ul>
          </details>
        </div>

        <p className="muted">
          Hosting, Updates und Sicherheit sind in allen Paketen enthalten. Nur E-Mail und Domain,
          ohne Website? Das gibt es weiterhin ab 15 € im Monat - frag im Gespräch danach.
        </p>

        <div className="btn-row" style={{ marginTop: '1rem' }}>
          <Link className="btn btn-primary" href="/kontakt">Passendes Paket kostenlos besprechen</Link>
        </div>

        <section className="section" aria-label="Laufzeit und Änderungen">
          <div className="card">
            <h2 className="section-title" style={{ fontSize: '1.3rem' }}>Was du sonst noch wissen willst</h2>
            <ul className="check-list">
              <li>
                <strong className="ui">Keine hohe Einmalzahlung.</strong> Du startest mit der Monatsrate,
                nicht mit einer Rechnung über Tausende.
              </li>
              <li>
                <strong className="ui">12 Monate feste Betreuung,</strong> danach 3 Monate Kündigungsfrist.
              </li>
              <li>
                <strong className="ui">Ein Care Coin</strong> ist eine Änderung bis 30 Minuten - Text tauschen,
                Bild ersetzen, Öffnungszeiten anpassen. Mehrere Wünsche zählen einzeln, nicht genutzte
                Coins verfallen zum Jahresende.
              </li>
              <li>
                <strong className="ui">Nach oben wechseln geht jederzeit.</strong> Was klein anfängt, wird
                erweitert statt neu gebaut.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
