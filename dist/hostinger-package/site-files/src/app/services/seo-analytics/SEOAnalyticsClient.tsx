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
  seoTechnical: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  keywords: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  content: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  backlinks: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  analytics: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  local: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

const content: Record<Language, ServiceContent> = {
  es: {
    hero: {
      badge: "SEO & Analytics",
      headline: "Si No Puedes Medirlo, No Puedes Mejorarlo",
      subheadline:
        "El 93% de las experiencias online empiezan con un buscador. Si no apareces, no existes. Así de simple.",
      problem: "Tenemos un sitio web pero nadie nos encuentra en Google...",
      primaryCTA: "Auditoría SEO Gratis",
      secondaryCTA: "Ver Caso de Éxito",
      scrollLabel: "Explorar",
      scrollAriaLabel: "Ir a funcionalidades",
    },
    features: {
      badge: "Servicios",
      headline: "SEO Que Realmente Mueve la Aguja",
      subheadline: "Estrategia integral de posicionamiento y analytics que convierte búsquedas en clientes.",
      items: [
        {
          icon: icons.seoTechnical,
          title: "SEO Técnico",
          description:
            "Optimizamos estructura: velocidad, indexación, schema, mobile-first. Los fundamentos que Google ama.",
          highlight: "Core Web Vitals optimizados",
        },
        {
          icon: icons.keywords,
          title: "Investigación de Keywords",
          description:
            "Identificamos las keywords que tu audiencia busca y que tienen intención de compra real.",
          highlight: "Keywords con alta intención",
        },
        {
          icon: icons.content,
          title: "SEO de Contenido",
          description:
            "Optimización y creación de contenido diseñado para rankear. Cada palabra con propósito.",
          highlight: "Content clusters estratégicos",
        },
        {
          icon: icons.backlinks,
          title: "Link Building",
          description:
            "Estrategias white-hat para construir autoridad con backlinks de calidad y sostenibles.",
          highlight: "Crecimiento de DA",
        },
        {
          icon: icons.analytics,
          title: "Analytics Avanzado",
          description:
            "GA4 completo, dashboards personalizados, tracking de conversiones y atribución confiable.",
          highlight: "Decisiones data-driven",
        },
        {
          icon: icons.local,
          title: "SEO Local",
          description:
            "Domina las búsquedas cercanas: Google Business, citas, reseñas y optimización local.",
          highlight: "Pack de 3 en Maps",
        },
      ],
    },
    process: {
      badge: "Metodología",
      headline: "El Camino Hacia el Page 1",
      subheadline: "Proceso estructurado de 12 meses que construye autoridad sostenible.",
      steps: [
        {
          step: "Mes 1",
          title: "Auditoría y Fundamentos",
          description:
            "Auditoría técnica, análisis de competencia, investigación de keywords y configuración de analytics.",
          duration: "4 semanas",
        },
        {
          step: "Mes 2-3",
          title: "Optimización Técnica",
          description:
            "Corrección de problemas, velocidad, schema y arquitectura. Base sólida antes de escalar.",
          duration: "8 semanas",
        },
        {
          step: "Mes 4-6",
          title: "Contenido y Autoridad",
          description:
            "Optimización de contenido existente, creación nueva y link building para ganar autoridad.",
          duration: "12 semanas",
        },
        {
          step: "Mes 7+",
          title: "Escala y Optimización",
          description:
            "Monitoreo de rankings, ajustes estratégicos y escalamiento de lo que funciona.",
          duration: "Continuo",
        },
      ],
    },
    caseStudy: {
      badge: "Caso de Éxito",
      headline: "De Invisible a Top 3 de Google",
      subheadline: "Cómo LegalPro Associates conquistó la primera página para sus keywords principales.",
      titles: {
        challenge: "El Desafío",
        solution: "La Solución",
        results: "Los Resultados",
      },
      data: {
        company: "LegalPro Associates",
        industry: "Servicios Legales",
        logo: "⚖️",
        challenge:
          "No aparecían en página uno para sus keywords. 95% del tráfico era pagado y el CAC era insostenible.",
        solution:
          "Estrategia SEO integral: correcciones técnicas, optimización de 50+ páginas, content hub legal y link building de calidad.",
        results:
          "En 12 meses dominaron la primera página para 15 keywords y redujeron 70% la dependencia de ads.",
        metrics: [
          { value: 450, suffix: "%", label: "Aumento tráfico orgánico" },
          { value: 15, suffix: "", label: "Keywords en Top 3" },
          { value: 70, suffix: "%", label: "Menos gasto en ads" },
          { value: 12, suffix: "x", label: "ROI primer año" },
        ],
        testimonial: {
          quote:
            "Pasamos de ser invisibles a recibir llamadas diarias de clientes que nos encuentran buscando. Transformó el negocio.",
          author: "Lic. Fernando Reyes",
          role: "Socio Director, LegalPro Associates",
        },
      },
    },
    pricing: {
      badge: "Inversión",
      headline: "Planes SEO & Analytics",
      subheadline: "Desde SEO local hasta estrategias enterprise.",
      guarantee: "Si no ves mejora en rankings en 6 meses, el séptimo mes es gratis.",
      tiers: [
        {
          name: "Local",
          price: "$1,200",
          period: "mes",
          description: "Para negocios locales que quieren dominar su zona.",
          features: [
            { text: "Auditoría SEO inicial", included: true },
            { text: "Google Business optimizado", included: true },
            { text: "SEO técnico básico", included: true },
            { text: "10 keywords target", included: true },
            { text: "Reportes mensuales", included: true },
            { text: "Content marketing", included: false },
            { text: "Link building", included: false },
            { text: "Analytics avanzado", included: false },
          ],
          cta: "Empezar Local",
        },
        {
          name: "Growth",
          price: "$2,500",
          period: "mes",
          description: "Para empresas que buscan crecer tráfico orgánico.",
          features: [
            { text: "Todo lo de Local", included: true },
            { text: "25 keywords target", included: true },
            { text: "SEO técnico avanzado", included: true },
            { text: "2 blog posts SEO/mes", included: true },
            { text: "Link building básico", included: true },
            { text: "GA4 configuración completa", included: true },
            { text: "Dashboard personalizado", included: true },
            { text: "Consultor dedicado", included: true },
          ],
          cta: "Elegir Growth",
          popular: true,
          badge: "Más Popular",
        },
        {
          name: "Enterprise",
          price: "$5,000",
          period: "mes",
          description: "Estrategia SEO agresiva para dominar tu industria.",
          features: [
            { text: "Keywords ilimitadas", included: true },
            { text: "4+ blog posts SEO/mes", included: true },
            { text: "Link building premium", included: true },
            { text: "Content clusters", included: true },
            { text: "Analytics + BI reporting", included: true },
            { text: "Technical SEO continuo", included: true },
            { text: "Competitor monitoring", included: true },
            { text: "Estrategia internacional", included: true },
          ],
          cta: "Hablar con Experto",
        },
      ],
    },
    faq: {
      badge: "FAQ",
      headline: "Preguntas Sobre SEO",
      subheadline: "Respuestas honestas sobre posicionamiento.",
      items: [
        {
          question: "¿Cuánto tiempo toma ver resultados?",
          answer:
            "SEO es mediano-largo plazo. Mejoras técnicas en semanas; resultados significativos 4-6 meses, ROI fuerte a 12 meses.",
        },
        {
          question: "¿Garantizan primera posición?",
          answer:
            "Nadie puede. Garantizamos mejora medible en rankings, tráfico y métricas de negocio.",
        },
        {
          question: "¿Qué pasa si los rankings bajan?",
          answer:
            "Monitoreamos cambios, investigamos caídas y ajustamos estrategia inmediatamente.",
        },
        {
          question: "¿Necesito contenido nuevo?",
          answer:
            "Optimizar lo existente primero; luego creamos contenido nuevo según los gaps detectados.",
        },
        {
          question: "¿Cómo configuran analytics respetando privacidad?",
          answer:
            "GA4 con mejores prácticas de privacidad: consent mode, retención adecuada, IP anonymization y cumplimiento regulatorio.",
        },
        {
          question: "¿Qué herramientas usan?",
          answer:
            "Ahrefs, SEMrush, Screaming Frog, Search Console, GA4, Looker Studio, entre otras según el trabajo.",
        },
      ],
      helpText: "¿Otra duda?",
      helpCTA: "Habla con nosotros",
    },
    cta: {
      headline: "¿Listo Para Aparecer Donde Te Buscan?",
      subheadline:
        "Solicita una auditoría SEO gratuita y descubre el potencial orgánico que estás dejando sobre la mesa.",
      primaryCTA: "Auditoría SEO Gratis",
      secondaryCTA: "Ver Más Casos",
      stats: [
        { value: 450, suffix: "%", label: "Crecimiento promedio" },
        { value: 200, suffix: "+", label: "Keywords en Top 10" },
        { value: 12, suffix: "x", label: "ROI primer año" },
        { value: 95, suffix: "%", label: "Retención de clientes" },
      ],
      urgencyText: "Solo 10 auditorías gratuitas disponibles este mes.",
      trustBadges: ["Respuesta en 24h", "Consultores senior", "Reportes claros"],
    },
  },
  en: {
    hero: {
      badge: "SEO & Analytics",
      headline: "If You Can't Measure It, You Can't Improve It",
      subheadline:
        "93% of online experiences start with search. If you're not there, you don't exist. It's that simple.",
      problem: "We have a website but no one finds us on Google...",
      primaryCTA: "Free SEO Audit",
      secondaryCTA: "View Case Study",
      scrollLabel: "Explore",
      scrollAriaLabel: "Scroll to features",
    },
    features: {
      badge: "Services",
      headline: "SEO That Actually Moves the Needle",
      subheadline: "End-to-end search strategy and analytics that turn searches into customers.",
      items: [
        {
          icon: icons.seoTechnical,
          title: "Technical SEO",
          description:
            "We optimize structure—speed, indexing, schema, mobile-first. The fundamentals Google rewards.",
          highlight: "Core Web Vitals dialed in",
        },
        {
          icon: icons.keywords,
          title: "Keyword Research",
          description:
            "We find the terms your audience truly searches for—high-intent keywords that drive revenue.",
          highlight: "High-intent keywords",
        },
        {
          icon: icons.content,
          title: "Content SEO",
          description:
            "We optimize existing content and create new pieces engineered to rank. Every word has a job.",
          highlight: "Strategic content clusters",
        },
        {
          icon: icons.backlinks,
          title: "Link Building",
          description:
            "White-hat strategies to build authority with sustainable, quality backlinks.",
          highlight: "DA growth",
        },
        {
          icon: icons.analytics,
          title: "Advanced Analytics",
          description:
            "Full GA4 setup, custom dashboards, conversion tracking, and trustworthy attribution.",
          highlight: "Data-driven decisions",
        },
        {
          icon: icons.local,
          title: "Local SEO",
          description:
            "Win nearby searches: optimized Google Business, citations, reviews, and local signals.",
          highlight: "Map Pack wins",
        },
      ],
    },
    process: {
      badge: "Methodology",
      headline: "The Road to Page One",
      subheadline: "A 12-month structured process that builds durable authority.",
      steps: [
        {
          step: "Month 1",
          title: "Audit & Foundations",
          description:
            "Technical audit, competitor analysis, keyword research, and analytics setup to set the baseline.",
          duration: "4 weeks",
        },
        {
          step: "Months 2-3",
          title: "Technical Optimization",
          description:
            "Fix issues, improve speed, implement schema, and strengthen information architecture before scaling.",
          duration: "8 weeks",
        },
        {
          step: "Months 4-6",
          title: "Content & Authority",
          description:
            "Optimize existing content, create new assets, and launch link building to earn authority.",
          duration: "12 weeks",
        },
        {
          step: "Month 7+",
          title: "Scale & Optimize",
          description:
            "Monitor rankings, adjust strategy, and double down on what's working.",
          duration: "Ongoing",
        },
      ],
    },
    caseStudy: {
      badge: "Case Study",
      headline: "From Invisible to Top 3 on Google",
      subheadline: "How LegalPro Associates took the first page for their core keywords.",
      titles: {
        challenge: "The Challenge",
        solution: "The Solution",
        results: "The Results",
      },
      data: {
        company: "LegalPro Associates",
        industry: "Legal Services",
        logo: "⚖️",
        challenge:
          "They weren't on page one for any main keywords. 95% of traffic was paid, making CAC unsustainable.",
        solution:
          "Full-stack SEO: critical technical fixes, optimization of 50+ service pages, a legal content hub, and quality link building.",
        results:
          "In 12 months they dominated page one for 15 keywords and cut paid spend reliance by 70%.",
        metrics: [
          { value: 450, suffix: "%", label: "Organic traffic growth" },
          { value: 15, suffix: "", label: "Keywords in Top 3" },
          { value: 70, suffix: "%", label: "Less ad spend" },
          { value: 12, suffix: "x", label: "First-year ROI" },
        ],
        testimonial: {
          quote:
            "We went from invisible to daily calls from people finding us on Google. It transformed the business.",
          author: "Fernando Reyes",
          role: "Managing Partner, LegalPro Associates",
        },
      },
    },
    pricing: {
      badge: "Investment",
      headline: "SEO & Analytics Plans",
      subheadline: "From local SEO to enterprise strategies.",
      guarantee: "If you don't see ranking improvement in 6 months, month seven is on us.",
      tiers: [
        {
          name: "Local",
          price: "$1,200",
          period: "mo",
          description: "For local businesses that want to own their area.",
          features: [
            { text: "Initial SEO audit", included: true },
            { text: "Optimized Google Business", included: true },
            { text: "Core technical SEO", included: true },
            { text: "10 target keywords", included: true },
            { text: "Monthly reports", included: true },
            { text: "Content marketing", included: false },
            { text: "Link building", included: false },
            { text: "Advanced analytics", included: false },
          ],
          cta: "Start Local",
        },
        {
          name: "Growth",
          price: "$2,500",
          period: "mo",
          description: "For companies ready to scale organic traffic.",
          features: [
            { text: "Everything in Local", included: true },
            { text: "25 target keywords", included: true },
            { text: "Advanced technical SEO", included: true },
            { text: "2 SEO blog posts/mo", included: true },
            { text: "Foundational link building", included: true },
            { text: "Full GA4 setup", included: true },
            { text: "Custom dashboard", included: true },
            { text: "Dedicated consultant", included: true },
          ],
          cta: "Choose Growth",
          popular: true,
          badge: "Most Popular",
        },
        {
          name: "Enterprise",
          price: "$5,000",
          period: "mo",
          description: "Aggressive SEO to dominate your category.",
          features: [
            { text: "Unlimited keywords", included: true },
            { text: "4+ SEO blog posts/mo", included: true },
            { text: "Premium link building", included: true },
            { text: "Content clusters", included: true },
            { text: "Analytics + BI reporting", included: true },
            { text: "Ongoing technical SEO", included: true },
            { text: "Competitor monitoring", included: true },
            { text: "International strategy", included: true },
          ],
          cta: "Talk to an Expert",
        },
      ],
    },
    faq: {
      badge: "FAQ",
      headline: "SEO Questions",
      subheadline: "Honest answers about ranking and analytics.",
      items: [
        {
          question: "How long to see results?",
          answer:
            "Technical wins can show in weeks; meaningful gains typically 4-6 months; strongest ROI around 12 months.",
        },
        {
          question: "Do you guarantee #1 on Google?",
          answer:
            "No one can. We guarantee measurable improvement in rankings, organic traffic, and business metrics.",
        },
        {
          question: "What if rankings drop?",
          answer:
            "We monitor constantly, investigate drops, and adjust strategy immediately.",
        },
        {
          question: "Do I need new content?",
          answer:
            "We start by optimizing what you have, then create new content to fill gaps and capture intent.",
        },
        {
          question: "How do you handle analytics and privacy?",
          answer:
            "GA4 with best-practice privacy: consent mode, proper retention, IP anonymization, and compliance with regulations.",
        },
        {
          question: "What tools do you use?",
          answer:
            "Ahrefs, SEMrush, Screaming Frog, Search Console, GA4, Looker Studio, and more depending on the job.",
        },
      ],
      helpText: "Still wondering something?",
      helpCTA: "Talk with us",
    },
    cta: {
      headline: "Ready to Show Up Where They Search?",
      subheadline:
        "Request a free SEO audit and see the organic potential you're leaving on the table.",
      primaryCTA: "Free SEO Audit",
      secondaryCTA: "See More Cases",
      stats: [
        { value: 450, suffix: "%", label: "Avg. growth" },
        { value: 200, suffix: "+", label: "Keywords in Top 10" },
        { value: 12, suffix: "x", label: "First-year ROI" },
        { value: 95, suffix: "%", label: "Client retention" },
      ],
      urgencyText: "Only 10 free audits available this month.",
      trustBadges: ["24h response", "Senior consultants", "Clear reporting"],
    },
  },
};

export default function SEOAnalyticsClient() {
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
