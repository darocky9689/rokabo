import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio mit realen Website-Referenzen | rokabo',
  description:
    'Entdecke unsere Referenzen: Professionelle Websites für Fotografen, Schulen und Unternehmen. Von juro-fotografie.de bis zur Grundschule Spreenhagen.',
  keyword: 'Website Referenzen',
  path: '/portfolio'
});

export default function PortfolioLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
