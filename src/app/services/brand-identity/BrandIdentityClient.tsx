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
  strategy: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  logo: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  visual: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  voice: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  ),
  guidelines: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  applications: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
};

const content: Record<Language, ServiceContent> = {
  es: {
    hero: {
      badge: "Identidad de Marca",
      headline: "Una Marca Olvidable Es Una Marca Ignorada",
      subheadline:
        "En un mercado saturado, la diferenciación visual no es opcional. Es la diferencia entre ser recordado o ser invisible.",
      problem: "Tenemos competidores que cobran más pero tienen mejor imagen...",
      primaryCTA: "Crear Mi Marca",
      secondaryCTA: "Ver Portfolio",
      scrollLabel: "Explorar",
      scrollAriaLabel: "Ir a funcionalidades",
    },
    features: {
      badge: "Qué Incluye",
      headline: "Todo Lo Que Necesitas Para Una Marca Memorable",
      subheadline: "Un sistema de identidad completo que hace tu marca inolvidable.",
      items: [
        {
          icon: icons.strategy,
          title: "Estrategia de Marca",
          description:
            "Definimos propósito, valores, personalidad y posicionamiento. La base estratégica que guía todas las decisiones visuales.",
          highlight: "Brand positioning único",
        },
        {
          icon: icons.logo,
          title: "Diseño de Logotipo",
          description:
            "Más que un símbolo bonito: un logo memorable que funciona en cualquier tamaño y contexto sin perder identidad.",
          highlight: "Sistema de logo completo",
        },
        {
          icon: icons.visual,
          title: "Sistema Visual",
          description:
            "Paleta, tipografías, iconografía, patrones, estilo fotográfico. Elementos que vuelven tu marca reconocible.",
          highlight: "Consistencia visual 360°",
        },
        {
          icon: icons.voice,
          title: "Voz y Tono",
          description:
            "Cómo habla tu marca. Guidelines de comunicación para ser consistente en cada punto de contacto.",
          highlight: "Personalidad definida",
        },
        {
          icon: icons.guidelines,
          title: "Manual de Marca",
          description:
            "Documento completo con reglas de uso para equipo y proveedores. Claridad total para evitar usos incorrectos.",
          highlight: "Documentación exhaustiva",
        },
        {
          icon: icons.applications,
          title: "Aplicaciones",
          description:
            "Tarjetas, papelería, templates, firmas de email. Tu marca aplicada a lo que usas día a día.",
          highlight: "Listo para usar",
        },
      ],
    },
    process: {
      badge: "Proceso",
      headline: "Cómo Creamos Tu Identidad",
      subheadline: "Un proceso de 8 semanas que mezcla estrategia y creatividad.",
      steps: [
        {
          step: "Semana 1-2",
          title: "Descubrimiento",
          description:
            "Inmersión en negocio, audiencia y competencia. Workshops para definir valores, personalidad y diferenciadores.",
          duration: "2 semanas",
        },
        {
          step: "Semana 3-4",
          title: "Exploración Creativa",
          description:
            "Moodboards, conceptos de logo, paletas. Presentamos opciones y recogemos feedback para refinar.",
          duration: "2 semanas",
        },
        {
          step: "Semana 5-6",
          title: "Refinamiento",
          description:
            "Perfeccionamos la dirección elegida y desarrollamos el sistema visual completo y aplicaciones clave.",
          duration: "2 semanas",
        },
        {
          step: "Semana 7-8",
          title: "Entrega Final",
          description:
            "Manual completo, archivos en todos los formatos y templates listos. Handoff con tu equipo.",
          duration: "2 semanas",
        },
      ],
    },
    caseStudy: {
      badge: "Caso de Éxito",
      headline: "De Obsoleto a Referente del Sector",
      subheadline: "Cómo el rebranding de Nexus Ventures transformó su percepción en el mercado.",
      titles: {
        challenge: "El Desafío",
        solution: "La Solución",
        results: "Los Resultados",
      },
      data: {
        company: "Nexus Ventures",
        industry: "Venture Capital",
        logo: "💎",
        challenge:
          "Imagen desactualizada que no reflejaba sofisticación ni innovación. Perdían deals porque no se percibían como partners modernos.",
        solution:
          "Nueva identidad: refresh de naming, logo contemporáneo con simbolismo, sistema visual premium y voz que equilibra autoridad con cercanía.",
        results:
          "El rebranding los posicionó como el fondo más atractivo para startups tech, aumentando el deal flow.",
        metrics: [
          { value: 85, suffix: "%", label: "Mejor percepción de marca" },
          { value: 140, suffix: "%", label: "Más deal flow" },
          { value: 60, suffix: "%", label: "Mejor retención" },
          { value: 3, suffix: "x", label: "PR y menciones" },
        ],
        testimonial: {
          quote:
            "El rebranding de NOWLIVE cambió cómo nos percibe el mercado. Comunica exactamente quiénes somos y a quién servimos.",
          author: "Patricia Sánchez",
          role: "Managing Partner, Nexus Ventures",
        },
      },
    },
    pricing: {
      badge: "Inversión",
      headline: "Paquetes de Branding",
      subheadline: "Desde bases sólidas hasta rebrandings completos.",
      guarantee: "Revisiones ilimitadas hasta que estés 100% satisfecho con tu nueva marca.",
      tiers: [
        {
          name: "Essential",
          price: "$3,500",
          description: "Para startups y negocios nuevos que necesitan base sólida.",
          features: [
            { text: "Brief de marca", included: true },
            { text: "Diseño de logotipo", included: true },
            { text: "Paleta de colores", included: true },
            { text: "Selección tipográfica", included: true },
            { text: "Mini manual de marca", included: true },
            { text: "Tarjeta de presentación", included: true },
            { text: "Estrategia de marca", included: false },
            { text: "Sistema visual completo", included: false },
          ],
          cta: "Comenzar",
        },
        {
          name: "Professional",
          price: "$7,500",
          description: "Identidad completa para destacar en tu industria.",
          features: [
            { text: "Estrategia de marca", included: true },
            { text: "Sistema de logo completo", included: true },
            { text: "Sistema visual integral", included: true },
            { text: "Voz y tono de marca", included: true },
            { text: "Manual de marca completo", included: true },
            { text: "Papelería corporativa", included: true },
            { text: "Templates de presentación", included: true },
            { text: "Social media kit", included: true },
          ],
          cta: "Elegir Professional",
          popular: true,
          badge: "Recomendado",
        },
        {
          name: "Enterprise",
          price: "$15,000",
          description: "Rebranding integral para empresas establecidas.",
          features: [
            { text: "Todo lo de Professional", included: true },
            { text: "Investigación de mercado", included: true },
            { text: "Arquitectura de marca", included: true },
            { text: "Guidelines de fotografía", included: true },
            { text: "Iconografía custom", included: true },
            { text: "Motion brand guidelines", included: true },
            { text: "Brand rollout strategy", included: true },
            { text: "Training para equipo", included: true },
          ],
          cta: "Consultar",
        },
      ],
    },
    faq: {
      badge: "FAQ",
      headline: "Preguntas Sobre Branding",
      subheadline: "Todo lo que necesitas saber de nuestro proceso.",
      items: [
        {
          question: "¿Cuántas propuestas de logo presentan?",
          answer:
            "3-4 direcciones conceptuales distintas (no variaciones). Luego refinamos la elegida hasta que esté perfecta.",
        },
        {
          question: "¿Puedo participar en el proceso creativo?",
          answer:
            "Sí, lo fomentamos. Workshops, feedback y iteraciones colaborativas.",
        },
        {
          question: "¿Qué pasa si no me gusta ninguna propuesta?",
          answer:
            "Volvemos a exploración sin costo adicional. No entregamos algo con lo que no estés satisfecho.",
        },
        {
          question: "¿En qué formatos entregan?",
          answer:
            "AI, EPS, PDF, SVG, PNG, JPG en RGB y CMYK. Editables y finales, organizados para fácil acceso.",
        },
        {
          question: "¿Incluyen derechos de uso completos?",
          answer:
            "Sí, propiedad intelectual total una vez completado el proyecto. Uso perpetuo y sin regalías.",
        },
        {
          question: "¿Pueden ayudar con naming?",
          answer:
            "Sí, ofrecemos naming por separado con revisión de dominio y marca. Si ya tienes nombre, trabajamos con él.",
        },
      ],
      helpText: "¿Otra pregunta?",
      helpCTA: "Agenda una llamada",
    },
    cta: {
      headline: "¿Listo Para Una Marca Que Te Represente?",
      subheadline:
        "Agenda una sesión de descubrimiento gratuita y descubre el potencial de tu marca.",
      primaryCTA: "Agendar Sesión Gratuita",
      secondaryCTA: "Ver Más Casos",
      stats: [
        { value: 85, suffix: "%", label: "Mejor percepción" },
        { value: 100, suffix: "+", label: "Marcas creadas" },
        { value: 98, suffix: "%", label: "Satisfacción" },
        { value: 8, suffix: "", label: "Semanas promedio" },
      ],
      urgencyText: "Solo 2 proyectos de branding por mes para dedicar tiempo completo.",
      trustBadges: ["Respuesta en 24h", "Equipo senior", "Archivos listos para producción"],
    },
  },
  en: {
    hero: {
      badge: "Brand Identity",
      headline: "A Forgettable Brand Is an Ignored Brand",
      subheadline:
        "In a crowded market, visual differentiation isn't optional—it's the gap between remembered and invisible.",
      problem: "Competitors charge more but look better...",
      primaryCTA: "Build My Brand",
      secondaryCTA: "View Portfolio",
      scrollLabel: "Explore",
      scrollAriaLabel: "Scroll to features",
    },
    features: {
      badge: "What's Included",
      headline: "Everything You Need for a Memorable Brand",
      subheadline: "A complete identity system that makes your brand unforgettable.",
      items: [
        {
          icon: icons.strategy,
          title: "Brand Strategy",
          description:
            "Purpose, values, personality, positioning—the strategic foundation that guides every visual decision.",
          highlight: "Distinct positioning",
        },
        {
          icon: icons.logo,
          title: "Logo Design",
          description:
            "More than a pretty mark: a memorable logo that works at any size and context without losing identity.",
          highlight: "Complete logo system",
        },
        {
          icon: icons.visual,
          title: "Visual System",
          description:
            "Palette, type, iconography, patterns, photo style—the building blocks that make your brand recognizable.",
          highlight: "360° visual consistency",
        },
        {
          icon: icons.voice,
          title: "Voice & Tone",
          description:
            "How your brand speaks. Communication guidelines to stay consistent in every touchpoint.",
          highlight: "Defined personality",
        },
        {
          icon: icons.guidelines,
          title: "Brand Guidelines",
          description:
            "Comprehensive rulebook for your team and partners. Clarity to avoid misuse.",
          highlight: "Exhaustive documentation",
        },
        {
          icon: icons.applications,
          title: "Applications",
          description:
            "Cards, stationery, templates, email signatures—your brand applied to daily assets.",
          highlight: "Ready to use",
        },
      ],
    },
    process: {
      badge: "Process",
      headline: "How We Build Your Identity",
      subheadline: "An 8-week process blending strategy with creativity.",
      steps: [
        {
          step: "Weeks 1-2",
          title: "Discovery",
          description:
            "Deep dive into your business, audience, and competitors. Workshops to define values, personality, and differentiators.",
          duration: "2 weeks",
        },
        {
          step: "Weeks 3-4",
          title: "Creative Exploration",
          description:
            "Moodboards, logo concepts, palettes. We present options and gather feedback to refine.",
          duration: "2 weeks",
        },
        {
          step: "Weeks 5-6",
          title: "Refinement",
          description:
            "Perfect the chosen direction and develop the full visual system plus key applications.",
          duration: "2 weeks",
        },
        {
          step: "Weeks 7-8",
          title: "Final Delivery",
          description:
            "Full guidelines, files in every format, and ready-to-use templates. Handoff with your team.",
          duration: "2 weeks",
        },
      ],
    },
    caseStudy: {
      badge: "Case Study",
      headline: "From Outdated to Category Standout",
      subheadline: "How Nexus Ventures' rebrand reshaped market perception.",
      titles: {
        challenge: "The Challenge",
        solution: "The Solution",
        results: "The Results",
      },
      data: {
        company: "Nexus Ventures",
        industry: "Venture Capital",
        logo: "💎",
        challenge:
          "An outdated image that didn't reflect sophistication or innovation. They lost deals because founders didn't see them as modern partners.",
        solution:
          "A new identity: refreshed naming, contemporary logo with meaningful symbolism, premium visual system, and a voice balancing authority with warmth.",
        results:
          "The rebrand positioned them as the go-to VC for tech startups, significantly boosting deal flow.",
        metrics: [
          { value: 85, suffix: "%", label: "Brand perception lift" },
          { value: 140, suffix: "%", label: "Increase in deal flow" },
          { value: 60, suffix: "%", label: "Better portfolio retention" },
          { value: 3, suffix: "x", label: "PR and media mentions" },
        ],
        testimonial: {
          quote:
            "NOWLIVE's rebrand changed how the market sees us. It communicates exactly who we are and who we serve.",
          author: "Patricia Sánchez",
          role: "Managing Partner, Nexus Ventures",
        },
      },
    },
    pricing: {
      badge: "Investment",
      headline: "Branding Packages",
      subheadline: "From solid foundations to full rebrands.",
      guarantee: "Unlimited revisions until you're 100% happy with your brand.",
      tiers: [
        {
          name: "Essential",
          price: "$3,500",
          description: "For startups and new businesses that need a solid base.",
          features: [
            { text: "Brand brief", included: true },
            { text: "Logo design", included: true },
            { text: "Color palette", included: true },
            { text: "Typography selection", included: true },
            { text: "Mini brand guide", included: true },
            { text: "Business card", included: true },
            { text: "Brand strategy", included: false },
            { text: "Full visual system", included: false },
          ],
          cta: "Start",
        },
        {
          name: "Professional",
          price: "$7,500",
          description: "Complete identity to stand out in your industry.",
          features: [
            { text: "Brand strategy", included: true },
            { text: "Complete logo system", included: true },
            { text: "Full visual system", included: true },
            { text: "Voice and tone", included: true },
            { text: "Comprehensive brand guide", included: true },
            { text: "Corporate stationery", included: true },
            { text: "Presentation templates", included: true },
            { text: "Social media kit", included: true },
          ],
          cta: "Choose Professional",
          popular: true,
          badge: "Recommended",
        },
        {
          name: "Enterprise",
          price: "$15,000",
          description: "Full rebrand for established companies.",
          features: [
            { text: "Everything in Professional", included: true },
            { text: "Market research", included: true },
            { text: "Brand architecture", included: true },
            { text: "Photography guidelines", included: true },
            { text: "Custom iconography", included: true },
            { text: "Motion brand guidelines", included: true },
            { text: "Rollout strategy", included: true },
            { text: "Team training", included: true },
          ],
          cta: "Consult",
        },
      ],
    },
    faq: {
      badge: "FAQ",
      headline: "Branding Questions",
      subheadline: "Everything you need to know about our process.",
      items: [
        {
          question: "How many logo concepts do you present?",
          answer:
            "3-4 distinct concepts (not variations). We then refine the chosen direction until it's perfect.",
        },
        {
          question: "Can I be involved in the creative process?",
          answer:
            "Yes—we encourage it. Workshops, feedback loops, and collaborative iterations.",
        },
        {
          question: "What if I don't like any concept?",
          answer:
            "We return to exploration at no extra cost. We won't deliver something you're not proud of.",
        },
        {
          question: "What formats do you deliver?",
          answer:
            "AI, EPS, PDF, SVG, PNG, JPG in RGB and CMYK. Editable and final files, neatly organized.",
        },
        {
          question: "Do I get full usage rights?",
          answer:
            "Yes—full IP ownership once the project is done. Perpetual, royalty-free, across all media.",
        },
        {
          question: "Can you help with naming?",
          answer:
            "Yes, offered separately with domain and trademark checks. If you have a name, we work with it.",
        },
      ],
      helpText: "Still have a question?",
      helpCTA: "Book a call",
    },
    cta: {
      headline: "Ready for a Brand That Represents You?",
      subheadline:
        "Book a free discovery session and uncover your brand's potential.",
      primaryCTA: "Book Free Session",
      secondaryCTA: "See More Cases",
      stats: [
        { value: 85, suffix: "%", label: "Perception lift" },
        { value: 100, suffix: "+", label: "Brands created" },
        { value: 98, suffix: "%", label: "Client satisfaction" },
        { value: 8, suffix: "", label: "Avg. weeks" },
      ],
      urgencyText: "We only take 2 branding projects per month to stay hands-on.",
      trustBadges: ["24h response", "Senior team", "Production-ready files"],
    },
  },
};

export default function BrandIdentityClient() {
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
