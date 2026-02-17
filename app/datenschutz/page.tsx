import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Datenschutz und DSGVO-Informationen | rokabo',
  description: 'Datenschutzerklärung gemäß Art. 13 und 14 DSGVO für rokabo.',
  keyword: 'Datenschutz',
  path: '/datenschutz',
  noindex: true
});

export default function DatenschutzPage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="section-title">Datenschutzerklärung</h1>
        <p className="section-subtitle">Datenschutzerklärung gemäß Art. 13, 14 DSGVO</p>

        <article className="card" style={{ marginBottom: '1rem' }}>
          <h2>Verantwortlicher</h2>
          <p>
            Thomas Rockstroh<br />
            Am Anger 35<br />
            15518 Steinhöfel<br />
            E-Mail: <a href="mailto:datenschutz@rokabo.de">datenschutz@rokabo.de</a>
          </p>
        </article>

        <article className="card" style={{ marginBottom: '1rem' }}>
          <h2>Erhobene Daten und Zwecke</h2>
          <p>Kontaktformular: Name, E-Mail, Nachricht, IP-Adresse und Zeitstempel zur Bearbeitung Ihrer Anfrage.</p>
          <p>Abo-Kunden: Name, Adresse, E-Mail, Zahlungs- und Vertragsdaten zur Vertragserfüllung.</p>
        </article>

        <article className="card" style={{ marginBottom: '1rem' }}>
          <h2>Hosting</h2>
          <p>Hosting bei cloud86.io in den Niederlanden, mit SSL, AVV, Backups, Malware-Scans und DDoS-Schutz.</p>
        </article>

        <article className="card">
          <h2>Ihre Rechte</h2>
          <p>Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit, Beschwerde.</p>
        </article>
      </div>
    </main>
  );
}
