'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionContainer, ScrollReveal, AnimatedText, Button, RippleButton, MagneticHover, GlitchText } from '@/components/ui';
import { useAnimatedCounter } from '@/hooks/useAnimations';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function Counter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const { elementRef, displayValue } = useAnimatedCounter({
    end,
    duration: 2500,
    startOnView: true,
    prefix,
    suffix,
  });

  return <span ref={elementRef}>{displayValue}</span>;
}

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  
  // Estado para el modal de micro-compromiso
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'audit' | 'quote' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  type CTAStat = {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle parallax on background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animación del modal
  useEffect(() => {
    if (showModal && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [showModal]);

  const scrollToContact = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOptionSelect = (option: 'audit' | 'quote') => {
    setSelectedOption(option);
    setTimeout(() => {
      scrollToContact();
      setIsSubmitting(true);
      setTimeout(() => {
        setShowModal(false);
        setIsSubmitting(false);
        setSelectedOption(null);
      }, 1500);
    }, 300);
  };

  return (
    <SectionContainer
      id="cta"
      background="transparent"
      padding="lg"
      className="relative overflow-hidden"
    >
      {/* Background with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-accent-600 via-accent-700 to-primary-800 will-change-transform -z-10"
      />

      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-900/30 rounded-full blur-3xl -z-10" />

      <div ref={sectionRef} className="relative z-10 text-center">
        <ScrollReveal direction="up">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-white bg-white/10 rounded-full border border-white/20">
            {t.cta.badge}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h2"
          animation="word-by-word"
          className="text-fluid-4xl md:text-fluid-5xl font-bold text-white mb-6 leading-tight"
        >
          {t.cta.title}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.cta.description}
          </p>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal direction="up" delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-4xl mx-auto">
              {(t.cta.stats as CTAStat[]).map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <Counter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowModal(true)}
              className="bg-white text-primary-700 hover:bg-gray-100 animate-pulse-glow relative group"
              rightIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              }
            >
              {lang === 'es' ? '¡Comenzar Ahora!' : 'Start Now!'}
              <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                {lang === 'es' ? 'Gratis' : 'Free'}
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="border-white text-white hover:bg-white hover:text-primary-700"
            >
              {t.cta.secondaryCTA}
            </Button>
          </div>
        </ScrollReveal>
      </div>

      {/* Modal de Micro-compromiso */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => !isSubmitting && setShowModal(false)}
        >
          <div
            ref={modalRef}
            className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-primary-700 mb-2">
                {lang === 'es' ? '¿Qué necesitas hoy?' : 'What do you need today?'}
              </h3>
              <p className="text-gray-600">
                {lang === 'es' ? 'Elige la opción que mejor se adapte a ti' : 'Choose the option that best suits you'}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {/* Auditoría Gratis */}
              <button
                onClick={() => handleOptionSelect('audit')}
                disabled={isSubmitting}
                className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left group hover:shadow-lg ${
                  selectedOption === 'audit'
                    ? 'border-accent-500 bg-accent-50'
                    : 'border-gray-200 hover:border-accent-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="text-lg font-bold text-primary-700">
                        {lang === 'es' ? 'Auditoría Gratuita' : 'Free Audit'}
                      </h4>
                      <span className="px-2 py-1 text-xs font-semibold text-white bg-success-500 rounded-full">
                        {lang === 'es' ? '100% Gratis' : '100% Free'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {lang === 'es' 
                        ? 'Descubre oportunidades de mejora sin compromiso' 
                        : 'Discover improvement opportunities without commitment'}
                    </p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {lang === 'es' ? 'Análisis completo en 48h' : 'Complete analysis in 48h'}
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {lang === 'es' ? 'Sin compromiso' : 'No commitment'}
                      </li>
                    </ul>
                  </div>
                  <svg 
                    className={`w-6 h-6 transition-transform duration-300 ${
                      selectedOption === 'audit' ? 'text-accent-500' : 'text-gray-300 group-hover:text-accent-400'
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* Presupuesto */}
              <button
                onClick={() => handleOptionSelect('quote')}
                disabled={isSubmitting}
                className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left group hover:shadow-lg ${
                  selectedOption === 'quote'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <h4 className="text-lg font-bold text-primary-700">
                        {lang === 'es' ? 'Presupuesto Personalizado' : 'Custom Quote'}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {lang === 'es' 
                        ? 'Solución a medida para tu proyecto' 
                        : 'Tailored solution for your project'}
                    </p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {lang === 'es' ? 'Propuesta en 24h' : 'Proposal in 24h'}
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {lang === 'es' ? 'Consultoría incluida' : 'Consulting included'}
                      </li>
                    </ul>
                  </div>
                  <svg 
                    className={`w-6 h-6 transition-transform duration-300 ${
                      selectedOption === 'quote' ? 'text-primary-600' : 'text-gray-300 group-hover:text-primary-400'
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Loading state */}
            {isSubmitting && (
              <div className="mt-4 flex items-center justify-center text-accent-600">
                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="font-medium">
                  {lang === 'es' ? 'Redirigiendo...' : 'Redirecting...'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </SectionContainer>
  );
}
