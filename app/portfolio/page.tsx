'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageTitle: string;
  imageAlt: string;
  imageDescription: string;
  image: string;
  url: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'juro-fotografie.de',
    category: 'fotografie',
    description: 'Moderne Portfolio-Website für Fotografie mit klarer Bildsprache und schneller Navigation.',
    imageTitle: 'Startseiten-Preview von juro-fotografie.de',
    imageAlt: 'Startseitenansicht der Website juro-fotografie.de mit großformatiger Fotografie und klarem Portfolio-Layout',
    imageDescription: 'Screenshot der Startseite mit Fokus auf Bildwirkung, schneller Orientierung und modernem Portfolio-Aufbau.',
    image: '/images/juro-fotografie.webp',
    url: 'https://juro-fotografie.de',
    tags: ['Portfolio', 'Fotografie', 'Branding'],
  },
  {
    id: 2,
    title: 'grundschule-spreenhagen.de',
    category: 'bildung',
    description: 'Informations-Website für Schule mit übersichtlicher Struktur für Eltern, Kinder und Lehrkräfte.',
    imageTitle: 'Startseiten-Preview von grundschule-spreenhagen.de',
    imageAlt: 'Startseitenansicht der Website grundschule-spreenhagen.de mit übersichtlicher Schulnavigation und Informationsbereichen',
    imageDescription: 'Screenshot der Schulwebsite mit klarer Struktur für Elterninformationen, Termine und wichtige Schnellzugriffe.',
    image: '/images/grundschule-spreenhagen.webp',
    url: 'https://grundschule-spreenhagen.de',
    tags: ['Bildung', 'Informationsarchitektur', 'CMS'],
  },
];

const categories = ['alle', 'fotografie', 'bildung'];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('alle');
  const [imageError, setImageError] = useState<number | null>(null);
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [gridHeight, setGridHeight] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects =
    activeCategory === 'alle' ? projects : projects.filter((p) => p.category === activeCategory);

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    const updateHeight = () => {
      if (!gridRef.current) return;
      setGridHeight(gridRef.current.scrollHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(gridRef.current);
    window.addEventListener('resize', updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [filteredProjects]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxProject(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

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
          <div className="portfolio-grid-outer" style={gridHeight !== null ? { height: `${gridHeight}px` } : undefined}>
            <div className="portfolio-grid" ref={gridRef}>
              {filteredProjects.map((project) => (
                <article key={project.id} className="portfolio-item">
                  <div className="portfolio-image-wrapper">
                    {imageError !== project.id ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        title={project.imageTitle}
                        className="portfolio-image"
                        loading="lazy"
                        decoding="async"
                        onError={() => setImageError(project.id)}
                      />
                    ) : (
                      <div className="portfolio-placeholder">
                        <div className="placeholder-content">
                          <div className="placeholder-icon">🌐</div>
                          <p>{project.title}</p>
                        </div>
                      </div>
                    )}
                    <div className="portfolio-overlay">
                      <div className="portfolio-info">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <p className="portfolio-image-description">{project.imageDescription}</p>
                        <div className="portfolio-tags">
                          {project.tags.map((tag) => (
                            <span key={tag} className="portfolio-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="portfolio-links">
                          <button type="button" className="portfolio-btn btn-preview" onClick={() => setLightboxProject(project)}>
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
          </div>

          {filteredProjects.length === 0 && (
            <div className="empty-state">
              <p>Keine Projekte in dieser Kategorie gefunden.</p>
            </div>
          )}
        </div>
      </section>

      {lightboxProject && (
        <div className="lightbox-backdrop" onClick={() => setLightboxProject(null)} role="dialog" aria-modal="true" aria-label="Website-Preview">
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxProject(null)}
              aria-label="Lightbox schließen"
            >
              ×
            </button>

            <img
              src={lightboxProject.image}
              alt={`${lightboxProject.imageAlt} (vergrößerte Ansicht)`}
              title={`${lightboxProject.imageTitle} (vergrößerte Ansicht)`}
              className="lightbox-image"
              loading="lazy"
              decoding="async"
            />

            <div className="lightbox-meta">
              <h3>{lightboxProject.title}</h3>
              <a href={lightboxProject.url} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                Website öffnen
              </a>
            </div>
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
