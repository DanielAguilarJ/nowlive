import { Metadata } from 'next';
import Script from 'next/script';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
import BrandIdentityClient from './BrandIdentityClient';

export const metadata: Metadata = {
  title: 'Identidad de Marca | NOWLIVE',
  description: 'Una marca olvidable es una marca ignorada. Creamos identidades visuales memorables que conectan emocionalmente y diferencian tu negocio.',
  keywords: ['branding', 'identidad de marca', 'logotipo', 'diseño de marca', 'brand strategy', 'manual de marca', 'rebranding'],
  openGraph: {
    title: 'Identidad de Marca | NOWLIVE',
    description: 'Identidades visuales memorables que conectan y diferencian.',
    type: 'website',
  },
};

export default function BrandIdentityPage() {
  // Schema.org ProfessionalService con vinculación semántica a Wikidata
  const serviceSchema = generateServiceSchema('brand-identity', {
    lang: 'es',
    includeOffers: true,
    includeReviews: true,
  });

  // Schema.org BreadcrumbList para navegación
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Servicios', url: '/services' },
    { name: 'Identidad de Marca', url: '/services/brand-identity' },
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
      
      <BrandIdentityClient />
    </>
  );
}
