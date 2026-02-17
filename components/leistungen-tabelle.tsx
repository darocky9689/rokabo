'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Leistung {
  title: string;
  description: string;
  audience: string;
  pages: string;
  seo: string;
  careCoins: string;
  highlights: string[];
}

const leistungen: Leistung[] = [
  {
    title: 'Basic',
    description: 'Der solide Einstieg mit professionellem Grundaufbau und Betreuung zum Start.',
    audience: 'Unternehmen mit klarem Angebot und Wunsch nach professionellem Auftritt',
    pages: 'Basis-Website',
    seo: 'Basis',
    careCoins: '–',
    highlights: ['E-Mail-Einrichtung', 'Eigene Domain', 'Professioneller Auftritt'],
  },
  {
    title: 'Starter',
    description: 'Die schlanke Lösung für den schnellen Start als Single-Page Website.',
    audience: 'Einsteiger und kleine Projekte mit knappem Budget',
    pages: 'Single Page',
    seo: 'Basis',
    careCoins: '–',
    highlights: ['Schneller Go-Live', 'Geringe Einstiegskosten', 'Klare Struktur'],
  },
  {
    title: 'Professional',
    description: 'Unser Fokuspaket für Wachstum mit mehreren Seiten und laufender Weiterentwicklung.',
    audience: 'Wachsende Unternehmen mit Fokus auf Anfragen und Sichtbarkeit',
    pages: 'Bis zu 5 Seiten',
    seo: 'Erweitert',
    careCoins: '6 / Jahr',
    highlights: ['Hosting inklusive', 'Eigene Domain', 'Skalierbare Struktur'],
  },
  {
    title: 'Premium',
    description: 'Die umfangreiche Lösung mit maximaler Flexibilität und starker Google-Optimierung.',
    audience: 'Unternehmen mit hohem Anspruch an Performance und Sichtbarkeit',
    pages: 'Bis zu 10 Seiten',
    seo: 'Stark',
    careCoins: '12 / Jahr',
    highlights: ['Individuelle Umsetzung', 'Mehr SEO-Fokus', 'Umfangreiche Betreuung'],
  },
];

export default function LeistungenTabelle() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = leistungen[activeIndex];

  return (
    <div className="services-table-shell card">
      <div className="services-horizontal-scroll">
        <div className="services-horizontal" role="tablist" aria-label="Leistungsbausteine">
          {leistungen.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`services-tile ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <h3>{item.title}</h3>
                <div className="services-tile-extra">
                  <p>{item.description}</p>
                  <ul className="services-tile-meta">
                    <li>{item.pages}</li>
                    <li>SEO: {item.seo}</li>
                    <li>Care Coins: {item.careCoins}</li>
                  </ul>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <article className="services-details" aria-live="polite">
        <p className="services-details-kicker">Aktives Paket</p>
        <h3>{active.title}</h3>
        <p>{active.description}</p>
        <ul className="check-list">
          {active.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
          {active.title === 'Professional' && (
            <li>
              6 <Link className="inline-link" href="/faq#care-coins">Care Coins</Link> pro Jahr
            </li>
          )}
          {active.title === 'Premium' && (
            <li>
              12 <Link className="inline-link" href="/faq#care-coins">Care Coins</Link> pro Jahr
            </li>
          )}
        </ul>
      </article>
    </div>
  );
}
