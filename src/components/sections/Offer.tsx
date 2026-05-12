'use client';

import { useEffect, useState } from 'react';
import { SectionContainer, ScrollReveal, AnimatedText, Button } from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';

type Plan = {
  id: 'starter' | 'growth' | 'scale';
  name: string;
  tagline: string;
  oldPrice: string;
  price: string;
  perMonth: string;
  cta: string;
  popular?: boolean;
  badge?: string;
  features: string[];
  results: string;
};

const PLANS: Record<'es' | 'en', Plan[]> = {
  es: [
    {
      id: 'starter',
      name: 'Acelerador',
      tagline: 'Para emprendedores listos para facturar más rápido',
      oldPrice: '$24,900 MXN',
      price: '$14,900 MXN',
      perMonth: 'pago único · entrega en 14 días',
      cta: 'Quiero vender ya',
      features: [
        'Landing page de alta conversión (lista en 14 días)',
        'Copywriting persuasivo orientado a venta',
        'Integración WhatsApp + Pixel Meta + GA4',
        'Embudo de captura con automatización por email',
        'Auditoría SEO técnica + 10 keywords ganadoras',
        'Setup de campaña Meta/Google con creatividades',
      ],
      results: 'Resultado típico: 3x leads en 30 días',
    },
    {
      id: 'growth',
      name: 'Vendedor 24/7',
      tagline: 'Sistema completo de ventas que trabaja mientras duermes',
      oldPrice: '$59,900 MXN',
      price: '$34,900 MXN',
      perMonth: 'pago único · entrega en 21 días',
      cta: 'Activar sistema vendedor',
      popular: true,
      badge: 'MÁS VENDIDO',
      features: [
        'Sitio web 100% optimizado para vender (5–8 páginas)',
        'Embudo automatizado completo + lead scoring',
        'Chatbot WhatsApp con respuestas inteligentes 24/7',
        'Campañas Meta + Google + TikTok con presupuesto guiado',
        'Producción de 30 piezas creativas (videos + reels)',
        'CRM con seguimiento y recordatorios automáticos',
        'Dashboard ejecutivo con ROI en tiempo real',
        'Optimización mensual (3 meses incluidos)',
      ],
      results: 'Resultado típico: 5–8x ROI en 90 días',
    },
    {
      id: 'scale',
      name: 'Imperio',
      tagline: 'Para escalar a 7 cifras al mes sin tope',
      oldPrice: '$129,900 MXN',
      price: '$79,900 MXN',
      perMonth: 'pago único · entrega en 30 días',
      cta: 'Quiero escalar a millones',
      features: [
        'Ecosistema digital completo: web + app + funnels',
        'Estrategia omnicanal: Meta, Google, TikTok, LinkedIn, YouTube',
        '60 piezas creativas + 8 videos premium al mes',
        'Equipo dedicado: estratega + media buyer + creativo + dev',
        'SEO agresivo: 50 keywords + 12 blogs optimizados',
        'Automatizaciones avanzadas con IA (Make + n8n)',
        'A/B testing continuo y optimización semanal',
        'Reuniones estratégicas semanales con tu CMO virtual',
        'Garantía blindada: 10x ROI o seguimos sin cobrar',
      ],
      results: 'Resultado típico: 10–20x ROI sostenido',
    },
  ],
  en: [
    {
      id: 'starter',
      name: 'Accelerator',
      tagline: 'For founders ready to invoice faster',
      oldPrice: '$1,490 USD',
      price: '$890 USD',
      perMonth: 'one-time · live in 14 days',
      cta: 'I want to sell now',
      features: [
        'High-conversion landing page (live in 14 days)',
        'Persuasive sales-driven copywriting',
        'WhatsApp + Meta Pixel + GA4 integration',
        'Capture funnel with email automation',
        'Technical SEO audit + 10 winning keywords',
        'Meta/Google campaign setup with creatives',
      ],
      results: 'Typical result: 3x leads in 30 days',
    },
    {
      id: 'growth',
      name: '24/7 Seller',
      tagline: 'A complete sales system that works while you sleep',
      oldPrice: '$3,590 USD',
      price: '$2,090 USD',
      perMonth: 'one-time · live in 21 days',
      cta: 'Activate selling system',
      popular: true,
      badge: 'BEST SELLER',
      features: [
        'Full website built to sell (5–8 pages)',
        'End-to-end automated funnel + lead scoring',
        'AI WhatsApp chatbot with 24/7 responses',
        'Meta + Google + TikTok ads with guided budget',
        '30 creative assets per month (videos + reels)',
        'CRM with automated follow-up and reminders',
        'Executive dashboard with real-time ROI',
        'Monthly optimization (3 months included)',
      ],
      results: 'Typical result: 5–8x ROI in 90 days',
    },
    {
      id: 'scale',
      name: 'Empire',
      tagline: 'Scale to 7 figures/month with no ceiling',
      oldPrice: '$7,790 USD',
      price: '$4,790 USD',
      perMonth: 'one-time · live in 30 days',
      cta: 'Scale to millions',
      features: [
        'Full digital ecosystem: web + app + funnels',
        'Omnichannel: Meta, Google, TikTok, LinkedIn, YouTube',
        '60 creative assets + 8 premium videos per month',
        'Dedicated squad: strategist + media buyer + creative + dev',
        'Aggressive SEO: 50 keywords + 12 optimized blogs',
        'Advanced AI automations (Make + n8n)',
        'Continuous A/B testing with weekly optimization',
        'Weekly strategy sessions with your virtual CMO',
        'Ironclad: 10x ROI or we work for free',
      ],
      results: 'Typical result: 10–20x sustained ROI',
    },
  ],
};

