'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, SectionContainer, ScrollReveal, AnimatedText, HoverTiltCard, RevealOnScroll, MagneticHover } from '@/components/ui';
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
      title: 'Sin Diseño Web Profesional',
      losses: ['75% de usuarios juzgan tu credibilidad por el diseño', 'Pierdes 8 de cada 10 clientes potenciales', 'Tu competencia te supera en Google'],
    },
    {
      title: 'Sin Estrategia Digital',
      losses: ['Gastas dinero en marketing sin retorno', 'No sabes qué funciona y qué no', 'Tu competencia capta TUS clientes'],
    },
    {
      title: 'Sin Automatización',
      losses: ['Pierdes 60+ horas/mes en tareas manuales', 'Errores humanos te cuestan clientes', 'Tu equipo se agota en tareas repetitivas'],
    },
    {
      title: 'Sin Contenido de Calidad',
      losses: ['80% de decisiones se toman antes de contactarte', 'Invisibilidad total en redes sociales', 'Tu competencia educa a TUS clientes'],
    },
    {
      title: 'Sin SEO & Analytics',
      losses: ['Pierdes el 93% del tráfico web', 'Tu web es invisible en búsquedas', 'Desconoces el comportamiento de tus usuarios'],
    },
    {
      title: 'Sin Identidad de Marca',
      losses: ['Te perciben como una opción genérica', 'No puedes cobrar precios premium', 'Los clientes no te recuerdan'],
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
          const lossMessages = lossAversionMessages[lang as keyof typeof lossAversionMessages][index];
          
          return (
            <div 
              key={index} 
              className="service-card relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link href={service.href}>
                <Card
                  variant="default"
                  padding="lg"
                  hover
                  className="h-full group cursor-pointer relative overflow-hidden"
                >
                  {/* Loss Aversion Tooltip - Aparece en hover */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 p-6 transition-all duration-500 ease-out ${
                      hoveredCard === index 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                    style={{ zIndex: hoveredCard === index ? 10 : 0 }}
                  >
                    <div className="h-full flex flex-col">
                      {/* Warning icon */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-red-900 text-sm">
                          {lossMessages.title}
                        </h4>
                      </div>

                      {/* Loss items */}
                      <div className="space-y-3 flex-1">
                        {lossMessages.losses.map((loss, lossIdx) => (
                          <div key={lossIdx} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-red-800 leading-tight">{loss}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA en el tooltip */}
                      <div className="mt-4 pt-4 border-t border-red-200">
                        <span className="inline-flex items-center text-red-600 font-semibold text-sm group-hover:text-red-700">
                          {lang === 'es' ? '¡No pierdas más oportunidades!' : 'Don\'t miss more opportunities!'}
                          <ArrowRightIcon
                            size={16}
                            className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contenido original - Se oculta en hover */}
                  <div 
                    className={`transition-opacity duration-300 ${
                      hoveredCard === index ? 'opacity-0' : 'opacity-100'
                    }`}
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
                  </div>

                  {/* Indicador de hover */}
                  <div className="absolute top-4 right-4">
                    <div className={`transition-all duration-300 ${
                      hoveredCard === index 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-75'
                    }`}>
                      <div className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                        {lang === 'es' ? '¡Cuidado!' : 'Warning!'}
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
