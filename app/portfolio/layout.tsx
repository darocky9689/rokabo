import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Referenzen: gebaute und betreute Websites | rokabo',
  description:
    'Websites, die du dir direkt ansehen kannst: juro-fotografie.de und die Grundschule Spreenhagen - beide gebaut und bis heute betreut.',
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
