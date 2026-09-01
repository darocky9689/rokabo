'use client';

import { useState } from 'react';

export default function HeroVisual() {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <button
      type="button"
      className="hero-visual-trigger"
      onClick={() => setReplayKey((n) => n + 1)}
      aria-label="Website-Skizze noch einmal zeichnen"
      title="Noch einmal zeichnen"
    >
      <svg key={replayKey} className="hero-visual" viewBox="0 0 320 220" aria-hidden="true" focusable="false">
        <rect className="hero-visual-shape hero-visual-frame" x="4" y="4" width="312" height="212" rx="2" />
        <line className="hero-visual-shape hero-visual-toolbar" x1="4" y1="34" x2="316" y2="34" />
        <circle className="hero-visual-dot" cx="20" cy="19" r="4" />
        <line className="hero-visual-shape hero-visual-line hero-visual-line-1" x1="24" y1="60" x2="220" y2="60" />
        <line className="hero-visual-shape hero-visual-line hero-visual-line-2" x1="24" y1="80" x2="270" y2="80" />
        <line className="hero-visual-shape hero-visual-line hero-visual-line-3" x1="24" y1="100" x2="150" y2="100" />
        <rect className="hero-visual-shape hero-visual-block" x="24" y="124" width="120" height="70" rx="2" />
        <line className="hero-visual-shape hero-visual-line hero-visual-line-4" x1="160" y1="130" x2="292" y2="130" />
        <line className="hero-visual-shape hero-visual-line hero-visual-line-5" x1="160" y1="150" x2="292" y2="150" />
        <line className="hero-visual-shape hero-visual-line hero-visual-line-6" x1="160" y1="170" x2="240" y2="170" />
      </svg>
    </button>
  );
}
