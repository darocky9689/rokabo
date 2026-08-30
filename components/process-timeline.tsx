'use client';

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { useMemo, useState } from 'react';

type StepIcon = 'call' | 'design' | 'build' | 'launch';

interface ProcessStep {
  icon: StepIcon;
  title: string;
  description: string;
  cta: string;
  details: ReactNode;
  href: string;
}

const processSteps: ProcessStep[] = [
  {
    icon: 'call',
    title: 'Erstgespräch',
    description: 'Kurz kennenlernen · Angebot in 2 Werktagen.',
    cta: 'Termin anfragen',
    details: 'In einem kurzen Gespräch klären wir Ziel, Inhalte und Prioritäten - du bekommst einen klaren Fahrplan.',
    href: '/kontakt',
  },
  {
    icon: 'design',
    title: 'Planung & Design',
    description: 'Designvorschläge + Feedback.',
    cta: 'Beispiele sehen',
    details: 'Du siehst früh konkrete Entwürfe und gibst direkt Feedback - so entsteht Schritt für Schritt deine Website.',
    href: '/portfolio',
  },
  {
    icon: 'build',
    title: 'Entwicklung',
    description: 'Umsetzen + prüfen.',
    cta: 'Paket wählen',
    details: 'Deine Website entsteht in einer Testumgebung - dort wird alles geprüft, bevor sie live geht.',
    href: '/preise',
  },
  {
    icon: 'launch',
    title: 'Go-Live & Pflege',
    description: 'Livegang + laufende Betreuung.',
    cta: 'Jetzt starten',
    details: (
      <>
        Nach dem Launch bleibt rokabo an deiner Seite - mit{' '}
        <Link className="inline-link" href="/faq#care-coins">Care Coins</Link> und regelmäßiger
        Pflege, damit die Seite aktuell bleibt.
      </>
    ),
    href: '/kontakt',
  },
];

function TimelineIcon({ icon }: { icon: StepIcon }) {
  if (icon === 'call') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6.7 2.9c.4-.4 1-.6 1.6-.4l2.8.8c.8.2 1.3 1 1.2 1.8l-.3 2.5c0 .4.1.8.4 1l2.4 2.4c.3.3.7.4 1 .4l2.5-.3c.9-.1 1.6.4 1.8 1.2l.8 2.8c.2.6 0 1.2-.4 1.6l-1.3 1.3c-.7.7-1.7 1.1-2.8 1-3.5-.2-7.4-2.1-10.2-4.9-2.8-2.8-4.7-6.7-4.9-10.2-.1-1 .3-2 1-2.8l1.4-1.2Z" fill="currentColor" />
      </svg>
    );
  }

  if (icon === 'design') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 17.5 16.7 4.8a2.1 2.1 0 0 1 3 0l.5.5a2.1 2.1 0 0 1 0 3L7.5 21H4v-3.5Z" fill="currentColor" />
        <path d="m13.8 7.7 2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === 'build') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20.2 7.4a5.2 5.2 0 0 1-6.6 6.6L7.2 20.4a2.1 2.1 0 0 1-3-3l6.4-6.4a5.2 5.2 0 0 1 6.6-6.6L14.3 7l2.7 2.7 3.2-2.3Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 3 4 12h5v9h6v-9h5L12 3Z" fill="currentColor" />
      <path d="M12 21v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function ProcessTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStep = processSteps[activeIndex];
  const phaseLabel = `Phase ${activeIndex + 1} von ${processSteps.length}`;
  const progress = useMemo(() => {
    return ((activeIndex + 1) / processSteps.length) * 100;
  }, [activeIndex]);

  return (
    <section className="process-timeline" aria-label="Ablauf in vier Phasen" style={{ '--process-progress': `${progress}%` } as CSSProperties}>
      <div className="process-track" aria-hidden="true">
        <span className="process-track-fill" />
      </div>

      <p className="sr-only" aria-live="polite">
        {phaseLabel}: {activeStep.title}
      </p>

      <div className="process-steps" aria-label="Ablaufphasen">
        {processSteps.map((step, index) => {
          const isActive = index === activeIndex;

          return (
            <article key={step.title} className={`process-step ${isActive ? 'is-active' : ''}`}>
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={`process-step-panel-${index}`}
                className="process-step-toggle"
                onClick={() => setActiveIndex(index)}
              >
                <span className={`process-icon process-icon-${step.icon}`} aria-hidden="true">
                  <TimelineIcon icon={step.icon} />
                </span>
                <span className="process-title ui">{step.title}</span>
                <span className="process-desc text">{step.description}</span>
                <span className="process-cta ui">Details ansehen</span>
              </button>

              <div
                className="process-step-panel"
                id={`process-step-panel-${index}`}
                aria-hidden={!isActive}
              >
                <p className="process-step-details">{step.details}</p>
                <Link className="btn btn-secondary" href={step.href}>
                  {step.cta}
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <article className="process-accordion" role="region" aria-label="Details zur aktiven Phase" id="process-details">
        <div className="process-accordion-text">
          <p className="process-accordion-kicker ui">{phaseLabel}</p>
          <h3>{activeStep.title}</h3>
          <p className="process-accordion-desc">{activeStep.description}</p>
          <p>{activeStep.details}</p>
        </div>
        <div className="process-accordion-actions">
          <Link className="btn btn-secondary" href={activeStep.href}>
            {activeStep.cta}
          </Link>
        </div>
       </article>
     </section>
   );
 }
