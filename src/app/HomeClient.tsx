"use client";

import dynamic from 'next/dynamic';
import {
  Header,
  Hero,
  Services,
  CTA,
  Footer,
} from '@/components/sections';

// Lazy load heavy sections
const Offer = dynamic(() => import('@/components/sections').then(m => ({ default: m.Offer })), {
  loading: () => <div className="min-h-[600px]" />,
});
const Portfolio = dynamic(() => import('@/components/sections').then(m => ({ default: m.Portfolio })), {
  loading: () => <div className="min-h-screen" />,
});
const Stats = dynamic(() => import('@/components/sections').then(m => ({ default: m.Stats })), {
  loading: () => <div className="min-h-[400px]" />,
});
const ClientLogos = dynamic(() => import('@/components/sections').then(m => ({ default: m.ClientLogos })), {
  loading: () => <div className="min-h-[200px]" />,
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

export default function HomeClient() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        <Hero />
        <ClientLogos />
        <Offer />
        <Services />
        <Stats />
        <Portfolio />
        <Process />
        <Testimonials />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
