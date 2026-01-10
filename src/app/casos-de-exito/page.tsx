import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import CaseStudiesClient from './CaseStudiesClient';

export const metadata: Metadata = createMetadata({
  title: 'Casos de Éxito',
  description: 'Proyectos y resultados medibles: diseño, crecimiento, automatización y optimización orientada a conversión.',
  path: '/casos-de-exito',
  keywords: ['casos de éxito', 'portfolio', 'resultados', 'growth', 'diseño web', 'SEO'],
});

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}

