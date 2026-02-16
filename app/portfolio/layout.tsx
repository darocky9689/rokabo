import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | rokabo',
  description:
    'Entdecke unsere Referenzen: Professionelle Websites für Fotografen, Schulen und Unternehmen. Von juro-fotografie.de bis zur Grundschule Spreenhagen.',
  alternates: { canonical: '/portfolio' }
};

export default function PortfolioLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
