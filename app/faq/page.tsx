import type { Metadata } from 'next';
import Link from 'next/link';

const faqs = [
  {
    id: 'care-coins',
    question: 'Was sind Care Coins?',
    answer:
      'Care Coins sind dein Kontingent für kleine Änderungen an deiner Website. Zum Beispiel Texte anpassen, Bilder tauschen oder kleine Layout-Updates. Je nach Paket sind Care Coins bereits enthalten.'
  },
  {
    id: 'zielgruppe',
    question: 'Für wen ist rokabo geeignet?',
    answer:
      'Für kleine Unternehmen, lokale Dienstleister und Gründer, die online professionell auftreten und mehr Anfragen gewinnen wollen.'
  },
  {
    id: 'kosten',
    question: 'Was kostet eine Website im Abo?',
    answer:
      'Du wählst ein Paket mit festen Monatskosten. Alle Preise und Leistungen findest du auf unserer Preisseite.'
  },
  {
    id: 'setup',
    question: 'Gibt es eine einmalige Setup-Gebühr?',
    answer:
      'Je nach Paket kann eine einmalige Einrichtungsgebühr anfallen. Das klären wir klar und transparent im Erstgespräch.'
  },
  {
    id: 'dauer',
    question: 'Wie lange dauert die Umsetzung?',
    answer:
      'Meist 2 bis 4 Wochen. Es hängt davon ab, wie groß das Projekt ist und wie schnell Texte, Bilder und Freigaben vorliegen.'
  },
  {
    id: 'aenderungen',
    question: 'Kann ich später Inhalte ändern lassen?',
    answer:
      'Ja. Laufende Änderungen sind Teil unserer Betreuung. So bleibt deine Website immer aktuell.'
  },
  {
    id: 'hosting',
    question: 'Ist Hosting und Sicherheit inklusive?',
    answer:
      'Ja. Hosting, Updates, Wartung und Sicherheit sind inklusive.'
  },
  {
    id: 'wordpress-nextjs',
    question: 'Arbeitet ihr nur mit WordPress?',
    answer:
      'Nein. Wir arbeiten mit WordPress oder entwickeln individuell, wenn dein Projekt mehr Funktionen oder mehr Flexibilität braucht.'
  },
  {
    id: 'laufzeit',
    question: 'Kündigungsfrist und Vertragslaufzeit?',
    answer:
      'Das hängt vom Paket ab. Alle Laufzeiten und Fristen bekommst du vor Vertragsstart klar genannt.'
  },
  {
    id: 'start',
    question: 'Wie starte ich mit rokabo?',
    answer:
      'Buche ein kostenloses Erstgespräch. Wir klären dein Ziel und empfehlen dir das passende Paket.'
  }
];

export const metadata: Metadata = {
  title: 'FAQ | rokabo',
  description:
    'FAQ zu deiner Website im Abo: klare Antworten zu Preisen, Laufzeit, Leistungen und Betreuung.',
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
            Hier findest du kurze und klare Antworten zu unserem Website-Abo.
            Wenn etwas offen ist, melde dich direkt bei uns.
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
            <p className="muted">Wir beraten dich kostenlos und zeigen dir, wie du mit deiner Website mehr Anfragen bekommst.</p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/kontakt">Kostenloses Erstgespräch buchen</Link>
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
