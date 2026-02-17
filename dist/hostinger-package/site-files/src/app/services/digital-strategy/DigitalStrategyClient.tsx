"use client";

import { Header, Footer } from "@/components/sections";
import {
  ServiceHero,
  FeaturesGrid,
  ServiceProcess,
  CaseStudySection,
  PricingSection,
  FAQSection,
  ServiceCTA,
} from "@/components/services";
import type { Feature, ProcessStep, CaseStudy, PricingTier, FAQItem } from "@/components/services";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Language } from "@/components/providers/LanguageProvider";

type ServiceContent = {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    problem: string;
    primaryCTA: string;
    secondaryCTA: string;
    scrollLabel: string;
    scrollAriaLabel: string;
  };
  features: {
    badge: string;
    headline: string;
    subheadline: string;
    items: Feature[];
  };
  process: {
    badge: string;
    headline: string;
    subheadline: string;
    steps: ProcessStep[];
  };
  caseStudy: {
    badge: string;
    headline: string;
    subheadline: string;
    data: CaseStudy;
    titles: {
      challenge: string;
      solution: string;
      results: string;
    };
  };
  pricing: {
    badge: string;
    headline: string;
    subheadline: string;
    tiers: PricingTier[];
    guarantee?: string;
  };
  faq: {
    badge: string;
    headline: string;
    subheadline: string;
    items: FAQItem[];
    helpText?: string;
    helpCTA?: string;
  };
  cta: {
    headline: string;
    subheadline: string;
    primaryCTA: string;
    secondaryCTA?: string;
    stats?: Array<{ value: number; suffix: string; label: string }>;
    urgencyText?: string;
    trustBadges?: string[];
  };
};

