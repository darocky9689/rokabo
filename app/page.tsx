import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ProcessTimeline from '@/components/process-timeline';

export const metadata: Metadata = {
  title: 'rokabo | Eine Website, um die sich jemand kümmert',
  description:
    'Mehr Kundenanfragen mit einer klaren Website im Abo: ohne hohe Startkosten, mit festen Monatskosten und laufender Betreuung.',
  alternates: { canonical: '/' }
};

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <h1>Eine Website, um die sich jemand kümmert.</h1>
            <p>
              Ich baue sie, halte sie aktuell und bin erreichbar, wenn etwas ist.
              Du zahlst monatlich - ohne hohe Startkosten und ohne dass du dich
              um Technik, Updates oder Sicherheit kümmern musst.
            </p>
            <p className="hero-price ui">
              <strong>ab 49 € im Monat</strong>
              <span className="hero-price-note">ohne hohe Einmalzahlung zum Start</span>
            </p>
            <div className="btn-row">
              <Link className="btn btn-accent" href="/kontakt">Kostenloses Erstgespräch anfragen</Link>
              <Link className="btn btn-quiet" href="/preise">Pakete ansehen</Link>
            </div>
          </div>
          <aside className="hero-card" aria-label="Vorteile auf einen Blick">
            <h2 className="card-title">Was du bekommst</h2>
            <ul className="check-list">
              <li>Feste Monatskosten, klar planbar</li>
              <li>Eine feste Ansprechperson, kein Ticketsystem</li>
              <li>Aufbau und Texte auf dein Ziel ausgerichtet</li>
              <li>Hosting, Sicherheit und Updates inklusive</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="trust-strip">
            <p>
              <strong className="ui">12 Monate feste Betreuung</strong>
              danach 3 Monate Kündigungsfrist.
            </p>
            <p>
              <strong className="ui">Keine hohe Einmalzahlung</strong>
              Du startest mit der Monatsrate, nicht mit einer Rechnung über Tausende.
            </p>
            <p>
              <strong className="ui">Hosting, Sicherheit und Updates inklusive</strong>
              Ohne Zusatzrechnung, ohne dass du dich darum kümmern musst.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container process-section" aria-label="Projektablauf in vier Phasen">
          <h2 className="section-title">
            So einfach kommst du mit rokabo zu deiner Website
          </h2>
          <p className="section-subtitle">
            Klarer 4-Schritte-Ablauf, persönliche Begleitung und schnelle Umsetzung - damit deine Website ohne Stress live geht.
          </p>
          <ProcessTimeline />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Klein starten oder gleich das volle Programm</h2>
          <p className="section-subtitle">
            Beides baue ich - mit demselben Anspruch: sauber umgesetzt, schnell geladen,
            bei Google auffindbar. Und festlegen musst du dich heute nicht für immer, denn
            was klein anfängt, wird später erweitert statt neu gebaut.
          </p>
          <div className="grid grid-2">
            <article className="card">
              <h3 className="card-title">Schnell und schlank starten</h3>
              <p className="muted">
                Eine Seite, die das Wichtigste zeigt: was du machst, für wen und wie dich
                Kunden erreichen. Wenig Aufwand auf beiden Seiten, in der Regel in wenigen
                Wochen online - und trotzdem kein Provisorium.
              </p>
            </article>
            <article className="card">
              <h3 className="card-title">Gleich mit dem ganzen Angebot</h3>
              <p className="muted">
                Wenn Leistungen, Referenzen und Details von Anfang an Platz brauchen:
                mehrseitig aufgebaut und auf deinen Betrieb zugeschnitten, individuell
                statt Vorlage von der Stange.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-band">
        <div className="container">
          <h2 className="section-title">Schon live: Websites, die du dir ansehen kannst</h2>
          <p className="section-subtitle">
            Zwei sehr verschiedene Aufgaben - beide von mir umgesetzt und bis heute betreut.
          </p>
          <div className="proof-grid">
            <article className="proof-item">
              <Image
                className="proof-image"
                src="/images/juro-fotografie.webp"
                alt="Website-Vorschau von juro-fotografie.de"
                width={2880}
                height={1800}
              />
              <div className="proof-body">
                <p className="proof-place ui">Fotografie</p>
                <h3>juro-fotografie.de</h3>
                <p>Portfolio-Website mit klarer Bildsprache und schneller Navigation.</p>
                <a className="proof-link" href="https://juro-fotografie.de" target="_blank" rel="noopener noreferrer">
                  Website ansehen<span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </div>
            </article>
            <article className="proof-item">
              <Image
                className="proof-image"
                src="/images/grundschule-spreenhagen.webp"
                alt="Website-Vorschau von grundschule-spreenhagen.de"
                width={2880}
                height={1800}
              />
              <div className="proof-body">
                <p className="proof-place ui">Bildung · Spreenhagen</p>
                <h3>grundschule-spreenhagen.de</h3>
                <p>Informations-Website mit übersichtlicher Struktur für Eltern, Kinder und Lehrkräfte.</p>
                <a className="proof-link" href="https://grundschule-spreenhagen.de" target="_blank" rel="noopener noreferrer">
                  Website ansehen<span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </div>
            </article>
          </div>
          <div className="btn-row" style={{ marginTop: 'var(--space-2)' }}>
            <Link className="btn btn-quiet" href="/portfolio">Alle Projekte ansehen</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2 className="card-title">Offene Fragen zu Kosten, Laufzeit und Ablauf?</h2>
          <p className="section-subtitle">
            Im FAQ stehen die Antworten - inklusive Laufzeit, Kündigungsfrist, Care Coins und Betreuung.
          </p>
          <div className="btn-row">
            <Link className="btn btn-quiet" href="/faq">FAQ ansehen</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-banner">
          <h2>Lass uns über deine neue Website sprechen</h2>
          <p>
            In 20 Minuten klären wir, was deine Website leisten soll und was das
            kostet - unverbindlich, ohne Verkaufsdruck.
          </p>
          <p>
            Du sprichst direkt mit der Person, die deine Website baut und betreut.
            Klare Absprachen, Antwort in der Regel innerhalb eines Werktags.
          </p>
          <div className="btn-row cta-actions">
            <Link className="btn btn-accent" href="/kontakt">Kostenloses Gespräch anfragen</Link>
            <a className="btn btn-quiet" href="tel:+491756240804">Lieber anrufen: +49 175 624 0804</a>
          </div>
        </div>
      </section>
    </main>
  );
}
