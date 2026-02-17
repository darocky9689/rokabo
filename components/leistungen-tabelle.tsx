'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Leistung {
  title: string;
  symbol: string;
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
    symbol: '🛠️',
    description: 'Der solide Einstieg mit professionellem Grundaufbau und Betreuung zum Start.',
    audience: 'Unternehmen mit klarem Angebot und Wunsch nach professionellem Auftritt',
    pages: 'Basis-Website',
    seo: 'Basis',
    careCoins: '–',
    highlights: ['E-Mail-Einrichtung', 'Eigene Domain', 'Professioneller Auftritt'],
  },
  {
    title: 'Starter',
    symbol: '🌱',
    description: 'Die schlanke Lösung für den schnellen Start als Single-Page Website.',
    audience: 'Einsteiger und kleine Projekte mit knappem Budget',
    pages: 'Single Page',
    seo: 'Basis',
    careCoins: '–',
    highlights: ['Schneller Go-Live', 'Geringe Einstiegskosten', 'Klare Struktur'],
  },
  {
    title: 'Professional',
    symbol: '🚀',
    description: 'Unser Fokuspaket für Wachstum mit mehreren Seiten und laufender Weiterentwicklung.',
    audience: 'Wachsende Unternehmen mit Fokus auf Anfragen und Sichtbarkeit',
    pages: 'Bis zu 5 Seiten',
    seo: 'Erweitert',
    careCoins: '6 / Jahr',
    highlights: ['Hosting inklusive', 'Eigene Domain', 'Skalierbare Struktur'],
  },
  {
    title: 'Premium',
    symbol: '👑',
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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % leistungen.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const active = leistungen[activeIndex];

  return (
    <div className="services-table-shell card">
      <div className="services-table-scroll">
        <table className="services-table">
          <thead>
            <tr>
              <th>Paket</th>
              <th>Für wen</th>
              <th>Seiten</th>
              <th>SEO</th>
              <th>Care Coins</th>
            </tr>
          </thead>
          <tbody>
            {leistungen.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <tr key={item.title} className={isActive ? 'is-active' : ''}>
                  <td>
                    <button
                      type="button"
                      className="services-plan-btn"
                      onClick={() => setActiveIndex(index)}
                      aria-pressed={isActive}
                    >
                      <span aria-hidden="true">{item.symbol}</span>
                      <span>{item.title}</span>
                    </button>
                  </td>
                  <td>{item.audience}</td>
                  <td>{item.pages}</td>
                  <td>{item.seo}</td>
                  <td>{item.careCoins}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <article className="services-details" aria-live="polite">
        <p className="services-details-kicker">Aktives Paket</p>
        <h3>
          <span aria-hidden="true">{active.symbol}</span> {active.title}
        </h3>
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
