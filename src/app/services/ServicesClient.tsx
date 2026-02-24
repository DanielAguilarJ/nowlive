"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Header, Footer, CTA, Stats } from "@/components/sections";
import {
  SectionContainer,
  TiltCard,
  ParticlesBackground,
  ScrollReveal,
  Badge,
  Typewriter,
  MagneticButton,
  ScrollProgress,
} from "@/components/ui";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getTranslations } from "@/lib/i18n";

const serviceIcons: Record<string, string> = {
  "Diseno & Desarrollo Web": "\u{1F310}",
  "Web Design & Development": "\u{1F310}",
  "Estrategia Digital": "\u{1F4CA}",
  "Digital Strategy": "\u{1F4CA}",
  "Marketing Automation": "\u2699\uFE0F",
  "Creacion de Contenido": "\u270D\uFE0F",
  "Content Creation": "\u270D\uFE0F",
  "SEO & Analytics": "\u{1F50D}",
  "Identidad de Marca": "\u{1F3A8}",
  "Brand Identity": "\u{1F3A8}",
};

/* ── Inline testimonial quotes per service card ──────────────── */
const serviceTestimonials: Record<string, { es: string; en: string; author: string }> = {
  "/services/web-design": {
    es: "Nuestra web nueva convierte 3x mas que la anterior.",
    en: "Our new site converts 3x more than the old one.",
    author: "Carlos M., CEO Retail DTC",
  },
  "/services/digital-strategy": {
    es: "Pasamos de improvisar a tener un roadmap claro con KPIs reales.",
    en: "We went from guessing to a clear roadmap with real KPIs.",
    author: "Lucia P., CMO SaaS B2B",
  },
  "/services/marketing-automation": {
    es: "Los workflows automatizados nos ahorraron 20h/semana en ventas.",
    en: "Automated workflows saved our sales team 20h/week.",
    author: "Emily Z., VP Growth Fintech",
  },
  "/services/content-creation": {
    es: "Nuestro engagement subio un 150% en 3 meses.",
    en: "Our engagement jumped 150% in 3 months.",
    author: "Ana R., Marketing Director",
  },
  "/services/seo-analytics": {
    es: "Triplicamos el trafico organico en 6 meses.",
    en: "We tripled organic traffic in 6 months.",
    author: "James W., Head of Digital",
  },
  "/services/brand-identity": {
    es: "La nueva marca nos posiciono como lideres del sector.",
    en: "The new brand positioned us as industry leaders.",
    author: "Sofia M., Brand Manager",
  },
};

/* ── Animated Counter Hook ──────────────────────────────────── */
function useAnimatedCounter(target: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    if (!startOnView || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) animate();
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animate, startOnView]);

  return { count, ref };
}

/* ── AnimatedStat component ─────────────────────────────────── */
function AnimatedStat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { count, ref } = useAnimatedCounter(value, 2200);
  return (
    <ScrollReveal delay={delay}>
      <div
        ref={ref}
        className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 text-center group hover:-translate-y-1 transition-transform duration-300"
      >
        <p className="text-4xl md:text-5xl font-black text-primary-900 tracking-tighter text-mono-number">
          {count}
          {suffix}
        </p>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mt-2">
          {label}
        </p>
      </div>
    </ScrollReveal>
  );
}

