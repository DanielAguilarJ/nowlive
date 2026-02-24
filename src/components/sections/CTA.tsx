'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionContainer, ScrollReveal, AnimatedText, Button } from '@/components/ui';
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

/**
 * Returns the number of days remaining until the end of the current month.
 */
function useDaysRemaining(): number {
  const [days, setDays] = useState(() => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return Math.max(1, endOfMonth.getDate() - now.getDate());
  });

  useEffect(() => {
    // Recalculate once a day at midnight
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();

    const timeout = setTimeout(() => {
      const today = new Date();
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setDays(Math.max(1, endOfMonth.getDate() - today.getDate()));
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [days]);

  return days;
}

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const pulseRingRef = useRef<HTMLSpanElement>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  const daysRemaining = useDaysRemaining();

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

      // Animated pulse ring around the CTA button
      if (pulseRingRef.current) {
        gsap.fromTo(
          pulseRingRef.current,
          { scale: 1, opacity: 0.6 },
          {
            scale: 1.35,
            opacity: 0,
            duration: 1.8,
            ease: 'power1.out',
            repeat: -1,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animacion del modal
  useEffect(() => {
    if (showModal && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [showModal]);

  const scrollToContact = useCallback(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOptionSelect = useCallback(
    (option: 'audit' | 'quote') => {
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
    },
    [scrollToContact]
  );

  // Trust badges data
  const trustBadges = lang === 'es'
    ? [
        { icon: 'shield', label: 'Sin compromiso' },
        { icon: 'clock', label: 'Respuesta en 24h' },
        { icon: 'lock', label: '100% confidencial' },
      ]
    : [
        { icon: 'shield', label: 'No commitment' },
        { icon: 'clock', label: 'Response in 24h' },
        { icon: 'lock', label: '100% confidential' },
      ];

  const TrustIcon = ({ icon }: { icon: string }) => {
    switch (icon) {
      case 'shield':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'clock':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'lock':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <SectionContainer
      id="cta"
      background="transparent"
      padding="lg"
      className="relative overflow-hidden"
    >
      {/* Dynamic multi-color gradient background with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform -z-10"
        style={{
          background:
            'linear-gradient(135deg, #1e3a5f 0%, #2563eb 25%, #7c3aed 50%, #6366f1 75%, #0f172a 100%)',
        }}
      />

      {/* Animated gradient overlay for dynamism */}
      <div
        className="absolute inset-0 -z-10 opacity-40 animate-gradient-shift"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.5) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(37,99,235,0.5) 0%, transparent 50%)',
        }}
      />

      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-900/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl -z-10" />

      <div ref={sectionRef} className="relative z-10 text-center">
        {/* Live social proof indicator */}
        <ScrollReveal direction="up">
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-sm text-green-300/90 font-medium tracking-wide">
              {lang === 'es'
                ? '12 personas solicitaron una auditoria hoy'
                : '12 people requested an audit today'}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up">
          <span className="inline-block px-5 py-2.5 mb-6 text-badge text-accent-300 bg-accent-500/10 rounded-full border border-accent-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            {t.cta.badge}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h2"
          animation="word-by-word"
          className="text-fluid-4xl md:text-fluid-5xl text-white mb-6 text-display-xl"
        >
          {t.cta.title}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4 text-body">
            {t.cta.description}
          </p>
        </ScrollReveal>

        {/* Urgency element */}
        <ScrollReveal direction="up" delay={0.25}>
          <div className="inline-flex items-center gap-2 mb-10 px-5 py-2.5 rounded-full bg-amber-500/15 border border-amber-400/30 backdrop-blur-sm">
            <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-amber-300">
              {lang === 'es'
                ? `Oferta limitada: Auditoria gratuita solo este mes \u2014 quedan ${daysRemaining} dias`
                : `Limited offer: Free audit this month only \u2014 ${daysRemaining} days left`}
            </span>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-4xl mx-auto">
            {(t.cta.stats as CTAStat[]).map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl text-white tracking-tight text-mono-number">
                  <Counter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-sm text-gray-300/80 text-card-heading">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA with animated pulse ring */}
            <div className="relative">
              {/* Animated ring */}
              <span
                ref={pulseRingRef}
                className="absolute inset-0 rounded-xl border-2 border-white/50 pointer-events-none"
                aria-hidden="true"
              />
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
                {lang === 'es' ? 'Comenzar Ahora!' : 'Start Now!'}
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                  {lang === 'es' ? 'Gratis' : 'Free'}
                </span>
              </Button>
            </div>
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

        {/* Trust badges */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-sm text-gray-300/90"
              >
                <span className="text-green-400">
                  <TrustIcon icon={badge.icon} />
                </span>
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Modal de Micro-compromiso */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => !isSubmitting && setShowModal(false)}
        >
          <div
            ref={modalRef}
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal gradient accent bar */}
            <div
              className="h-1.5 w-full"
              style={{
                background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 50%, #6366f1 100%)',
              }}
            />

            <div className="p-8 sm:p-10">
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 p-1"
                disabled={isSubmitting}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-violet-600 mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {lang === 'es' ? 'Que necesitas hoy?' : 'What do you need today?'}
                </h3>
                <p className="text-gray-500">
                  {lang === 'es' ? 'Elige la opcion que mejor se adapte a ti' : 'Choose the option that best suits you'}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {/* Auditoria Gratis - with "Recommended" badge */}
                <button
                  onClick={() => handleOptionSelect('audit')}
                  disabled={isSubmitting}
                  className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left group hover:shadow-lg relative ${selectedOption === 'audit'
                    ? 'border-accent-500 bg-accent-50 shadow-md shadow-accent-100'
                    : 'border-gray-200 hover:border-accent-300'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {/* Recommended badge */}
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-accent-500 to-violet-500 rounded-full shadow-md">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {lang === 'es' ? 'Recomendado' : 'Recommended'}
                  </span>

                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 mt-1">
                        <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="text-lg font-bold text-gray-900">
                          {lang === 'es' ? 'Auditoria Gratuita' : 'Free Audit'}
                        </h4>
                        <span className="px-2.5 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                          {lang === 'es' ? '100% Gratis' : '100% Free'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {lang === 'es'
                          ? 'Descubre oportunidades de mejora sin compromiso'
                          : 'Discover improvement opportunities without commitment'}
                      </p>
                      <ul className="space-y-1.5 text-sm text-gray-600">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {lang === 'es' ? 'Analisis completo en 48h' : 'Complete analysis in 48h'}
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {lang === 'es' ? 'Reporte detallado con recomendaciones' : 'Detailed report with recommendations'}
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {lang === 'es' ? 'Sin compromiso' : 'No commitment'}
                        </li>
                      </ul>
                    </div>
                    <svg
                      className={`w-6 h-6 transition-transform duration-300 mt-2 ${selectedOption === 'audit' ? 'text-accent-500 translate-x-1' : 'text-gray-300 group-hover:text-accent-400'
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
                  className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left group hover:shadow-lg ${selectedOption === 'quote'
                    ? 'border-primary-500 bg-primary-50 shadow-md shadow-primary-100'
                    : 'border-gray-200 hover:border-primary-300'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h4 className="text-lg font-bold text-gray-900">
                          {lang === 'es' ? 'Presupuesto Personalizado' : 'Custom Quote'}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {lang === 'es'
                          ? 'Solucion a medida para tu proyecto'
                          : 'Tailored solution for your project'}
                      </p>
                      <ul className="space-y-1.5 text-sm text-gray-600">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {lang === 'es' ? 'Propuesta en 24h' : 'Proposal in 24h'}
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {lang === 'es' ? 'Consultoria incluida' : 'Consulting included'}
                        </li>
                      </ul>
                    </div>
                    <svg
                      className={`w-6 h-6 transition-transform duration-300 mt-1 ${selectedOption === 'quote' ? 'text-primary-600 translate-x-1' : 'text-gray-300 group-hover:text-primary-400'
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
                <div className="mt-6 flex items-center justify-center text-accent-600">
                  <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-medium">
                    {lang === 'es' ? 'Redirigiendo...' : 'Redirecting...'}
                  </span>
                </div>
              )}

              {/* Modal trust footer */}
              {!isSubmitting && (
                <div className="mt-8 pt-5 border-t border-gray-100 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {lang === 'es' ? 'Datos protegidos' : 'Data protected'}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {lang === 'es' ? 'Respuesta rapida' : 'Quick response'}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{lang === 'es' ? 'Sin spam' : 'No spam'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Inline style for gradient animation */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-5%, 5%) scale(1.05); }
          66% { transform: translate(5%, -3%) scale(0.98); }
        }
        .animate-gradient-shift {
          animation: gradient-shift 12s ease-in-out infinite;
        }
      `}</style>
    </SectionContainer>
  );
}
