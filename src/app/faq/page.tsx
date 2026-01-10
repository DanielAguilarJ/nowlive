import type { Metadata } from 'next';
import Script from 'next/script';
import { createMetadata, siteConfig } from '@/lib/seo';
import FAQClient from './FAQClient';
import { getTranslations } from '@/lib/i18n';

export const metadata: Metadata = createMetadata({
  title: 'Preguntas Frecuentes',
  description: 'Respuestas rápidas sobre servicios, procesos, tiempos y entregables de NOWLIVE.',
  path: '/faq',
  keywords: ['faq', 'preguntas frecuentes', 'agencia de marketing', 'diseño web', 'SEO', 'automatización'],
});

export default function FAQPage() {
  const t = getTranslations('es');
  
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'FAQ',
        item: `${siteConfig.url}/faq`,
      },
    ],
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FAQClient />
    </>
  );
}

