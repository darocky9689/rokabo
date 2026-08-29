'use client';

import { useEffect, useState } from 'react';

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

/**
 * Dekoratives Hintergrundvideo im Hero (Deckkraft 0.14).
 *
 * Das Video wird bewusst erst clientseitig eingehaengt, damit die 2,3 MB
 * grosse Datei gar nicht erst geladen werden:
 * - bei "prefers-reduced-motion: reduce"
 * - auf schmalen Viewports (Mobil, meist Mobilfunk)
 * - bei aktivem Datensparmodus oder sehr langsamer Verbindung
 * - solange der Hero-Inhalt (LCP) noch laedt
 */
export default function HeroVideo() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthQuery = window.matchMedia('(min-width: 48rem)');
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;

    const dataSaving =
      connection?.saveData === true || /(^|-)(slow-)?2g$/.test(connection?.effectiveType ?? '');

    if (motionQuery.matches || !widthQuery.matches || dataSaving) {
      return;
    }

    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    // Erst nach dem Laden der Seite starten, damit das Video nicht mit dem
    // LCP-Inhalt des Heros um Bandbreite konkurriert.
    const scheduleLoad = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(() => setEnabled(true), { timeout: 2000 });
      } else {
        timeoutHandle = window.setTimeout(() => setEnabled(true), 400);
      }
    };

    if (document.readyState === 'complete') {
      scheduleLoad();
    } else {
      window.addEventListener('load', scheduleLoad, { once: true });
    }

    // Schaltet der Nutzer "Bewegung reduzieren" spaeter ein, verschwindet das Video.
    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) setEnabled(false);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('load', scheduleLoad);
      motionQuery.removeEventListener('change', handleMotionChange);
      if (idleHandle !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="hero-video" aria-hidden="true">
      <video autoPlay muted loop playsInline preload="auto">
        <source src="/vid/hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
