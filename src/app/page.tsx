import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Agencia de Marketing Digital',
  description:
    'NOWLIVE impulsa tu crecimiento con diseño web, estrategia digital, automatización, contenido y SEO & analytics. Experiencias digitales que convierten.',
  path: '/',
  keywords: [
    'agencia de marketing digital',
    'diseño web',
    'estrategia digital',
    'marketing automation',
    'creación de contenido',
    'SEO',
    'analytics',
  ],
});

export default function Home() {
  return <HomeClient />;
}
