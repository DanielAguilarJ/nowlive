'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui';
import { AnimatedText, ScrollReveal, Typewriter, AnimatedNumber } from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Multiple background layers parallax
      if (layer1Ref.current) {
        gsap.to(layer1Ref.current, {
          y: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (layer2Ref.current) {
        gsap.to(layer2Ref.current, {
          y: 150,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (layer3Ref.current) {
        gsap.to(layer3Ref.current, {
          y: 200,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
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
      {/* Background layers for parallax effect */}
      <div className="absolute inset-0">
        {/* Layer 1 - Gradient base */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 will-change-transform"
        />

        {/* Layer 2 - Grid pattern */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 bg-grid-pattern opacity-20 will-change-transform"
        />

        {/* Layer 3 - Decorative shapes */}
        <div
          ref={layer3Ref}
          className="absolute inset-0 will-change-transform"
        >
          {/* Animated circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-success-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '-1.5s' }} />
        </div>
      </div>

      {/* Decorative SVG shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-20 left-10 w-24 h-24 text-accent-500/20 animate-spin-slow"
          viewBox="0 0 100 100"
        >
          <polygon points="50,5 95,75 5,75" fill="currentColor" />
        </svg>
        <svg
          className="absolute bottom-32 right-20 w-32 h-32 text-accent-400/20 animate-bounce-gentle"
          viewBox="0 0 100 100"
        >
          <rect x="10" y="10" width="80" height="80" rx="10" fill="currentColor" />
        </svg>
        <svg
          className="absolute top-1/3 right-10 w-20 h-20 text-success-500/20 animate-float"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="up" delay={0.2}>
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-accent-300 bg-accent-500/10 rounded-full border border-accent-500/20">
            {t.hero.badge}
          </span>
        </ScrollReveal>

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

        <ScrollReveal direction="up" delay={0.4}>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t.hero.subheadline}
          </p>
        </ScrollReveal>

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

        {/* Stats */}
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

      {/* Scroll indicator */}
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
