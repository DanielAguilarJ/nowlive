'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button, ScrollReveal, AnimatedText } from '@/components/ui';
import { useAnimatedCounter } from '@/hooks/useAnimations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CTAStat {
  value: number;
  suffix: string;
  label: string;
}

interface ServiceCTAProps {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA?: string;
  primaryCTALink?: string;
  secondaryCTALink?: string;
  stats?: CTAStat[];
  urgencyText?: string;
  trustBadges?: string[];
}

function StatItem({ value, suffix, label }: CTAStat) {
  const { elementRef, displayValue } = useAnimatedCounter({
    end: value,
    duration: 2000,
    suffix,
  });

  return (
    <div ref={elementRef} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {displayValue}
      </div>
      <div className="text-accent-200 text-sm">{label}</div>
    </div>
  );
}

export function ServiceCTA({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  primaryCTALink = '/contacto',
  secondaryCTALink = '#case-study',
  stats,
  urgencyText,
  trustBadges,
}: ServiceCTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
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

  const handlePrimaryClick = () => {
    if (primaryCTALink.startsWith('#')) {
      const element = document.querySelector(primaryCTALink);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = primaryCTALink;
    }
  };

  const handleSecondaryClick = () => {
    if (secondaryCTALink.startsWith('#')) {
      const element = document.querySelector(secondaryCTALink);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = secondaryCTALink;
    }
  };

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-gradient-to-br from-accent-600 via-accent-500 to-primary-800 will-change-transform"
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Stats */}
        {stats && stats.length > 0 && (
          <ScrollReveal direction="up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) => (
                <StatItem key={index} {...stat} />
              ))}
            </div>
          </ScrollReveal>
        )}

        <AnimatedText
          as="h2"
          animation="slide-up"
          className="text-fluid-3xl md:text-fluid-4xl font-bold text-white mb-6"
        >
          {headline}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-xl text-accent-100 max-w-2xl mx-auto mb-8">
            {subheadline}
          </p>
        </ScrollReveal>

        {urgencyText && (
          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-sm text-accent-200 mb-8 italic">
              {urgencyText}
            </p>
          </ScrollReveal>
        )}

        <ScrollReveal direction="up" delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={handlePrimaryClick}
              className="bg-white text-accent-600 hover:bg-gray-100 animate-pulse-glow"
              rightIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              {primaryCTA}
            </Button>
            {secondaryCTA && (
              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                className="border-white text-white hover:bg-white/10"
              >
                {secondaryCTA}
              </Button>
            )}
          </div>
        </ScrollReveal>

        {/* Trust Badges */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm">{trustBadges?.[0] || 'Garantía de Satisfacción'}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{trustBadges?.[1] || 'Respuesta en 24h'}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{trustBadges?.[2] || '+50 Clientes Satisfechos'}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