const SPOTS_TOTAL = 7;

export function Offer() {
  const { lang } = useLanguage();
  const plans = PLANS[lang];
  const [spotsLeft, setSpotsLeft] = useState(SPOTS_TOTAL - 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft((prev) => {
        if (prev <= 2) return prev;
        if (Math.random() > 0.85) return prev - 1;
        return prev;
      });
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const goToCTA = () => {
    const el = document.querySelector('#cta');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SectionContainer
      id="offer"
      background="white"
      padding="lg"
      className="relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center max-w-3xl mx-auto mb-12">
        <ScrollReveal direction="up">
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-bold uppercase tracking-wider text-accent-700 bg-accent-100 rounded-full border border-accent-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-600" />
            </span>
            {lang === 'es' ? 'Oferta de lanzamiento · este mes' : 'Launch offer · this month'}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h2"
          animation="word-by-word"
          className="text-fluid-4xl md:text-fluid-5xl text-gray-900 mb-5 text-display-xl"
        >
          {lang === 'es'
            ? 'Elige tu plan y empieza a vender millones'
            : 'Pick your plan and start selling millions'}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.15}>
          <p className="text-lg text-gray-600">
            {lang === 'es'
              ? 'Sistemas listos para vender desde el día 14. Sin contratos largos, sin letras chiquitas, con garantía blindada por escrito.'
              : 'Sales-ready systems live by day 14. No long contracts, no fine print, written ironclad guarantee.'}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.25}>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {lang === 'es'
              ? `Solo ${spotsLeft} cupos disponibles este mes`
              : `Only ${spotsLeft} spots left this month`}
          </div>
        </ScrollReveal>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {plans.map((plan, idx) => (
          <ScrollReveal key={plan.id} direction="up" delay={0.1 * idx}>
            <div
              className={`relative h-full flex flex-col rounded-3xl p-8 transition-all duration-500 ${plan.popular
                  ? 'bg-gradient-to-br from-primary-900 via-primary-800 to-violet-900 text-white shadow-2xl scale-[1.02] md:scale-105 ring-2 ring-accent-400'
                  : 'bg-white text-gray-900 border-2 border-gray-100 hover:border-accent-200 hover:shadow-xl'
                }`}
            >
              {plan.popular && plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider text-white bg-gradient-to-r from-amber-500 via-pink-500 to-violet-500 shadow-lg">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-gray-200' : 'text-gray-500'}`}>
                  {plan.tagline}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-base line-through ${plan.popular ? 'text-gray-400' : 'text-gray-400'}`}>
                    {plan.oldPrice}
                  </span>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${plan.popular ? 'bg-amber-400 text-amber-950' : 'bg-red-100 text-red-700'}`}>
                    {lang === 'es' ? '-40%' : '-40%'}
                  </span>
                </div>
                <div className={`text-4xl md:text-5xl font-extrabold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </div>
                <p className={`text-xs mt-1 ${plan.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                  {plan.perMonth}
                </p>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm">
                    <span className={`flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full ${plan.popular ? 'bg-accent-400 text-primary-900' : 'bg-green-100 text-green-700'}`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className={plan.popular ? 'text-gray-100' : 'text-gray-700'}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={`mb-4 px-4 py-3 rounded-xl text-center text-sm font-semibold ${plan.popular ? 'bg-white/10 text-amber-300' : 'bg-amber-50 text-amber-800 border border-amber-100'}`}>
                {plan.results}
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={goToCTA}
                className={plan.popular ? 'bg-white text-primary-900 hover:bg-gray-100' : ''}
              >
                {plan.cta}
              </Button>

              <p className={`text-xs text-center mt-3 ${plan.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                {lang === 'es'
                  ? '✓ Garantía 30 días · Pagos protegidos'
                  : '✓ 30-day guarantee · Secure payments'}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Guarantee bar */}
      <ScrollReveal direction="up" delay={0.3}>
        <div className="mt-16 max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border-2 border-emerald-200 p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                {lang === 'es'
                  ? 'Garantía blindada de 30 días o te devolvemos cada peso'
                  : '30-day ironclad guarantee or your money back'}
              </h3>
              <p className="text-emerald-800">
                {lang === 'es'
                  ? 'Si no ves un retorno real en 30 días desde el lanzamiento, te devolvemos el 100% sin preguntas. Sin letra pequeña, sin trucos.'
                  : 'If you don\'t see real returns within 30 days of launch, you get 100% back, no questions asked. No fine print, no tricks.'}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionContainer>
  );
}
