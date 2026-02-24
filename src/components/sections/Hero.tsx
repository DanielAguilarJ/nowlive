'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui';
import { AnimatedText, ScrollReveal, Typewriter, AnimatedNumber, MorphingBlob, FloatingElements } from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const trustLogos = ['TechFlow', 'VitaHealth', 'FinTrack', 'Luxe', 'Aurum'];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  const [liveViewers, setLiveViewers] = useState(0);

  useEffect(() => {
    setLiveViewers(Math.floor(Math.random() * 20) + 15);
    const interval = setInterval(() => {
      setLiveViewers(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(8, Math.min(40, prev + delta));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
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
        <div
          ref={layer1Ref}
          className="absolute inset-0 will-change-transform"
          style={{
            background: 'linear-gradient(135deg, #0f1729 0%, #1e3a5f 25%, #0f172a 50%, #1a1040 75%, #0f1729 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradient-shift 12s ease infinite',
          }}
        />
        <div className="absolute inset-0 noise-overlay" />
        <div
          ref={layer2Ref}
          className="absolute inset-0 bg-grid-pattern opacity-15 will-change-transform"
        />
        <div
          ref={layer3Ref}
          className="absolute inset-0 will-change-transform"
        >
          <div className="absolute top-1/4 left-1/4">
            <MorphingBlob size={300} color="#3b82f6" />
          </div>
          <div className="absolute bottom-1/4 right-1/4">
            <MorphingBlob size={400} color="#8b5cf6" />
          </div>
          <div className="absolute top-1/2 right-1/3">
            <MorphingBlob size={250} color="#ec4899" />
          </div>
        </div>
        <FloatingElements count={30} className="opacity-50" />
      </div>

      {/* Decorative SVG shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-20 left-10 w-24 h-24 text-accent-500/30 animate-spin-slow holographic" viewBox="0 0 100 100">
          <polygon points="50,5 95,75 5,75" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-32 right-20 w-32 h-32 text-accent-400/30 animate-blob" viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" rx="10" fill="currentColor" />
        </svg>
        <svg className="absolute top-1/3 right-10 w-20 h-20 text-success-500/30 animate-float morph" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Live viewers indicator */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-xs text-green-400/80 font-medium">
              {liveViewers} {lang === 'es' ? 'personas viendo ahora' : 'people viewing now'}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <span className="inline-block px-5 py-2.5 mb-6 text-badge text-accent-300 bg-accent-500/10 rounded-full border border-accent-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)] shimmer relative overflow-hidden">
            <span className="relative z-10">{t.hero.badge}</span>
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h1"
          animation="word-by-word"
          className="text-fluid-5xl md:text-fluid-6xl text-white mb-6 text-display-xl"
        >
          {t.hero.headline}{' '}
          <span className="bg-gradient-to-r from-accent-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            <Typewriter
              words={t.hero.rotating}
              typingSpeed={80}
              deletingSpeed={40}
              pauseTime={2000}
            />
          </span>
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.4}>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 text-body leading-relaxed">
            {t.hero.subheadline}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('#cta')}
              className="animate-pulse-glow relative group"
              rightIcon={
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="border-white/40 text-white hover:bg-white hover:text-primary-700 backdrop-blur-sm"
            >
              {t.hero.secondaryCTA}
            </Button>
          </div>
        </ScrollReveal>

        {/* Trust strip - social proof */}
        <ScrollReveal direction="up" delay={0.7}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-primary-900 bg-gradient-to-br ${['from-blue-400 to-blue-600', 'from-purple-400 to-purple-600', 'from-pink-400 to-pink-600', 'from-emerald-400 to-emerald-600', 'from-amber-400 to-amber-600'][i]} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                  {trustLogos[i][0]}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              {lang === 'es' ? 'Más de' : 'More than'}{' '}
              <span className="text-white font-semibold">150+</span>{' '}
              {lang === 'es' ? 'empresas confían en nosotros' : 'companies trust us'}
            </p>
          </div>
        </ScrollReveal>

        {/* Stats with glassmorphism */}
        <ScrollReveal direction="up" delay={0.9}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.hero.stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-default rounded-2xl py-5 px-4 glass-card transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/0 to-purple-500/0 group-hover:from-accent-500/10 group-hover:to-purple-500/10 transition-all duration-500 rounded-2xl" />
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl text-white mb-2 text-mono-number">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={2000} />
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-accent-300 transition-colors text-card-heading">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator - mouse wheel style */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => scrollToSection('#services')}
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors group"
          aria-label="Scroll to services"
        >
          <span className="text-xs mb-2 group-hover:text-accent-300 transition-colors">{t.hero.scrollLabel}</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group-hover:border-accent-400/50 transition-colors">
            <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-bounce group-hover:bg-accent-400 transition-colors" />
          </div>
        </button>
      </div>
    </section>
  );
}
