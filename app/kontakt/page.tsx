import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = buildPageMetadata({
  title: 'Kontakt: kostenloses Erstgespräch',
  description:
    'Kostenloses Erstgespräch anfragen: 20 Minuten, unverbindlich, Angebot innerhalb von zwei Werktagen.',
  keyword: 'Erstgespräch',
  path: '/kontakt'
});

export default function KontaktPage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <article className="form">
          <h1 className="section-title">Kostenloses Erstgespräch</h1>
          <p className="form-note">
            Erzähl kurz, was du erreichen willst. Du bekommst in der Regel innerhalb eines
            Werktags eine Antwort - mit einer Empfehlung, welches Paket passt, oder dem
            ehrlichen Hinweis, dass rokabo nicht das Richtige für dein Vorhaben ist.
          </p>
          <ContactForm />
        </article>

        <aside className="card contact-aside" aria-label="Kontaktdaten">
          <h2 className="section-title">Direktkontakt</h2>
          <ul className="check-list">
            <li>E-Mail: <a href="mailto:info@rokabo.de">info@rokabo.de</a></li>
            <li>Telefon: <a href="tel:+491756240804">+49 175 624 0804</a></li>
            <li>Website: <a href="https://www.rokabo.de" target="_blank" rel="noopener noreferrer">rokabo.de</a></li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
