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
  responsive: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  speed: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  seo: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  conversion: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  secure: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  support: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

const content: Record<Language, ServiceContent> = {
  es: {
    hero: {
      badge: "Diseño & Desarrollo Web",
      headline: "Tu Sitio Web Te Está Costando Más De Lo Que Crees",
      subheadline:
        "Cada día sin un sitio web optimizado son clientes que eligen a tu competencia. No es solo diseño bonito, es una máquina de conversión.",
      problem: "Tenemos un sitio web, pero nadie nos contacta desde ahí...",
      primaryCTA: "Obtener Propuesta Gratis",
      secondaryCTA: "Ver Caso de Éxito",
      scrollLabel: "Explorar",
      scrollAriaLabel: "Ir a funcionalidades",
    },
    features: {
      badge: "Por Qué Elegirnos",
      headline: "Más Que Un Sitio Web, Una Inversión en Tu Negocio",
      subheadline:
        "Cada característica está diseñada para convertir visitantes en clientes y hacer crecer tu negocio.",
      items: [
        {
          icon: icons.responsive,
          title: "Diseño Responsive",
          description:
            "Tu sitio se ve perfecto en cualquier dispositivo. Móvil, tablet, desktop - una experiencia impecable en todas las pantallas.",
          highlight: "100% adaptable a todos los dispositivos",
        },
        {
          icon: icons.speed,
          title: "Velocidad de Carga",
          description:
            "Cada segundo cuenta. Optimizamos cada elemento para que tu sitio cargue en menos de 3 segundos y no pierdas clientes.",
          highlight: "Core Web Vitals optimizados",
        },
        {
          icon: icons.seo,
          title: "SEO Integrado",
          description:
            "Construimos tu sitio pensando en Google desde el primer día. Estructura, metadatos y contenido optimizado para rankings.",
          highlight: "Arquitectura SEO desde el diseño",
        },
        {
          icon: icons.conversion,
          title: "Optimizado para Conversión",
          description:
            "No solo visitantes, queremos clientes. Cada elemento está diseñado para guiar al usuario hacia la acción.",
          highlight: "CTAs estratégicamente posicionados",
        },
        {
          icon: icons.secure,
          title: "Seguridad SSL",
          description:
            "Protegemos la información de tus visitantes con certificados SSL y las mejores prácticas de seguridad web.",
          highlight: "HTTPS y protección contra ataques",
        },
        {
          icon: icons.support,
          title: "Soporte Continuo",
          description:
            "No te dejamos solo después del lanzamiento. Mantenimiento, actualizaciones y soporte técnico incluidos.",
          highlight: "Asistencia técnica 24/7",
        },
      ],
    },
    process: {
      badge: "Nuestro Proceso",
      headline: "Cómo Creamos Tu Presencia Digital",
      subheadline: "Un proceso probado que garantiza resultados excepcionales en cada proyecto.",
      steps: [
        {
          step: "Fase 1",
          title: "Descubrimiento y Estrategia",
          description:
            "Entendemos tu negocio, tu audiencia y tus objetivos. Analizamos a tu competencia y definimos la estrategia digital que te diferenciará.",
          duration: "1-2 semanas",
        },
        {
          step: "Fase 2",
          title: "Diseño UX/UI",
          description:
            "Creamos wireframes y prototipos interactivos. Cada pantalla, cada botón, cada interacción está diseñada pensando en la experiencia del usuario.",
          duration: "2-3 semanas",
        },
        {
          step: "Fase 3",
          title: "Desarrollo",
          description:
            "Transformamos el diseño en código limpio y optimizado. Utilizamos tecnologías modernas que garantizan velocidad, seguridad y escalabilidad.",
          duration: "3-4 semanas",
        },
        {
          step: "Fase 4",
          title: "Lanzamiento y Optimización",
          description:
            "Testing exhaustivo, optimización de rendimiento y lanzamiento. Después, monitoreamos métricas y ajustamos para maximizar resultados.",
          duration: "1 semana + continuo",
        },
      ],
    },
    caseStudy: {
      badge: "Caso de Éxito",
      headline: "Resultados Que Hablan Por Sí Solos",
      subheadline: "Descubre cómo transformamos la presencia digital de CloudSync Solutions.",
      titles: {
        challenge: "El Desafío",
        solution: "La Solución",
        results: "Los Resultados",
      },
      data: {
        company: "CloudSync Solutions",
        industry: "Software B2B",
        logo: "☁️",
        challenge:
          "Su sitio web anterior generaba menos del 1% de conversión y los visitantes abandonaban en los primeros 10 segundos. El diseño no transmitía profesionalismo y la navegación era confusa.",
        solution:
          "Rediseñamos completamente su presencia digital con una estrategia centrada en conversión. Implementamos un nuevo diseño visual, mejoramos la arquitectura de información y creamos landing pages específicas para cada servicio.",
        results:
          "En 90 días, CloudSync experimentó una transformación digital completa que superó todas las expectativas del equipo directivo.",
        metrics: [
          { value: 340, suffix: "%", label: "Aumento en conversiones" },
          { value: 67, suffix: "%", label: "Reducción en tasa de rebote" },
          { value: 2.1, suffix: "s", label: "Tiempo de carga" },
          { value: 150, suffix: "%", label: "Más leads cualificados" },
        ],
        testimonial: {
          quote:
            "NOWLIVE no solo rediseñó nuestro sitio web, transformaron cómo nuestros clientes nos perciben. Las conversiones hablan por sí solas.",
          author: "María García",
          role: "CEO, CloudSync Solutions",
        },
      },
    },
    pricing: {
      badge: "Inversión",
      headline: "Elige Tu Plan",
      subheadline: "Planes flexibles diseñados para cada etapa de tu negocio.",
      guarantee: "30 días de garantía de satisfacción. Si no estás contento, te devolvemos tu inversión.",
      tiers: [
        {
          name: "Starter",
          price: "$2,500",
          description:
            "Ideal para emprendedores y pequeños negocios que necesitan presencia profesional online.",
          features: [
            { text: "Diseño responsive personalizado", included: true },
            { text: "Hasta 5 páginas", included: true },
            { text: "Optimización SEO básica", included: true },
            { text: "Formulario de contacto", included: true },
            { text: "Certificado SSL", included: true },
            { text: "Blog integrado", included: false },
            { text: "E-commerce", included: false },
            { text: "Soporte prioritario", included: false },
          ],
          cta: "Comenzar Proyecto",
        },
        {
          name: "Professional",
          price: "$5,500",
          description: "Para empresas que buscan crecer y destacar con funcionalidades avanzadas.",
          features: [
            { text: "Diseño responsive personalizado", included: true },
            { text: "Hasta 15 páginas", included: true },
            { text: "Optimización SEO avanzada", included: true },
            { text: "Blog con CMS", included: true },
            { text: "Certificado SSL", included: true },
            { text: "Integración con CRM", included: true },
            { text: "Analytics avanzado", included: true },
            { text: "Soporte prioritario 3 meses", included: true },
          ],
          cta: "Elegir Professional",
          popular: true,
          badge: "Más Popular",
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "Soluciones a medida para grandes empresas con necesidades específicas.",
          features: [
            { text: "Diseño completamente a medida", included: true },
            { text: "Páginas ilimitadas", included: true },
            { text: "E-commerce completo", included: true },
            { text: "Integraciones personalizadas", included: true },
            { text: "Multi-idioma", included: true },
            { text: "Servidor dedicado", included: true },
            { text: "SLA garantizado", included: true },
            { text: "Soporte prioritario 12 meses", included: true },
          ],
          cta: "Contactar Ventas",
        },
      ],
    },
    faq: {
      badge: "Preguntas Frecuentes",
      headline: "¿Tienes Dudas?",
      subheadline: "Respondemos las preguntas más comunes sobre nuestro servicio de diseño web.",
      items: [
        {
          question: "¿Cuánto tiempo toma desarrollar un sitio web?",
          answer:
            "Un sitio web típico toma entre 6-10 semanas desde el concepto hasta el lanzamiento. Esto incluye la fase de descubrimiento, diseño, desarrollo y testing. Proyectos más complejos como e-commerce pueden tomar 12-16 semanas.",
        },
        {
          question: "¿Qué tecnologías utilizan?",
          answer:
            "Utilizamos las tecnologías más modernas y eficientes según las necesidades de cada proyecto: Next.js, React, WordPress, Shopify, y más. Elegimos la mejor herramienta para garantizar velocidad, seguridad y escalabilidad.",
        },
        {
          question: "¿El sitio será fácil de actualizar por mi cuenta?",
          answer:
            "Absolutamente. Todos nuestros sitios incluyen un CMS intuitivo que te permite actualizar contenido, imágenes y productos sin conocimientos técnicos. Además, proporcionamos capacitación y documentación completa.",
        },
        {
          question: "¿Incluyen hosting y dominio?",
          answer:
            "El primer año de hosting está incluido en todos nuestros planes. El dominio puede ser adquirido a través de nosotros o podemos trabajar con tu dominio existente. Después del primer año, el hosting tiene un costo de mantenimiento accesible.",
        },
        {
          question: "¿Qué pasa si necesito cambios después del lanzamiento?",
          answer:
            "Ofrecemos planes de mantenimiento mensual que incluyen actualizaciones, cambios menores y soporte técnico. Para cambios mayores, te proporcionamos un presupuesto transparente antes de comenzar.",
        },
        {
          question: "¿Cómo garantizan la seguridad del sitio?",
          answer:
            "Implementamos múltiples capas de seguridad: certificados SSL, firewalls, copias de seguridad automáticas, actualizaciones de seguridad regulares y monitoreo 24/7. Tu sitio y los datos de tus clientes están protegidos.",
        },
      ],
      helpText: "¿No encuentras lo que buscas?",
      helpCTA: "Contáctanos directamente",
    },
    cta: {
      headline: "¿Listo Para Transformar Tu Presencia Digital?",
      subheadline:
        "Agenda una consulta gratuita y descubre cómo podemos ayudarte a convertir más visitantes en clientes.",
      primaryCTA: "Agendar Consulta Gratis",
      secondaryCTA: "Ver Más Casos de Éxito",
      stats: [
        { value: 150, suffix: "+", label: "Proyectos Entregados" },
        { value: 340, suffix: "%", label: "Aumento Promedio" },
        { value: 98, suffix: "%", label: "Clientes Satisfechos" },
        { value: 24, suffix: "h", label: "Tiempo de Respuesta" },
      ],
      urgencyText: "Solo aceptamos 3 proyectos nuevos por mes para garantizar calidad.",
      trustBadges: ["Garantía de Satisfacción", "Respuesta en 24h", "+50 Clientes Satisfechos"],
    },
  },
  en: {
    hero: {
      badge: "Web Design & Development",
      headline: "Your Website Is Costing You More Than You Think",
      subheadline:
        "Every day without an optimized site is another day customers pick your competition. It's not just pretty design—it's a conversion engine.",
      problem: "We have a website, but no one contacts us from it...",
      primaryCTA: "Get a Free Proposal",
      secondaryCTA: "View Case Study",
      scrollLabel: "Explore",
      scrollAriaLabel: "Scroll to features",
    },
    features: {
      badge: "Why Choose Us",
      headline: "More Than a Website—A Growth Asset",
      subheadline:
        "Every capability is built to turn visitors into customers and grow your business.",
      items: [
        {
          icon: icons.responsive,
          title: "Responsive Design",
          description:
            "Your site looks flawless on any device. Mobile, tablet, desktop—an impeccable experience everywhere.",
          highlight: "100% adaptive across devices",
        },
        {
          icon: icons.speed,
          title: "Page Speed",
          description:
            "Every second counts. We optimize everything so your site loads in under 3 seconds and you don't lose customers.",
          highlight: "Core Web Vitals optimized",
        },
        {
          icon: icons.seo,
          title: "Built-In SEO",
          description:
            "We design for Google from day one. Structure, metadata, and content engineered to rank.",
          highlight: "SEO architecture baked into design",
        },
        {
          icon: icons.conversion,
          title: "Conversion Focused",
          description:
            "Visitors aren't enough—we want customers. Every element guides users to take action.",
          highlight: "Strategically placed CTAs",
        },
        {
          icon: icons.secure,
          title: "SSL Security",
          description:
            "We protect your visitors with SSL certificates and web security best practices.",
          highlight: "HTTPS and attack protection",
        },
        {
          icon: icons.support,
          title: "Ongoing Support",
          description:
            "We don't disappear after launch. Maintenance, updates, and technical support included.",
          highlight: "24/7 technical assistance",
        },
      ],
    },
    process: {
      badge: "Our Process",
      headline: "How We Build Your Presence",
      subheadline: "A proven process that delivers standout results every time.",
      steps: [
        {
          step: "Phase 1",
          title: "Discovery & Strategy",
          description:
            "We learn your business, audience, and goals. We analyze competitors and define the digital strategy that sets you apart.",
          duration: "1-2 weeks",
        },
        {
          step: "Phase 2",
          title: "UX/UI Design",
          description:
            "We craft wireframes and interactive prototypes. Every screen, button, and interaction is designed for user experience.",
          duration: "2-3 weeks",
        },
        {
          step: "Phase 3",
          title: "Development",
          description:
            "We translate design into clean, optimized code. Modern tech for speed, security, and scalability.",
          duration: "3-4 weeks",
        },
        {
          step: "Phase 4",
          title: "Launch & Optimization",
          description:
            "Thorough testing, performance tuning, and launch. Then we monitor metrics and adjust to maximize results.",
          duration: "1 week + ongoing",
        },
      ],
    },
    caseStudy: {
      badge: "Case Study",
      headline: "Results That Speak",
      subheadline: "See how we transformed CloudSync Solutions' digital presence.",
      titles: {
        challenge: "The Challenge",
        solution: "The Solution",
        results: "The Results",
      },
      data: {
        company: "CloudSync Solutions",
        industry: "B2B Software",
        logo: "☁️",
        challenge:
          "Their previous site converted under 1% and visitors bounced within 10 seconds. The design felt unprofessional and navigation was confusing.",
        solution:
          "We completely redesigned their digital presence with a conversion-first strategy. New visual system, improved information architecture, and service-specific landing pages.",
        results:
          "In 90 days CloudSync experienced a full digital transformation that exceeded leadership expectations.",
        metrics: [
          { value: 340, suffix: "%", label: "Conversion lift" },
          { value: 67, suffix: "%", label: "Bounce rate reduction" },
          { value: 2.1, suffix: "s", label: "Load time" },
          { value: 150, suffix: "%", label: "More qualified leads" },
        ],
        testimonial: {
          quote:
            "NOWLIVE didn't just redesign our site—they transformed how customers perceive us. The conversions speak for themselves.",
          author: "Maria Garcia",
          role: "CEO, CloudSync Solutions",
        },
      },
    },
    pricing: {
      badge: "Investment",
      headline: "Choose Your Plan",
      subheadline: "Flexible plans built for every stage of your business.",
      guarantee: "30-day satisfaction guarantee. If you're not happy, we refund your investment.",
      tiers: [
        {
          name: "Starter",
          price: "$2,500",
          description: "Perfect for founders and small businesses needing a professional presence.",
          features: [
            { text: "Custom responsive design", included: true },
            { text: "Up to 5 pages", included: true },
            { text: "Basic SEO optimization", included: true },
            { text: "Contact form", included: true },
            { text: "SSL certificate", included: true },
            { text: "Integrated blog", included: false },
            { text: "E-commerce", included: false },
            { text: "Priority support", included: false },
          ],
          cta: "Start Project",
        },
        {
          name: "Professional",
          price: "$5,500",
          description: "For companies looking to grow with advanced capabilities.",
          features: [
            { text: "Custom responsive design", included: true },
            { text: "Up to 15 pages", included: true },
            { text: "Advanced SEO optimization", included: true },
            { text: "CMS blog", included: true },
            { text: "SSL certificate", included: true },
            { text: "CRM integration", included: true },
            { text: "Advanced analytics", included: true },
            { text: "Priority support 3 months", included: true },
          ],
            cta: "Choose Professional",
          popular: true,
          badge: "Most Popular",
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "Tailored solutions for large organizations with specific needs.",
          features: [
            { text: "Fully bespoke design", included: true },
            { text: "Unlimited pages", included: true },
            { text: "Full e-commerce", included: true },
            { text: "Custom integrations", included: true },
            { text: "Multi-language", included: true },
            { text: "Dedicated hosting", included: true },
            { text: "Guaranteed SLA", included: true },
            { text: "Priority support 12 months", included: true },
          ],
          cta: "Contact Sales",
        },
      ],
    },
    faq: {
      badge: "FAQ",
      headline: "Questions About Web Design?",
      subheadline: "We answer the most common questions about our web design service.",
      items: [
        {
          question: "How long does it take to build a site?",
          answer:
            "A typical site takes 6-10 weeks from concept to launch, covering discovery, design, development, and testing. Complex builds like e-commerce can take 12-16 weeks.",
        },
        {
          question: "Which technologies do you use?",
          answer:
            "We pick the best stack for each project: Next.js, React, WordPress, Shopify, and more to ensure speed, security, and scalability.",
        },
        {
          question: "Will I be able to update the site myself?",
          answer:
            "Absolutely. Every site includes an intuitive CMS so you can edit content, images, and products without technical skills. We also provide training and documentation.",
        },
        {
          question: "Do you include hosting and domain?",
          answer:
            "Year one of hosting is included in all plans. Domains can be purchased through us or we can work with your existing domain. After the first year, hosting has an affordable maintenance cost.",
        },
        {
          question: "What if I need changes after launch?",
          answer:
            "We offer monthly maintenance plans for updates, minor changes, and support. For larger changes we provide a clear estimate before starting.",
        },
        {
          question: "How do you keep the site secure?",
          answer:
            "Multiple layers of security: SSL certificates, firewalls, automated backups, regular security updates, and 24/7 monitoring. Your site and customer data stay protected.",
        },
      ],
      helpText: "Can't find what you need?",
      helpCTA: "Talk to us",
    },
    cta: {
      headline: "Ready to Transform Your Digital Presence?",
      subheadline:
        "Book a free consultation to see how we can help you turn more visitors into customers.",
      primaryCTA: "Book a Free Call",
      secondaryCTA: "See More Case Studies",
      stats: [
        { value: 150, suffix: "+", label: "Projects Delivered" },
        { value: 340, suffix: "%", label: "Average uplift" },
        { value: 98, suffix: "%", label: "Client satisfaction" },
        { value: 24, suffix: "h", label: "Response time" },
      ],
      urgencyText: "We take only 3 new projects per month to ensure quality.",
      trustBadges: ["Satisfaction Guarantee", "24h Response", "50+ Happy Clients"],
    },
  },
};

export default function WebDesignClient() {
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
