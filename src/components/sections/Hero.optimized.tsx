'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui';
import { AnimatedText, ScrollReveal, Typewriter, AnimatedNumber } from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

// ==============================
// LAZY LOADED COMPONENTS
// ==============================
// Load heavy animation components only after critical content
const ParallaxLayers = dynamic(
  () => import('./HeroParallaxLayers').then((mod) => mod.HeroParallaxLayers),
  {
    ssr: false,
    loading: () => (
      // Placeholder to prevent CLS - exact same dimensions as the actual component
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>
    ),
  }
);

const DecorativeShapes = dynamic(
  () => import('./HeroDecorativeShapes').then((mod) => mod.HeroDecorativeShapes),
  {
    ssr: false,
    loading: () => null, // No placeholder needed, purely decorative
  }
);

// ==============================
// OPTIMIZED HERO COMPONENT
// ==============================
export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  
  // State to control when to load heavy animations
  const [shouldLoadAnimations, setShouldLoadAnimations] = useState(false);

  useEffect(() => {
    // Strategy: Load animations after initial render + 500ms OR when browser is idle
    const loadAnimations = () => {
      setShouldLoadAnimations(true);
    };

    // Option 1: Use requestIdleCallback if available (best for performance)
    if ('requestIdleCallback' in window) {
      const idleCallback = requestIdleCallback(
        () => {
          // Add minimum 500ms delay for critical content to render first
          setTimeout(loadAnimations, 500);
        },
        { timeout: 2000 } // Fallback timeout
      );

      return () => cancelIdleCallback(idleCallback);
    } else {
      // Option 2: Fallback for browsers without requestIdleCallback
      const timeout = setTimeout(loadAnimations, 500);
      return () => clearTimeout(timeout);
    }
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ==============================
          BACKGROUND LAYERS (LAZY LOADED)
          ============================== */}
      {shouldLoadAnimations && (
        <>
          <ParallaxLayers heroRef={heroRef} />
          <DecorativeShapes />
        </>
      )}

      {/* Static fallback for instant load (prevents flash) */}
      {!shouldLoadAnimations && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        </div>
      )}

      {/* ==============================
          CRITICAL CONTENT (INSTANT LOAD)
          This is what matters for LCP and TTI
          ============================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge - Critical content */}
        <ScrollReveal direction="up" delay={0.2}>
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-accent-300 bg-accent-500/10 rounded-full border border-accent-500/20">
            {t.hero.badge}
          </span>
        </ScrollReveal>

        {/* Headline - Critical content (LCP element) */}
        <AnimatedText
          as="h1"
          animation="word-by-word"
          className="text-fluid-5xl md:text-fluid-6xl font-bold text-white mb-6 leading-tight"
        >
          {t.hero.headline}{' '}
          <span className="text-accent-400">
            <Typewriter
              words={t.hero.rotating}
              typingSpeed={80}
              deletingSpeed={40}
              pauseTime={2000}
            />
          </span>
        </AnimatedText>

        {/* Subheadline - Critical content */}
        <ScrollReveal direction="up" delay={0.4}>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t.hero.subheadline}
          </p>
        </ScrollReveal>

        {/* CTAs - Critical for conversion (MOST IMPORTANT) */}
        <ScrollReveal direction="up" delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('#cta')}
              className="animate-pulse-glow"
              rightIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              {t.hero.primaryCTA}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('#portfolio')}
              className="border-white text-white hover:bg-white hover:text-primary-700"
            >
              {t.hero.secondaryCTA}
            </Button>
          </div>
        </ScrollReveal>

        {/* Stats - Important for trust, but not critical for initial paint */}
        <ScrollReveal direction="up" delay={0.8}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.hero.stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-default">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 transition-transform group-hover:scale-110">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={2000} />
                </div>
                <div className="text-sm text-gray-400 group-hover:text-accent-300 transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* ==============================
          SCROLL INDICATOR (LOW PRIORITY)
          ============================== */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => scrollToSection('#services')}
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors"
          aria-label="Scroll to services"
        >
          <span className="text-xs mb-2">{t.hero.scrollLabel}</span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
