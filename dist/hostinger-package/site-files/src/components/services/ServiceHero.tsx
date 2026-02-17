'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button, ScrollReveal, AnimatedText } from '@/components/ui';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceHeroProps {
  badge: string;
  headline: string;
  subheadline: string;
  problem: string;
  primaryCTA: string;
  secondaryCTA: string;
  primaryCTALink?: string;
  secondaryCTALink?: string;
  scrollLabel?: string;
  scrollAriaLabel?: string;
}

export function ServiceHero({
  badge,
  headline,
  subheadline,
  problem,
  primaryCTA,
  secondaryCTA,
  primaryCTALink = '#pricing',
  secondaryCTALink = '#case-study',
  scrollLabel = 'Explore',
  scrollAriaLabel = 'Scroll to features',
}: ServiceHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
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
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 will-change-transform"
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="up">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-accent-300 bg-accent-500/10 rounded-full border border-accent-500/20">
            {badge}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h1"
          animation="word-by-word"
          className="text-fluid-4xl md:text-fluid-5xl font-bold text-white mb-6 leading-tight"
        >
          {headline}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
            {subheadline}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 italic">
            &quot;{problem}&quot;
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection(primaryCTALink)}
              className="animate-pulse-glow"
              rightIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              {primaryCTA}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection(secondaryCTALink)}
              className="border-white text-white hover:bg-white hover:text-primary-700"
            >
              {secondaryCTA}
            </Button>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => scrollToSection('#features')}
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors"
          aria-label={scrollAriaLabel}
        >
          <span className="text-xs mb-2">{scrollLabel}</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
