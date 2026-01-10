import { Metadata } from 'next';
import ContentCreationClient from './ContentCreationClient';

export const metadata: Metadata = {
  title: 'Creación de Contenido | NOWLIVE',
  description: 'El contenido promedio es invisible. Creamos contenido estratégico que captura atención, genera engagement y convierte audiencia en clientes.',
  keywords: ['content marketing', 'creación de contenido', 'redes sociales', 'video marketing', 'copywriting', 'blog', 'social media'],
  openGraph: {
    title: 'Creación de Contenido | NOWLIVE',
    description: 'Contenido estratégico que convierte audiencia en clientes.',
    type: 'website',
  },
};

export default function ContentCreationPage() {
  return <ContentCreationClient />;
}
