import { Metadata } from 'next';
import Script from 'next/script';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
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
  // Schema.org ProfessionalService con vinculación semántica a Wikidata
  const serviceSchema = generateServiceSchema('seo-analytics', {
    lang: 'es',
    includeOffers: true,
    includeReviews: true,
  });

  // Schema.org BreadcrumbList para navegación
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Servicios', url: '/services' },
    { name: 'SEO & Analytics', url: '/services/seo-analytics' },
  ]);

  return (
    <>
      {/* Structured Data - ProfessionalService con sameAs a Wikidata */}
      <Script
        id="service-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      {/* Structured Data - BreadcrumbList */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <SEOAnalyticsClient />
    </>
  );
}
