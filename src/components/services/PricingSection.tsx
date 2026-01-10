'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, Button, ScrollReveal, AnimatedText } from '@/components/ui';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
  badge?: string;
}

interface PricingSectionProps {
  badge: string;
  headline: string;
  subheadline: string;
  tiers: PricingTier[];
  guarantee?: string;
}

export function PricingSection({
  badge,
  headline,
  subheadline,
  tiers,
  guarantee,
}: PricingSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.pricing-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
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

  const scrollToContact = () => {
    const element = document.querySelector('#cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50">
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

        {/* Pricing Cards */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {tiers.map((tier, index) => (
            <Card
              key={index}
              variant={tier.popular ? 'elevated' : 'outlined'}
              className={`pricing-card p-8 relative ${
                tier.popular
                  ? 'ring-2 ring-accent-500 scale-105'
                  : ''
              } ${hoveredTier === index ? 'shadow-glow-lg' : ''}`}
              onMouseEnter={() => setHoveredTier(index)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 text-sm font-semibold text-white bg-accent-500 rounded-full">
                    {tier.badge || 'Más Popular'}
                  </span>
                </div>
              )}

              {/* Tier Info */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {tier.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl md:text-5xl font-bold text-primary-900">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-gray-500">/{tier.period}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className={`flex items-start gap-3 ${
                      feature.included ? 'text-gray-700' : 'text-gray-400'
                    }`}
                  >
                    {feature.included ? (
                      <svg className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className="text-sm">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={tier.popular ? 'primary' : 'outline'}
                size="lg"
                fullWidth
                onClick={scrollToContact}
                className={tier.popular ? 'animate-pulse-glow' : ''}
              >
                {tier.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* Guarantee */}
        {guarantee && (
          <ScrollReveal direction="up" delay={0.3}>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-card">
                <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-gray-700 font-medium">{guarantee}</p>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
