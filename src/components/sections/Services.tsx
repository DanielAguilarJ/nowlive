'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, SectionContainer, ScrollReveal, AnimatedText } from '@/components/ui';
import {
  WebDesignIcon,
  StrategyIcon,
  AutomationIcon,
  ContentIcon,
  SeoIcon,
  BrandIcon,
  ArrowRightIcon,
} from '@/components/icons';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap = [WebDesignIcon, StrategyIcon, AutomationIcon, ContentIcon, SeoIcon, BrandIcon];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Stagger reveal for service cards
      gsap.from('.service-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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
      id="services"
      background="gray"
      padding="lg"
    >
      <div className="text-center mb-16">
        <ScrollReveal direction="up">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent-600 bg-accent-100 rounded-full">
            {t.services.badge}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h2"
          animation="slide-up"
          delay={0.1}
          className="text-fluid-4xl font-bold text-primary-700 mb-4"
        >
          {t.services.title}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.services.description}
          </p>
        </ScrollReveal>
      </div>

      {/* Services grid */}
      <div
        ref={containerRef}
        className="grid-services"
      >
        {t.services.cards.map((service, index) => {
          const IconComponent = iconMap[index];
          return (
            <div key={index} className="service-card">
              <Link href={service.href}>
                <Card
                  variant="default"
                  padding="lg"
                  hover
                  className="h-full group cursor-pointer"
                >
                  {/* Icon */}
                  <div className="mb-6 text-accent-500 transition-transform duration-300 group-hover:scale-110">
                    <IconComponent size={56} className="transition-colors duration-300 group-hover:text-accent-600" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary-700 mb-3 group-hover:text-accent-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2 text-success-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn more link */}
                  <span className="inline-flex items-center text-accent-500 font-medium group-hover:text-accent-600 transition-colors">
                    {service.cta}
                    <ArrowRightIcon
                      size={18}
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </span>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
