import { Metadata } from 'next';
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
  return <BrandIdentityClient />;
}
