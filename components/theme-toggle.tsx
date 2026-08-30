'use client';

import { useCallback, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

const EREIGNIS = 'rokabo:theme';

/*
 * Die Quelle der Wahrheit ist das data-theme-Attribut auf <html>, das
 * das Inline-Skript in app/layout.tsx schon vor dem ersten Frame setzt.
 *
 * Vorher las diese Komponente localStorage in einem Effect und rief dort
 * setState - React 19 beanstandet das zu Recht, weil es einen zweiten
 * Render ausloest. useSyncExternalStore liest stattdessen direkt aus dem
 * DOM und kennt einen eigenen Wert fuer das Prerendering: 'dark', genau
 * die Vorgabe des Layouts. Damit gibt es kein Umspringen beim Erstbesuch.
 */
function abonnieren(melden: () => void) {
  window.addEventListener(EREIGNIS, melden);
  return () => window.removeEventListener(EREIGNIS, melden);
}

function ausDem(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function beimPrerender(): Theme {
  return 'dark';
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(abonnieren, ausDem, beimPrerender);

  const umschalten = useCallback(() => {
    const neu: Theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', neu);
    try {
      localStorage.setItem('theme', neu);
    } catch {
      /* Privater Modus oder gesperrte Website-Daten: die Wahl gilt dann
         nur fuer diesen Besuch. Kein Grund, den Wechsel zu verweigern. */
    }
    window.dispatchEvent(new Event(EREIGNIS));
  }, []);

  return (
    <button
      onClick={umschalten}
      className="theme-toggle"
      aria-label={theme === 'dark' ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln'}
      title={theme === 'dark' ? 'Helles Design' : 'Dunkles Design'}
    >
      {theme === 'dark' ? (
        // Sun icon
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // Moon icon
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
