import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLdScript } from '@/components/seo/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { faqSchema } from '@/lib/seo/schema';

export const metadata: Metadata = buildPageMetadata({
  title: 'Schulwebsite für Schulen, Kitas und Vereine',
  description:
    'Schulwebsite im Abo: Eltern finden, was sie suchen, die Seite bleibt aktuell und ist an der BITV 2.0 ausgerichtet. Ab 119 € im Monat.',
  keyword: 'Schulwebsite',
  path: '/website-fuer-schulen'
});

const fragen = [
  {
    question: 'Wer pflegt die Seite, wenn keine Lehrkraft mehr Zeit hat?',
    answer:
      'rokabo. Genau daran scheitern die meisten Schulwebsites: Sie hängen an einer engagierten Person, und wenn die wechselt, steht die Seite still. Termine, Neuigkeiten und Elternbriefe schickt ihr kurz durch, eingepflegt wird es hier.'
  },
  {
    question: 'Ist die Seite barrierefrei?',
    answer:
      'Sie wird an den Anforderungen der BITV 2.0 ausgerichtet gebaut: ausreichende Kontraste, vollständige Bedienbarkeit mit der Tastatur, saubere Überschriftenstruktur für Screenreader, Alternativtexte für Bilder und lesbare Schriftgrößen. Eine förmliche Konformitätsprüfung durch eine Prüfstelle ist damit nicht abgedeckt - wenn euer Träger die verlangt, sagt es im Erstgespräch, dann klären wir das vorher.'
  },
  {
    question: 'Dürfen Fotos von Kindern auf die Website?',
    answer:
      'Nur mit Einwilligung der Erziehungsberechtigten, und die muss widerrufbar sein. Praktisch heißt das: wenige, gut ausgewählte Bilder, möglichst ohne erkennbare Gesichter, und ein geordneter Weg, ein Bild wieder herunterzunehmen. Die Entscheidung trefft ihr - der technische Weg dafür ist eingerichtet.'
  },
  {
    question: 'Wir haben einen Förderverein. Kann der eigene Seiten bekommen?',
    answer:
      'Ja. Förderverein, Ganztag, Mensa, Schulsozialarbeit - jeder Bereich kann eine eigene Seite mit eigener Ansprechperson bekommen. Dafür ist das Premium-Paket mit bis zu zehn Seiten gedacht.'
  },
  {
    question: 'Wie passt ein Monatsbeitrag zu unserem Haushalt?',
    answer:
      'Er ist planbar und über das Jahr gleich hoch, was Haushaltsplanung meist einfacher macht als eine große Einmalrechnung. Auf Wunsch gibt es eine Jahresrechnung statt monatlicher Abbuchung - sag im Gespräch Bescheid.'
  }
];