export default function ServicesClient() {
  const { lang } = useLanguage();
  const t = getTranslations(lang);

  const headline =
    lang === "es"
      ? ["que convierten.", "que escalan.", "que inspiran."]
      : ["that convert.", "that scale.", "that inspire."];

  /* ── Process steps data ────────────────────────────────────── */
  const processSteps = lang === "es"
    ? [
        { num: "01", title: "Descubrimiento", icon: "\u{1F50E}" },
        { num: "02", title: "Estrategia", icon: "\u{1F3AF}" },
        { num: "03", title: "Ejecucion", icon: "\u26A1" },
        { num: "04", title: "Optimizacion", icon: "\u{1F4C8}" },
      ]
    : [
        { num: "01", title: "Discovery", icon: "\u{1F50E}" },
        { num: "02", title: "Strategy", icon: "\u{1F3AF}" },
        { num: "03", title: "Execution", icon: "\u26A1" },
        { num: "04", title: "Optimization", icon: "\u{1F4C8}" },
      ];

  /* ── Pricing plans data ────────────────────────────────────── */
  const plans = lang === "es"
    ? [
        {
          name: "Plan Basico",
          price: "Desde $999/mes",
          popular: false,
          features: [
            "1 servicio incluido",
            "Soporte por email",
            "Reportes mensuales",
          ],
          cta: "Empezar ahora",
        },
        {
          name: "Plan Pro",
          price: "Desde $2,499/mes",
          popular: true,
          features: [
            "3 servicios incluidos",
            "Manager dedicado",
            "Reportes semanales",
            "Estrategia personalizada",
          ],
          cta: "Elegir Pro",
        },
        {
          name: "Plan Enterprise",
          price: "Desde $4,999/mes",
          popular: false,
          features: [
            "Todos los servicios",
            "Equipo dedicado",
            "Reportes en tiempo real",
            "Consultoria estrategica",
            "SLA premium",
          ],
          cta: "Contactar ventas",
        },
      ]
    : [
        {
          name: "Basic Plan",
          price: "From $999/mo",
          popular: false,
          features: [
            "1 service included",
            "Email support",
            "Monthly reports",
          ],
          cta: "Get Started",
        },
        {
          name: "Pro Plan",
          price: "From $2,499/mo",
          popular: true,
          features: [
            "3 services included",
            "Dedicated manager",
            "Weekly reports",
            "Custom strategy",
          ],
          cta: "Choose Pro",
        },
        {
          name: "Enterprise",
          price: "From $4,999/mo",
          popular: false,
          features: [
            "All services included",
            "Dedicated team",
            "Real-time reports",
            "Strategic consulting",
            "Premium SLA",
          ],
          cta: "Contact Sales",
        },
      ];

  /* ── "Why Choose Us" items with counter values ─────────────── */
  const whyChooseUs = lang === "es"
    ? [
        {
          icon: "\u{1F4C8}",
          title: "Enfoque en ROI",
          desc: "Cada decision se toma pensando en el retorno de inversion. Medimos todo.",
          stat: { value: 3, suffix: "x", label: "ROI promedio" },
        },
        {
          icon: "\u{1F91D}",
          title: "Equipo dedicado",
          desc: "Un equipo senior asignado a tu proyecto, no juniors o freelancers.",
          stat: { value: 50, suffix: "+", label: "Expertos" },
        },
        {
          icon: "\u{1F504}",
          title: "Sin contratos largos",
          desc: "Flexibilidad total. Nos ganamos tu confianza cada mes con resultados.",
          stat: { value: 98, suffix: "%", label: "Retencion" },
        },
        {
          icon: "\u{1F4CA}",
          title: "Reportes transparentes",
          desc: "Dashboard en tiempo real con todas tus metricas y KPIs accesibles 24/7.",
          stat: { value: 24, suffix: "/7", label: "Acceso" },
        },
        {
          icon: "\u26A1",
          title: "Velocidad de ejecucion",
          desc: "Lanzamos en semanas, no meses. Velocidad sin sacrificar calidad.",
          stat: { value: 4, suffix: "sem", label: "Time-to-launch" },
        },
        {
          icon: "\u{1F30D}",
          title: "Cobertura global",
          desc: "Experiencia en mercados de America Latina, Espana y Estados Unidos.",
          stat: { value: 15, suffix: "+", label: "Paises" },
        },
      ]
    : [
        {
          icon: "\u{1F4C8}",
          title: "ROI Focus",
          desc: "Every decision is made with return on investment in mind. We measure everything.",
          stat: { value: 3, suffix: "x", label: "Avg ROI" },
        },
        {
          icon: "\u{1F91D}",
          title: "Dedicated Team",
          desc: "A senior team assigned to your project, not juniors or freelancers.",
          stat: { value: 50, suffix: "+", label: "Experts" },
        },
        {
          icon: "\u{1F504}",
          title: "No Long Contracts",
          desc: "Full flexibility. We earn your trust every month with results.",
          stat: { value: 98, suffix: "%", label: "Retention" },
        },
        {
          icon: "\u{1F4CA}",
          title: "Transparent Reports",
          desc: "Real-time dashboard with all your metrics and KPIs accessible 24/7.",
          stat: { value: 24, suffix: "/7", label: "Access" },
        },
        {
          icon: "\u26A1",
          title: "Execution Speed",
          desc: "We launch in weeks, not months. Speed without sacrificing quality.",
          stat: { value: 4, suffix: "wk", label: "Time-to-launch" },
        },
        {
          icon: "\u{1F30D}",
          title: "Global Reach",
          desc: "Experience in Latin America, Spain, and the United States markets.",
          stat: { value: 15, suffix: "+", label: "Countries" },
        },
      ];

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="pt-24">
        {/* ════════════════════════════════════════════
            HERO
            ════════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-24 lg:py-44 bg-primary-900 text-white">
          <ParticlesBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 to-primary-900 z-0" />

          <SectionContainer background="transparent" padding="sm">
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <ScrollReveal>
                <Badge className="mb-8 bg-accent-500 text-white border-none px-6 py-2 text-sm uppercase tracking-widest">
                  {lang === "es" ? "Servicios Completos" : "Full-Service Agency"}
                </Badge>
                <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter">
                  {lang === "es" ? "Soluciones digitales" : "Digital solutions"}
                  <span className="block text-accent-400 mt-2">
                    <Typewriter words={headline} />
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed opacity-90">
                  {t.services.description}
                </p>
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                  <MagneticButton>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-3 px-10 py-5 bg-accent-500 hover:bg-accent-600 text-white font-black uppercase tracking-widest text-sm rounded-full transition-all duration-300 shadow-xl hover:shadow-accent-500/40"
                    >
                      {lang === "es" ? "Hablemos de tu proyecto" : "Let's talk about your project"}
                    </Link>
                  </MagneticButton>
                  <Link
                    href="/casos-de-exito"
                    className="text-white/70 hover:text-white font-bold uppercase tracking-widest text-sm transition-colors"
                  >
                    {lang === "es" ? "Ver casos de exito \u2192" : "View case studies \u2192"}
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </SectionContainer>
        </section>

        {/* ════════════════════════════════════════════
            STATS STRIP (with animated counters)
            ════════════════════════════════════════════ */}
        <div className="relative z-20 -mt-16">
          <SectionContainer background="transparent" padding="sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { value: 150, suffix: "+", label: lang === "es" ? "Proyectos" : "Projects" },
                { value: 98, suffix: "%", label: lang === "es" ? "Satisfaccion" : "Satisfaction" },
                { value: 12, suffix: "+", label: lang === "es" ? "Anos" : "Years" },
                { value: 3, suffix: "x", label: "ROI" },
              ].map((stat, i) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </SectionContainer>
        </div>

        {/* ════════════════════════════════════════════
            PROCESS SUMMARY STRIP
            ════════════════════════════════════════════ */}
        <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 py-12 overflow-hidden">
          <SectionContainer background="transparent" padding="sm">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                  {processSteps.map((step, i) => (
                    <div key={step.num} className="flex items-center gap-2 md:gap-0 w-full md:w-auto">
                      {/* Step */}
                      <div className="flex items-center gap-4 group cursor-default">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-accent-500 flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent-500/30">
                            {step.icon}
                          </div>
                          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-500 text-white text-[10px] font-black flex items-center justify-center">
                            {step.num}
                          </span>
                        </div>
                        <span className="text-white font-bold text-sm md:text-base uppercase tracking-wider group-hover:text-accent-400 transition-colors duration-300">
                          {step.title}
                        </span>
                      </div>

                      {/* Arrow connector (not after last) */}
                      {i < processSteps.length - 1 && (
                        <div className="hidden md:flex items-center mx-6 flex-shrink-0">
                          <div className="w-12 lg:w-20 h-[2px] bg-gradient-to-r from-white/30 to-accent-500/50" />
                          <svg className="w-4 h-4 text-accent-400 -ml-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Mobile vertical connector */}
                      {i < processSteps.length - 1 && (
                        <div className="flex md:hidden flex-col items-center mx-auto my-1">
                          <div className="w-[2px] h-6 bg-gradient-to-b from-white/30 to-accent-500/50" />
                          <svg className="w-4 h-4 text-accent-400 -mt-1 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </SectionContainer>
        </section>

        {/* ════════════════════════════════════════════
            SERVICES GRID (with inline testimonials)
            ════════════════════════════════════════════ */}
        <SectionContainer background="white" padding="xl">
          <div className="text-center mb-20">
            <ScrollReveal>
              <Badge className="mb-6 text-accent-600 bg-accent-50 border border-accent-100">
                {t.services.badge}
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black text-primary-900 tracking-tighter">
                {t.services.title}
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.cards.map((service, index) => {
              const testimonial = serviceTestimonials[service.href];
              return (
                <ScrollReveal key={service.href} delay={index * 0.08}>
                  <TiltCard className="h-full">
                    <Link
                      href={service.href}
                      className="group flex flex-col h-full bg-white border border-gray-100 rounded-[2rem] p-10 hover:border-accent-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative"
                    >
                      {/* Gradient blob */}
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-500/5 rounded-full blur-3xl group-hover:bg-accent-500/10 transition-colors duration-500" />

                      <div className="relative z-10 flex flex-col h-full">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-primary-50 group-hover:bg-primary-900 flex items-center justify-center text-3xl mb-8 transition-colors duration-500 shadow-sm">
                          <span>{serviceIcons[service.title] ?? "\u26A1"}</span>
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-black text-primary-900 tracking-tight mb-4 group-hover:text-accent-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-gray-500 leading-relaxed mb-6 flex-grow">
                          {service.description}
                        </p>

                        {/* Inline testimonial quote */}
                        {testimonial && (
                          <div className="mb-6 p-4 bg-primary-50/60 rounded-xl border-l-4 border-accent-500 group-hover:bg-accent-50/60 transition-colors duration-500">
                            <p className="text-sm text-primary-700 italic leading-relaxed text-quote">
                              &ldquo;{lang === "es" ? testimonial.es : testimonial.en}&rdquo;
                            </p>
                            <p className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-wider">
                              &mdash; {testimonial.author}
                            </p>
                          </div>
                        )}

                        {/* Features */}
                        <ul className="space-y-2 mb-10">
                          {service.features.map((feat) => (
                            <li
                              key={feat}
                              className="flex items-center gap-3 text-sm text-gray-600"
                            >
                              <span className="w-5 h-5 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </span>
                              <span className="font-medium">{feat}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest text-accent-600 group-hover:gap-4 transition-all duration-300">
                          <span>{service.cta}</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </SectionContainer>

        {/* ════════════════════════════════════════════
            WHY CHOOSE US (improved with counters + hover)
            ════════════════════════════════════════════ */}
        <SectionContainer background="dark" padding="xl">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-20">
                <Badge className="mb-6 bg-accent-500 text-white border-none">
                  {lang === "es" ? "\u00BFPor que CreamosTech?" : "Why CreamosTech?"}
                </Badge>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                  {lang === "es"
                    ? "No somos una agencia mas"
                    : "We're not just another agency"}
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyChooseUs.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.08}>
                  <WhyChooseCard item={item} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionContainer>

        {/* ════════════════════════════════════════════
            PRICING SNAPSHOT
            ════════════════════════════════════════════ */}
        <SectionContainer background="white" padding="xl">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <Badge className="mb-6 text-accent-600 bg-accent-50 border border-accent-100">
                  {lang === "es" ? "Planes y Precios" : "Plans & Pricing"}
                </Badge>
                <h2 className="text-5xl md:text-7xl font-black text-primary-900 tracking-tighter">
                  {lang === "es"
                    ? "Invierte en crecimiento"
                    : "Invest in growth"}
                </h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-6 leading-relaxed">
                  {lang === "es"
                    ? "Planes flexibles que se adaptan a tu etapa. Sin contratos largos, sin sorpresas."
                    : "Flexible plans that fit your stage. No long contracts, no surprises."}
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {plans.map((plan, i) => (
                <ScrollReveal key={plan.name} delay={i * 0.12}>
                  <PricingCard plan={plan} lang={lang} />
                </ScrollReveal>
              ))}
            </div>

            {/* Fine print */}
            <ScrollReveal delay={0.4}>
              <p className="text-center text-sm text-gray-400 mt-10">
                {lang === "es"
                  ? "* Todos los planes incluyen onboarding gratuito. Precios en USD. IVA no incluido."
                  : "* All plans include free onboarding. Prices in USD. Tax not included."}
              </p>
            </ScrollReveal>
          </div>
        </SectionContainer>

        <CTA />
      </main>
      <Footer />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/* ── Why Choose Us Card with animated counter & hover ────────── */
function WhyChooseCard({
  item,
}: {
  item: {
    icon: string;
    title: string;
    desc: string;
    stat: { value: number; suffix: string; label: string };
  };
}) {
  const { count, ref } = useAnimatedCounter(item.stat.value, 2000);

  return (
    <div
      ref={ref}
      className="relative bg-white/5 border border-white/10 rounded-[2rem] p-8 transition-all duration-500 group hover:bg-white/[0.12] hover:border-accent-500/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-500/10 overflow-hidden"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-accent-500/10 via-transparent to-primary-500/10" />

      <div className="relative z-10">
        {/* Icon with animated ring */}
        <div className="relative w-14 h-14 mb-6">
          <div className="absolute inset-0 rounded-2xl bg-accent-500/20 group-hover:bg-accent-500/30 transition-colors duration-500 group-hover:scale-110 transform origin-center" />
          <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
            {item.icon}
          </div>
        </div>

        <h3 className="text-xl font-black text-white mb-3 group-hover:text-accent-400 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-primary-200 leading-relaxed mb-6">{item.desc}</p>

        {/* Animated counter pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 group-hover:bg-accent-500/20 rounded-full px-4 py-2 transition-colors duration-500">
          <span className="text-2xl font-black text-accent-400 text-mono-number">
            {count}
            {item.stat.suffix}
          </span>
          <span className="text-xs font-bold text-primary-300 uppercase tracking-wider">
            {item.stat.label}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Pricing Card ────────────────────────────────────────────── */
function PricingCard({
  plan,
  lang,
}: {
  plan: {
    name: string;
    price: string;
    popular: boolean;
    features: string[];
    cta: string;
  };
  lang: string;
}) {
  return (
    <div
      className={`
        relative flex flex-col h-full rounded-[2rem] p-10 transition-all duration-500 group
        ${
          plan.popular
            ? "bg-primary-900 text-white border-2 border-accent-500 shadow-2xl shadow-accent-500/20 scale-[1.03] hover:scale-[1.06]"
            : "bg-white text-primary-900 border border-gray-200 hover:border-accent-200 hover:shadow-xl hover:-translate-y-2"
        }
      `}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1.5 bg-accent-500 text-white text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-lg shadow-accent-500/40">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {lang === "es" ? "Mas Popular" : "Most Popular"}
          </span>
        </div>
      )}

      {/* Plan name */}
      <h3
        className={`text-2xl font-black tracking-tight mb-2 ${
          plan.popular ? "text-white" : "text-primary-900"
        }`}
      >
        {plan.name}
      </h3>

      {/* Price */}
      <p
        className={`text-4xl font-black tracking-tighter mb-8 text-mono-number ${
          plan.popular ? "text-accent-400" : "text-accent-600"
        }`}
      >
        {plan.price}
      </p>

      {/* Features */}
      <ul className="space-y-4 mb-10 flex-grow">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-center gap-3">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                plan.popular ? "bg-accent-500" : "bg-accent-500"
              }`}
            >
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span
              className={`font-medium text-sm ${
                plan.popular ? "text-primary-100" : "text-gray-600"
              }`}
            >
              {feat}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <MagneticButton>
        <Link
          href="/contact"
          className={`
            w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all duration-300
            ${
              plan.popular
                ? "bg-accent-500 hover:bg-accent-600 text-white shadow-lg hover:shadow-accent-500/40"
                : "bg-primary-900 hover:bg-primary-800 text-white shadow-md hover:shadow-xl"
            }
          `}
        >
          {plan.cta}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </MagneticButton>
    </div>
  );
}
