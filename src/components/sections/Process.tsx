'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionContainer, ScrollReveal, AnimatedText } from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const icons = [
  (
    <svg key="research" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  (
    <svg key="analysis" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  (
    <svg key="build" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  (
    <svg key="iterate" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the connecting line
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            once: true,
          },
        });
      }

      // Animate steps
      gsap.from('.process-step', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionContainer
      id="process"
      background="gradient"
      padding="lg"
    >
      <div className="text-center mb-16">
        <ScrollReveal direction="up">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent-300 bg-accent-500/20 rounded-full">
              {t.process.badge}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h2"
          animation="slide-up"
          delay={0.1}
          className="text-fluid-4xl font-bold text-white mb-4"
        >
          {t.process.title}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t.process.description}
          </p>
        </ScrollReveal>
      </div>

      {/* Process timeline */}
      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* Connecting line (hidden on mobile) */}
        <svg
          className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full h-full hidden md:block"
          preserveAspectRatio="none"
        >
          <path
            ref={lineRef}
            d="M 60 0 L 60 100%"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            className="process-line"
            style={{ transform: 'translateX(calc(50% - 60px))' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>

        {/* Steps */}
        <div className="relative space-y-12 md:space-y-24">
          {t.process.steps.map((step, index) => (
            <div
              key={step.number}
              className={`process-step relative flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Icon circle */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white shadow-glow-lg">
                  {icons[index]}
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-700 font-bold shadow-lg">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div
                className={`flex-1 text-center md:text-left ${
                  index % 2 === 1 ? 'md:text-right' : ''
                }`}
              >
                <h3 className="text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
