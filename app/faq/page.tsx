import type { Metadata } from 'next';
import { JsonLdScript } from '@/components/seo/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, faqSchema } from '@/lib/seo/schema';
import Link from 'next/link';

const faqs = [
  {
    id: 'care-coins',
    question: 'Was sind Care Coins?',
    answer:
      'Care Coins sind dein monatliches oder jährliches Änderungskontingent für kleine Website-Anpassungen. Dazu zählen zum Beispiel Textänderungen, Bildaustausch oder kleinere Layout-Optimierungen. Je nach Paket sind bereits Care Coins enthalten.'
  },
  {
    id: 'zielgruppe',
    question: 'Für wen ist rokabo geeignet?',
    answer:
      'Für kleine Unternehmen, lokale Dienstleister und Gründer, die professionell sichtbar sein wollen, ohne hohe Einmal-Investition am Anfang.'
  },
  {
    id: 'kosten',
    question: 'Was kostet eine Website im Abo?',
    answer:
      'Du wählst ein monatliches Paket mit planbaren Kosten. Die genauen Leistungen und Preise findest du auf unserer Preisseite.'
  },
  {
    id: 'setup',
    question: 'Gibt es eine einmalige Setup-Gebühr?',
    answer:
      'Je nach Paket kann eine überschaubare Einrichtungsgebühr anfallen. Das besprechen wir transparent im Erstgespräch.'
  },
  {
    id: 'dauer',
    question: 'Wie lange dauert die Umsetzung?',
    answer:
      'In der Regel 2 bis 4 Wochen, abhängig vom Umfang und davon, wie schnell Inhalte wie Texte, Bilder und Freigaben vorliegen.'
  },
  {
    id: 'aenderungen',
    question: 'Kann ich später Inhalte ändern lassen?',
    answer:
      'Ja. Laufende Anpassungen sind Teil unseres Betreuungsmodells. So bleibt deine Website aktuell und leistungsfähig.'
  },
  {
    id: 'hosting',
    question: 'Ist Hosting und Sicherheit inklusive?',
    answer:
      'Ja. Hosting, Updates, technische Wartung und Sicherheitsmaßnahmen sind Bestandteil unserer Betreuung.'
  },
  {
    id: 'wordpress-nextjs',
    question: 'Arbeitet ihr nur mit WordPress?',
    answer:
      'Nein. Neben WordPress realisieren wir auch individuelle Websites mit Next.js und TypeScript, wenn dein Projekt mehr Flexibilität, Performance oder spezielle Funktionen benötigt.'
  },
  {
    id: 'laufzeit',
    question: 'Kündigungsfrist und Vertragslaufzeit?',
    answer:
      'Die genauen Bedingungen hängen vom gewählten Paket ab. Wir legen alle Laufzeiten und Fristen vor Vertragsstart offen.'
  },
  {
    id: 'start',
    question: 'Wie starte ich mit rokabo?',
    answer:
      'Über ein kostenloses Erstgespräch. Wir klären Ziele, Budget und empfehlen dir das passende Paket für dein Unternehmen.'
  }
];

export const metadata: Metadata = buildPageMetadata({
  title: 'FAQ zu Website im Abo und Betreuung | rokabo',
  description:
    'Häufige Fragen zu Websites im Abo: Kosten, Laufzeit, Leistungen, WordPress oder Next.js mit TypeScript, Umsetzung und Betreuung bei rokabo.',
  keyword: 'FAQ Website im Abo',
  path: '/faq'
});

export default function FaqPage() {
  const faqPageSchema = faqSchema(faqs.map((item) => ({ question: item.question, answer: item.answer })));
  const breadcrumb = breadcrumbSchema([
    { name: 'Start', path: '/' },
    { name: 'FAQ', path: '/faq' }
  ]);

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
              <details className="faq-item" key={item.question} id={item.id}>
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

      <JsonLdScript id="faq-schema" schema={faqPageSchema} />
      <JsonLdScript id="faq-breadcrumb-schema" schema={breadcrumb} />
    </main>
  );
}
