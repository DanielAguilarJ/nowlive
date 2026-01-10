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
  workflows: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  email: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  scoring: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  crm: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  reporting: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  integration: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

const content: Record<Language, ServiceContent> = {
  es: {
    hero: {
      badge: "Marketing Automation",
      headline: "Tus Competidores Duermen, Pero Su Marketing No",
      subheadline:
        "Mientras tú descansas, un sistema inteligente nutre tus leads, califica prospectos y prepara ventas. Automatización 24/7.",
      problem: "Tenemos leads pero no podemos hacer seguimiento a todos...",
      primaryCTA: "Automatizar Mi Marketing",
      secondaryCTA: "Ver Demo",
      scrollLabel: "Explorar",
      scrollAriaLabel: "Ir a funcionalidades",
    },
    features: {
      badge: "Capacidades",
      headline: "Tu Equipo de Marketing Que Nunca Duerme",
      subheadline:
        "Cada funcionalidad está diseñada para multiplicar la eficiencia y maximizar conversiones.",
      items: [
        {
          icon: icons.workflows,
          title: "Workflows Automatizados",
          description:
            "Secuencias inteligentes que nutren leads automáticamente. El mensaje correcto, a la persona correcta, en el momento correcto.",
          highlight: "Personalización a escala",
        },
        {
          icon: icons.email,
          title: "Email Marketing Avanzado",
          description:
            "Emails dinámicos que se adaptan al comportamiento de cada usuario para maximizar engagement y conversión.",
          highlight: "Open rates +40%",
        },
        {
          icon: icons.scoring,
          title: "Lead Scoring Inteligente",
          description:
            "Sistema que identifica automáticamente qué leads están listos para comprar y cuáles necesitan nurturing.",
          highlight: "Priorización automática",
        },
        {
          icon: icons.crm,
          title: "Integración CRM",
          description:
            "Conectamos tu automatización con tu CRM para que ventas y marketing trabajen con la misma información.",
          highlight: "Datos sincronizados 24/7",
        },
        {
          icon: icons.reporting,
          title: "Reportes Automatizados",
          description:
            "Dashboards en tiempo real y reportes automáticos que muestran qué funciona y qué ajustar.",
          highlight: "Decisiones basadas en datos",
        },
        {
          icon: icons.integration,
          title: "Integraciones Custom",
          description:
            "Conectamos todas tus herramientas: Zapier, webhooks, APIs. Tu stack trabajando en armonía.",
          highlight: "+500 integraciones disponibles",
        },
      ],
    },
    process: {
      badge: "Implementación",
      headline: "Cómo Automatizamos Tu Marketing",
      subheadline: "Proceso estructurado que garantiza éxito sin frenar operaciones.",
      steps: [
        {
          step: "Fase 1",
          title: "Auditoría de Procesos",
          description:
            "Mapeamos tu proceso de ventas, identificamos cuellos de botella y oportunidades de automatización.",
          duration: "1 semana",
        },
        {
          step: "Fase 2",
          title: "Diseño de Automatizaciones",
          description:
            "Blueprint de workflows: triggers, condiciones, acciones y ramificaciones documentadas.",
          duration: "1-2 semanas",
        },
        {
          step: "Fase 3",
          title: "Implementación Técnica",
          description:
            "Configuramos plataforma, workflows, integraciones, emails y lead scoring.",
          duration: "2-3 semanas",
        },
        {
          step: "Fase 4",
          title: "Testing y Optimización",
          description:
            "Pruebas, A/B testing, ajustes de timing y mensajes. Lanzamiento controlado y mejora continua.",
          duration: "1 semana + continuo",
        },
      ],
    },
    caseStudy: {
      badge: "Caso de Éxito",
      headline: "De Perder Leads a Sistema Predecible",
      subheadline: "Cómo MedTech Pro recuperó 20 horas semanales automatizando.",
      titles: {
        challenge: "El Desafío",
        solution: "La Solución",
        results: "Los Resultados",
      },
      data: {
        company: "MedTech Pro",
        industry: "Healthcare B2B",
        logo: "⚕️",
        challenge:
          "El equipo de ventas gastaba 60% del tiempo en tareas repetitivas. Leads calientes se atendían tarde.",
        solution:
          "Sistema completo con HubSpot: nurturing, lead scoring por comportamiento, alertas a ventas y reportes automáticos.",
        results:
          "En 4 meses recuperaron más de 20 horas semanales y aumentaron conversiones.",
        metrics: [
          { value: 47, suffix: "%", label: "Aumento en conversión" },
          { value: 20, suffix: "h", label: "Horas recuperadas/sem" },
          { value: 3.5, suffix: "x", label: "Más leads calificados" },
          { value: 35, suffix: "%", label: "Reducción ciclo de venta" },
        ],
        testimonial: {
          quote:
            "Antes perdíamos leads. Ahora el sistema los nutre y nos avisa cuando están listos. Un game changer.",
          author: "Roberto Salinas",
          role: "Director Comercial, MedTech Pro",
        },
      },
    },
    pricing: {
      badge: "Inversión",
      headline: "Planes de Automatización",
      subheadline: "Desde básico hasta enterprise según tu operación.",
      guarantee: "Garantizamos automatizaciones funcionando en 30 días o extendemos soporte sin costo.",
      tiers: [
        {
          name: "Starter",
          price: "$2,000",
          description: "Implementación básica para empezar a automatizar.",
          features: [
            { text: "Auditoría de procesos", included: true },
            { text: "3 workflows automatizados", included: true },
            { text: "5 templates de email", included: true },
            { text: "Configuración de plataforma", included: true },
            { text: "Lead scoring básico", included: true },
            { text: "Integraciones avanzadas", included: false },
            { text: "Reportes personalizados", included: false },
            { text: "Soporte continuo", included: false },
          ],
          cta: "Comenzar",
        },
        {
          name: "Growth",
          price: "$4,500",
          description: "Sistema completo para empresas en crecimiento.",
          features: [
            { text: "Todo lo de Starter", included: true },
            { text: "10 workflows automatizados", included: true },
            { text: "15 templates de email", included: true },
            { text: "Lead scoring avanzado", included: true },
            { text: "Integración CRM completa", included: true },
            { text: "Reportes personalizados", included: true },
            { text: "2 meses de optimización", included: true },
            { text: "Capacitación de equipo", included: true },
          ],
            cta: "Elegir Growth",
          popular: true,
          badge: "Más Popular",
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "Solución a medida para operaciones complejas.",
          features: [
            { text: "Workflows ilimitados", included: true },
            { text: "Integraciones custom (API)", included: true },
            { text: "Multi-departamento", included: true },
            { text: "AI y machine learning", included: true },
            { text: "Consultor dedicado", included: true },
            { text: "SLA garantizado", included: true },
            { text: "Soporte prioritario 24/7", included: true },
            { text: "Revisiones trimestrales", included: true },
          ],
          cta: "Contactar",
        },
      ],
    },
    faq: {
      badge: "Preguntas",
      headline: "Todo Sobre Marketing Automation",
      subheadline: "Resolvemos dudas comunes antes de implementar.",
      items: [
        {
          question: "¿Qué plataformas usan?",
          answer:
            "Trabajamos con HubSpot, ActiveCampaign, Mailchimp, Salesforce Marketing Cloud, Marketo y más. Elegimos según tu caso.",
        },
        {
          question: "¿Necesito cambiar de CRM?",
          answer:
            "No necesariamente. Integramos la automatización con tu CRM actual cuando es viable para minimizar cambios.",
        },
        {
          question: "¿Cuándo veré resultados?",
          answer:
            "Ahorro de tiempo y leads nutridos desde el mes 1. Mejora de conversión suele verse en meses 2-3 con datos para optimizar.",
        },
        {
          question: "¿Cómo evitan el spam?",
          answer:
            "Autenticación SPF/DKIM/DMARC, calentamiento de dominio, segmentación, limpieza de listas y monitoreo continuo.",
        },
        {
          question: "¿Pueden automatizar más que email?",
          answer:
            "Sí. Automatizamos asignación de leads, notificaciones internas, SMS, WhatsApp, chatbots, tareas y más.",
        },
        {
          question: "¿Y si mi equipo no es técnico?",
          answer:
            "Configuramos todo y capacitamos a tu equipo con documentación clara para ajustes básicos.",
        },
      ],
      helpText: "¿Otra pregunta?",
      helpCTA: "Habla con nosotros",
    },
    cta: {
      headline: "¿Listo Para Automatizar y Escalar?",
      subheadline:
        "Agenda una demo personalizada y descubre cuántas horas puedes ahorrar con automatización.",
      primaryCTA: "Agendar Demo Gratis",
      secondaryCTA: "Ver Más Casos",
      stats: [
        { value: 47, suffix: "%", label: "Más conversiones" },
        { value: 20, suffix: "+", label: "Horas ahorradas/sem" },
        { value: 100, suffix: "+", label: "Automatizaciones activas" },
        { value: 99, suffix: "%", label: "Uptime garantizado" },
      ],
      urgencyText: "Implementación disponible para iniciar en 2 semanas.",
      trustBadges: ["Garantía 30 días", "Respuesta en 24h", "Soporte 24/7"],
    },
  },
  en: {
    hero: {
      badge: "Marketing Automation",
      headline: "Your Competitors Sleep—Their Marketing Doesn’t",
      subheadline:
        "While you rest, an intelligent system nurtures leads, scores prospects, and preps sales. Automation that works 24/7.",
      problem: "We have leads but can't follow up on all of them...",
      primaryCTA: "Automate My Marketing",
      secondaryCTA: "See Demo",
      scrollLabel: "Explore",
      scrollAriaLabel: "Scroll to features",
    },
    features: {
      badge: "Capabilities",
      headline: "Your Marketing Team That Never Sleeps",
      subheadline: "Every capability is built to multiply efficiency and maximize conversions.",
      items: [
        {
          icon: icons.workflows,
          title: "Automated Workflows",
          description:
            "Smart sequences that nurture leads automatically—the right message to the right person at the right time.",
          highlight: "Personalization at scale",
        },
        {
          icon: icons.email,
          title: "Advanced Email Marketing",
          description:
            "Dynamic emails that adapt to each user's behavior to maximize engagement and conversion.",
          highlight: "+40% open rates",
        },
        {
          icon: icons.scoring,
          title: "Smart Lead Scoring",
          description:
            "Scoring that automatically surfaces ready-to-buy leads and those needing more nurturing.",
          highlight: "Automatic prioritization",
        },
        {
          icon: icons.crm,
          title: "CRM Integration",
          description:
            "We connect automation with your CRM so sales and marketing work from the same real-time data.",
          highlight: "Data synced 24/7",
        },
        {
          icon: icons.reporting,
          title: "Automated Reporting",
          description:
            "Real-time dashboards and scheduled reports that show exactly what's working.",
          highlight: "Data-driven decisions",
        },
        {
          icon: icons.integration,
          title: "Custom Integrations",
          description:
            "We connect all your tools—Zapier, webhooks, APIs. Your stack working in harmony.",
          highlight: "500+ integrations",
        },
      ],
    },
    process: {
      badge: "Implementation",
      headline: "How We Automate Your Marketing",
      subheadline: "A structured process to succeed without disrupting operations.",
      steps: [
        {
          step: "Phase 1",
          title: "Process Audit",
          description:
            "We map your sales process, find bottlenecks, and spot automation opportunities.",
          duration: "1 week",
        },
        {
          step: "Phase 2",
          title: "Automation Design",
          description:
            "Workflow blueprint: triggers, conditions, actions, and branches fully documented.",
          duration: "1-2 weeks",
        },
        {
          step: "Phase 3",
          title: "Technical Implementation",
          description:
            "We configure the platform, workflows, integrations, emails, and lead scoring.",
          duration: "2-3 weeks",
        },
        {
          step: "Phase 4",
          title: "Testing & Optimization",
          description:
            "Testing, A/B experiments, timing/message tweaks. Controlled launch and continuous improvement.",
          duration: "1 week + ongoing",
        },
      ],
    },
    caseStudy: {
      badge: "Case Study",
      headline: "From Lost Leads to a Predictable System",
      subheadline: "How MedTech Pro gained 20 hours a week through automation.",
      titles: {
        challenge: "The Challenge",
        solution: "The Solution",
        results: "The Results",
      },
      data: {
        company: "MedTech Pro",
        industry: "Healthcare B2B",
        logo: "⚕️",
        challenge:
          "Sales spent 60% of time on repetitive tasks. Hot leads were contacted too late.",
        solution:
          "Full HubSpot setup: nurturing, behavior-based scoring, sales alerts, and automated reporting.",
        results:
          "In 4 months they reclaimed 20+ hours weekly and lifted conversions.",
        metrics: [
          { value: 47, suffix: "%", label: "Conversion lift" },
          { value: 20, suffix: "h", label: "Hours saved/week" },
          { value: 3.5, suffix: "x", label: "More qualified leads" },
          { value: 35, suffix: "%", label: "Sales cycle reduction" },
        ],
        testimonial: {
          quote:
            "We used to lose leads. Now the system nurtures them and pings us when they're ready. Total game changer.",
          author: "Roberto Salinas",
          role: "Sales Director, MedTech Pro",
        },
      },
    },
    pricing: {
      badge: "Investment",
      headline: "Automation Plans",
      subheadline: "From starter to enterprise based on your operation.",
      guarantee: "We guarantee automations live in 30 days or extend support at no cost.",
      tiers: [
        {
          name: "Starter",
          price: "$2,000",
          description: "Baseline implementation to start automating.",
          features: [
            { text: "Process audit", included: true },
            { text: "3 automated workflows", included: true },
            { text: "5 email templates", included: true },
            { text: "Platform setup", included: true },
            { text: "Basic lead scoring", included: true },
            { text: "Advanced integrations", included: false },
            { text: "Custom reports", included: false },
            { text: "Ongoing support", included: false },
          ],
          cta: "Start",
        },
        {
          name: "Growth",
          price: "$4,500",
          description: "Full system for scaling teams.",
          features: [
            { text: "Everything in Starter", included: true },
            { text: "10 automated workflows", included: true },
            { text: "15 email templates", included: true },
            { text: "Advanced lead scoring", included: true },
            { text: "Full CRM integration", included: true },
            { text: "Custom reports", included: true },
            { text: "2 months optimization", included: true },
            { text: "Team training", included: true },
          ],
            cta: "Choose Growth",
          popular: true,
          badge: "Most Popular",
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "Tailored solution for complex operations.",
          features: [
            { text: "Unlimited workflows", included: true },
            { text: "Custom integrations (API)", included: true },
            { text: "Multi-department", included: true },
            { text: "AI & machine learning", included: true },
            { text: "Dedicated consultant", included: true },
            { text: "Guaranteed SLA", included: true },
            { text: "Priority support 24/7", included: true },
            { text: "Quarterly reviews", included: true },
          ],
          cta: "Contact",
        },
      ],
    },
    faq: {
      badge: "Questions",
      headline: "All About Marketing Automation",
      subheadline: "We clear common doubts before rollout.",
      items: [
        {
          question: "Which platforms do you use?",
          answer:
            "We work with HubSpot, ActiveCampaign, Mailchimp, Salesforce Marketing Cloud, Marketo, and more—chosen for your case.",
        },
        {
          question: "Do I need to change my CRM?",
          answer:
            "Not necessarily. We integrate automation with your existing CRM when feasible to minimize change.",
        },
        {
          question: "When will we see results?",
          answer:
            "Time savings and nurtured leads start month one. Conversion lift usually shows in months 2-3 once data is in.",
        },
        {
          question: "How do you avoid spam?",
          answer:
            "SPF/DKIM/DMARC setup, domain warmup, segmentation, list hygiene, and continuous monitoring.",
        },
        {
          question: "Can you automate beyond email?",
          answer:
            "Yes—lead routing, internal alerts, SMS, WhatsApp, chatbots, tasks, and more.",
        },
        {
          question: "What if my team isn't technical?",
          answer:
            "We set everything up and train your team with clear docs for basic adjustments.",
        },
      ],
      helpText: "Another question?",
      helpCTA: "Talk with us",
    },
    cta: {
      headline: "Ready to Automate and Scale?",
      subheadline:
        "Book a personalized demo and see how many hours automation can save you.",
      primaryCTA: "Book a Free Demo",
      secondaryCTA: "See More Cases",
      stats: [
        { value: 47, suffix: "%", label: "Conversion lift" },
        { value: 20, suffix: "+", label: "Hours saved/week" },
        { value: 100, suffix: "+", label: "Active automations" },
        { value: 99, suffix: "%", label: "Guaranteed uptime" },
      ],
      urgencyText: "Implementation slots open in 2 weeks.",
      trustBadges: ["30-day guarantee", "24h response", "24/7 support"],
    },
  },
};

export default function MarketingAutomationClient() {
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
