import { Language } from "@/components/providers/LanguageProvider";

export type TranslationContent = typeof translations;

export const translations = {
  es: {
    header: {
      services: "Servicios",
      nav: [
        { href: "#portfolio", label: "Portfolio" },
        { href: "#process", label: "Proceso" },
        { href: "#team", label: "Equipo" },
        { href: "#testimonials", label: "Testimonios" },
      ],
      cta: "Hablemos",
      languageLabel: "Idioma",
    },
    hero: {
      badge: "🚀 Agencia de Marketing Digital",
      headline: "Diseño que Convierte. Marketing que Rinde.",
      rotating: ["Marketing que rinde.", "Marcas que inspiran.", "Crecimiento que perdura."],
      subheadline:
        "NOWLIVE es tu socio estratégico de transformación digital. Creamos experiencias de marca, webs que convierten y estrategias basadas en datos que generan resultados medibles.",
      primaryCTA: "Hablemos",
      secondaryCTA: "Ver nuestro trabajo",
      scrollLabel: "Scroll",
      stats: [
        { value: 150, suffix: "+", label: "Proyectos Entregados" },
        { value: 98, suffix: "%", label: "Satisfacción de Clientes" },
        { value: 12, suffix: "+", label: "Años de Experiencia" },
        { value: 50, suffix: "+", label: "Miembros del Equipo" },
      ],
    },
    services: {
      badge: "Nuestros Servicios",
      title: "Todo lo que necesitas para crecer",
      description:
        "Desde estrategia hasta ejecución, ofrecemos servicios integrales de marketing digital que generan resultados reales.",
      cards: [
        {
          title: "Diseño & Desarrollo Web",
          description:
            "Tu sitio web te está costando más de lo que crees. Creamos sitios que convierten visitantes en clientes.",
          features: ["Diseño Responsive", "E-commerce", "Aplicaciones Web", "CMS Personalizado"],
          href: "/services/web-design",
          cta: "Ver más",
        },
        {
          title: "Estrategia Digital",
          description:
            "Estrategia sin datos es solo adivinanzas. Planes basados en datos que generan resultados medibles.",
          features: ["Investigación de Mercado", "Análisis Competitivo", "Roadmap de Crecimiento", "KPIs Accionables"],
          href: "/services/digital-strategy",
          cta: "Ver más",
        },
        {
          title: "Marketing Automation",
          description:
            "Tus competidores duermen, pero su marketing no. Sistemas que trabajan 24/7 para nutrir leads y cerrar ventas.",
          features: ["Email Automation", "Lead Scoring", "Integración CRM", "Workflows Inteligentes"],
          href: "/services/marketing-automation",
          cta: "Ver más",
        },
        {
          title: "Creación de Contenido",
          description:
            "El contenido promedio es invisible. Creamos contenido estratégico que captura atención y genera engagement.",
          features: ["Copywriting", "Producción de Video", "Diseño Gráfico", "Social Media"],
          href: "/services/content-creation",
          cta: "Ver más",
        },
        {
          title: "SEO & Analytics",
          description:
            "Si no puedes medirlo, no puedes mejorarlo. Optimizamos visibilidad y configuramos analytics que revelan oportunidades.",
          features: ["SEO Técnico", "Optimización de Contenido", "GA4 Setup", "Reportes de Performance"],
          href: "/services/seo-analytics",
          cta: "Ver más",
        },
        {
          title: "Identidad de Marca",
          description:
            "Una marca olvidable es una marca ignorada. Creamos identidades memorables que conectan emocionalmente.",
          features: ["Diseño de Logotipo", "Manual de Marca", "Sistema Visual", "Estrategia de Marca"],
          href: "/services/brand-identity",
          cta: "Ver más",
        },
      ],
    },
    portfolio: {
      badge: "Nuestro Trabajo",
      title: "Casos de éxito & Portfolio",
      description:
        "Explora proyectos recientes y cómo ayudamos a empresas a alcanzar sus metas digitales.",
      categories: ["Todos", "Web", "Marketing", "Brand"],
      modal: {
        services: "Servicios",
        results: "Resultados",
        client: "Cliente",
      },
    },
    stats: {
      badge: "Nuestros Números",
      title: "Resultados que hablan solos",
      description:
        "Años de experiencia con marcas líderes y startups nos permiten entregar resultados excepcionales.",
      items: [
        { number: 150, suffix: "+", label: "Proyectos Completados", description: "Entregados con éxito" },
        { number: 98, suffix: "%", label: "Satisfacción del Cliente", description: "Promedio de calificación" },
        { number: 12, suffix: "+", label: "Años de Experiencia", description: "En marketing digital" },
        { number: 50, suffix: "+", label: "Miembros del Equipo", description: "Expertos dedicados" },
        { number: 5, suffix: "M+", label: "Impresiones Generadas", description: "Último año" },
        { number: 3, suffix: "x", label: "ROI Promedio", description: "Retorno de inversión" },
      ],
    },
    process: {
      badge: "Nuestro Proceso",
      title: "Cómo trabajamos",
      description:
        "Proceso de 4 pasos que garantiza proyectos a tiempo, dentro de presupuesto y con resultados.",
      steps: [
        {
          number: "01",
          title: "Discovery",
          description:
            "Profundizamos en tu negocio, objetivos y audiencia para construir la base correcta.",
        },
        {
          number: "02",
          title: "Strategy",
          description:
            "Desarrollamos una estrategia integral, basada en datos y KPIs claros.",
        },
        {
          number: "03",
          title: "Execution",
          description:
            "El equipo ejecuta con atención al detalle y comunicación transparente.",
        },
        {
          number: "04",
          title: "Optimization",
          description:
            "Monitoreamos, analizamos y refinamos para maximizar ROI y crecimiento sostenible.",
        },
      ],
    },
    team: {
      badge: "Nuestro Equipo",
      title: "Conoce a los expertos",
      description:
        "Un equipo diverso con décadas de experiencia en marketing digital, diseño y tecnología.",
      members: [
        {
          name: "Alexandra Rivera",
          role: "CEO & Fundadora",
          bio: "15+ años liderando marketing digital, define la visión y estrategia de la agencia.",
        },
        {
          name: "Marcus Thompson",
          role: "Director Creativo",
          bio: "Diseñador premiado que da vida a las marcas con visión creativa.",
        },
        {
          name: "Elena Kowalski",
          role: "Head of Strategy",
          bio: "Crea estrategias basadas en datos que generan resultados medibles.",
        },
        {
          name: "David Kim",
          role: "Tech Lead",
          bio: "Arquitecto de soluciones robustas y escalables para experiencias digitales.",
        },
        {
          name: "Sofia Martinez",
          role: "Directora de Marketing",
          bio: "Orquesta campañas multicanal que impulsan engagement y conversión.",
        },
        {
          name: "James Wilson",
          role: "Especialista SEO",
          bio: "Optimiza la presencia digital para máxima visibilidad y crecimiento orgánico.",
        },
      ],
    },
    testimonials: {
      badge: "Testimonios",
      title: "Lo que dicen nuestros clientes",
      description:
        "No solo lo decimos nosotros. Esto comentan nuestros clientes sobre trabajar con NOWLIVE.",
    },
    cta: {
      badge: "¿Listo para transformar tu negocio?",
      title: "Construyamos algo increíble juntos",
      description:
        "Ya sea una transformación digital completa o soluciones puntuales, estamos aquí para ayudarte a lograrlo.",
      stats: [
        { value: 150, suffix: "+", label: "Proyectos Completados" },
        { value: 98, suffix: "%", label: "Retención de Clientes" },
        { value: 50, suffix: "M", label: "Revenue Generado", prefix: "$" },
        { value: 12, suffix: "+", label: "Años de Experiencia" },
      ],
      primaryCTA: "Iniciar proyecto",
      secondaryCTA: "Agendar llamada",
    },
    footer: {
      description:
        "Somos una agencia de marketing digital full-service dedicada a impulsar el crecimiento con diseño, estrategia y datos.",
      newsletterTitle: "Suscríbete a nuestro newsletter",
      newsletterPlaceholder: "Tu email",
      newsletterSubmit: "Enviar",
      newsletterSuccess: "¡Gracias por suscribirte!",
      services: "Servicios",
      company: "Empresa",
      resources: "Recursos",
      bottom: "Todos los derechos reservados.",
      privacy: "Privacidad",
      terms: "Términos de Servicio",
      cookies: "Cookies",
    },
    blog: {
      title: "Blog & Recursos",
      description: "Ideas, guías y estrategias para escalar tu negocio en la era digital.",
      posts: [
        {
          title: "5 Estrategias de Marketing Digital para 2026",
          excerpt:
            "Tendencias que marcarán el éxito digital: IA generativa, voz, automatización y más.",
          date: "4 Enero, 2026",
          author: "Equipo NOWLIVE",
          category: "Estrategia",
          slug: "estrategias-marketing-2026",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        },
        {
          title: "Cómo el Diseño UX puede Duplicar tus Conversiones",
          excerpt: "Psicología aplicada al diseño. Pequeños cambios, grandes resultados.",
          date: "2 Enero, 2026",
          author: "Diseño NOWLIVE",
          category: "UX/UI",
          slug: "diseno-ux-conversiones",
          image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop",
        },
        {
          title: "Automatización: El Futuro de las Ventas Escalables",
          excerpt: "Deja de perder tiempo en tareas repetitivas. Sistemas que trabajan 24/7.",
          date: "28 Diciembre, 2025",
          author: "Tech NOWLIVE",
          category: "Automatización",
          slug: "automatizacion-ventas-escalables",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        },
      ],
    },
    resources: {
      title: "Recursos",
      description: "Herramientas, guías y plantillas accionables listas para usar en tu equipo.",
      items: [
        {
          title: "Guía de Estrategia Digital 2026",
          type: "Guía",
          level: "Avanzado",
          description: "Framework paso a paso para planificar crecimiento digital apalancado en IA y datos.",
          link: "/blog/estrategias-marketing-2026",
        },
        {
          title: "Checklist de Lanzamiento Web",
          type: "Plantilla",
          level: "Intermedio",
          description: "Lista de 25 puntos para lanzar sitios sin sorpresas de SEO, performance o tracking.",
          link: "/services/web-design",
        },
        {
          title: "Kit de Automatización",
          type: "Herramienta",
          level: "Intermedio",
          description: "Workflows base para nutrir leads, scoring y handoff ordenado a ventas.",
          link: "/services/marketing-automation",
        },
      ],
    },
    caseStudies: {
      title: "Casos de Éxito",
      description: "Estrategias reales que escalaron adquisición, retención y revenue para nuestros clientes.",
      highlights: [
        { label: "ROI promedio", value: "3.2x" },
        { label: "Leads generados (12m)", value: "48k" },
        { label: "Industrias", value: "SaaS, Retail, B2B" },
      ],
      studies: [
        {
          title: "Escala SaaS B2B",
          industry: "Software",
          service: "Estrategia digital + Automatización",
          summary: "Auditamos el funnel, segmentamos audiencias y activamos secuencias multicanal con scoring.",
          metrics: ["+120% leads calificados", "-35% CAC en 3 meses", "+18% tasa de demo"],
          link: "/services/digital-strategy",
        },
        {
          title: "Retail omnicanal",
          industry: "Retail",
          service: "SEO + Analytics",
          summary: "Reestructuramos la arquitectura, tracking GA4 y dashboards ejecutivos para decisiones semanales.",
          metrics: ["+78% tráfico orgánico", "4.5% uplift en conversión", "Reporting semanal accionable"],
          link: "/services/seo-analytics",
        },
        {
          title: "Marca premium",
          industry: "Hospitality",
          service: "Branding + Web",
          summary: "Nueva identidad y sitio enfocado en reservas directas y experiencias.",
          metrics: ["+65% reservas directas", "Tiempo en página +40%", "CSAT 4.9/5 post lanzamiento"],
          link: "/services/brand-identity",
        },
      ],
    },
    testimonialsPage: {
      title: "Testimonios",
      description: "Clientes que trabajan con nosotros de forma continua y los resultados que obtienen.",
      testimonials: [
        {
          name: "Lucía Paredes",
          role: "CMO",
          company: "SaaS B2B",
          quote: "NOWLIVE reestructuró nuestro funnel y reporting. Hoy sabemos qué mover cada semana para crecer.",
          result: "+120% leads calificados en 90 días",
        },
        {
          name: "Carlos Méndez",
          role: "CEO",
          company: "Retail DTC",
          quote: "Pasamos de campañas desordenadas a un sistema siempre-on con automatización y creative testing.",
          result: "+78% tráfico orgánico y 3.2x ROAS",
        },
        {
          name: "Emily Zhang",
          role: "VP Growth",
          company: "Fintech",
          quote: "Implementaron nurture multicanal y dashboards claros. Marketing y ventas trabajan alineados.",
          result: "3.4x ROI en 6 meses",
        },
      ],
    },
    faq: {
      title: "FAQ",
      description: "Preguntas frecuentes sobre cómo trabajamos y qué puedes esperar.",
      items: [
        {
          question: "¿En cuánto tiempo veo resultados?",
          answer: "En estrategia y automatización los quick wins llegan en 4-6 semanas. SEO y branding requieren 8-12 semanas para impactos sostenibles.",
        },
        {
          question: "¿Trabajan junto a equipos internos?",
          answer: "Sí. Podemos liderar como pod autónomo o integrarnos como extensión de marketing, producto o ventas.",
        },
        {
          question: "¿Cómo manejan la comunicación?",
          answer: "Sprint semanal, standups ligeros y reportes ejecutivos. Dashboard en tiempo real con los KPIs acordados.",
        },
        {
          question: "¿Pueden empezar con un piloto?",
          answer: "Ofrecemos pilotos de 6-8 semanas con entregables claros y criterios de éxito medibles.",
        },
      ],
    },
    privacy: {
      title: "Política de Privacidad",
      launchNote: "Lanzamiento: Enero 2026. NOWLIVE Digital Marketing Agency.",
      sections: {
        intro:
          "En NOWLIVE valoramos tu privacidad y protegemos tus datos personales. Esta política describe cómo recopilamos, usamos y protegemos tu información.",
        infoTitle: "1. Información que Recopilamos",
        infoBody:
          "Podemos recopilar tu nombre, email y teléfono cuando completas formularios o te suscribes al boletín.",
        useTitle: "2. Uso de la Información",
        useItems: [
          "Proporcionar y mejorar nuestros servicios digitales.",
          "Comunicarnos contigo sobre consultas o proyectos.",
          "Enviar actualizaciones y material promocional.",
          "Analizar el rendimiento del sitio.",
        ],
        protectionTitle: "3. Protección de Datos",
        protectionBody:
          "Aplicamos medidas técnicas y organizativas para evitar acceso no autorizado, alteración o divulgación accidental.",
        rightsTitle: "4. Tus Derechos",
        rightsBody:
          "Puedes acceder, rectificar o eliminar tus datos. Contáctanos para ejercer estos derechos.",
      },
    },
    terms: {
      title: "Términos de Servicio",
      lastUpdate: "Última actualización: Enero 2026. NOWLIVE.",
      intro:
        "Bienvenido a NOWLIVE. Al usar nuestro sitio y servicios aceptas estos términos y condiciones.",
      sections: [
        {
          title: "1. Uso del Sitio Web",
          body: "Contenido para información general y uso personal. Puede cambiar sin previo aviso. Uso no autorizado prohibido.",
        },
        {
          title: "2. Propiedad Intelectual",
          body: "Todo el material es propiedad de NOWLIVE o usado bajo licencia. Reproducción prohibida sin acuerdo previo.",
        },
        {
          title: "3. Servicios y Consultoría",
          body: "Servicios sujetos a contratos específicos. Propuestas gratuitas no son obligación hasta acuerdo mutuo.",
        },
        {
          title: "4. Limitación de Responsabilidad",
          body: "NOWLIVE no es responsable por daños derivados del uso del sitio o interrupciones temporales.",
        },
        {
          title: "5. Jurisdicción",
          body: "Cualquier disputa se rige por las leyes vigentes y tribunales competentes.",
        },
      ],
    },
  },
  en: {
    header: {
      services: "Services",
      nav: [
        { href: "#portfolio", label: "Portfolio" },
        { href: "#process", label: "Process" },
        { href: "#team", label: "Team" },
        { href: "#testimonials", label: "Testimonials" },
      ],
      cta: "Let's Talk",
      languageLabel: "Language",
    },
    hero: {
      badge: "🚀 Digital Marketing Agency",
      headline: "Design That Converts. Marketing That Performs.",
      rotating: ["Marketing That Performs.", "Brands That Inspire.", "Growth That Lasts."],
      subheadline:
        "NOWLIVE is your strategic partner for digital transformation. We craft brand experiences, build high-converting sites, and run data-driven strategies that deliver measurable results.",
      primaryCTA: "Let's Talk",
      secondaryCTA: "View Our Work",
      scrollLabel: "Scroll",
      stats: [
        { value: 150, suffix: "+", label: "Projects Delivered" },
        { value: 98, suffix: "%", label: "Client Satisfaction" },
        { value: 12, suffix: "+", label: "Years Experience" },
        { value: 50, suffix: "+", label: "Team Members" },
      ],
    },
    services: {
      badge: "Our Services",
      title: "Everything You Need to Grow",
      description:
        "From strategy to execution, we deliver full-funnel marketing services that drive real business results.",
      cards: [
        {
          title: "Web Design & Development",
          description:
            "Your site is costing more than you think. We build conversion-focused websites that turn visitors into customers.",
          features: ["Responsive Design", "E-commerce", "Web Apps", "Custom CMS"],
          href: "/services/web-design",
          cta: "Learn more",
        },
        {
          title: "Digital Strategy",
          description:
            "Strategy without data is guessing. We build data-backed plans that deliver measurable outcomes.",
          features: ["Market Research", "Competitive Analysis", "Growth Roadmap", "Actionable KPIs"],
          href: "/services/digital-strategy",
          cta: "Learn more",
        },
        {
          title: "Marketing Automation",
          description:
            "Competitors sleep, their marketing doesn't. Systems that nurture leads and close sales 24/7.",
          features: ["Email Automation", "Lead Scoring", "CRM Integration", "Smart Workflows"],
          href: "/services/marketing-automation",
          cta: "Learn more",
        },
        {
          title: "Content Creation",
          description:
            "Average content is invisible. We create strategic content that captures attention and drives engagement.",
          features: ["Copywriting", "Video Production", "Graphic Design", "Social Media"],
          href: "/services/content-creation",
          cta: "Learn more",
        },
        {
          title: "SEO & Analytics",
          description:
            "If you can't measure it, you can't improve it. We boost visibility and set up analytics that uncover opportunities.",
          features: ["Technical SEO", "Content Optimization", "GA4 Setup", "Performance Reporting"],
          href: "/services/seo-analytics",
          cta: "Learn more",
        },
        {
          title: "Brand Identity",
          description:
            "Forgettable brands get ignored. We craft memorable identities that connect emotionally.",
          features: ["Logo Design", "Brand Guidelines", "Visual System", "Brand Strategy"],
          href: "/services/brand-identity",
          cta: "Learn more",
        },
      ],
    },
    portfolio: {
      badge: "Our Work",
      title: "Case Studies & Portfolio",
      description:
        "Explore how we've helped businesses hit their digital goals.",
      categories: ["All", "Web", "Marketing", "Brand"],
      modal: {
        services: "Services Provided",
        results: "Key Results",
        client: "Client",
      },
    },
    stats: {
      badge: "Our Numbers",
      title: "Results That Speak",
      description:
        "Years of experience with leading brands and ambitious startups let us deliver standout outcomes.",
      items: [
        { number: 150, suffix: "+", label: "Projects Completed", description: "Delivered successfully" },
        { number: 98, suffix: "%", label: "Client Satisfaction", description: "Average rating" },
        { number: 12, suffix: "+", label: "Years Experience", description: "In digital marketing" },
        { number: 50, suffix: "+", label: "Team Members", description: "Dedicated experts" },
        { number: 5, suffix: "M+", label: "Impressions Generated", description: "Past year" },
        { number: 3, suffix: "x", label: "Average ROI", description: "Return on investment" },
      ],
    },
    process: {
      badge: "Our Process",
      title: "How We Work",
      description:
        "A proven 4-step process to ship on time, on budget, and above expectations.",
      steps: [
        {
          number: "01",
          title: "Discovery",
          description:
            "We dig into your business, goals, audience, and competitive landscape to build the right foundation.",
        },
        {
          number: "02",
          title: "Strategy",
          description:
            "We craft a comprehensive, data-led strategy with clear KPIs and milestones.",
        },
        {
          number: "03",
          title: "Execution",
          description:
            "The team brings the strategy to life with detail, updates, and transparency.",
        },
        {
          number: "04",
          title: "Optimization",
          description:
            "We monitor, analyze, and refine to maximize ROI and sustainable growth.",
        },
      ],
    },
    team: {
      badge: "Our Team",
      title: "Meet the Experts",
      description:
        "A diverse crew with decades of experience across marketing, design, and technology.",
      members: [
        {
          name: "Alexandra Rivera",
          role: "CEO & Founder",
          bio: "15+ years in digital marketing, guiding our vision and strategy.",
        },
        {
          name: "Marcus Thompson",
          role: "Creative Director",
          bio: "Award-winning designer bringing brands to life with bold ideas.",
        },
        {
          name: "Elena Kowalski",
          role: "Head of Strategy",
          bio: "Builds data-driven strategies that deliver measurable results.",
        },
        {
          name: "David Kim",
          role: "Tech Lead",
          bio: "Architects robust, scalable solutions for digital experiences.",
        },
        {
          name: "Sofia Martinez",
          role: "Marketing Director",
          bio: "Runs multi-channel campaigns that drive engagement and conversions.",
        },
        {
          name: "James Wilson",
          role: "SEO Specialist",
          bio: "Optimizes digital presence for maximum visibility and organic growth.",
        },
      ],
    },
    testimonials: {
      badge: "Testimonials",
      title: "What Our Clients Say",
      description:
        "Don't just take our word for it. Here's what clients say about working with NOWLIVE.",
    },
    cta: {
      badge: "Ready to transform your business?",
      title: "Let's build something amazing together",
      description:
        "Whether you need a full digital overhaul or targeted marketing, we can help you hit your goals.",
      stats: [
        { value: 150, suffix: "+", label: "Projects Completed" },
        { value: 98, suffix: "%", label: "Client Retention" },
        { value: 50, suffix: "M", label: "Revenue Generated", prefix: "$" },
        { value: 12, suffix: "+", label: "Years Experience" },
      ],
      primaryCTA: "Start your project",
      secondaryCTA: "Schedule a call",
    },
    footer: {
      description:
        "We are a full-service digital marketing agency helping businesses grow through design, strategy, and data.",
      newsletterTitle: "Subscribe to our newsletter",
      newsletterPlaceholder: "Your email",
      newsletterSubmit: "Send",
      newsletterSuccess: "Thanks for subscribing!",
      services: "Services",
      company: "Company",
      resources: "Resources",
      bottom: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms of Service",
      cookies: "Cookies",
    },
    blog: {
      title: "Blog & Resources",
      description: "Ideas, guides, and strategies to scale your business in the digital era.",
      posts: [
        {
          title: "5 Digital Marketing Strategies for 2026",
          excerpt:
            "The trends shaping digital success this year—from generative AI to voice search.",
          date: "Jan 4, 2026",
          author: "NOWLIVE Team",
          category: "Strategy",
          slug: "digital-marketing-strategies-2026",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        },
        {
          title: "How UX Design Can Double Your Conversions",
          excerpt: "It's not just pretty pixels—it's applied psychology. Small tweaks, big wins.",
          date: "Jan 2, 2026",
          author: "NOWLIVE Design",
          category: "UX/UI",
          slug: "ux-design-conversions",
          image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop",
        },
        {
          title: "Automation: The Future of Scalable Sales",
          excerpt: "Stop losing time on repetitive tasks. Build systems that work 24/7.",
          date: "Dec 28, 2025",
          author: "NOWLIVE Tech",
          category: "Automation",
          slug: "automation-scalable-sales",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        },
      ],
    },
    resources: {
      title: "Resources",
      description: "Actionable guides, templates, and tools your team can ship with today.",
      items: [
        {
          title: "Digital Strategy Guide 2026",
          type: "Guide",
          level: "Advanced",
          description: "Step-by-step framework to plan growth powered by AI, data, and experimentation.",
          link: "/blog/digital-marketing-strategies-2026",
        },
        {
          title: "Website Launch Checklist",
          type: "Template",
          level: "Intermediate",
          description: "25 checkpoints to launch without SEO, performance, or tracking surprises.",
          link: "/services/web-design",
        },
        {
          title: "Automation Starter Kit",
          type: "Toolkit",
          level: "Intermediate",
          description: "Base workflows for lead nurture, scoring, and clean handoff to sales.",
          link: "/services/marketing-automation",
        },
      ],
    },
    caseStudies: {
      title: "Case Studies",
      description: "Real programs that scaled acquisition, retention, and revenue for our clients.",
      highlights: [
        { label: "Average ROI", value: "3.2x" },
        { label: "Leads generated (12m)", value: "48k" },
        { label: "Industries", value: "SaaS, Retail, B2B" },
      ],
      studies: [
        {
          title: "Scaling B2B SaaS",
          industry: "Software",
          service: "Digital Strategy + Automation",
          summary: "Audited the funnel, segmented audiences, and launched multichannel sequences with scoring.",
          metrics: ["+120% qualified leads", "-35% CAC in 3 months", "+18% demo rate"],
          link: "/services/digital-strategy",
        },
        {
          title: "Omnichannel Retail",
          industry: "Retail",
          service: "SEO + Analytics",
          summary: "Rebuilt IA, GA4 tracking, and executive dashboards for weekly decision-making.",
          metrics: ["+78% organic traffic", "4.5% uplift in conversion", "Weekly actionable reporting"],
          link: "/services/seo-analytics",
        },
        {
          title: "Premium Hospitality",
          industry: "Hospitality",
          service: "Branding + Web",
          summary: "New identity and site focused on direct bookings and memorable experiences.",
          metrics: ["+65% direct bookings", "+40% time on site", "CSAT 4.9/5 post launch"],
          link: "/services/brand-identity",
        },
      ],
    },
    testimonialsPage: {
      title: "Testimonials",
      description: "Long-term partners and the measurable outcomes we deliver together.",
      testimonials: [
        {
          name: "Lucia Paredes",
          role: "CMO",
          company: "B2B SaaS",
          quote: "NOWLIVE rebuilt our funnel and reporting. We know exactly what to adjust each week to grow.",
          result: "+120% qualified leads in 90 days",
        },
        {
          name: "Carlos Mendez",
          role: "CEO",
          company: "Retail DTC",
          quote: "We moved from scattered campaigns to an always-on system with automation and creative testing.",
          result: "+78% organic traffic and 3.2x ROAS",
        },
        {
          name: "Emily Zhang",
          role: "VP Growth",
          company: "Fintech",
          quote: "They implemented multichannel nurture and clear dashboards. Marketing and sales are finally aligned.",
          result: "3.4x ROI in 6 months",
        },
      ],
    },
    faq: {
      title: "FAQ",
      description: "Answers to the most common questions about how we work and what to expect.",
      items: [
        {
          question: "How quickly will we see results?",
          answer: "Strategy and automation deliver quick wins in 4-6 weeks. SEO and brand take 8-12 weeks for durable impact.",
        },
        {
          question: "Do you work with internal teams?",
          answer: "Yes. We can lead as an autonomous pod or integrate as an extension of marketing, product, or sales.",
        },
        {
          question: "How do you handle communication?",
          answer: "Weekly sprint cadence, lightweight standups, and executive reports. Real-time dashboard with agreed KPIs.",
        },
        {
          question: "Can we start with a pilot?",
          answer: "We offer 6-8 week pilots with clear deliverables and measurable success criteria.",
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      launchNote: "Launch: January 2026. NOWLIVE Digital Marketing Agency.",
      sections: {
        intro:
          "At NOWLIVE we value your privacy and protect your personal data. This policy explains how we collect, use, and safeguard your information.",
        infoTitle: "1. Information We Collect",
        infoBody:
          "We may collect your name, email, and phone when you submit forms or subscribe to our newsletter.",
        useTitle: "2. How We Use Information",
        useItems: [
          "Provide and improve our digital services.",
          "Communicate about your inquiries or projects.",
          "Send updates and promotional material.",
          "Analyze site performance.",
        ],
        protectionTitle: "3. Data Protection",
        protectionBody:
          "We implement technical and organizational safeguards to prevent unauthorized access, alteration, or accidental disclosure.",
        rightsTitle: "4. Your Rights",
        rightsBody:
          "You can access, correct, or delete your data anytime. Contact us to exercise these rights.",
      },
    },
    terms: {
      title: "Terms of Service",
      lastUpdate: "Last update: January 2026. NOWLIVE.",
      intro:
        "Welcome to NOWLIVE. By using our site and services you agree to these terms and conditions.",
      sections: [
        {
          title: "1. Website Use",
          body: "Content is for general information and personal use. It may change without notice. Unauthorized use is prohibited.",
        },
        {
          title: "2. Intellectual Property",
          body: "All material is owned by NOWLIVE or used under license. Reproduction requires prior agreement.",
        },
        {
          title: "3. Services and Consulting",
          body: "Services are subject to specific contracts. Free proposals are not an obligation until a mutual agreement is signed.",
        },
        {
          title: "4. Limitation of Liability",
          body: "NOWLIVE is not liable for damages arising from use of this site or temporary interruptions.",
        },
        {
          title: "5. Jurisdiction",
          body: "Any dispute is governed by applicable law and competent courts.",
        },
      ],
    },
  },
};

export function getTranslations(lang: Language) {
  return translations[lang];
}
