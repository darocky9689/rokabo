import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata: Metadata = buildPageMetadata({
  title: 'Website im Abo mit WordPress und Next.js | rokabo',
  description:
    'Professionelle Website im Abo ohne hohe Startkosten: WordPress-Websites oder individuelle Lösungen mit Next.js und TypeScript. Monatlich planbar mit laufender Betreuung und SEO-Fokus.',
  keyword: 'Website im Abo',
  path: '/'
});

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <p className="kicker">Websites im Abo</p>
            <h1>Deine professionelle Website. Ohne hohe Startkosten, mit laufender Betreuung.</h1>
            <p>
              Du willst sichtbar werden und neue Kunden gewinnen, aber eine klassische Agenturrechnung passt nicht ins Budget.
              Genau dafür gibt es rokabo. Du zahlst monatlich, wir kümmern uns um Technik, Pflege, SEO und Updates –
              wahlweise mit WordPress oder als individuelle Weblösung mit Next.js und TypeScript.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/kontakt">Kostenloses Erstgespräch sichern</Link>
              <Link className="btn btn-secondary" href="/preise">Pakete ansehen</Link>
            </div>
          </div>
          <aside className="hero-card" aria-label="Vorteile auf einen Blick">
            <h2 className="section-title">Was du direkt bekommst</h2>
            <ul className="check-list">
              <li>Kein großer Einmalbetrag am Anfang</li>
              <li>Feste monatliche Kosten, sicher planbar</li>
              <li>Laufende Betreuung statt einmaliger Übergabe</li>
              <li>Technologie passend zum Ziel: WordPress oder Next.js + TypeScript</li>
              <li>Hosting, Sicherheit und Support aus einer Hand</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <article className="card">
            <h2 className="section-title">WordPress für schnellen Start</h2>
            <p className="muted">
              Ideal für klassische Unternehmensseiten, lokale Sichtbarkeit und schnelle Go-Lives.
              Mit sauberer Struktur, leichter Pflege und erprobten SEO-Grundlagen.
            </p>
          </article>
          <article className="card">
            <h2 className="section-title">Next.js & TypeScript für individuelle Projekte</h2>
            <p className="muted">
              Wenn du mehr brauchst als Standard: performante, individuell entwickelte Websites mit
              moderner Architektur, hoher Ladegeschwindigkeit und flexiblen Erweiterungsmöglichkeiten.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container cta-banner">
          <h2>Jetzt unverbindlich beraten lassen</h2>
          <p>In 20 Minuten klären wir Ziel, Budget und das passende Paket für deinen Betrieb.</p>
          <Link className="btn btn-accent" href="/kontakt">Beratungsgespräch anfragen</Link>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2 className="section-title">Noch Fragen vor dem Start?</h2>
          <p className="section-subtitle">
            Alle häufigen Fragen zu Kosten, Laufzeit, Umsetzung und Betreuung findest du kompakt in unserem FAQ.
          </p>
          <div className="btn-row">
            <Link className="btn btn-primary" href="/faq">Zum FAQ</Link>
            <Link className="btn btn-secondary" href="/kontakt">Frage direkt stellen</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
