import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import TestimonialsClient from './TestimonialsClient';

export const metadata: Metadata = createMetadata({
  title: 'Testimonios',
  description: 'Opiniones y resultados de clientes que crecieron con NOWLIVE: diseño, estrategia, automatización y SEO.',
  path: '/testimonios',
  keywords: ['testimonios', 'opiniones', 'casos reales', 'marketing digital', 'diseño web'],
});

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
