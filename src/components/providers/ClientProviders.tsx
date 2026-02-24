'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Carga diferida con ssr:false — estos componentes sólo existen en el navegador
// y no aportan nada al HTML inicial, por lo que diferirlos reduce el JS del bundle crítico
const CustomCursor = dynamic(
  () => import('@/components/ui/CustomCursor').then(m => ({ default: m.CustomCursor })),
  { ssr: false }
);
const ParticlesBackground = dynamic(
  () => import('@/components/ui/ParticlesBackground').then(m => ({ default: m.ParticlesBackground })),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () => import('@/components/ui/ScrollProgress').then(m => ({ default: m.ScrollProgress })),
  { ssr: false }
);
const BackToTop = dynamic(
  () => import('@/components/ui/BackToTop').then(m => ({ default: m.BackToTop })),
  { ssr: false }
);
const LiveActivityFeed = dynamic(
  () => import('@/components/ui/LiveActivity').then(m => ({ default: m.LiveActivityFeed })),
  { ssr: false }
);

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <ParticlesBackground />
      <BackToTop />
      <LiveActivityFeed />
      {children}
    </>
  );
}
