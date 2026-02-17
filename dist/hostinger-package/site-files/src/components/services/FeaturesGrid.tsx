'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, ScrollReveal, AnimatedText } from '@/components/ui';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

interface FeaturesGridProps {
  badge: string;
  headline: string;
  subheadline: string;
  features: Feature[];
}

export function FeaturesGrid({
  badge,
  headline,
  subheadline,
  features,
}: FeaturesGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="py-24 bg-white">
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

        {/* Features Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="elevated"
              hover
              className="feature-card p-8 group"
            >
              <div className="w-14 h-14 rounded-xl bg-accent-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-500 transition-all duration-300">
                <div className="text-accent-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-primary-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {feature.highlight && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-accent-600">
                    {feature.highlight}
                  </span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