const icons = {
  research: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  analytics: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  target: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  roadmap: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  competitive: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  roi: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const content: Record<Language, ServiceContent> = {
  es: {
    hero: {
      badge: "Estrategia Digital",
      headline: "Estrategia Sin Datos Es Solo Adivinanzas",
      subheadline:
        "El 73% de las empresas invierten en marketing digital sin una estrategia clara. No seas parte de esa estadística. Cada peso cuenta.",
      problem: "Estamos en todos lados pero nada parece funcionar consistentemente...",
      primaryCTA: "Solicitar Diagnóstico",
      secondaryCTA: "Ver Caso de Éxito",
      scrollLabel: "Explorar",
      scrollAriaLabel: "Ir a funcionalidades",
    },
    features: {
      badge: "Qué Incluye",
      headline: "Una Estrategia Que Realmente Funciona",
      subheadline: "No vendemos humo. Cada elemento está diseñado para generar resultados medibles.",
      items: [
        {
          icon: icons.research,
          title: "Investigación de Mercado",
          description:
            "Analizamos tu industria, competencia y audiencia para identificar oportunidades únicas que otros están ignorando.",
          highlight: "Análisis completo de mercado",
        },
        {
          icon: icons.analytics,
          title: "Auditoría Digital",
          description:
            "Evaluamos tu presencia digital actual: web, redes, SEO, ads. Identificamos qué funciona, qué no y dónde están las oportunidades.",
          highlight: "Diagnóstico de 360°",
        },
        {
          icon: icons.target,
          title: "Definición de Objetivos",
          description:
            "Establecemos KPIs claros y medibles alineados con tus metas de negocio. Sin métricas de vanidad.",
          highlight: "OKRs y KPIs accionables",
        },
        {
          icon: icons.roadmap,
          title: "Roadmap Estratégico",
          description:
            "Plan trimestral con prioridades claras, recursos necesarios y resultados esperados.",
          highlight: "Plan de ejecución detallado",
        },
        {
          icon: icons.competitive,
          title: "Análisis Competitivo",
          description:
            "Descubrimos qué hacen tus competidores, qué les funciona y cómo superarlos.",
          highlight: "Ventaja competitiva clara",
        },
        {
          icon: icons.roi,
          title: "Proyección de ROI",
          description:
            "Calculamos el retorno esperado de cada iniciativa. Cada peso invertido tiene un propósito.",
          highlight: "Inversión inteligente",
        },
      ],
    },
    process: {
      badge: "Metodología",
      headline: "Cómo Desarrollamos Tu Estrategia",
      subheadline: "Proceso estructurado que combina análisis riguroso con creatividad.",
      steps: [
        {
          step: "Semana 1-2",
          title: "Inmersión y Descubrimiento",
          description:
            "Entrevistas, análisis de datos históricos, investigación de mercado y auditoría digital completa.",
          duration: "2 semanas",
        },
        {
          step: "Semana 3",
          title: "Análisis y Diagnóstico",
          description:
            "Identificamos patrones, oportunidades y áreas de mejora. Mapeamos tu situación actual.",
          duration: "1 semana",
        },
        {
          step: "Semana 4",
          title: "Diseño de Estrategia",
          description:
            "Definimos canales, mensajes, tácticas, presupuestos y cronograma alineados a tus objetivos.",
          duration: "1 semana",
        },
        {
          step: "Semana 5+",
          title: "Presentación y Acompañamiento",
          description:
            "Presentamos la estrategia, documentación completa y sesiones de seguimiento mensuales.",
          duration: "Continuo",
        },
      ],
    },
    caseStudy: {
      badge: "Caso de Éxito",
      headline: "De Quemar Presupuesto a ROI Predecible",
      subheadline: "Cómo TechStart Ventures transformó su marketing con datos.",
      titles: {
        challenge: "El Desafío",
        solution: "La Solución",
        results: "Los Resultados",
      },
      data: {
        company: "TechStart Ventures",
        industry: "Startup B2B SaaS",
        logo: "🚀",
        challenge:
          "Invertían en múltiples canales sin resultados consistentes. CAC insostenible y falta de foco.",
        solution:
          "Auditoría completa, foco en los 2 canales con mejores leads, y funnel optimizado de conversión.",
        results:
          "En 6 meses lograron un sistema predecible de generación de leads con ROI sobresaliente.",
        metrics: [
          { value: 65, suffix: "%", label: "Reducción del CAC" },
          { value: 280, suffix: "%", label: "Aumento en leads cualificados" },
          { value: 4.2, suffix: "x", label: "ROI de marketing" },
          { value: 45, suffix: "%", label: "Aumento en conversión" },
        ],
        testimonial: {
          quote:
            "Por primera vez sabemos exactamente dónde invertir cada peso. La claridad estratégica transformó nuestro crecimiento.",
          author: "Carlos Mendoza",
          role: "Co-Founder, TechStart Ventures",
        },
      },
    },
    pricing: {
      badge: "Opciones",
      headline: "Niveles de Servicio",
      subheadline: "Desde diagnóstico hasta consultoría continua.",
      guarantee:
        "Si no identificamos al menos 3 oportunidades accionables en el diagnóstico, te devolvemos tu inversión.",
      tiers: [
        {
          name: "Diagnóstico",
          price: "$1,500",
          description: "Auditoría inicial para entender tu situación y oportunidades inmediatas.",
          features: [
            { text: "Auditoría digital completa", included: true },
            { text: "Análisis de competencia (3)", included: true },
            { text: "Informe de oportunidades", included: true },
            { text: "Sesión de presentación", included: true },
            { text: "Roadmap estratégico", included: false },
            { text: "Seguimiento mensual", included: false },
            { text: "Workshops con equipo", included: false },
          ],
          cta: "Solicitar Diagnóstico",
        },
        {
          name: "Estrategia Integral",
          price: "$4,500",
          description: "Plan estratégico completo con roadmap e implementación sugerida.",
          features: [
            { text: "Todo lo del plan Diagnóstico", included: true },
            { text: "Investigación de mercado profunda", included: true },
            { text: "Análisis de competencia (10)", included: true },
            { text: "Roadmap estratégico 12 meses", included: true },
            { text: "Definición de KPIs y OKRs", included: true },
            { text: "3 sesiones de seguimiento", included: true },
            { text: "Workshop de alineación", included: true },
          ],
            cta: "Desarrollar Estrategia",
          popular: true,
          badge: "Recomendado",
        },
        {
          name: "Consultoría Continua",
          price: "$2,000",
          period: "mes",
          description: "Acompañamiento estratégico continuo para empresas en crecimiento.",
          features: [
            { text: "Estrategia integral incluida", included: true },
            { text: "Reuniones semanales", included: true },
            { text: "Revisión de métricas en tiempo real", included: true },
            { text: "Ajustes estratégicos mensuales", included: true },
            { text: "Consultor dedicado", included: true },
            { text: "Workshops trimestrales", included: true },
            { text: "Reportes ejecutivos mensuales", included: true },
          ],
          cta: "Hablar con Consultor",
        },
      ],
    },
    faq: {
      badge: "FAQ",
      headline: "Preguntas Sobre Estrategia Digital",
      subheadline: "Resolvemos las dudas antes de invertir.",
      items: [
        {
          question: "¿En qué se diferencia estrategia de plan de marketing?",
          answer:
            "La estrategia define el marco y objetivos; el plan son las tácticas. Creamos ambos y los alineamos a negocio.",
        },
        {
          question: "¿Necesito datos históricos?",
          answer:
            "No es indispensable. Si no tienes datos, configuramos medición y benchmarks iniciales para empezar bien.",
        },
        {
          question: "¿Cuánto tarda ver resultados?",
          answer:
            "Mejoras rápidas pueden verse en 30 días; resultados estratégicos típicamente en 3-6 meses según tu caso.",
        },
        {
          question: "¿Implementan o solo diseñan estrategia?",
          answer:
            "Podemos diseñar y también ejecutar. Si prefieres, trabajamos junto a tu equipo para implementar.",
        },
        {
          question: "¿Cómo miden el éxito?",
          answer:
            "Definimos KPIs desde el inicio: leads, CAC, conversión, revenue, engagement. Dashboards en tiempo real.",
        },
        {
          question: "¿Trabajan cualquier industria?",
          answer:
            "Sí. Nos sumergimos en tu industria para crear una estrategia única sin importar el sector.",
        },
      ],
      helpText: "¿Necesitas algo más específico?",
      helpCTA: "Habla con un estratega",
    },
    cta: {
      headline: "¿Listo Para Dejar de Adivinar?",
      subheadline:
        "Agenda una llamada de diagnóstico gratuita de 30 minutos. Sin compromisos, solo valor.",
      primaryCTA: "Agendar Llamada Gratis",
      secondaryCTA: "Descargar Checklist",
      stats: [
        { value: 65, suffix: "%", label: "Reducción de CAC promedio" },
        { value: 4.2, suffix: "x", label: "ROI promedio" },
        { value: 50, suffix: "+", label: "Estrategias desarrolladas" },
        { value: 98, suffix: "%", label: "Clientes satisfechos" },
      ],
      urgencyText: "Ofrecemos 5 diagnósticos gratuitos al mes. Reserva ahora.",
      trustBadges: ["Garantía de valor", "Respuesta en 24h", "+50 clientes satisfechos"],
    },
  },
  en: {
    hero: {
      badge: "Digital Strategy",
      headline: "Strategy Without Data Is Guesswork",
      subheadline:
        "73% of companies invest in digital marketing without a clear strategy. Don't be part of that stat. Every dollar counts.",
      problem: "We're everywhere but nothing works consistently...",
      primaryCTA: "Request Diagnosis",
      secondaryCTA: "View Case Study",
      scrollLabel: "Explore",
      scrollAriaLabel: "Scroll to features",
    },
    features: {
      badge: "What’s Included",
      headline: "A Strategy That Actually Works",
      subheadline: "No fluff. Every element is built to deliver measurable results.",
      items: [
        {
          icon: icons.research,
          title: "Market Research",
          description:
            "We analyze your industry, competitors, and audience to uncover opportunities others miss.",
          highlight: "Full market analysis",
        },
        {
          icon: icons.analytics,
          title: "Digital Audit",
          description:
            "We review your current presence—site, socials, SEO, ads—to see what's working and what's not.",
          highlight: "360° diagnostics",
        },
        {
          icon: icons.target,
          title: "Goal Setting",
          description:
            "We establish clear, measurable KPIs aligned to business goals. No vanity metrics.",
          highlight: "Actionable OKRs & KPIs",
        },
        {
          icon: icons.roadmap,
          title: "Strategic Roadmap",
          description:
            "Quarterly plan with priorities, resources, and expected outcomes.",
          highlight: "Detailed execution plan",
        },
        {
          icon: icons.competitive,
          title: "Competitive Analysis",
          description:
            "We uncover what competitors do, what works for them, and how you can beat them.",
          highlight: "Clear competitive edge",
        },
        {
          icon: icons.roi,
          title: "ROI Projection",
          description:
            "We model expected return for each initiative. Every dollar has a purpose.",
          highlight: "Smart investment",
        },
      ],
    },
    process: {
      badge: "Methodology",
      headline: "How We Build Your Strategy",
      subheadline: "A structured process blending rigorous analysis and creativity.",
      steps: [
        {
          step: "Week 1-2",
          title: "Immersion & Discovery",
          description:
            "Interviews, historical data review, market research, and a full digital audit.",
          duration: "2 weeks",
        },
        {
          step: "Week 3",
          title: "Analysis & Diagnosis",
          description:
            "We spot patterns, opportunities, and gaps. We map your current state.",
          duration: "1 week",
        },
        {
          step: "Week 4",
          title: "Strategy Design",
          description:
            "Channels, messaging, tactics, budgets, and timeline aligned to your goals.",
          duration: "1 week",
        },
        {
          step: "Week 5+",
          title: "Presentation & Support",
          description:
            "We present the strategy, deliver full documentation, and run monthly follow-ups.",
          duration: "Ongoing",
        },
      ],
    },
    caseStudy: {
      badge: "Case Study",
      headline: "From Burning Budget to Predictable ROI",
      subheadline: "How TechStart Ventures transformed with data-driven marketing.",
      titles: {
        challenge: "The Challenge",
        solution: "The Solution",
        results: "The Results",
      },
      data: {
        company: "TechStart Ventures",
        industry: "B2B SaaS Startup",
        logo: "🚀",
        challenge:
          "They spent across many channels without consistent results. CAC was unsustainable and focus was missing.",
        solution:
          "Full audit, focus on the two best-performing channels, and an optimized conversion funnel.",
        results:
          "In 6 months they built a predictable lead engine with standout ROI.",
        metrics: [
          { value: 65, suffix: "%", label: "CAC reduction" },
          { value: 280, suffix: "%", label: "Qualified lead increase" },
          { value: 4.2, suffix: "x", label: "Marketing ROI" },
          { value: 45, suffix: "%", label: "Conversion lift" },
        ],
        testimonial: {
          quote:
            "For the first time we know exactly where every dollar goes. The strategic clarity changed our growth trajectory.",
          author: "Carlos Mendoza",
          role: "Co-Founder, TechStart Ventures",
        },
      },
    },
    pricing: {
      badge: "Options",
      headline: "Service Levels",
      subheadline: "From diagnosis to ongoing advisory.",
      guarantee:
        "If we don't find at least 3 actionable opportunities in the diagnosis, we refund your investment.",
      tiers: [
        {
          name: "Diagnosis",
          price: "$1,500",
          description: "Initial audit to understand your situation and quick wins.",
          features: [
            { text: "Full digital audit", included: true },
            { text: "Competitor analysis (3)", included: true },
            { text: "Opportunity report", included: true },
            { text: "Presentation session", included: true },
            { text: "Strategic roadmap", included: false },
            { text: "Monthly follow-up", included: false },
            { text: "Team workshops", included: false },
          ],
          cta: "Request Diagnosis",
        },
        {
          name: "Comprehensive Strategy",
          price: "$4,500",
          description: "Full strategic plan with roadmap and implementation guidance.",
          features: [
            { text: "Everything in Diagnosis", included: true },
            { text: "Deep market research", included: true },
            { text: "Competitor analysis (10)", included: true },
            { text: "12-month strategic roadmap", included: true },
            { text: "KPIs & OKRs definition", included: true },
            { text: "3 follow-up sessions", included: true },
            { text: "Alignment workshop", included: true },
          ],
            cta: "Develop Strategy",
          popular: true,
          badge: "Recommended",
        },
        {
          name: "Ongoing Advisory",
          price: "$2,000",
          period: "mo",
          description: "Continuous strategic support for scaling companies.",
          features: [
            { text: "Strategy included", included: true },
            { text: "Weekly meetings", included: true },
            { text: "Real-time metric review", included: true },
            { text: "Monthly strategic tweaks", included: true },
            { text: "Dedicated consultant", included: true },
            { text: "Quarterly workshops", included: true },
            { text: "Executive monthly reports", included: true },
          ],
          cta: "Talk to a Consultant",
        },
      ],
    },
    faq: {
      badge: "FAQ",
      headline: "Questions About Strategy",
      subheadline: "Answers before you invest.",
      items: [
        {
          question: "How is strategy different from a marketing plan?",
          answer:
            "Strategy sets the frame and goals; the plan is the tactics. We build both and align them to business outcomes.",
        },
        {
          question: "Do I need historical data?",
          answer:
            "Not required. If you lack data, we set up measurement and baseline benchmarks so you start right.",
        },
        {
          question: "When will we see results?",
          answer:
            "Quick wins can show in 30 days; deeper strategic results usually in 3-6 months depending on your case.",
        },
        {
          question: "Do you implement or only design strategy?",
          answer:
            "We can do both. We can execute or partner with your team to implement.",
        },
        {
          question: "How do you measure success?",
          answer:
            "We define KPIs from day one: leads, CAC, conversion, revenue, engagement—with real-time dashboards.",
        },
        {
          question: "Do you work across industries?",
          answer:
            "Yes. We dive into your industry to build a unique, tailored strategy regardless of sector.",
        },
      ],
      helpText: "Need something more specific?",
      helpCTA: "Talk to a Strategist",
    },
    cta: {
      headline: "Ready to Stop Guessing?",
      subheadline:
        "Book a free 30-minute diagnosis call. No commitments—just value.",
      primaryCTA: "Book a Free Call",
      secondaryCTA: "Download Checklist",
      stats: [
        { value: 65, suffix: "%", label: "Average CAC reduction" },
        { value: 4.2, suffix: "x", label: "Average ROI" },
        { value: 50, suffix: "+", label: "Strategies delivered" },
        { value: 98, suffix: "%", label: "Client satisfaction" },
      ],
      urgencyText: "We offer 5 free diagnosis sessions per month. Grab a slot now.",
      trustBadges: ["Value guarantee", "24h response", "50+ happy clients"],
    },
  },
};

export default function DigitalStrategyClient() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <>
      <Header />
      <main>
        <ServiceHero
          badge={t.hero.badge}
          headline={t.hero.headline}
          subheadline={t.hero.subheadline}
          problem={t.hero.problem}
          primaryCTA={t.hero.primaryCTA}
          secondaryCTA={t.hero.secondaryCTA}
          scrollLabel={t.hero.scrollLabel}
          scrollAriaLabel={t.hero.scrollAriaLabel}
        />

        <FeaturesGrid
          badge={t.features.badge}
          headline={t.features.headline}
          subheadline={t.features.subheadline}
          features={t.features.items}
        />

        <ServiceProcess
          badge={t.process.badge}
          headline={t.process.headline}
          subheadline={t.process.subheadline}
          steps={t.process.steps}
        />

        <CaseStudySection
          badge={t.caseStudy.badge}
          headline={t.caseStudy.headline}
          subheadline={t.caseStudy.subheadline}
          caseStudy={t.caseStudy.data}
          challengeTitle={t.caseStudy.titles.challenge}
          solutionTitle={t.caseStudy.titles.solution}
          resultsTitle={t.caseStudy.titles.results}
        />

        <PricingSection
          badge={t.pricing.badge}
          headline={t.pricing.headline}
          subheadline={t.pricing.subheadline}
          tiers={t.pricing.tiers}
          guarantee={t.pricing.guarantee}
        />

        <FAQSection
          badge={t.faq.badge}
          headline={t.faq.headline}
          subheadline={t.faq.subheadline}
          faqs={t.faq.items}
          helpText={t.faq.helpText}
          helpCTA={t.faq.helpCTA}
        />

        <ServiceCTA
          headline={t.cta.headline}
          subheadline={t.cta.subheadline}
          primaryCTA={t.cta.primaryCTA}
          secondaryCTA={t.cta.secondaryCTA}
          primaryCTALink="#cta"
          secondaryCTALink="#case-study"
          stats={t.cta.stats}
          urgencyText={t.cta.urgencyText}
          trustBadges={t.cta.trustBadges}
        />
      </main>
      <Footer />
    </>
  );
}
