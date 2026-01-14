"use client";

import dynamic from 'next/dynamic';
import {
  Header,
  Hero,
  Services,
  CTA,
  Footer,
} from '@/components/sections';
import { ScrollProgress } from '@/components/ui';

// Lazy load componentes pesados de animación
const Portfolio = dynamic(() => import('@/components/sections').then(m => ({ default: m.Portfolio })), {
  loading: () => <div className="min-h-screen" />,
});
const Stats = dynamic(() => import('@/components/sections').then(m => ({ default: m.Stats })), {
  loading: () => <div className="min-h-[400px]" />,
});
const Testimonials = dynamic(() => import('@/components/sections').then(m => ({ default: m.Testimonials })), {
  loading: () => <div className="min-h-[500px]" />,
});
const Team = dynamic(() => import('@/components/sections').then(m => ({ default: m.Team })), {
  loading: () => <div className="min-h-[600px]" />,
});
const Process = dynamic(() => import('@/components/sections').then(m => ({ default: m.Process })), {
  loading: () => <div className="min-h-[500px]" />,
});
const ParticlesBackground = dynamic(() => import('@/components/ui').then(m => ({ default: m.ParticlesBackground })), {
  ssr: false,
});
const CustomCursor = dynamic(() => import('@/components/ui').then(m => ({ default: m.CustomCursor })), {
  ssr: false,
});
const FluidCursor = dynamic(() => import('@/components/ui').then(m => ({ default: m.FluidCursor })), {
  ssr: false,
});
const GridLightEffect = dynamic(() => import('@/components/ui').then(m => ({ default: m.GridLightEffect })), {
  ssr: false,
});
const GlowingOrbs = dynamic(() => import('@/components/ui').then(m => ({ default: m.GlowingOrbs })), {
  ssr: false,
});
const NoiseBackground = dynamic(() => import('@/components/ui').then(m => ({ default: m.NoiseBackground })), {
  ssr: false,
});

export default function HomeClient() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <FluidCursor />
      <GridLightEffect />
      <GlowingOrbs />
      <NoiseBackground />
      <Header />
      <main className="relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <ParticlesBackground />
        </div>
        <Hero />
        <Services />
        <Stats />
        <Portfolio />
        <Process />
        <Team />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
