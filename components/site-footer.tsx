import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2>rokabo</h2>
          <p>Websites im Abo - gebaut, betreut und dauerhaft aktuell. Für Betriebe, Selbstständige und Einrichtungen.</p>
        </div>
        <div>
          <h2>Seiten</h2>
          <ul className="footer-links">
            <li><Link href="/">Start</Link></li>
            <li><Link href="/leistungen">Leistungen</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/preise">Preise</Link></li>
            <li><Link href="/ratgeber">Ratgeber</Link></li>
            <li><Link href="/ueber-uns">Über rokabo</Link></li>
            <li><Link href="/kontakt">Kontakt</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h2>Kontakt & Rechtliches</h2>
          <ul className="footer-links">
            <li><a href="mailto:info@rokabo.de">info@rokabo.de</a></li>
            <li><a href="tel:+491756240804">+49 175 624 0804</a></li>
            <li><Link href="/impressum">Impressum</Link></li>
            <li><Link href="/datenschutz">Datenschutz</Link></li>
          </ul>
        </div>
      </div>
      <div className="container copyright">© {new Date().getFullYear()} rokabo. Alle Rechte vorbehalten.</div>
    </footer>
  );
}
