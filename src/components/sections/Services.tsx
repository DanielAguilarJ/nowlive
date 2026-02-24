'use client';

import { useRef, useEffect, useState } from 'react';
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

// Loss aversion messages por servicio
const lossAversionMessages = {
  es: [
    {
      title: 'Sin Diseno Web Profesional',
      losses: ['75% de usuarios juzgan tu credibilidad por el diseno', 'Pierdes 8 de cada 10 clientes potenciales', 'Tu competencia te supera en Google'],
    },
    {
      title: 'Sin Estrategia Digital',
      losses: ['Gastas dinero en marketing sin retorno', 'No sabes que funciona y que no', 'Tu competencia capta TUS clientes'],
    },
    {
      title: 'Sin Automatizacion',
      losses: ['Pierdes 60+ horas/mes en tareas manuales', 'Errores humanos te cuestan clientes', 'Tu equipo se agota en tareas repetitivas'],
    },
    {
      title: 'Sin Contenido de Calidad',
      losses: ['80% de decisiones se toman antes de contactarte', 'Invisibilidad total en redes sociales', 'Tu competencia educa a TUS clientes'],
    },
    {
      title: 'Sin SEO & Analytics',
      losses: ['Pierdes el 93% del trafico web', 'Tu web es invisible en busquedas', 'Desconoces el comportamiento de tus usuarios'],
    },
    {
      title: 'Sin Identidad de Marca',
      losses: ['Te perciben como una opcion generica', 'No puedes cobrar precios premium', 'Los clientes no te recuerdan'],
    },
  ],
  en: [
    {
      title: 'Without Professional Web Design',
      losses: ['75% of users judge your credibility by design', 'You lose 8 out of 10 potential clients', 'Your competition outranks you on Google'],
    },
    {
      title: 'Without Digital Strategy',
      losses: ['You waste money on marketing with no ROI', 'You don\'t know what works and what doesn\'t', 'Your competition captures YOUR clients'],
    },
    {
      title: 'Without Automation',
      losses: ['You lose 60+ hours/month on manual tasks', 'Human errors cost you clients', 'Your team burns out on repetitive tasks'],
    },
    {
      title: 'Without Quality Content',
      losses: ['80% of decisions are made before contacting you', 'Total invisibility on social media', 'Your competition educates YOUR clients'],
    },
    {
      title: 'Without SEO & Analytics',
      losses: ['You lose 93% of web traffic', 'Your site is invisible in searches', 'You don\'t know your users\' behavior'],
    },
    {
      title: 'Without Brand Identity',
      losses: ['You\'re perceived as a generic option', 'You can\'t charge premium prices', 'Clients don\'t remember you'],
    },
  ],
};

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
      <div className="text-center mb-20">
        <ScrollReveal direction="up">
          <span className="inline-block px-4 py-2 mb-6 text-badge text-accent-600 bg-accent-100 rounded-full">
            {t.services.badge}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h2"
          animation="slide-up"
          delay={0.1}
          className="text-fluid-4xl text-primary-700 mb-5 text-section-heading"
        >
          {t.services.title}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-body leading-relaxed">
            {t.services.description}
          </p>
        </ScrollReveal>
      </div>

      {/* Services grid */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {t.services.cards.map((service, index) => {
          const IconComponent = iconMap[index];
          const lossMessages = lossAversionMessages[lang as keyof typeof lossAversionMessages][index];
          const isHovered = hoveredCard === index;
          const serviceNumber = String(index + 1).padStart(2, '0');
          const isPopular = index === 0;

          return (
            <div
              key={index}
              className="service-card relative group/card"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient border wrapper - visible on hover */}
              <div
                className={`absolute -inset-[2px] rounded-2xl transition-opacity duration-500 ease-out ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #10b981, #3b82f6)',
                  backgroundSize: '300% 300%',
                  animation: isHovered ? 'gradient-shift 4s ease infinite' : 'none',
                }}
              />

              <Link href={service.href} className="block relative">
                <Card
                  variant="default"
                  padding="none"
                  hover
                  className="h-full cursor-pointer relative overflow-hidden rounded-xl"
                >
                  {/* "Most Popular" badge */}
                  {isPopular && (
                    <div className="absolute top-0 left-0 right-0 z-20">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-semibold tracking-wide uppercase rounded-b-lg shadow-lg shadow-accent-500/25">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {lang === 'es' ? 'Mas Popular' : 'Most Popular'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Normal content */}
                  <div
                    className={`p-8 transition-all duration-500 ease-out ${
                      isHovered
                        ? 'opacity-0 -translate-y-4'
                        : 'opacity-100 translate-y-0'
                    }`}
                  >
                    {/* Service number */}
                    <span className="absolute top-6 right-6 text-6xl font-bold text-gray-100 select-none pointer-events-none text-mono-number leading-none">
                      {serviceNumber}
                    </span>

                    {/* Icon with accent background */}
                    <div className={`relative z-10 mb-8 ${isPopular ? 'mt-4' : ''}`}>
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-50 transition-all duration-300 group-hover/card:bg-accent-100 group-hover/card:scale-110 group-hover/card:shadow-lg group-hover/card:shadow-accent-500/10">
                        <IconComponent size={32} className="text-accent-500 transition-colors duration-300 group-hover/card:text-accent-600" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="relative z-10 text-xl text-primary-700 mb-3 group-hover/card:text-accent-600 transition-colors duration-300 text-card-heading">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="relative z-10 text-gray-500 mb-8 text-body text-[0.95rem] leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="relative z-10 space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 mr-3 text-success-500 flex-shrink-0"
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
                          <span className="text-body-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn more link */}
                    <div className="relative z-10 flex items-center justify-between pt-6 border-t border-gray-100">
                      <span className="inline-flex items-center text-accent-500 font-medium group-hover/card:text-accent-600 transition-colors">
                        {service.cta}
                        <ArrowRightIcon
                          size={18}
                          className="ml-2 transition-transform duration-300 group-hover/card:translate-x-2"
                        />
                      </span>
                      <span className="text-xs text-gray-300 font-mono">{serviceNumber}</span>
                    </div>
                  </div>

                  {/* Loss Aversion Overlay - slides up from bottom */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 p-8 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      isHovered
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-full pointer-events-none'
                    }`}
                    style={{ zIndex: isHovered ? 10 : 0 }}
                  >
                    {/* Warning header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 bg-red-100 rounded-xl">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-red-900 text-sm text-card-heading">
                          {lossMessages.title}
                        </h4>
                        <span className="text-[0.7rem] text-red-400 uppercase tracking-wider font-semibold">
                          {lang === 'es' ? 'Riesgo activo' : 'Active risk'}
                        </span>
                      </div>
                    </div>

                    {/* Loss items with stagger delay via CSS */}
                    <div className="space-y-4 flex-1">
                      {lossMessages.losses.map((loss, lossIdx) => (
                        <div
                          key={lossIdx}
                          className={`flex items-start gap-3 transition-all duration-500 ${
                            isHovered
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 translate-x-4'
                          }`}
                          style={{
                            transitionDelay: isHovered ? `${(lossIdx + 1) * 100}ms` : '0ms',
                          }}
                        >
                          <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm text-red-800 leading-snug font-medium">{loss}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA at bottom */}
                    <div className="mt-6 pt-5 border-t border-red-200/60">
                      <span className="inline-flex items-center text-red-600 font-semibold text-sm transition-colors hover:text-red-700">
                        {lang === 'es' ? 'No pierdas mas oportunidades' : 'Don\'t miss more opportunities'}
                        <ArrowRightIcon
                          size={16}
                          className="ml-2 transition-transform duration-300 group-hover/card:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>

                  {/* Hover indicator badge */}
                  <div className="absolute top-4 right-4" style={{ zIndex: 15 }}>
                    <div className={`transition-all duration-300 ease-out ${
                      isHovered
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-75 -translate-y-2'
                    }`}>
                      <div className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full shadow-sm">
                        {lang === 'es' ? 'Cuidado!' : 'Warning!'}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
