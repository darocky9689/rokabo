import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Kontakt | rokabo',
  description:
    'Kontaktiere uns für ein kostenloses Erstgespräch und finde das passende Website-Paket für dein Ziel.',
  alternates: { canonical: '/kontakt' }
};

export default function KontaktPage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <article className="form">
          <h1 className="section-title">Kostenloses Erstgespräch</h1>
          <p className="form-note">
            Erzähle uns kurz, was du erreichen willst.
            Wir melden uns meist innerhalb eines Werktags und zeigen dir, welches Paket am besten passt.
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
