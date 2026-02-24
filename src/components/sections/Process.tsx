'use client';

import { useRef, useEffect, useState } from 'react';
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

/** Bullet-point details revealed on hover for each step */
const stepDetails: Record<string, string[][]> = {
  es: [
    ['Entrevistas con stakeholders', 'Analisis competitivo', 'Auditoria digital completa', 'Definicion de buyer personas'],
    ['Roadmap basado en datos', 'KPIs y metricas clave', 'Arquitectura de contenidos', 'Plan de canales y touchpoints'],
    ['Sprints agiles de 2 semanas', 'QA continuo y revision de codigo', 'Entregas incrementales', 'Comunicacion diaria de avances'],
    ['A/B testing continuo', 'Reportes mensuales de rendimiento', 'Iteracion basada en datos', 'Escalabilidad y crecimiento sostenido'],
  ],
  en: [
    ['Stakeholder interviews', 'Competitive analysis', 'Full digital audit', 'Buyer persona definition'],
    ['Data-driven roadmap', 'KPIs & key metrics', 'Content architecture', 'Channel & touchpoint planning'],
    ['2-week agile sprints', 'Continuous QA & code review', 'Incremental deliverables', 'Daily progress updates'],
    ['Continuous A/B testing', 'Monthly performance reports', 'Data-driven iteration', 'Scalability & sustained growth'],
  ],
};

/** Duration labels for each step */
const stepDurations: Record<string, string[]> = {
  es: ['1-2 semanas', '1 semana', '2-4 semanas', 'Continuo'],
  en: ['1-2 weeks', '1 week', '2-4 weeks', 'Ongoing'],
};

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  const details = stepDetails[lang] || stepDetails.en;
  const durations = stepDurations[lang] || stepDurations.en;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    // Set the line length to match the container height
    if (lineRef.current && containerRef.current) {
      const containerHeight = containerRef.current.scrollHeight;
      lineRef.current.setAttribute('y2', String(containerHeight - 48));
    }

    const ctx = gsap.context(() => {
      // Animate the connecting dashed line via stroke-dashoffset
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: '12 8',
          strokeDashoffset: length,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2.4,
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

      // Animate glow rings with a subtle pulse on each icon
      gsap.to('.process-icon-glow', {
        boxShadow: '0 0 40px 8px rgba(59,130,246,0.45), 0 0 80px 16px rgba(59,130,246,0.18)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.4,
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
          <span className="inline-block px-4 py-2 mb-4 text-badge text-accent-300 bg-accent-500/20 rounded-full">
            {t.process.badge}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h2"
          animation="slide-up"
          delay={0.1}
          className="text-fluid-4xl text-white mb-4 text-section-heading"
        >
          {t.process.title}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto text-body">
            {t.process.description}
          </p>
        </ScrollReveal>
      </div>

      {/* Process timeline */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto">
        {/* ── Animated dashed connector line (hidden on mobile) ── */}
        <svg
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full hidden md:block pointer-events-none"
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="process-line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <line
            ref={lineRef}
            x1="0"
            y1="48"
            x2="0"
            y2="800"
            stroke="url(#process-line-gradient)"
            strokeWidth="3"
            className="process-dashed-line"
          />
        </svg>

        {/* Steps */}
        <div className="relative space-y-16 md:space-y-28">
          {t.process.steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = expandedStep === index;

            return (
              <div
                key={step.number}
                className="process-step relative"
              >
                {/* ── Desktop: alternating two-column layout ── */}
                <div
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                    !isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Icon circle with glow */}
                  <div className="relative z-10 flex-shrink-0">
                    {/* Outer glow ring */}
                    <div className="process-icon-glow absolute -inset-3 rounded-full bg-accent-500/10 blur-md" />
                    {/* Main icon circle */}
                    <div className="relative w-28 h-28 bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 rounded-full flex items-center justify-center text-white shadow-glow-lg ring-2 ring-accent-400/30 ring-offset-2 ring-offset-primary-700">
                      {icons[index]}
                    </div>
                    {/* Step number badge with gradient background */}
                    <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-white via-accent-100 to-accent-300 flex items-center justify-center">
                        <span className="text-lg font-extrabold bg-gradient-to-br from-accent-700 to-accent-500 bg-clip-text text-transparent text-display">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 max-w-lg ${
                      isEven ? 'md:text-left text-center' : 'md:text-right text-center'
                    }`}
                  >
                    <h3 className="text-2xl md:text-3xl text-white mb-1 text-section-heading">
                      {step.title}
                    </h3>

                    {/* Duration label */}
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase mb-3 px-3 py-1 rounded-full bg-accent-500/15 text-accent-300 border border-accent-500/20 ${
                        isEven ? '' : 'md:ml-auto'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {durations[index]}
                    </span>

                    <p className="text-gray-300 text-body leading-relaxed">
                      {step.description}
                    </p>

                    {/* Expandable hover details */}
                    <button
                      onClick={() => setExpandedStep(isExpanded ? null : index)}
                      onMouseEnter={() => setExpandedStep(index)}
                      className={`mt-3 inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                        isExpanded ? 'text-accent-300' : 'text-accent-400/70 hover:text-accent-300'
                      } ${!isEven ? 'md:ml-auto' : ''}`}
                    >
                      <span>{lang === 'es' ? 'Ver detalles' : 'View details'}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Expanded details panel */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-power3-out ${
                        isExpanded ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                      }`}
                    >
                      <ul
                        className={`space-y-2 ${
                          !isEven ? 'md:text-right' : 'md:text-left'
                        } text-left`}
                      >
                        {details[index].map((detail, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2 text-sm text-gray-400 ${
                              !isEven ? 'md:flex-row-reverse md:text-right' : ''
                            }`}
                            style={{
                              transitionDelay: isExpanded ? `${i * 60}ms` : '0ms',
                              opacity: isExpanded ? 1 : 0,
                              transform: isExpanded ? 'translateY(0)' : 'translateY(8px)',
                              transition: 'opacity 0.3s ease, transform 0.3s ease',
                            }}
                          >
                            <svg
                              className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
