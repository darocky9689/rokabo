import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Kontakt für dein Website-Projekt | rokabo',
  description:
    'Jetzt kostenloses Erstgespräch anfragen und das passende Website-Abo finden – von WordPress bis individuelle Next.js- und TypeScript-Lösung.',
  keyword: 'Kontakt Website Agentur',
  path: '/kontakt'
});

export default function KontaktPage() {
  return (
    <main id="main-content" className="section">
      <div className="container">
        <article className="form">
          <h1 className="section-title">Kostenloses Erstgespräch anfragen</h1>
          <p className="form-note">
            Wir melden uns in der Regel innerhalb eines Werktags zurück und beraten dich, ob WordPress oder eine
            individuelle Next.js- und TypeScript-Lösung besser zu deinem Vorhaben passt.
          </p>
          <ContactForm />
        </article>

        <aside className="card contact-aside" aria-label="Kontaktdaten">
          <h2 className="section-title">Direktkontakt</h2>
          <ul className="check-list">
            <li>E-Mail: <a href="mailto:info@rokabo.de">info@rokabo.de</a></li>
            <li>Telefon: <a href="tel:+491756240804">+49 175 624 0804</a></li>
            <li>Website: <a href="https://www.rokabo.de" target="_blank" rel="noopener noreferrer">www.rokabo.de</a></li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
