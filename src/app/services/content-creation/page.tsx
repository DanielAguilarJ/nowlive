import { Metadata } from 'next';
import Script from 'next/script';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
import ContentCreationClient from './ContentCreationClient';

export const metadata: Metadata = {
  title: 'Creación de Contenido | NOWLIVE',
  description: 'El contenido promedio es invisible. Creamos contenido estratégico que captura atención, genera engagement y convierte audiencia en clientes.',
  keywords: ['content marketing', 'creación de contenido', 'redes sociales', 'video marketing', 'copywriting', 'blog', 'social media'],
  openGraph: {
    title: 'Creación de Contenido | NOWLIVE',
    description: 'Contenido estratégico que convierte audiencia en clientes.',
    type: 'website',
  },
};

export default function ContentCreationPage() {
  // Schema.org ProfessionalService con vinculación semántica a Wikidata
  const serviceSchema = generateServiceSchema('content-creation', {
    lang: 'es',
    includeOffers: true,
    includeReviews: true,
  });

  // Schema.org BreadcrumbList para navegación
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Servicios', url: '/services' },
    { name: 'Creación de Contenido', url: '/services/content-creation' },
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
      
      <ContentCreationClient />
    </>
  );
}
