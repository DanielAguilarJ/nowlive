'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, ScrollReveal, AnimatedText } from '@/components/ui';
import { useAnimatedCounter } from '@/hooks/useAnimations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CaseStudyMetric {
  value: number;
  suffix: string;
  label: string;
}

export interface CaseStudy {
  company: string;
  industry: string;
  logo?: React.ReactNode;
  challenge: string;
  solution: string;
  results: string;
  metrics: CaseStudyMetric[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

interface CaseStudySectionProps {
  badge: string;
  headline: string;
  subheadline: string;
  caseStudy: CaseStudy;
  challengeTitle?: string;
  solutionTitle?: string;
  resultsTitle?: string;
}

function MetricCard({ value, suffix, label }: CaseStudyMetric) {
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
      <div className="text-sm text-gray-300">{label}</div>
    </div>
  );
}

export function CaseStudySection({
  badge,
  headline,
  subheadline,
  caseStudy,
  challengeTitle = 'El Desafío',
  solutionTitle = 'La Solución',
  resultsTitle = 'Los Resultados',
}: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.case-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="case-study" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal direction="up">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent-600 bg-accent-50 rounded-full">
              {badge}
            </span>
          </ScrollReveal>

          <AnimatedText
            as="h2"
            animation="slide-up"
            className="text-fluid-3xl md:text-fluid-4xl font-bold text-primary-900 mb-4"
          >
            {headline}
          </AnimatedText>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-lg text-gray-600">
              {subheadline}
            </p>
          </ScrollReveal>
        </div>

        {/* Case Study Content */}
        <div ref={sectionRef} className="space-y-8">
          {/* Company Info */}
          <Card variant="elevated" className="case-card p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-primary-900">
                  {caseStudy.company}
                </h3>
                <p className="text-gray-500">{caseStudy.industry}</p>
              </div>
              {caseStudy.logo && (
                <div className="text-4xl">{caseStudy.logo}</div>
              )}
            </div>
          </Card>

          {/* Challenge, Solution, Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="outlined" className="case-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-primary-900">{challengeTitle}</h4>
              </div>
              <p className="text-gray-600">{caseStudy.challenge}</p>
            </Card>

            <Card variant="outlined" className="case-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-primary-900">{solutionTitle}</h4>
              </div>
              <p className="text-gray-600">{caseStudy.solution}</p>
            </Card>

            <Card variant="outlined" className="case-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-success-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-primary-900">{resultsTitle}</h4>
              </div>
              <p className="text-gray-600">{caseStudy.results}</p>
            </Card>
          </div>

          {/* Metrics */}
          <Card variant="elevated" className="case-card p-8 bg-gradient-to-r from-primary-900 to-primary-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {caseStudy.metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>
          </Card>

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <Card variant="glass" className="case-card p-8">
              <div className="flex gap-4">
                <svg className="w-12 h-12 text-accent-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div>
                  <p className="text-lg text-gray-700 italic mb-4">
                    &quot;{caseStudy.testimonial.quote}&quot;
                  </p>
                  <div>
                    <p className="font-semibold text-primary-900">
                      {caseStudy.testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">
                      {caseStudy.testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
