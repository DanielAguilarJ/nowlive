'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionContainer, ScrollReveal, AnimatedText, Button } from '@/components/ui';
import { useAnimatedCounter } from '@/hooks/useAnimations';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function Counter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const { elementRef, displayValue } = useAnimatedCounter({
    end,
    duration: 2500,
    startOnView: true,
    prefix,
    suffix,
  });

  return <span ref={elementRef}>{displayValue}</span>;
}

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);

  type CTAStat = {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle parallax on background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionContainer
      id="cta"
      background="transparent"
      padding="lg"
      className="relative overflow-hidden"
    >
      {/* Background with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-accent-600 via-accent-700 to-primary-800 will-change-transform -z-10"
      />

      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-900/30 rounded-full blur-3xl -z-10" />

      <div ref={sectionRef} className="relative z-10 text-center">
        <ScrollReveal direction="up">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-white bg-white/10 rounded-full border border-white/20">
            {t.cta.badge}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h2"
          animation="word-by-word"
          className="text-fluid-4xl md:text-fluid-5xl font-bold text-white mb-6 leading-tight"
        >
          {t.cta.title}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.cta.description}
          </p>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal direction="up" delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-4xl mx-auto">
              {(t.cta.stats as CTAStat[]).map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <Counter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToContact}
              className="bg-white text-primary-700 hover:bg-gray-100 animate-pulse-glow"
              rightIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              {t.cta.primaryCTA}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="border-white text-white hover:bg-white hover:text-primary-700"
            >
              {t.cta.secondaryCTA}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </SectionContainer>
  );
}
