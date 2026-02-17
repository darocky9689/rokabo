'use client';

import { useEffect, useMemo, useState } from 'react';

interface JourneyStep {
  title: string;
  symbol: string;
  description: string;
  image: string;
  alt: string;
}

const journeySteps: JourneyStep[] = [
  {
    title: 'Strategie & Ziele',
    symbol: '🧭',
    description:
      'Wir definieren Zielgruppe, Kernbotschaft und Seitenstruktur, damit deine Website klar auf Anfragen ausgerichtet ist.',
    image: '/images/ROKABO.png',
    alt: 'Strategiephase mit Planung und Zieldefinition',
  },
  {
    title: 'Design & Markenbild',
    symbol: '🎨',
    description:
      'Wir bauen ein visuelles Konzept, das Vertrauen schafft und dein Angebot auf den ersten Blick professionell zeigt.',
    image: '/images/juro-fotografie.webp',
    alt: 'Designphase mit modernem Website-Layout',
  },
  {
    title: 'Umsetzung & Launch',
    symbol: '⚙️',
    description:
      'Wir entwickeln die Seiten performant, mobil optimiert und SEO-sauber, damit dein Auftritt schnell live gehen kann.',
    image: '/images/grundschule-spreenhagen.webp',
    alt: 'Umsetzungsphase mit fertiger Live-Website',
  },
  {
    title: 'Betreuung & Wachstum',
    symbol: '🚀',
    description:
      'Nach dem Launch optimieren wir Inhalte, Struktur und Sichtbarkeit kontinuierlich mit deinen Care-Coins.',
    image: '/images/grundschule-spreenhagen.webp',
    alt: 'Betreuung und Weiterentwicklung der Website',
  },
];

export default function LeistungenJourney() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % journeySteps.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const progress = useMemo(() => ((activeStep + 1) / journeySteps.length) * 100, [activeStep]);
  const step = journeySteps[activeStep];

  return (
    <div className="journey-shell card">
      <div className="journey-steps" role="tablist" aria-label="Projektphasen">
        {journeySteps.map((item, index) => {
          const isActive = index === activeStep;

          return (
            <button
              key={item.title}
              type="button"
              className={`journey-step ${isActive ? 'active' : ''}`}
              onClick={() => setActiveStep(index)}
              role="tab"
              aria-selected={isActive}
              aria-controls="journey-preview"
              id={`journey-step-${index}`}
            >
              <span className="journey-step-symbol" aria-hidden="true">
                {item.symbol}
              </span>
              <span className="journey-step-title">{item.title}</span>
            </button>
          );
        })}
      </div>

      <article
        className="journey-preview"
        id="journey-preview"
        role="tabpanel"
        aria-labelledby={`journey-step-${activeStep}`}
      >
        <div className="journey-image-wrap">
          <img key={step.image + activeStep} src={step.image} alt={step.alt} className="journey-image" />
        </div>

        <div className="journey-content">
          <p className="journey-kicker">{`Schritt ${activeStep + 1} von ${journeySteps.length}`}</p>
          <h3>
            <span aria-hidden="true">{step.symbol}</span> {step.title}
          </h3>
          <p>{step.description}</p>

          <div className="journey-progress" aria-hidden="true">
            <span className="journey-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </article>
    </div>
  );
}
