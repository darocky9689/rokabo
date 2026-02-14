import type { Metadata } from 'next';
import Link from 'next/link';

const faqs = [
  {
    question: 'Für wen ist rokabo geeignet?',
    answer:
      'Für kleine Unternehmen, lokale Dienstleister und Gründer, die professionell sichtbar sein wollen, ohne hohe Einmal-Investition am Anfang.'
  },
  {
    question: 'Was kostet eine Website im Abo?',
    answer:
      'Du wählst ein monatliches Paket mit planbaren Kosten. Die genauen Leistungen und Preise findest du auf unserer Preisseite.'
  },
  {
    question: 'Gibt es eine einmalige Setup-Gebühr?',
    answer:
      'Je nach Paket kann eine überschaubare Einrichtungsgebühr anfallen. Das besprechen wir transparent im Erstgespräch.'
  },
  {
    question: 'Wie lange dauert die Umsetzung?',
    answer:
      'In der Regel 2 bis 4 Wochen, abhängig vom Umfang und davon, wie schnell Inhalte wie Texte, Bilder und Freigaben vorliegen.'
  },
  {
    question: 'Kann ich später Inhalte ändern lassen?',
    answer:
      'Ja. Laufende Anpassungen sind Teil unseres Betreuungsmodells. So bleibt deine Website aktuell und leistungsfähig.'
  },
  {
    question: 'Ist Hosting und Sicherheit inklusive?',
    answer:
      'Ja. Hosting, Updates, technische Wartung und Sicherheitsmaßnahmen sind Bestandteil unserer Betreuung.'
  },
  {
    question: 'Kündigungsfrist und Vertragslaufzeit?',
    answer:
      'Die genauen Bedingungen hängen vom gewählten Paket ab. Wir legen alle Laufzeiten und Fristen vor Vertragsstart offen.'
  },
  {
    question: 'Wie starte ich mit rokabo?',
    answer:
      'Über ein kostenloses Erstgespräch. Wir klären Ziele, Budget und empfehlen dir das passende Paket für dein Unternehmen.'
  }
];

export const metadata: Metadata = {
  title: 'FAQ | rokabo',
  description:
    'Häufige Fragen zu Websites im Abo: Kosten, Laufzeit, Leistungen, Umsetzung und Betreuung bei rokabo.',
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
            Hier findest du schnelle Antworten rund um unser Website-Abo. Wenn deine Frage nicht dabei ist,
            melde dich direkt bei uns.
          </p>

          <div className="faq-list" aria-label="Häufige Fragen und Antworten">
            {faqs.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>

          <div className="card" style={{ marginTop: '1rem' }}>
            <h2 className="section-title" style={{ fontSize: '1.3rem' }}>Noch offene Fragen?</h2>
            <p className="muted">Wir beraten dich kostenlos und zeigen dir, welches Paket für dein Unternehmen passt.</p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/kontakt">Kostenloses Erstgespräch sichern</Link>
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
