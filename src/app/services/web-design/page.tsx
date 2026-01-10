import { Metadata } from 'next';
import Script from 'next/script';
import { siteConfig } from '@/lib/seo';
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
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Diseño y Desarrollo Web',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: 'ES',
    description: 'Diseño y desarrollo web profesional optimizado para conversiones. Sitios web rápidos, responsivos y orientados a resultados.',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <WebDesignClient />
    </>
  );
}
