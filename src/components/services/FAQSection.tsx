'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal, AnimatedText } from '@/components/ui';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  badge: string;
  headline: string;
  subheadline: string;
  faqs: FAQItem[];
  helpText?: string;
  helpCTA?: string;
  helpHref?: string;
}

export function FAQSection({
  badge,
  headline,
  subheadline,
  faqs,
  helpText = '¿No encuentras lo que buscas?',
  helpCTA = 'Contáctanos directamente',
  helpHref = '#cta',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.faq-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
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

        {/* FAQ Items */}
        <div ref={sectionRef} className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-gray-50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-card"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-medium text-primary-900 pr-4">
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-accent-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <div className="h-px bg-gray-200 mb-4" />
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              {helpText}
            </p>
            <a
              href={helpHref}
              className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors"
            >
              {helpCTA}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
