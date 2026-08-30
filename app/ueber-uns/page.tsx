import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata: Metadata = buildPageMetadata({
  title: 'Wer hinter rokabo steckt',
  description:
    'Hinter rokabo steht eine Person, keine Agentur. Websites im Abo: gebaut, betreut und dauerhaft aktuell gehalten.',
  keyword: 'Über rokabo',
  path: '/ueber-uns'
});

export default function UeberUnsPage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <h1 className="section-title">Über rokabo</h1>
        <p className="section-subtitle">
          Hinter rokabo steht kein Team und keine Agentur. Du sprichst direkt mit der Person,
          die deine Website baut und danach betreut - ohne Projektleitung dazwischen und ohne
          wechselnde Ansprechpartner.
        </p>

        <h2 className="section-title" style={{ fontSize: '1.3rem' }}>Was dich erwartet</h2>
        <div className="grid grid-2">
          <article className="card">
            <h3>Warum rokabo?</h3>
            <ul className="check-list">
              <li>Keine hohe Einmalzahlung am Anfang</li>
              <li>Feste Monatskosten, einfach planbar</li>
              <li>Eine Ansprechperson, kein Ticketsystem</li>
              <li>Laufende Betreuung statt einmaliger Übergabe</li>
              <li>Domain und Inhalte gehören dir - auch nach Vertragsende</li>
            </ul>
          </article>
          <article className="card">
            <h3>Was das für dich heißt</h3>
            <p className="muted">
              Du bekommst eine Website, die professionell wirkt und die du nicht selbst
              pflegen musst. Hosting, Updates und Sicherheit sind eingeplant, bevor du
              danach fragst.
            </p>
            <p className="muted">
              Ob WordPress oder eine individuelle Umsetzung, entscheidet sich nach deinem
              Fall und nicht nach Vorliebe. So bleibt die Seite schnell und lässt sich
              später erweitern, statt neu gebaut zu werden.
            </p>
            <Link className="btn btn-primary" href="/kontakt">Kostenloses Erstgespräch anfragen</Link>
          </article>
        </div>

        <section className="section">
          <h2 className="section-title" style={{ fontSize: '1.3rem' }}>Zusammenarbeit</h2>
          <div className="grid grid-2">
            <article className="card">
              <h3>So läuft es ab</h3>
              <ul className="check-list">
                <li>Kurz sprechen, Ziel festlegen - danach Angebot in zwei Werktagen</li>
                <li>Entwürfe früh zeigen und gemeinsam abstimmen</li>
                <li>Online gehen und laufend betreuen</li>
              </ul>
            </article>
            <article className="card">
              <h3>Warum die Kundenzahl begrenzt ist</h3>
              <p className="muted">
                rokabo betreut bewusst nur eine begrenzte Zahl laufender Websites. Das ist
                die Voraussetzung dafür, dass „feste Ansprechperson“ mehr ist als ein Satz
                auf einer Website.
              </p>
              <p className="muted">
                Wenn es gerade nicht passt, erfährst du das im Erstgespräch - lieber ein
                ehrliches Nein als eine Betreuung, die nach drei Monaten einschläft.
              </p>
              <Link className="btn btn-secondary" href="/preise">Pakete vergleichen</Link>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
