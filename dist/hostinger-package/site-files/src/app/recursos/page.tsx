import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import ResourcesClient from './ResourcesClient';

export const metadata: Metadata = createMetadata({
  title: 'Recursos',
  description: 'Recursos y guías para escalar tu marketing: estrategia, diseño, automatización, SEO y analytics.',
  path: '/recursos',
  keywords: ['recursos marketing', 'guías', 'plantillas', 'SEO', 'analytics', 'automatización'],
});

export default function ResourcesPage() {
  return <ResourcesClient />;
}

