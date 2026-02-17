import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata: Metadata = buildPageMetadata({
  title: 'Leistungen für Website im Abo und SEO | rokabo',
  description:
    'Leistungen im Überblick: Website im Abo mit WordPress oder individueller Entwicklung mit Next.js und TypeScript, inklusive Hosting, Support und SEO.',
  keyword: 'Website Leistungen',
  path: '/leistungen'
});

export default function LeistungenPage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="section-title">Leistungen</h1>
        <p className="section-subtitle">
          Alles, was du für eine starke Website brauchst, in einem klaren Abo-Modell: von WordPress bis zu individuellen
          Next.js- und TypeScript-Lösungen.
        </p>

        <div className="grid grid-3 services-grid">
          <article className="card service-card">
            <h3>Light</h3>
            <ul className="check-list">
              <li>E-Mail Einrichtung und Basisbetreuung</li>
              <li>Eigene Domain</li>
              <li>Professioneller Außenauftritt</li>
            </ul>
          </article>
          <article className="card recommended service-card">
            <h3>Professional</h3>
            <ul className="check-list">
              <li>Alles aus Light</li>
              <li>Hosting & eigene Domain</li>
              <li>Eigene Website mit bis zu 5 Unterseiten</li>
              <li>6 <Link className="inline-link" href="/faq#care-coins">Care Coins</Link> pro Jahr</li>
            </ul>
          </article>
          <article className="card service-card">
            <h3>Premium</h3>
            <ul className="check-list">
              <li>Alles aus Professional</li>
              <li>Individuelle Website mit bis zu 10 Unterseiten</li>
              <li>Erweiterte SEO Möglichkeiten</li>
              <li>12 <Link className="inline-link" href="/faq#care-coins">Care Coins</Link> pro Jahr</li>
            </ul>
          </article>
        </div>

        <section className="section" aria-label="Technologien und individuelle Möglichkeiten">
          <div className="grid grid-2">
            <article className="card">
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>Technologien, die zu deinem Business passen</h2>
              <ul className="check-list">
                <li>WordPress für schnelle Umsetzung und einfache Pflege</li>
                <li>Next.js für hohe Performance und moderne Web-Architektur</li>
                <li>TypeScript für stabile, wartbare und skalierbare Codebasis</li>
                <li>SEO-Basis oder Advanced SEO je nach Paket</li>
              </ul>
            </article>
            <article className="card">
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>Individuelle Möglichkeiten</h2>
              <p className="muted">
                Du brauchst spezielle Funktionen, Schnittstellen oder besondere Seitenlogik? Wir entwickeln individuelle
                Lösungen auf Next.js- und TypeScript-Basis, abgestimmt auf deine Ziele, Prozesse und Zielgruppe.
              </p>
            </article>
          </div>
        </section>

        <div className="btn-row" style={{ marginTop: '1rem' }}>
          <Link className="btn btn-primary" href="/kontakt">Beratung anfragen</Link>
          <Link className="btn btn-secondary" href="/preise">Preise vergleichen</Link>
        </div>
      </div>
    </main>
  );
}
