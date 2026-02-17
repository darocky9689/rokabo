import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="section">
      <div className="container card" style={{ textAlign: 'center' }}>
        <h1 className="section-title">Seite nicht gefunden (404)</h1>
        <p className="section-subtitle">
          Die angeforderte Seite existiert nicht oder wurde verschoben. Nutze die Navigation oder gehe zur Startseite.
        </p>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          <Link className="btn btn-primary" href="/">
            Zur Startseite
          </Link>
          <Link className="btn btn-secondary" href="/sitemap">
            Zur Sitemap
          </Link>
        </div>
      </div>
    </main>
  );
}
