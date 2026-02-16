import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Über uns | rokabo',
  description:
    'rokabo ist dein Partner für Websites im Abo: WordPress für schnelle Umsetzung und individuelle Webentwicklung mit Next.js und TypeScript für mehr Flexibilität.',
  alternates: { canonical: '/ueber-uns' }
};

export default function UeberUnsPage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="section-title">Über uns</h1>
        <p className="section-subtitle">
          Wir bauen Websites, die kleinen Unternehmen den Rücken freihalten – mit klaren Prozessen,
          SEO-Fokus und der passenden Technologie für dein Wachstum.
        </p>

        <div className="grid grid-2">
          <article className="card">
            <h3>Unsere Haltung</h3>
            <ul className="check-list">
              <li>Einfachheit in Kommunikation und Prozessen</li>
              <li>Flexibilität im Geschäftsalltag</li>
              <li>Verlässlichkeit bei Support und Betreuung</li>
              <li>Kreativität mit klarem Fokus auf Wirkung</li>
            </ul>
          </article>
          <article className="card">
            <h3>Warum Abo-Modell</h3>
            <p className="muted">
              Keine hohe Einmalinvestition. Stattdessen ein klarer monatlicher Rahmen mit laufender Weiterentwicklung.
            </p>
            <p className="muted">
              Je nach Bedarf setzen wir auf WordPress oder entwickeln individuelle Lösungen mit Next.js und TypeScript.
            </p>
            <Link className="btn btn-primary" href="/kontakt">Unverbindlich anfragen</Link>
          </article>
        </div>
      </div>
    </main>
  );
}
