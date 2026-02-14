import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum | rokabo',
  description: 'Impressum nach § 5 TMG und § 55 RStV',
  robots: { index: false, follow: true },
  alternates: { canonical: '/impressum' }
};

export default function ImpressumPage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="section-title">Impressum</h1>
        <p className="section-subtitle">Impressum nach § 5 TMG und § 55 RStV</p>

        <article className="card" style={{ marginBottom: '1rem' }}>
          <h2>Anbieterkennzeichnung</h2>
          <p>Thomas Rockstroh<br />Am Anger 35<br />15518 Steinhöfel</p>
        </article>

        <article className="card" style={{ marginBottom: '1rem' }}>
          <h2>Kontakt</h2>
          <p>
            Telefon: <a href="tel:+491756240804">+49 175 624 0804</a><br />
            E-Mail: <a href="mailto:info@rokabo.de">info@rokabo.de</a><br />
            Website: <a href="https://www.rokabo.de">www.rokabo.de</a>
          </p>
        </article>

        <article className="card">
          <h2>Geschäftsmodell</h2>
          <p>
            rokabo bietet professionelle Webseiten im Abo-Modell für kleine Unternehmen an. Leistungen umfassen Erstellung,
            Hosting, Wartung und Updates gegen eine monatliche Pauschale.
          </p>
        </article>
      </div>
    </main>
  );
}
