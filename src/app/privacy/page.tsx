import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = createMetadata({
  title: 'Política de Privacidad',
  description: 'Conoce cómo tratamos y protegemos tus datos en NOWLIVE.',
  path: '/privacy',
  keywords: ['privacidad', 'protección de datos', 'política de privacidad'],
});

export default function PrivacyPage() {
  return <PrivacyClient />;
}

