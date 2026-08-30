import type { Metadata } from 'next';
import Link from 'next/link';

const faqs = [
  {
    id: 'ablauf',
    question: 'Wie läuft ein Projekt mit rokabo ab?',
    answer:
      'In vier Schritten: Erstgespräch, Planung und Design, Entwicklung, Go-Live und Pflege. Nach dem Erstgespräch bekommst du innerhalb von zwei Werktagen ein Angebot.'
  },
  {
    id: 'care-coins',
    question: 'Was sind Care Coins?',
    answer:
      'Ein Care Coin ist eine Änderung bis 30 Minuten: Text anpassen, Bild tauschen, Öffnungszeiten ändern, eine Kleinigkeit am Layout. Mehrere Wünsche zählen einzeln. Professional enthält 6 Coins pro Jahr, Premium 12; nicht genutzte Coins verfallen zum Jahresende. Größere Änderungen rechne ich vorher ab, damit es keine Überraschung gibt.'
  },
  {
    id: 'zielgruppe',
    question: 'Für wen ist rokabo geeignet?',
    answer:
      'Für alle, die niemanden im Haus haben, der sich um die Website kümmert: Handwerksbetriebe, Selbstständige und Kreative, Vereine und Einrichtungen. Deutschlandweit - wir sprechen per Telefon oder Video.'
  },
  {
    id: 'kosten',
    question: 'Was kostet eine Website im Abo?',
    answer:
      'Ab 49 € im Monat für eine Single Page, ab 79 € für bis zu fünf Seiten, ab 119 € für bis zu zehn. Alle Leistungen stehen auf der Preisseite.'
  },
  {
    id: 'setup',
    question: 'Gibt es eine einmalige Setup-Gebühr?',
    answer:
      'Je nach Umfang kann eine einmalige Einrichtungsgebühr anfallen. Falls ja, steht sie im Angebot - du erfährst sie vor der Entscheidung, nicht danach.'
  },
  {
    id: 'dauer',
    question: 'Wie lange dauert die Umsetzung?',
    answer:
      'Meist 2 bis 4 Wochen. Es hängt davon ab, wie groß das Projekt ist und wie schnell Texte, Bilder und Freigaben vorliegen.'
  },
  {
    id: 'mitarbeit',
    question: 'Was brauchst du von mir, damit es schnell geht?',
    answer:
      'Deine Ziele, ein paar Basisinformationen zu deinem Angebot und Rückmeldung auf die Entwürfe. Wenn Texte oder Bilder fehlen, helfe ich bei Struktur und Formulierung.'
  },
  {
    id: 'aenderungen',
    question: 'Kann ich später Inhalte ändern lassen?',
    answer:
      'Ja. Kleine Änderungen laufen über deine Care Coins, größere bespreche ich vorher mit dir. Die Seite bleibt aktuell, ohne dass du selbst etwas tun musst.'
  },
  {
    id: 'seo-paket',
    question: 'Ab welchem Paket ist SEO enthalten?',
    answer:
      'Ab Starter. Starter bringt SEO Basis mit, Professional geht deutlich weiter, Premium am weitesten. Reines Mail-Hosting ohne Website enthält kein SEO.'
  },
  {
    id: 'hosting',
    question: 'Ist Hosting und Sicherheit inklusive?',
    answer:
      'Ja, in jedem Website-Paket. Hosting, Updates, Wartung und Sicherheit sind enthalten - ohne Zusatzrechnung.'
  },
  {
    id: 'email-domain',
    question: 'Kümmerst du dich auch um E-Mail und Domain?',
    answer:
      'Ja. Ich richte Postfächer mit deiner eigenen Domain ein und übernehme die technische Verwaltung - weg von gmail.com oder web.de. Das gibt es auch ohne Website ab 15 € im Monat.'
  },
  {
    id: 'paketwechsel',
    question: 'Kann ich später in ein größeres Paket wechseln?',
    answer:
      'Ja, nach oben jederzeit. Was klein anfängt, wird erweitert statt neu gebaut.'
  },
  {
    id: 'wordpress-nextjs',
    question: 'Arbeitest du nur mit WordPress?',
    answer:
      'Nein. WordPress, wenn du selbst Inhalte pflegen willst; eine individuelle Umsetzung, wenn Tempo und Flexibilität wichtiger sind. Ich entscheide das nicht nach Vorliebe, sondern nach deinem Fall.'
  },
  {
    id: 'laufzeit',
    question: 'Kündigungsfrist und Vertragslaufzeit?',
    answer:
      '12 Monate feste Betreuung, danach läuft der Vertrag weiter und ist mit 3 Monaten Frist kündbar. Domain und Inhalte gehören dir - auch danach.'
  },
  {
    id: 'start',
    question: 'Wie starte ich mit rokabo?',
    answer:
      'Frag ein kostenloses Erstgespräch an. Wir klären in 20 Minuten dein Ziel, danach bekommst du innerhalb von zwei Werktagen ein Angebot.'
  }
];

export const metadata: Metadata = {
  title: 'FAQ | rokabo',
  description:
    'Antworten zur Website im Abo: Preise, Laufzeit, Care Coins, SEO und Betreuung - kurz und ohne Kleingedrucktes.',
  alternates: { canonical: '/faq' }
};

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <main id="main-content">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Häufige Fragen (FAQ)</h1>
          <p className="section-subtitle">
            Kurze, klare Antworten zum Website-Abo. Wenn etwas offen bleibt,
            melde dich direkt - ich antworte in der Regel innerhalb eines Werktags.
          </p>

          <div className="faq-list" aria-label="Häufige Fragen und Antworten">
            {faqs.map((item) => (
              <details className="faq-item" key={item.question} id={item.id}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>

          <div className="card" style={{ marginTop: '1rem' }}>
            <h2 className="section-title" style={{ fontSize: '1.3rem' }}>Noch offene Fragen?</h2>
            <p className="muted">Frag einfach. Das Erstgespräch kostet nichts und verpflichtet zu nichts.</p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/kontakt">Kostenloses Erstgespräch anfragen</Link>
              <Link className="btn btn-secondary" href="/preise">Preise ansehen</Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
