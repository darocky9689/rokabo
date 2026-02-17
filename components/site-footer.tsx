import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>rokabo</h3>
          <p>Websites im Abo für kleine Unternehmen, lokale Dienstleister und Gründer.</p>
        </div>
        <div>
          <h3>Seiten</h3>
          <ul className="footer-links">
            <li><Link href="/">Start</Link></li>
            <li><Link href="/leistungen">Leistungen</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/preise">Preise</Link></li>
            <li><Link href="/ueber-uns">Über uns</Link></li>
            <li><Link href="/kontakt">Kontakt</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3>Kontakt & Rechtliches</h3>
          <ul className="footer-links">
            <li><a href="mailto:info@rokabo.de">info@rokabo.de</a></li>
            <li><a href="tel:+491756240804">+49 175 624 0804</a></li>
            <li><Link href="/impressum">Impressum</Link></li>
            <li><Link href="/datenschutz">Datenschutz</Link></li>
          </ul>
        </div>
      </div>
      <div className="container copyright">© 2026 rokabo. Alle Rechte vorbehalten.</div>
    </footer>
  );
}
