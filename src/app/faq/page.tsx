import type { Metadata } from 'next';
import Script from 'next/script';
import { createMetadata, generateFaqSchema, generateBreadcrumbSchema } from '@/lib/seo';
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
  
  // Usar la nueva función generateFaqSchema
  const faqSchema = generateFaqSchema(
    t.faq.items.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
    {
      pageName: 'FAQ',
      pageUrl: '/faq',
    }
  );

  // Usar la nueva función generateBreadcrumbSchema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'FAQ', url: '/faq' },
  ]);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FAQClient />
    </>
  );
}

