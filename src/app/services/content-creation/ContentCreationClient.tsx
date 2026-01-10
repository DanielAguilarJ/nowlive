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
  video: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  ),
  social: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
      />
    </svg>
  ),
  blog: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
      />
    </svg>
  ),
  copywriting: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  ),
  photography: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  strategy: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  ),
};

const content: Record<Language, ServiceContent> = {
  es: {
    hero: {
      badge: "Creación de Contenido",
      headline: "El Contenido Promedio Es Invisible",
      subheadline:
        "En un mundo de scroll infinito, tienes 3 segundos para capturar atención. Creamos contenido que detiene el scroll y genera acción.",
      problem: "Publicamos constantemente pero nadie interactúa...",
      primaryCTA: "Crear Contenido Que Convierte",
      secondaryCTA: "Ver Portfolio",
      scrollLabel: "Explorar",
      scrollAriaLabel: "Ir a funcionalidades",
    },
    features: {
      badge: "Servicios",
      headline: "Contenido Para Cada Canal",
      subheadline: "Un equipo creativo completo trabajando para hacer tu marca irresistible.",
      items: [
        {
          icon: icons.video,
          title: "Producción de Video",
          description:
            "Videos que capturan atención en los primeros 3 segundos. Desde reels hasta videos corporativos, producción de alta calidad que destaca.",
          highlight: "Videos optimizados por plataforma",
        },
        {
          icon: icons.social,
          title: "Social Media Content",
          description:
            "Contenido nativo para cada plataforma: Instagram, TikTok, LinkedIn, X. No replicamos, creamos específicamente para cada audiencia.",
          highlight: "Calendario editorial incluido",
        },
        {
          icon: icons.blog,
          title: "Blog & Artículos",
          description:
            "Contenido largo optimizado para SEO que posiciona tu marca como líder de pensamiento y atrae tráfico orgánico cualificado.",
          highlight: "SEO-first content",
        },
        {
          icon: icons.copywriting,
          title: "Copywriting Persuasivo",
          description:
            "Textos que venden. Landing pages, emails, ads, páginas de producto. Cada palabra tiene un propósito: convertir.",
          highlight: "Copy A/B testeado",
        },
        {
          icon: icons.photography,
          title: "Fotografía Profesional",
          description:
            "Sesiones para productos, equipo y lifestyle. Imágenes que cuentan historias y elevan la percepción de tu marca.",
          highlight: "Banco de imágenes propio",
        },
        {
          icon: icons.strategy,
          title: "Estrategia de Contenido",
          description:
            "Más que crear, planificamos. Calendarios editoriales, pilares de contenido, métricas de éxito. Contenido con propósito.",
          highlight: "ROI medible en cada pieza",
        },
      ],
    },
    process: {
      badge: "Proceso",
      headline: "Cómo Creamos Tu Contenido",
      subheadline: "Un sistema probado que mezcla creatividad con estrategia para resultados consistentes.",
      steps: [
        {
          step: "Paso 1",
          title: "Inmersión en Tu Marca",
          description:
            "Entendemos tu voz, valores, audiencia y competencia. Definimos guidelines y pilares temáticos que guían la creación.",
          duration: "1 semana",
        },
        {
          step: "Paso 2",
          title: "Planificación Editorial",
          description:
            "Construimos el calendario con temas, formatos y fechas. Cada pieza alineada con objetivos y momentos clave.",
          duration: "1 semana",
        },
        {
          step: "Paso 3",
          title: "Producción",
          description:
            "Nuestro equipo produce: redacción, diseño, fotografía, video. Todo pasa por tu aprobación antes de publicar.",
          duration: "Continuo",
        },
        {
          step: "Paso 4",
          title: "Publicación y Análisis",
          description:
            "Publicamos, monitoreamos performance y optimizamos. Reportes mensuales con insights accionables.",
          duration: "Continuo",
        },
      ],
    },
    caseStudy: {
      badge: "Caso de Éxito",
      headline: "De Invisible a Referente del Sector",
      subheadline: "Cómo Fitness Evolution multiplicó su engagement 8.5x con contenido estratégico.",
      titles: {
        challenge: "El Desafío",
        solution: "La Solución",
        results: "Los Resultados",
      },
      data: {
        company: "Fitness Evolution",
        industry: "Health & Fitness",
        logo: "💪",
        challenge:
          "Con un engagement del 0.8% y contenido genérico, la marca no destacaba en un mercado saturado de gimnasios.",
        solution:
          "Estrategia centrada en transformaciones reales, videos cortos de expertos y una voz auténtica y motivacional. Calendario que mezcla educación, inspiración y promoción.",
        results:
          "En 6 meses se convirtieron en referente local y generaron leads directos desde redes sociales.",
        metrics: [
          { value: 8.5, suffix: "x", label: "Aumento en engagement" },
          { value: 15, suffix: "K", label: "Nuevos seguidores" },
          { value: 340, suffix: "%", label: "Más leads desde social" },
          { value: 2.5, suffix: "M", label: "Impresiones mensuales" },
        ],
        testimonial: {
          quote:
            "NOWLIVE entendió nuestra marca mejor que nosotros mismos. El contenido que crean se ve increíble y genera resultados reales.",
          author: "Andrea Villarreal",
          role: "Directora de Marketing, Fitness Evolution",
        },
      },
    },
    pricing: {
      badge: "Planes",
      headline: "Elige Tu Nivel de Contenido",
      subheadline: "Desde presencia básica hasta dominación total. Planes mensuales flexibles.",
      guarantee: "Primer mes sin compromiso. Si no ves valor, puedes cancelar sin preguntas.",
      tiers: [
        {
          name: "Essential",
          price: "$1,500",
          period: "mes",
          description: "Ideal para mantener presencia consistente en redes.",
          features: [
            { text: "12 posts mensuales", included: true },
            { text: "4 stories/reels", included: true },
            { text: "Calendario editorial", included: true },
            { text: "Diseño gráfico incluido", included: true },
            { text: "Copy para cada pieza", included: true },
            { text: "Blog posts", included: false },
            { text: "Producción de video", included: false },
            { text: "Fotografía profesional", included: false },
          ],
          cta: "Empezar",
        },
        {
          name: "Growth",
          price: "$3,000",
          period: "mes",
          description: "Para marcas que quieren dominar su nicho en redes.",
          features: [
            { text: "20 posts mensuales", included: true },
            { text: "12 stories/reels", included: true },
            { text: "2 blog posts SEO", included: true },
            { text: "Diseño + copywriting", included: true },
            { text: "Producción de video básica", included: true },
            { text: "Community management", included: true },
            { text: "Reportes de performance", included: true },
            { text: "Consultor dedicado", included: true },
          ],
          cta: "Elegir Growth",
          popular: true,
          badge: "Más Popular",
        },
        {
          name: "Premium",
          price: "$6,000",
          period: "mes",
          description: "Solución completa para marcas ambiciosas.",
          features: [
            { text: "30+ posts mensuales", included: true },
            { text: "Contenido multiplataforma", included: true },
            { text: "4 blog posts SEO", included: true },
            { text: "Producción de video pro", included: true },
            { text: "Sesión fotográfica mensual", included: true },
            { text: "Influencer management", included: true },
            { text: "Paid media management", included: true },
            { text: "Estrategia personalizada", included: true },
          ],
          cta: "Contactar",
        },
      ],
    },
    faq: {
      badge: "FAQ",
      headline: "Preguntas Sobre Contenido",
      subheadline: "Todo lo que necesitas saber sobre nuestro servicio de creación de contenido.",
      items: [
        {
          question: "¿Quién crea el contenido?",
          answer:
            "Equipo in-house de copywriters, diseñadores, videógrafos y fotógrafos. No subcontratamos, aseguramos consistencia y conocimiento profundo de tu marca.",
        },
        {
          question: "¿Cuánto control tengo sobre el contenido?",
          answer:
            "Total. Todo pasa por tu aprobación antes de publicar. Puedes revisar, comentar y aprobar de forma eficiente.",
        },
        {
          question: "¿Pueden capturar la voz de mi marca?",
          answer:
            "Sí. Dedicamos la primera semana a inmersión: entrevistas, análisis y competencia. Creamos guidelines de voz que apruebas antes de producir.",
        },
        {
          question: "¿Qué pasa con el contenido si terminamos?",
          answer:
            "Todo lo creado es tuyo. Entregamos archivos originales, editables y derechos completos.",
        },
        {
          question: "¿Pueden manejar múltiples plataformas?",
          answer:
            "Sí, adaptamos cada pieza para maximizar performance en cada canal: formato, longitud, estilo y timing.",
        },
        {
          question: "¿Incluyen community management?",
          answer:
            "Planes Growth y Premium lo incluyen: respuesta a comentarios, mensajes y engagement proactivo. Essential solo creación.",
        },
      ],
      helpText: "¿No ves tu pregunta?",
      helpCTA: "Hablemos",
    },
    cta: {
      headline: "¿Listo Para Contenido Que Funciona?",
      subheadline:
        "Agenda una sesión de estrategia gratuita y obtén un análisis de tu contenido actual.",
      primaryCTA: "Agendar Sesión Gratis",
      secondaryCTA: "Ver Más Ejemplos",
      stats: [
        { value: 8.5, suffix: "x", label: "Engagement promedio" },
        { value: 500, suffix: "+", label: "Piezas creadas/mes" },
        { value: 340, suffix: "%", label: "Más leads desde social" },
        { value: 95, suffix: "%", label: "Retención de clientes" },
      ],
      urgencyText: "Solo trabajamos con 5 nuevas marcas por mes para mantener calidad.",
      trustBadges: ["Respuesta en 24h", "Equipo in-house", "Entrega puntual"],
    },
  },
  en: {
    hero: {
      badge: "Content Creation",
      headline: "Average Content Is Invisible",
      subheadline:
        "In an infinite scroll world you have 3 seconds to grab attention. We craft content that stops the scroll and drives action.",
      problem: "We post all the time but no one engages...",
      primaryCTA: "Create Content That Converts",
      secondaryCTA: "View Portfolio",
      scrollLabel: "Explore",
      scrollAriaLabel: "Scroll to features",
    },
    features: {
      badge: "Services",
      headline: "Content for Every Channel",
      subheadline: "A full creative team making your brand irresistible.",
      items: [
        {
          icon: icons.video,
          title: "Video Production",
          description:
            "Videos that hook in the first 3 seconds. From reels to corporate, high-quality production that stands out.",
          highlight: "Platform-optimized videos",
        },
        {
          icon: icons.social,
          title: "Social Media Content",
          description:
            "Native content for each platform: Instagram, TikTok, LinkedIn, X. We don't copy-paste—we create for each audience.",
          highlight: "Editorial calendar included",
        },
        {
          icon: icons.blog,
          title: "Blog & Articles",
          description:
            "Long-form SEO content that positions your brand as a thought leader and attracts qualified organic traffic.",
          highlight: "SEO-first content",
        },
        {
          icon: icons.copywriting,
          title: "Persuasive Copywriting",
          description:
            "Words that sell. Landing pages, emails, ads, product pages—every word drives conversion.",
          highlight: "A/B tested copy",
        },
        {
          icon: icons.photography,
          title: "Professional Photography",
          description:
            "Shoots for products, team, and lifestyle. Images that tell stories and elevate your brand perception.",
          highlight: "Owned image library",
        },
        {
          icon: icons.strategy,
          title: "Content Strategy",
          description:
            "Beyond creation, we plan. Editorial calendars, content pillars, success metrics. Content with a purpose.",
          highlight: "Measurable ROI per piece",
        },
      ],
    },
    process: {
      badge: "Process",
      headline: "How We Build Your Content",
      subheadline: "A proven system that blends creativity and strategy for consistent results.",
      steps: [
        {
          step: "Step 1",
          title: "Brand Immersion",
          description:
            "We learn your voice, values, audience, and competitors. We define guidelines and pillars that steer creation.",
          duration: "1 week",
        },
        {
          step: "Step 2",
          title: "Editorial Planning",
          description:
            "We build the calendar with topics, formats, and dates—each piece aligned to goals and key moments.",
          duration: "1 week",
        },
        {
          step: "Step 3",
          title: "Production",
          description:
            "Our team produces writing, design, photography, and video. You approve everything before it goes live.",
          duration: "Ongoing",
        },
        {
          step: "Step 4",
          title: "Publishing & Analysis",
          description:
            "We publish, monitor performance, and optimize. Monthly reports with actionable insights.",
          duration: "Ongoing",
        },
      ],
    },
    caseStudy: {
      badge: "Case Study",
      headline: "From Invisible to Category Reference",
      subheadline: "How Fitness Evolution grew engagement 8.5x with strategic content.",
      titles: {
        challenge: "The Challenge",
        solution: "The Solution",
        results: "The Results",
      },
      data: {
        company: "Fitness Evolution",
        industry: "Health & Fitness",
        logo: "💪",
        challenge:
          "With 0.8% engagement and generic posts, the brand blended into a saturated fitness market.",
        solution:
          "Strategy focused on real member transformations, expert short-form videos, and an authentic, motivating voice. Calendar mixing education, inspiration, and promotion.",
        results:
          "In 6 months they became the local reference and generated leads directly from social.",
        metrics: [
          { value: 8.5, suffix: "x", label: "Engagement increase" },
          { value: 15, suffix: "K", label: "New followers" },
          { value: 340, suffix: "%", label: "More leads from social" },
          { value: 2.5, suffix: "M", label: "Monthly impressions" },
        ],
        testimonial: {
          quote:
            "NOWLIVE understood our brand better than we did. The content looks incredible and delivers real results.",
          author: "Andrea Villarreal",
          role: "Marketing Director, Fitness Evolution",
        },
      },
    },
    pricing: {
      badge: "Plans",
      headline: "Choose Your Content Level",
      subheadline: "From basics to total domination. Flexible monthly plans.",
      guarantee: "First month risk-free. If you don't see value, cancel—no questions asked.",
      tiers: [
        {
          name: "Essential",
          price: "$1,500",
          period: "mo",
          description: "Perfect to keep a consistent social presence.",
          features: [
            { text: "12 posts per month", included: true },
            { text: "4 stories/reels", included: true },
            { text: "Editorial calendar", included: true },
            { text: "Graphic design included", included: true },
            { text: "Copy for every piece", included: true },
            { text: "Blog posts", included: false },
            { text: "Video production", included: false },
            { text: "Pro photography", included: false },
          ],
          cta: "Start",
        },
        {
          name: "Growth",
          price: "$3,000",
          period: "mo",
          description: "For brands that want to own their niche on social.",
          features: [
            { text: "20 posts per month", included: true },
            { text: "12 stories/reels", included: true },
            { text: "2 SEO blog posts", included: true },
            { text: "Design + copywriting", included: true },
            { text: "Basic video production", included: true },
            { text: "Community management", included: true },
            { text: "Performance reporting", included: true },
            { text: "Dedicated consultant", included: true },
          ],
          cta: "Choose Growth",
          popular: true,
          badge: "Most Popular",
        },
        {
          name: "Premium",
          price: "$6,000",
          period: "mo",
          description: "Complete solution for ambitious brands.",
          features: [
            { text: "30+ posts per month", included: true },
            { text: "Multiplatform content", included: true },
            { text: "4 SEO blog posts", included: true },
            { text: "Pro video production", included: true },
            { text: "Monthly photo shoot", included: true },
            { text: "Influencer management", included: true },
            { text: "Paid media management", included: true },
            { text: "Custom strategy", included: true },
          ],
          cta: "Contact",
        },
      ],
    },
    faq: {
      badge: "FAQ",
      headline: "Content Questions",
      subheadline: "Everything you need to know about our content creation service.",
      items: [
        {
          question: "Who creates the content?",
          answer:
            "An in-house team of copywriters, designers, videographers, and photographers. No outsourcing means consistent quality and brand understanding.",
        },
        {
          question: "How much control do I have?",
          answer:
            "Complete control. You review and approve everything before publishing through an efficient feedback workflow.",
        },
        {
          question: "Can you match our brand voice?",
          answer:
            "Yes. We spend the first week in deep immersion—interviews, content audit, competitors—to craft voice guidelines you approve before production.",
        },
        {
          question: "What happens to the content if we stop working together?",
          answer:
            "Everything we create is yours. We deliver all originals, editables, and full rights.",
        },
        {
          question: "Can you handle multiple platforms?",
          answer:
            "Yes, and we tailor each piece per channel for format, length, style, and timing to maximize performance.",
        },
        {
          question: "Do you include community management?",
          answer:
            "Growth and Premium include it—comments, DMs, proactive engagement. Essential focuses on creation only.",
        },
      ],
      helpText: "Don't see your question?",
      helpCTA: "Let's talk",
    },
    cta: {
      headline: "Ready for Content That Performs?",
      subheadline:
        "Book a free strategy session and get an audit of your current content.",
      primaryCTA: "Book Free Session",
      secondaryCTA: "See More Examples",
      stats: [
        { value: 8.5, suffix: "x", label: "Avg. engagement lift" },
        { value: 500, suffix: "+", label: "Pieces produced/mo" },
        { value: 340, suffix: "%", label: "More leads from social" },
        { value: 95, suffix: "%", label: "Client retention" },
      ],
      urgencyText: "We only take 5 new brands per month to maintain quality.",
      trustBadges: ["24h response", "In-house team", "On-time delivery"],
    },
  },
};

export default function ContentCreationClient() {
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
