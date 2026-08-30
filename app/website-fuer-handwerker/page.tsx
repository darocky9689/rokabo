import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLdScript } from '@/components/seo/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { faqSchema } from '@/lib/seo/schema';

export const metadata: Metadata = buildPageMetadata({
  title: 'Website für Handwerksbetriebe',
  description:
    'Website im Abo für Handwerksbetriebe: gebaut, betreut und bei Google auffindbar. Ab 79 € im Monat, ohne hohe Einmalzahlung.',
  keyword: 'Website für Handwerker',
  path: '/website-fuer-handwerker'
});

const fragen = [
  {
    question: 'Wie viel Zeit kostet mich das?',
    answer:
      'Ein Gespräch von 20 Minuten, danach etwa eine Stunde für Fotos und Angaben zu deinen Leistungen. Texte formuliert rokabo, du liest sie gegen. Wer keine Fotos hat, bekommt eine Seite, die auch ohne funktioniert.'
  },
  {
    question: 'Ich habe keine Zeit, die Seite zu pflegen.',
    answer:
      'Musst du auch nicht. Öffnungszeiten ändern, ein Projekt ergänzen, den Notdienst-Hinweis anpassen: kurz Bescheid geben, das läuft über deine Care Coins. Technik, Updates und Sicherheit sind ohnehin enthalten.'
  },
  {
    question: 'Bringt das wirklich Aufträge?',
    answer:
      'Eine Website ersetzt keine Empfehlung. Sie sorgt dafür, dass jemand, der deinen Namen hört oder nach deinem Gewerk sucht, dich findet und erreicht - statt bei einem Portal zu landen, das dich als Lead weiterverkauft.'
  },
  {
    question: 'Was ist mit Bewertungsportalen und Branchenbüchern?',
    answer:
      'Die kosten monatlich und gehören dir nicht. Deine eigene Website gehört dir, samt Domain - auch wenn du das Abo irgendwann beendest.'
  },
  {
    question: 'Wir suchen auch Azubis. Geht das mit auf die Seite?',
    answer:
      'Ja, und das lohnt sich meist schneller als der Auftragsteil. Eine ehrliche Seite über den Betrieb ist für Bewerber oft der einzige Eindruck, den sie vorher bekommen.'
  }
];

export default function HandwerkerPage() {
  return (
    <main id="main-content">
      <JsonLdScript id="faq-handwerker" schema={faqSchema(fragen)} />

      <section className="section">
        <div className="container">
          <h1 className="section-title">Website für Handwerksbetriebe</h1>
          <p className="section-subtitle">
            Wer dich sucht, soll dich finden - und dann anrufen können. rokabo baut die
            Seite, hält sie aktuell und kümmert sich um Technik, Hosting und Sichtbarkeit.
            Du machst weiter deine Arbeit.
          </p>
          <div className="btn-row">
            <Link className="btn btn-accent" href="/kontakt">Kostenloses Erstgespräch</Link>
            <a className="btn btn-quiet" href="https://muster.rokabo.de/" target="_blank" rel="noopener noreferrer">
              Beispiel ansehen<span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section section-band">
        <div className="container">
          <h2 className="section-title">Das Problem ist selten die Website</h2>
          <p className="section-subtitle">
            Die meisten Betriebe, mit denen rokabo spricht, haben genug Arbeit. Sie haben
            ein anderes Problem: Sie kommen im Netz nicht vor.
          </p>
          <div className="grid grid-2">
            <article className="card">
              <h3>Was heute passiert</h3>
              <ul className="check-list">
                <li>Jemand hört deinen Namen, sucht ihn - und findet nichts</li>
                <li>Ein Facebook-Profil von 2019 ist der erste Treffer</li>
                <li>Portale ranken vor dir und verkaufen dir deine eigenen Anfragen als Lead</li>
                <li>Bewerber sehen nichts, was sie überzeugt</li>
              </ul>
            </article>
            <article className="card">
              <h3>Was sich ändert</h3>
              <ul className="check-list">
                <li>Deine Leistungen stehen da, in deiner Sprache</li>
                <li>Telefonnummer immer sichtbar, ein Tipp genügt</li>
                <li>Google findet dich unter deinem Gewerk und deinem Ort</li>
                <li>Eine Seite über den Betrieb, die Bewerber ernst nimmt</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">So sieht das aus</h2>
          <p className="section-subtitle">
            Ein Musterprojekt für einen Elektrobetrieb - vier Seiten, gebaut ohne
            Fotomaterial. Du kannst es dir in Ruhe ansehen, bevor wir sprechen.
          </p>
          <div className="proof-grid">
            <article className="proof-item">
              <Image
                className="proof-image"
                src="/images/muster-elektro.png"
                alt="Vorschau der Musterwebsite für einen Elektrobetrieb"
                width={2880}
                height={1800}
              />
              <div className="proof-body">
                <p className="proof-place ui">Musterprojekt</p>
                <h3>Elektro Musterhand</h3>
                <p>
                  Leistungen, Ablauf, Notdienst und Kontakt. Der Notdienst-Kasten steht
                  ganz oben, weil dort die dringenden Anrufe herkommen.
                </p>
                <a className="proof-link" href="https://muster.rokabo.de/" target="_blank" rel="noopener noreferrer">
                  Muster ansehen<span className="sr-only"> (öffnet in neuem Tab)</span>
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
            Für die meisten Handwerksbetriebe die richtige Größe: bis zu fünf Seiten -
            Start, Leistungen, Betrieb, Kontakt und eine Seite, die du frei belegst.
          </p>
          <div className="grid grid-2">
            <article className="card">
              <h3>Was enthalten ist</h3>
              <ul className="check-list">
                <li>Bis zu 5 Seiten, auf deinen Betrieb zugeschnitten</li>
                <li>SEO erweitert: dein Gewerk, dein Ort, deine Leistungen</li>
                <li>6 <Link className="inline-link" href="/faq#care-coins">Care Coins</Link> im Jahr für Änderungen</li>
                <li>Hosting, Updates und Sicherheit inklusive</li>
              </ul>
            </article>
            <article className="card">
              <h3>Was es nicht kostet</h3>
              <p className="muted">
                Keine Einmalzahlung über Tausende zum Start. Du zahlst monatlich, 12 Monate
                feste Betreuung, danach 3 Monate Kündigungsfrist. Domain und Inhalte gehören
                dir - auch danach.
              </p>
              <Link className="btn btn-quiet" href="/preise">Alle Pakete vergleichen</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Was Betriebe vorher fragen</h2>
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
          <h2>Zwanzig Minuten, dann weißt du, woran du bist</h2>
          <p>
            Im Erstgespräch klären wir, was die Seite leisten soll und was sie kostet.
            Danach bekommst du innerhalb von zwei Werktagen ein Angebot - oder den
            ehrlichen Hinweis, dass rokabo nicht das Richtige ist.
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
