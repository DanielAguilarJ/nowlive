'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { OptimizedLayoutParticles } from '@/components/OptimizedLayoutParticles';

const CustomCursor = dynamic(
  () => import('@/components/ui/CustomCursor').then(m => ({ default: m.CustomCursor })),
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
      <OptimizedLayoutParticles delay={1000} />
      <BackToTop />
      <LiveActivityFeed />
      {children}
    </>
  );
}
