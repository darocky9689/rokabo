'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';

type StepIcon = 'call' | 'design' | 'build' | 'launch';

interface ProcessStep {
  icon: StepIcon;
  title: string;
  description: string;
  cta: string;
  details: string;
  href: string;
}

const processSteps: ProcessStep[] = [
  {
    icon: 'call',
    title: 'Erstgespräch',
    description: 'Kurz kennenlernen · Angebot in 48h.',
    cta: 'Termin buchen',
    details: 'In einem kurzen Video-Call klären wir Ziel, Inhalte und Prioritäten - du bekommst einen klaren Fahrplan.',
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
    details: 'Wir bauen deine Website sauber in einer Testumgebung und prüfen alles, bevor sie live geht.',
    href: '/preise',
  },
  {
    icon: 'launch',
    title: 'Go-Live & Pflege',
    description: 'Livegang + laufende Betreuung.',
    cta: 'Jetzt starten',
    details: 'Nach dem Launch bleiben wir an deiner Seite - mit Care Coins und regelmäßiger Pflege für dauerhaft starke Ergebnisse.',
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
    if (processSteps.length === 1) return 100;
    return (activeIndex / (processSteps.length - 1)) * 100;
  }, [activeIndex]);

  return (
    <section className="process-timeline" aria-label="ProcessTimeline" style={{ '--process-progress': `${progress}%` } as CSSProperties}>
      <div className="process-track" aria-hidden="true">
        <span className="process-track-fill" />
      </div>

      <div className="process-steps" role="tablist" aria-label="Ablaufphasen">
        {processSteps.map((step, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={step.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`process-step ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <span className={`process-icon process-icon-${step.icon}`} aria-hidden="true">
                <TimelineIcon icon={step.icon} />
              </span>
              <span className="process-title">{step.title}</span>
              <span className="process-desc">{step.description}</span>
              <span className="process-cta">{step.cta}</span>
            </button>
          );
        })}
      </div>

      <article className="process-accordion" role="region" aria-live="polite" id="process-details">
        <p className="process-accordion-kicker">{phaseLabel}</p>
        <div className="process-accordion-head">
          <h3>{activeStep.title}</h3>
          <Link className="btn btn-secondary" href={activeStep.href}>
            {activeStep.cta}
          </Link>
        </div>
        <p className="process-accordion-desc">{activeStep.description}</p>
        <p>{activeStep.details}</p>
       </article>
     </section>
   );
 }
