import { Metadata } from 'next';
import SEOAnalyticsClient from './SEOAnalyticsClient';

export const metadata: Metadata = {
  title: 'SEO & Analytics | NOWLIVE',
  description: 'Si no puedes medirlo, no puedes mejorarlo. Optimizamos tu visibilidad en buscadores y configuramos analytics que revelan el camino al crecimiento.',
  keywords: ['SEO', 'posicionamiento web', 'Google Analytics', 'analytics', 'tráfico orgánico', 'keywords', 'backlinks'],
  openGraph: {
    title: 'SEO & Analytics | NOWLIVE',
    description: 'Optimización para buscadores y analytics que impulsan decisiones.',
    type: 'website',
  },
};

export default function SEOAnalyticsPage() {
  return <SEOAnalyticsClient />;
}
