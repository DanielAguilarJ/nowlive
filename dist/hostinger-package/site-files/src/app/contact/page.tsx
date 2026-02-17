import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Contacto',
  description:
    'Cuéntanos sobre tu proyecto y recibe una propuesta personalizada. Hablemos de diseño web, estrategia, automatización, contenido y SEO.',
  path: '/contact',
  keywords: ['contacto', 'agencia de marketing digital', 'diseño web', 'estrategia digital', 'SEO', 'automatización'],
});

export default function ContactPage() {
  return <ContactClient />;
}
