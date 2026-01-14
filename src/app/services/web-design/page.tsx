import { Metadata } from 'next';
import Script from 'next/script';
import { siteConfig, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
import WebDesignClient from './WebDesignClient';

export const metadata: Metadata = {
  title: 'Diseño y Desarrollo Web | NOWLIVE',
  description: 'Tu sitio web te está costando más de lo que crees. Creamos sitios web que convierten visitantes en clientes con diseño estratégico y tecnología de vanguardia.',
  keywords: ['diseño web', 'desarrollo web', 'sitio web profesional', 'landing page', 'e-commerce', 'wordpress', 'next.js'],
  openGraph: {
    title: 'Diseño y Desarrollo Web | NOWLIVE',
    description: 'Creamos sitios web que convierten visitantes en clientes.',
    type: 'website',
  },
};

export default function WebDesignPage() {
  // Schema.org ProfessionalService con vinculación semántica a Wikidata
  const serviceSchema = generateServiceSchema('web-design', {
    lang: 'es',
    includeOffers: true,
    includeReviews: true,
  });

  // Schema.org BreadcrumbList para navegación
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Servicios', url: '/services' },
    { name: 'Diseño Web', url: '/services/web-design' },
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
      
      <WebDesignClient />
    </>
  );
}
