import type { Metadata } from 'next';
import Script from 'next/script';
import HomeClient from './HomeClient';
import { createMetadata, generateServicesListSchema, generateWebsiteSchema } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Agencia de Marketing Digital',
  description:
    'NOWLIVE impulsa tu crecimiento con diseño web, estrategia digital, automatización, contenido y SEO & analytics. Experiencias digitales que convierten.',
  path: '/',
  keywords: [
    'agencia de marketing digital',
    'diseño web',
    'estrategia digital',
    'marketing automation',
    'creación de contenido',
    'SEO',
    'analytics',
  ],
});

export default function Home() {
  // Schema.org para listado de servicios (ItemList)
  const servicesSchema = generateServicesListSchema(undefined, { lang: 'es' });
  
  // Schema.org para WebSite con SearchAction
  const websiteSchema = generateWebsiteSchema('es');

  return (
    <>
      {/* Structured Data - ItemList de servicios */}
      <Script
        id="services-list-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesSchema),
        }}
      />
      
      {/* Structured Data - WebSite con SearchAction */}
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      
      <HomeClient />
    </>
  );
}
