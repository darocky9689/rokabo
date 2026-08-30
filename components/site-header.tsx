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
  { href: '/ueber-uns', label: 'Über rokabo' },
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/faq', label: 'FAQ' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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

  return (
    <header className="header" ref={headerRef}>
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Zur Startseite">
          <Image
            className="brand-logo"
            src="/images/ROKABO.png"
            alt="Logo von rokabo"
            title="rokabo Logo"
            width={90}
            height={90}
            priority
          />
          rokabo
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
