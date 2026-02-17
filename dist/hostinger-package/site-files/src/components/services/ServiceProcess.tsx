'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal, AnimatedText } from '@/components/ui';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  duration?: string;
}

interface ServiceProcessProps {
  badge: string;
  headline: string;
  subheadline: string;
  steps: ProcessStep[];
}

export function ServiceProcess({
  badge,
  headline,
  subheadline,
  steps,
}: ServiceProcessProps) {
  const processRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !processRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the connecting line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power3.out',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: processRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 1,
            },
          }
        );
      }

      // Animate the steps
      const stepElements = processRef.current?.querySelectorAll('.process-step');
      if (stepElements) {
        stepElements.forEach((step, index) => {
          gsap.fromTo(
            step,
            { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, processRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="py-24 bg-gray-50">
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

        {/* Process Timeline */}
        <div ref={processRef} className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-accent-500 via-accent-400 to-accent-500 rounded-full"
            style={{ top: '2rem', bottom: '2rem' }}
          />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`process-step relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300">
                    <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                      <span className="text-sm font-medium text-accent-500 bg-accent-50 px-3 py-1 rounded-full">
                        {step.step}
                      </span>
                      {step.duration && (
                        <span className="text-sm text-gray-500">
                          {step.duration}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-primary-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Circle Indicator */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold text-xl shadow-glow">
                    {index + 1}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
