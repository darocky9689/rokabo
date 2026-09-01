import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, serviceSchema } from '@/lib/seo/schema';
import { JsonLdScript } from '@/components/seo/json-ld';
import Link from 'next/link';

export const metadata: Metadata = buildPageMetadata({
  title: 'Preise: Website im Abo ab 49 € im Monat',
  description:
    'Feste Monatskosten für deine Website im Abo: drei Pakete, klare Leistungen, keine hohe Einmalzahlung zum Start.',
  keyword: 'Website im Abo Preise',
  path: '/preise'
});

const pakete = [
  { name: 'Starter – Single Page', description: 'Single Page mit SEO Basis, ohne Care Coins.', price: 49 },
  { name: 'Professional', description: 'Bis zu 5 Seiten mit SEO erweitert und 6 Care Coins im Jahr.', price: 79 },
  { name: 'Premium', description: 'Bis zu 10 Seiten mit SEO stark und 12 Care Coins im Jahr.', price: 119 }
];

export default function PreisePage() {
  return (
    <main id="main-content" className="section">
      <JsonLdScript
        id="breadcrumb-schema"
        schema={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Preise', path: '/preise' }
        ])}
      />
      <JsonLdScript id="service-schema" schema={serviceSchema(pakete)} />

      <div className="container">
        <h1 className="section-title">Preise für die Website im Abo</h1>
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
          <Link className="btn btn-primary" href="/kontakt">Passendes Paket kostenlos besprechen</Link>
        </div>

        <section className="section" aria-label="Laufzeit und Änderungen">
          <div className="card">
            <h2 className="section-title section-title-sm">Was du sonst noch wissen willst</h2>
            <ul className="check-list">
              <li>
                <strong>Keine hohe Einmalzahlung.</strong> Du startest mit der Monatsrate,
                nicht mit einer Rechnung über Tausende.
              </li>
              <li>
                <strong>12 Monate feste Betreuung,</strong> danach 3 Monate Kündigungsfrist.
              </li>
              <li>
                <strong>Ein Care Coin</strong> ist eine Änderung bis 30 Minuten - Text tauschen,
                Bild ersetzen, Öffnungszeiten anpassen. Mehrere Wünsche zählen einzeln, nicht genutzte
                Coins verfallen zum Jahresende.
              </li>
              <li>
                <strong>Nach oben wechseln geht jederzeit.</strong> Was klein anfängt, wird
                erweitert statt neu gebaut.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
