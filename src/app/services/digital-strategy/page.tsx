import { Metadata } from 'next';
import Script from 'next/script';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
import DigitalStrategyClient from './DigitalStrategyClient';

export const metadata: Metadata = {
  title: 'Estrategia Digital | NOWLIVE',
  description: 'Estrategia sin datos es solo adivinanzas. Desarrollamos estrategias digitales basadas en datos que conectan con tu audiencia y generan resultados medibles.',
  keywords: ['estrategia digital', 'marketing digital', 'plan de marketing', 'consultoría digital', 'transformación digital'],
  openGraph: {
    title: 'Estrategia Digital | NOWLIVE',
    description: 'Estrategias digitales basadas en datos que generan resultados medibles.',
    type: 'website',
  },
};

export default function DigitalStrategyPage() {
  // Schema.org ProfessionalService con vinculación semántica a Wikidata
  const serviceSchema = generateServiceSchema('digital-strategy', {
    lang: 'es',
    includeOffers: true,
    includeReviews: true,
  });

  // Schema.org BreadcrumbList para navegación
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Servicios', url: '/services' },
    { name: 'Estrategia Digital', url: '/services/digital-strategy' },
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
      
      <DigitalStrategyClient />
    </>
  );
}
