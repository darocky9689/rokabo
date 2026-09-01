'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/', label: 'Start' },
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/preise', label: 'Preise' },
  { href: '/ratgeber', label: 'Ratgeber' },
  { href: '/ueber-uns', label: 'Über rokabo' },
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/faq', label: 'FAQ' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`} ref={headerRef}>
      <div className="container header-inner">
        <Link className="brand" href="/">
          {/* Nur noch die Bildmarke. Das alte PNG trug die Wortmarke
              eingebacken - zusammen mit dem Textknoten daneben stand
              "rokabo" zweimal im Header, und die eingebackene Fassung
              zwang ihn auf 90px Hoehe. alt="" weil der Text die Marke
              schon nennt. */}
          <Image
            className="brand-mark"
            src="/images/rokabo-mark.png"
            alt=""
            width={160}
            height={160}
            priority
          />
          <span className="brand-wort">rokabo</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          onClick={() => setOpen((state) => !state)}
        >
          ☰
        </button>

        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Hauptmenü">
          <ul className="nav-list">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link className={`nav-link ${active ? 'active' : ''}`} href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
