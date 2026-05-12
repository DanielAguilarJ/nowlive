'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

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
const FloatingConversion = dynamic(
  () => import('@/components/sections/FloatingConversion').then(m => ({ default: m.FloatingConversion })),
  { ssr: false }
);
const ExitIntent = dynamic(
  () => import('@/components/sections/ExitIntent').then(m => ({ default: m.ExitIntent })),
  { ssr: false }
);

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <LiveActivityFeed />
      {children}
      <FloatingConversion />
      <ExitIntent />
    </>
  );
}
