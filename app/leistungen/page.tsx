import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Leistungen | rokabo',
  description: 'Leistungen je Paket, CareCoins, Hosting, Sicherheit und technische Basis im Überblick.',
  alternates: { canonical: '/leistungen' }
};

export default function LeistungenPage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="section-title">Leistungen</h1>
        <p className="section-subtitle">Alles, was du für eine starke Website brauchst, in einem klaren Abo-Modell.</p>

        <div className="grid grid-3">
          <article className="card">
            <h3>Light</h3>
            <ul className="check-list">
              <li>E-Mail Einrichtung und Basisbetreuung</li>
              <li>Sauberer Einstieg</li>
              <li>ab 160,00 € jährlich</li>
            </ul>
          </article>
          <article className="card recommended">
            <h3>Professional</h3>
            <ul className="check-list">
              <li>Website inklusive</li>
              <li>Basic SEO</li>
              <li>Hosting inklusive</li>
              <li>6 CareCoins pro Monat</li>
            </ul>
          </article>
          <article className="card">
            <h3>Premium</h3>
            <ul className="check-list">
              <li>Advanced SEO</li>
              <li>Extended Support</li>
              <li>12 CareCoins pro Monat</li>
            </ul>
          </article>
        </div>

        <div className="btn-row" style={{ marginTop: '1rem' }}>
          <Link className="btn btn-primary" href="/kontakt">Beratung anfragen</Link>
          <Link className="btn btn-secondary" href="/preise">Preise vergleichen</Link>
        </div>
      </div>
    </main>
  );
}
