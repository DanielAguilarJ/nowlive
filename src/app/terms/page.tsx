import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import TermsClient from './TermsClient';

export const metadata: Metadata = createMetadata({
  title: 'Términos de Servicio',
  description: 'Condiciones de uso y marco legal de los servicios de NOWLIVE.',
  path: '/terms',
  keywords: ['términos', 'términos de servicio', 'condiciones', 'legal'],
});

export default function TermsPage() {
  return <TermsClient />;
}

