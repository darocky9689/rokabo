'use client';

import { useState } from 'react';
import Link from 'next/link';

// Note: Metadata export doesn't work in client components
// So we'll handle SEO differently

const projects = [
  {
    id: 1,
    title: 'juro-fotografie.de',
    category: 'fotografie',
    description: 'Professionelle Fotografiewebsite mit Portfolio und Buchungssystem',
    thumbnail: '/portfolio/juro-fotografie-thumb.jpg',
    fullImage: '/portfolio/juro-fotografie-full.jpg',
    url: 'https://juro-fotografie.de',
    tags: ['WordPress', 'Portfolio', 'Fotografie']
  },
  {
    id: 2,
    title: 'Grundschule Spreenhagen',
    category: 'bildung',
    description: 'Moderne Schulwebsite mit News, Galerie und Kontaktformular',
    thumbnail: '/portfolio/grundschule-spreenhagen-thumb.jpg',
    fullImage: '/portfolio/grundschule-spreenhagen-full.jpg',
    url: 'https://grundschule-spreenhagen.de',
    tags: ['Next.js', 'Schule', 'Bildung']
  }
];

const categories = ['alle', 'fotografie', 'bildung'];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('alle');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredProjects =
    activeCategory === 'alle' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <main id="main-content">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Portfolio</h1>
          <p className="section-subtitle">
            Entdecke, welche beeindruckenden Websites wir für unsere Kunden realisiert haben.
          </p>

          {/* Category Filter */}
          <div className="filter-container">
            <div className="filter-buttons">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'alle' ? 'Alle Projekte' : cat === 'fotografie' ? 'Fotografie' : 'Bildung'}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="portfolio-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="portfolio-item">
                <div className="portfolio-image-wrapper">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="portfolio-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.backgroundColor = 'var(--card-bg)';
                    }}
                  />
                  <div className="portfolio-overlay">
                    <div className="portfolio-info">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="portfolio-tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="portfolio-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="portfolio-links">
                        <button
                          className="portfolio-btn btn-preview"
                          onClick={() => setLightboxImage(project.fullImage)}
                        >
                          Preview
                        </button>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-btn btn-visit"
                        >
                          Besuchen
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="empty-state">
              <p>Keine Projekte in dieser Kategorie gefunden.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImage(null)}>
              ✕
            </button>
            <img src={lightboxImage} alt="Preview" className="lightbox-image" />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card cta-banner" style={{ marginTop: 'var(--space-3)' }}>
            <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
              Dein Projekt ist das nächste in unserem Portfolio
            </h2>
            <p className="section-subtitle">
              Starte deine Website-Reise zusammen mit uns. Kostenlose Beratung - von der Idee zur Live-Website.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/kontakt">
                Kostenlos beraten
              </Link>
              <Link className="btn btn-secondary" href="/leistungen">
                Unsere Leistungen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
