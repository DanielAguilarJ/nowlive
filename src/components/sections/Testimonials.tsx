'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionContainer, ScrollReveal, AnimatedText, Card } from '@/components/ui';
import { StarIcon, QuoteIcon } from '@/components/icons';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    quote:
      'NOWLIVE transformed our digital presence completely. Their strategic approach and creative execution helped us increase our conversion rates by 200%. They\'re not just vendors, they\'re true partners.',
    author: 'Sarah Johnson',
    title: 'CEO, TechFlow Inc.',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 5,
    company: 'TechFlow',
  },
  {
    id: 2,
    quote:
      'The team at NOWLIVE exceeded our expectations in every way. Their attention to detail, creative solutions, and responsive communication made our rebrand project a huge success.',
    author: 'Michael Chen',
    title: 'Marketing Director, Verde Foods',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 5,
    company: 'Verde Foods',
  },
  {
    id: 3,
    quote:
      'Working with NOWLIVE was a game-changer for our app launch. Their marketing strategy drove 50,000 downloads in the first month. Highly recommend their services!',
    author: 'Emily Rodriguez',
    title: 'Founder, FitLife Health',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    rating: 5,
    company: 'FitLife Health',
  },
  {
    id: 4,
    quote:
      'The SEO and content strategy NOWLIVE developed for us tripled our organic traffic within six months. Their data-driven approach delivers real results.',
    author: 'David Park',
    title: 'VP of Digital, Luxe Properties',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    rating: 5,
    company: 'Luxe Properties',
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionContainer
      id="testimonials"
      background="gray"
      padding="lg"
    >
      <div className="text-center mb-16">
        <ScrollReveal direction="up">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent-600 bg-accent-100 rounded-full">
              {t.testimonials.badge}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h2"
          animation="slide-up"
          delay={0.1}
          className="text-fluid-4xl font-bold text-primary-700 mb-4"
        >
          {t.testimonials.title}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.testimonials.description}
          </p>
        </ScrollReveal>
      </div>

      {/* Testimonials grid */}
      <div
        ref={containerRef}
        className="grid md:grid-cols-2 gap-8"
      >
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <Card variant="default" padding="lg" hover className="h-full relative">
              {/* Quote icon */}
              <QuoteIcon
                size={40}
                className="absolute top-6 right-6 text-accent-200"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    size={20}
                    filled
                    className="text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed relative z-10">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-primary-700">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
