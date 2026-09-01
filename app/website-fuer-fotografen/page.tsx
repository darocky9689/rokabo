import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLdScript } from '@/components/seo/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, faqSchema } from '@/lib/seo/schema';

export const metadata: Metadata = buildPageMetadata({
  title: 'Website für Fotografen und Kreative',
  description:
    'Website im Abo für Fotografinnen und Kreative: Arbeiten zeigen, Anfragen bekommen, schnell laden trotz großer Bilder. Ab 79 € im Monat.',
  keyword: 'Website für Fotografen',
  path: '/website-fuer-fotografen'
});

const fragen = [
  {
    question: 'Ich habe doch Instagram. Reicht das nicht?',
    answer:
      'Instagram zeigt deine Arbeiten, gehört dir aber nicht. Du bestimmst weder die Reihenfolge noch, wer es sieht, und du kannst niemanden von dort abholen, der deinen Namen googelt. Beides zusammen funktioniert am besten: Instagram für Reichweite, die eigene Seite für Anfragen.'
  },
  {
    question: 'Meine Bilder sind riesig. Wird die Seite dann langsam?',
    answer:
      'Nicht, wenn sie richtig eingebunden sind. Bilder werden in mehreren Größen ausgeliefert, das Handy bekommt eine andere Datei als der große Bildschirm, und geladen wird erst, was gerade sichtbar ist. Die Qualität bleibt, das Gewicht nicht.'
  },
  {
    question: 'Kann ich Galerien selbst austauschen?',
    answer:
      'Auf Wunsch ja - dann bekommst du ein Redaktionssystem, in dem du Bilder tauschst. Die meisten lassen es lieber machen: kurz die neuen Dateien schicken, das läuft über deine Care Coins.'
  },
  {
    question: 'Sollen Preise auf die Seite?',
    answer:
      'Meistens ja, mindestens als Rahmen. Anfragen ohne Preisvorstellung kosten dich Zeit für Gespräche, die zu nichts führen. Ein Einstiegspreis pro Paket filtert vor, ohne dich festzulegen.'
  },
  {
    question: 'Was ist mit Bildrechten und Modellverträgen?',
    answer:
      'Das bleibt deine Sache - rokabo baut die Seite, entscheidet aber nicht, welche Bilder darauf dürfen. Im Impressum und in der Datenschutzerklärung ist alles Nötige vorbereitet.'
  }
];

export default function FotografenPage() {
  return (
    <main id="main-content">
      <JsonLdScript
        id="breadcrumb-schema"
        schema={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Website für Fotografen und Kreative', path: '/website-fuer-fotografen' }
        ])}
      />
      <JsonLdScript id="faq-fotografen" schema={faqSchema(fragen)} />

      <section className="section">
        <div className="container">
          <h1 className="section-title">Website für Fotografen und Kreative</h1>
          <p className="section-subtitle">
            Deine Arbeiten sollen wirken, und wer sie sieht, soll dich buchen können.
            rokabo baut die Seite, hält sie schnell und kümmert sich um Technik und
            Sichtbarkeit - damit du fotografierst statt Plugins zu aktualisieren.
          </p>
          <div className="btn-row">
            <Link className="btn btn-accent" href="/kontakt">Kostenloses Erstgespräch</Link>
            <a className="btn btn-quiet" href="https://juro-fotografie.de" target="_blank" rel="noopener noreferrer">
              Beispiel ansehen<span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section section-band">
        <div className="container">
          <h2 className="section-title">Der Unterschied zwischen Zeigen und Gebuchtwerden</h2>
          <p className="section-subtitle">
            Die meisten Kreativen haben kein Sichtbarkeitsproblem, sondern ein
            Abschlussproblem: Die Arbeiten sind gut, aber der Weg zur Anfrage fehlt.
          </p>
          <div className="grid grid-2">
            <article className="card">
              <h3>Woran es meistens hakt</h3>
              <ul className="check-list">
                <li>Alles liegt auf Instagram - und verschwindet nach drei Tagen</li>
                <li>Die alte Seite lädt sekundenlang, weil Bilder unbearbeitet drin liegen</li>
                <li>Auf dem Handy passt die Galerie nicht, obwohl dort die meisten schauen</li>
                <li>Keine Preisorientierung, deshalb Anfragen ohne Budget</li>
              </ul>
            </article>
            <article className="card">
              <h3>Worauf rokabo achtet</h3>
              <ul className="check-list">
                <li>Bilder in mehreren Größen, geladen erst wenn sichtbar</li>
                <li>Galerien, die auf dem Handy zuerst funktionieren</li>
                <li>Ein Anfrageweg, der Datum, Ort und Anlass gleich mitfragt</li>
                <li>Preisrahmen sichtbar, damit die Gespräche passen</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Schon live</h2>
          <p className="section-subtitle">
            juro-fotografie.de - gebaut und bis heute betreut. Klare Bildsprache, schnelle
            Navigation, nichts, was von den Arbeiten ablenkt.
          </p>
          <div className="proof-grid">
            <article className="proof-item">
              <Image
                className="proof-image"
                src="/images/juro-fotografie.webp"
                alt="Vorschau von juro-fotografie.de"
                width={2880}
                height={1800}
              />
              <div className="proof-body">
                <h3>juro-fotografie.de</h3>
                <p>
                  Portfolio für Fotografie. Die Startseite zeigt Arbeiten statt Text, der
                  Weg zur Anfrage ist von jeder Stelle aus zwei Klicks entfernt.
                </p>
                <a className="proof-link" href="https://juro-fotografie.de" target="_blank" rel="noopener noreferrer">
                  Seite ansehen<span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-band">
        <div className="container">
          <h2 className="section-title">Empfohlen: Professional, ab 79 € im Monat</h2>
          <p className="section-subtitle">
            Bis zu fünf Seiten reichen für die meisten: Start, Portfolio, Über mich,
            Preise und Kontakt. Wer mehrere Genres trennen will, ist bei Premium richtig.
          </p>
          <div className="grid grid-2">
            <article className="card">
              <h3>Was enthalten ist</h3>
              <ul className="check-list">
                <li>Bis zu 5 Seiten, Galerien nach deinen Genres sortiert</li>
                <li>SEO erweitert, auch auf deinen Namen als Suchbegriff</li>
                <li>6 <Link className="inline-link" href="/faq#care-coins">Care Coins</Link> im Jahr, etwa für neue Arbeiten</li>
                <li>Hosting, Updates und Sicherheit inklusive</li>
              </ul>
            </article>
            <article className="card">
              <h3>Wenn es größer wird</h3>
              <p className="muted">
                Premium ab 119 € im Monat: bis zu 10 Seiten und 12 Care Coins - sinnvoll,
                wenn Hochzeit, Portrait und Business je eine eigene Seite mit eigener
                Ansprache bekommen sollen.
              </p>
              <Link className="btn btn-quiet" href="/preise">Alle Pakete vergleichen</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Was Kreative vorher fragen</h2>
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
          <h2>Zeig mir, was du machst</h2>
          <p>
            Im Erstgespräch schauen wir uns deine Arbeiten an und klären, welche Seiten du
            wirklich brauchst. Zwanzig Minuten, unverbindlich, danach ein Angebot innerhalb
            von zwei Werktagen.
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
