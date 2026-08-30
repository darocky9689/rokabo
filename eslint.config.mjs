/*
 * Flat Config. Noetig geworden mit Next 16: das Kommando "next lint" gibt es
 * nicht mehr, und eslint-config-next 16 setzt ESLint 9+ voraus - dort ist die
 * alte .eslintrc.json kein gueltiges Format mehr.
 *
 * Aufgerufen wird ESLint jetzt direkt ueber "npm run lint".
 */
import next from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const konfiguration = [
  {
    /* dist-site ist generiert, public/muster ist handgeschriebenes HTML
       ausserhalb der App. */
    ignores: ['dist-site/**', '.next/**', 'node_modules/**', 'public/muster/**'],
  },
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default konfiguration;
