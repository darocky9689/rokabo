import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import Image from 'next/image';
import Link from 'next/link';
import ProcessTimeline from '@/components/process-timeline';
import HeroVisual from '@/components/hero-visual';

export const metadata: Metadata = buildPageMetadata({
  title: 'rokabo | Eine Website, um die sich jemand kümmert',
  description:
    'Website im Abo: rokabo baut deine Website, hält sie aktuell und ist erreichbar, wenn etwas ist. Fester Monatsbeitrag statt hoher Einmalzahlung.',
  keyword: 'Website im Abo',
  path: '/'
});

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <h1>Deine Website, im Abo. Gebaut, betreut, immer aktuell.</h1>
            <p>
              Rokabo baut deine Website, bringt sie online und pflegt sie danach
              weiter. Kein Vorschuss in vierstelliger Höhe, keine Technik-Baustelle,
              kein Baukasten, den am Ende doch niemand anfasst. Ein fester Betrag im
              Monat, und rokabo kümmert sich um den Rest.
            </p>
            <div className="btn-row">
              <Link className="btn btn-accent" href="/kontakt">Kostenloses Angebot in 2 Werktagen</Link>
              <Link className="btn btn-quiet" href="/preise">Pakete ansehen</Link>
            </div>
          </div>
          <aside className="hero-card" aria-label="Vorteile auf einen Blick">
            <HeroVisual />
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

      <section className="section">
        <div className="container card">
          <h2 className="card-title">
            Websites scheitern selten an der Idee. Sie scheitern am Danach.
          </h2>
          <p className="muted">
            Die meisten schlechten Erfahrungen mit einer Website fangen nicht schlecht an.
            Da war ein Baukasten, der am Anfang machbar wirkte, dann aber doch zu kompliziert
            war. Da war eine Agentur mit einem Angebot voller Begriffe, die niemand erklärt
            hat. Da war eine Website, die halbfertig liegen blieb, weil plötzlich niemand
            mehr Zeit dafür hatte.
          </p>
          <p className="muted">
            Rokabo macht das anders. Du bekommst eine fertige, professionelle Website, ohne
            dass du dich mit Technik, Design oder Text beschäftigen musst. Dafür zahlst du
            einen festen Betrag im Monat, keinen großen Betrag auf einmal. Was danach
            passiert, macht rokabo: hosten, pflegen, aktualisieren. Du musst dich um nichts
            kümmern.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Darum ist das Abo der bessere Weg</h2>
          <div className="grid grid-3">
            <article className="card">
              <h3>Kein großer Betrag auf einmal</h3>
              <p className="muted">
                Statt eines vierstelligen Rechnungsbetrags am Anfang zahlst du einen festen
                Betrag im Monat. Planbar, ohne Überraschung, ohne dass du erst sparen musst,
                bevor du überhaupt online gehst.
              </p>
            </article>
            <article className="card">
              <h3>Rokabo übernimmt Technik und Pflege</h3>
              <p className="muted">
                Hosting, Updates, Sicherheit. Das läuft im Hintergrund, ohne dass du dich
                einlesen oder etwas selbst einstellen musst. Wenn sich etwas ändern muss,
                kümmert sich rokabo darum.
              </p>
            </article>
            <article className="card">
              <h3>Kein Baukasten, den du selbst bedienen musst</h3>
              <p className="muted">
                Du musst kein Werkzeug lernen und keine Vorlage anpassen. Rokabo baut die
                Website für dich und meldet sich, wenn etwas gebraucht wird. Der Rest ist
                nicht dein Job.
              </p>
            </article>
            <article className="card">
              <h3>Klar von Anfang an</h3>
              <p className="muted">
                Du weißt vorher, was es kostet und was du bekommst. Ein Angebot liegt
                innerhalb von zwei Werktagen vor, ohne Fachchinesisch und ohne
                Kleingedrucktes, das erst später auffällt.
              </p>
            </article>
            <article className="card">
              <h3>Änderungen sind eingeplant, nicht extra</h3>
              <p className="muted">
                Deine Website bleibt nicht stehen, sobald sie online ist. Kleinere
                Änderungen sind über die Care Coins im Abo bereits eingerechnet, größere
                werden vorher abgesprochen.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="trust-strip">
            <p>
              <strong>12 Monate feste Betreuung</strong>
              danach 3 Monate Kündigungsfrist.
            </p>
            <p>
              <strong>Keine hohe Einmalzahlung</strong>
              Du startest mit der Monatsrate, nicht mit einer Rechnung über Tausende.
            </p>
            <p>
              <strong>Hosting, Sicherheit und Updates inklusive</strong>
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
            Beides gibt es bei rokabo - mit demselben Anspruch: sauber umgesetzt, schnell geladen,
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

      <section className="section-tight">
        <div className="container">
          <h2 className="section-title section-title-sm">Wo startest du?</h2>
          <p className="section-subtitle">
            Drei Ausgangslagen, drei Wege. Such dir den aus, der zu dir passt.
          </p>
          <div className="segment-grid">
            <Link className="segment-card" href="/website-fuer-handwerker">
              <h3>Handwerk und Bau</h3>
              <p>Wer dich sucht, soll dich finden - und anrufen können.</p>
              <span className="segment-card-cta">Weg für Handwerk und Bau</span>
            </Link>
            <Link className="segment-card" href="/website-fuer-fotografen">
              <h3>Fotografie und Kreative</h3>
              <p>Arbeiten, die wirken - und ein Weg zur Anfrage, der nicht fehlt.</p>
              <span className="segment-card-cta">Weg für Fotografie und Kreative</span>
            </Link>
            <Link className="segment-card" href="/website-fuer-schulen">
              <h3>Schulen, Kitas und Vereine</h3>
              <p>Termine und Formulare, aktuell - auch ohne die eine Person, die sich kümmert.</p>
              <span className="segment-card-cta">Weg für Schulen, Kitas und Vereine</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-band">
        <div className="container">
          <h2 className="section-title">Schon live: Websites, die du dir ansehen kannst</h2>
          <p className="section-subtitle">
            Zwei sehr verschiedene Aufgaben - beide von rokabo umgesetzt und bis heute betreut.
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
                <p className="proof-place">Fotografie</p>
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
                <p className="proof-place">Bildung · Spreenhagen</p>
                <h3>grundschule-spreenhagen.de</h3>
                <p>Informations-Website mit übersichtlicher Struktur für Eltern, Kinder und Lehrkräfte.</p>
                <a className="proof-link" href="https://grundschule-spreenhagen.de" target="_blank" rel="noopener noreferrer">
                  Website ansehen<span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </div>
            </article>
          </div>
          <div className="btn-row btn-row-spaced">
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
