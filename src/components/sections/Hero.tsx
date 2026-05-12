'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui';
import { AnimatedText, ScrollReveal, Typewriter, AnimatedNumber } from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

const trustLogos = ['TechFlow', 'VitaHealth', 'FinTrack', 'Luxe', 'Aurum'];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
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
    }, 8000);
    return () => clearInterval(interval);
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
      {/* Lightweight static background (zero JS, no scroll listeners) */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(ellipse 70% 60% at 80% 70%, rgba(139,92,246,0.25), transparent 60%), linear-gradient(135deg, #0f1729 0%, #1e3a5f 40%, #1a1040 100%)',
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10" />

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
              onClick={() => scrollToSection('#offer')}
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
              onClick={() => scrollToSection('#offer')}
              className="border-white/40 text-white hover:bg-white hover:text-primary-700 backdrop-blur-sm"
            >
              {t.hero.secondaryCTA}
            </Button>
          </div>
        </ScrollReveal>

        {/* Guarantee + payment chips */}
        <ScrollReveal direction="up" delay={0.65}>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {lang === 'es' ? 'Garantía 5x ROI o reembolso' : '5x ROI guarantee or refund'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-gray-200 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {lang === 'es' ? 'Respuesta en < 60s por WhatsApp' : '< 60s reply on WhatsApp'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-gray-200 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {lang === 'es' ? 'Resultados en 14 días' : 'Results in 14 days'}
            </span>
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
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
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
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
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