export default function SchulenPage() {
  return (
    <main id="main-content">
      <JsonLdScript id="faq-schulen" schema={faqSchema(fragen)} />

      <section className="section">
        <div className="container">
          <h1 className="section-title">Schulwebsite für Schulen, Kitas und Vereine</h1>
          <p className="section-subtitle">
            Eltern sollen finden, was sie suchen - Termine, Ansprechpartner, Formulare.
            Und die Seite soll noch aktuell sein, wenn die Kollegin, die sie aufgesetzt
            hat, längst an einer anderen Schule ist. Genau dafür gibt es das Abo.
          </p>
          <div className="btn-row">
            <Link className="btn btn-accent" href="/kontakt">Kostenloses Erstgespräch</Link>
            <a className="btn btn-quiet" href="https://grundschule-spreenhagen.de" target="_blank" rel="noopener noreferrer">
              Beispiel ansehen<span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section section-band">
        <div className="container">
          <h2 className="section-title">Warum Schulwebsites veralten</h2>
          <p className="section-subtitle">
            Nicht aus Nachlässigkeit. Sondern weil sie an einer Person hängen, die das
            neben dem Unterricht macht - und irgendwann keine Zeit mehr hat.
          </p>
          <div className="grid grid-2">
            <article className="card">
              <h3>Der übliche Verlauf</h3>
              <ul className="check-list">
                <li>Eine Lehrkraft baut die Seite in ihrer Freizeit auf</li>
                <li>Nach zwei Jahren stehen dort Termine aus dem letzten Schuljahr</li>
                <li>Eltern rufen an, weil sie das Formular nicht finden</li>
                <li>Niemand weiß mehr, wer die Zugangsdaten hat</li>
              </ul>
            </article>
            <article className="card">
              <h3>Was das Abo daran ändert</h3>
              <ul className="check-list">
                <li>Pflege liegt bei rokabo, nicht im Kollegium</li>
                <li>Termine und Neuigkeiten kurz durchgeben, Einpflegen inklusive</li>
                <li>Struktur, die Eltern führt statt sie suchen zu lassen</li>
                <li>Zugänge, Domain und Inhalte gehören dem Träger</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Barrierefreiheit gehört dazu</h2>
          <p className="section-subtitle">
            Öffentliche Stellen sind daran gebunden, und für eine Schulwebsite ist es
            ohnehin die richtige Grundhaltung: Was Eltern brauchen, müssen alle Eltern
            erreichen können.
          </p>
          <div className="grid grid-3">
            <article className="card">
              <h3>Sehen</h3>
              <p className="muted">
                Ausreichende Kontraste, lesbare Schriftgrößen, Alternativtexte für Bilder -
                damit Screenreader vorlesen können, was zu sehen ist.
              </p>
            </article>
            <article className="card">
              <h3>Bedienen</h3>
              <p className="muted">
                Alles vollständig mit der Tastatur erreichbar, sichtbare Fokusmarkierung,
                keine Falle, aus der man nicht mehr herauskommt.
              </p>
            </article>
            <article className="card">
              <h3>Verstehen</h3>
              <p className="muted">
                Saubere Überschriftenstruktur, klare Sprache, verständliche Linktexte
                statt „hier klicken“.
              </p>
            </article>
          </div>
          <p className="muted stack-top">
            Ausgerichtet an den Anforderungen der BITV 2.0. Eine förmliche
            Konformitätsprüfung durch eine externe Prüfstelle ist damit nicht abgedeckt -
            wenn euer Träger die verlangt, klären wir das vor dem Angebot.
          </p>
        </div>
      </section>

      <section className="section section-band">
        <div className="container">
          <h2 className="section-title">Schon live</h2>
          <div className="proof-grid">
            <article className="proof-item">
              <Image
                className="proof-image"
                src="/images/grundschule-spreenhagen.webp"
                alt="Vorschau von grundschule-spreenhagen.de"
                width={2880}
                height={1800}
              />
              <div className="proof-body">
                <p className="proof-place">Grundschule</p>
                <h3>grundschule-spreenhagen.de</h3>
                <p>
                  Informationsseite mit übersichtlicher Struktur für Eltern, Kinder und
                  Lehrkräfte - gebaut und bis heute betreut.
                </p>
                <a className="proof-link" href="https://grundschule-spreenhagen.de" target="_blank" rel="noopener noreferrer">
                  Seite ansehen<span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Empfohlen: Premium, ab 119 € im Monat</h2>
          <p className="section-subtitle">
            Schulen brauchen mehr Seiten als ein Betrieb: Schulleben, Termine, Kollegium,
            Ganztag, Mensa, Förderverein, Formulare, Kontakt.
          </p>
          <div className="grid grid-2">
            <article className="card">
              <h3>Was enthalten ist</h3>
              <ul className="check-list">
                <li>Bis zu 10 Seiten, je Bereich eine eigene Ansprechperson</li>
                <li>SEO stark - auch für Eltern, die nach dem Schulnamen suchen</li>
                <li>12 <Link className="inline-link" href="/faq#care-coins">Care Coins</Link> im Jahr für Termine und Neuigkeiten</li>
                <li>Hosting, Updates und Sicherheit inklusive</li>
              </ul>
            </article>
            <article className="card">
              <h3>Für kleinere Einrichtungen</h3>
              <p className="muted">
                Kitas und Vereine kommen oft mit Professional ab 79 € im Monat aus - bis
                zu fünf Seiten reichen, wenn es keine getrennten Bereiche gibt.
              </p>
              <Link className="btn btn-quiet" href="/preise">Alle Pakete vergleichen</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Was Schulen und Träger vorher fragen</h2>
          <div className="faq-list">
            {fragen.map((eintrag) => (
              <details className="faq-item" key={eintrag.question}>
                <summary>{eintrag.question}</summary>
                <p>{eintrag.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-banner">
          <h2>Sprechen wir über eure Seite</h2>
          <p>
            Zwanzig Minuten, unverbindlich. Danach ein Angebot innerhalb von zwei
            Werktagen, das ihr im Gremium vorlegen könnt.
          </p>
          <div className="btn-row cta-actions">
            <Link className="btn btn-accent" href="/kontakt">Kostenloses Erstgespräch</Link>
            <a className="btn btn-quiet" href="tel:+491756240804">Lieber anrufen: +49 175 624 0804</a>
          </div>
        </div>
      </section>
    </main>
  );
}
