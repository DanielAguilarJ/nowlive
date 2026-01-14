import { Metadata } from 'next';
import Script from 'next/script';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
import MarketingAutomationClient from './MarketingAutomationClient';

export const metadata: Metadata = {
  title: 'Marketing Automation | NOWLIVE',
  description: 'Tus competidores duermen, pero su marketing no. Implementamos sistemas de automatización que trabajan 24/7 para nutrir leads y cerrar ventas.',
  keywords: ['marketing automation', 'automatización', 'email marketing', 'CRM', 'nurturing', 'workflows', 'HubSpot', 'ActiveCampaign'],
  openGraph: {
    title: 'Marketing Automation | NOWLIVE',
    description: 'Sistemas de automatización que trabajan 24/7 para tu negocio.',
    type: 'website',
  },
};

export default function MarketingAutomationPage() {
  // Schema.org ProfessionalService con vinculación semántica a Wikidata
  const serviceSchema = generateServiceSchema('marketing-automation', {
    lang: 'es',
    includeOffers: true,
    includeReviews: true,
  });

  // Schema.org BreadcrumbList para navegación
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Servicios', url: '/services' },
    { name: 'Marketing Automation', url: '/services/marketing-automation' },
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
      
      <MarketingAutomationClient />
    </>
  );
}
