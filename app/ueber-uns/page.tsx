import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata: Metadata = buildPageMetadata({
  title: 'Über rokabo: Partner für Website im Abo',
  description:
    'rokabo ist dein Partner für Websites im Abo: planbar, schnell und nachhaltig betreut. WordPress für schnelle Umsetzung oder individuelle Next.js- und TypeScript-Lösungen.',
  keyword: 'Webagentur Über uns',
  path: '/ueber-uns'
});

export default function UeberUnsPage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="section-title">Über uns</h1>
        <p className="section-subtitle">
          Wir bauen Websites, die kleinen Unternehmen den Rücken freihalten – schnell live, sauber betreut
          und mit messbarem Fokus auf Sichtbarkeit und Anfragen.
        </p>

        <div className="grid grid-2">
          <article className="card">
            <h3>Warum rokabo?</h3>
            <ul className="check-list">
              <li>Planbare Kosten ohne hohe Einmalinvestition</li>
              <li>Klare Prozesse, feste Ansprechpartner</li>
              <li>SEO-Basis ab Start, damit du gefunden wirst</li>
              <li>Betreuung statt Übergabe – wir bleiben dran</li>
              <li>Technologie passend zum Ziel: WordPress oder Next.js</li>
            </ul>
          </article>
          <article className="card">
            <h3>Vorteile für dein Unternehmen</h3>
            <p className="muted">
              Du bekommst eine professionelle Website, die laufend gepflegt wird und mit deinem Business mitwächst.
              Änderungen, Sicherheit und Performance sind fest eingeplant.
            </p>
            <p className="muted">
              Je nach Bedarf setzen wir auf WordPress oder entwickeln individuelle Lösungen mit Next.js und TypeScript.
              So bleibt deine Website schnell, stabil und flexibel erweiterbar.
            </p>
            <Link className="btn btn-primary" href="/kontakt">Unverbindlich anfragen</Link>
          </article>
        </div>

        <section className="section" aria-label="So arbeiten wir">
          <div className="grid grid-2">
            <article className="card">
              <h3>So arbeiten wir</h3>
              <ul className="check-list">
                <li>Kurzes Erstgespräch und klare Zieldefinition</li>
                <li>Design & Inhalt mit schnellen Feedback-Schleifen</li>
                <li>Go-live und laufende Betreuung inklusive</li>
              </ul>
            </article>
            <article className="card">
              <h3>Was dich besonders macht</h3>
              <p className="muted">
                Wir denken nicht nur in Seiten, sondern in Ergebnissen: Anfragen, Vertrauen und Sichtbarkeit.
                Darum kombinieren wir Design, Technik und SEO von Anfang an.
              </p>
              <Link className="btn btn-secondary" href="/preise">Pakete vergleichen</Link>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
