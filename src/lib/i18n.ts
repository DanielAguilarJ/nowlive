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
        "CreamosTech es tu socio estratégico de transformación digital. Creamos experiencias de marca, webs que convierten y estrategias basadas en datos que generan resultados medibles.",
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
        "No solo lo decimos nosotros. Esto comentan nuestros clientes sobre trabajar con CreamosTech.",
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
      backToTop: "Volver arriba",
      trustBadges: {
        ssl: "SSL Seguro",
        gdpr: "GDPR Compliant",
        support: "24/7 Soporte",
        iso: "ISO 27001",
      },
      contact: {
        title: "Contacto",
        phone: "+34 912 345 678",
        email: "hola@creamostech.com",
        address: "Calle Gran Vía 28, 28013 Madrid, España",
      },
      liveChat: "Chat en vivo",
      liveChatSubtitle: "Respuesta inmediata",
    },
    blog: {
      title: "Blog & Recursos",
      description: "Ideas, guías y estrategias para escalar tu negocio en la era digital.",
      posts: [
        {
          title: "Plan de 90 días para ordenar tu estrategia digital",
          excerpt:
            "Roadmap accionable para alinear marketing y ventas, lanzar quick wins y construir un pipeline medible en 90 días.",
          date: "14 Enero, 2026",
          author: "Estrategia CreamosTech",
          category: "Estrategia",
          slug: "plan-90-dias-estrategia-digital",
          image: "/images/blog/blog_strategy_plan.png",
        },
        {
          title: "Guía de SEO técnico B2B 2026",
          excerpt: "Checklist avanzado de performance, indexación y schema para ganar posiciones sin depender solo de contenido.",
          date: "14 Enero, 2026",
          author: "SEO CreamosTech",
          category: "SEO & Analytics",
          slug: "guia-seo-tecnico-b2b-2026",
          image: "/images/blog/blog_seo_guide.png",
        },
        {
          title: "Playbook de automatización para SaaS B2B",
          excerpt: "Scoring, nurtures y handoff limpio a ventas para no perder leads calientes.",
          date: "14 Enero, 2026",
          author: "Automation CreamosTech",
          category: "Marketing Automation",
          slug: "playbook-automatizacion-saas-b2b",
          image: "/images/blog/blog_automation_playbook.png",
        },
        {
          title: "Rediseña tu web para duplicar conversiones",
          excerpt: "Proceso en 6 pasos: research, arquitectura, formularios, performance y migración SEO segura.",
          date: "14 Enero, 2026",
          author: "Producto CreamosTech",
          category: "Web Design",
          slug: "redisenar-web-que-convierte",
          image: "/images/blog/blog_web_redesign.png",
        },
        {
          title: "Sistema de contenidos con IA que alimenta ventas",
          excerpt: "Framework para crear, revisar y distribuir contenido con IA sin perder calidad ni enfoque en pipeline.",
          date: "14 Enero, 2026",
          author: "Contenido CreamosTech",
          category: "Contenido",
          slug: "sistema-contenidos-ia-ventas",
          image: "/images/blog/blog_ai_content.png",
        },
        {
          title: "Branding B2B que vende",
          excerpt: "Posicionamiento, narrativa y sistema visual que se traduce en web y en kits de ventas.",
          date: "14 Enero, 2026",
          author: "Branding CreamosTech",
          category: "Branding",
          slug: "branding-b2b-que-vende",
          image: "/images/blog/blog_b2b_branding.png",
        },
        {
          title: "ABM 2026: playbook de demanda",
          excerpt: "Listas dinámicas, orquestación multicanal y sales plays para deals largos.",
          date: "14 Enero, 2026",
          author: "Demand CreamosTech",
          category: "Marketing",
          slug: "abm-b2b-playbook-demand-gen",
          image: "/images/blog/blog_abm_2026.png",
        },
        {
          title: "CRO en 30 días",
          excerpt: "Quick wins B2B: formularios cortos, prueba social y ofertas alternativas.",
          date: "14 Enero, 2026",
          author: "CRO CreamosTech",
          category: "UX/UI",
          slug: "cro-30-dias-b2b",
          image: "/images/blog/blog_cro_wins.png",
        },
        {
          title: "GA4 y dashboard en 7 días",
          excerpt: "Eventos claros, nomenclatura estándar y panel ejecutivo con CAC.",
          date: "14 Enero, 2026",
          author: "Analytics CreamosTech",
          category: "Tecnología",
          slug: "ga4-dashboards-ejecutivos",
          image: "/images/blog/blog_ga4_dashboard.png",
        },
        {
          title: "LinkedIn Ads B2B 2026",
          excerpt: "Segmentación fina, creatividades por rol y medición de pipeline.",
          date: "14 Enero, 2026",
          author: "Paid CreamosTech",
          category: "Marketing",
          slug: "linkedin-ads-b2b-2026",
          image: "/images/blog/blog_linkedin_ads.png",
        },
        {
          title: "Entregabilidad de email segura",
          excerpt: "Warmup, autenticación y alertas para inbox placement en 2026.",
          date: "14 Enero, 2026",
          author: "Email CreamosTech",
          category: "Marketing",
          slug: "entregabilidad-email-b2b",
          image: "/images/blog/blog_email_deliverability.png",
        },
        {
          title: "Lead scoring con datos de producto",
          excerpt: "Prioriza leads con señales in-app y alertas automáticas a ventas.",
          date: "14 Enero, 2026",
          author: "Product Data CreamosTech",
          category: "Marketing",
          slug: "lead-scoring-product-data",
          image: "/images/blog/blog_lead_scoring.png",
        },
        {
          title: "SEO ecommerce con intención",
          excerpt: "Arquitectura, facetas, CWV y copy transaccional para vender más.",
          date: "14 Enero, 2026",
          author: "SEO CreamosTech",
          category: "SEO",
          slug: "seo-ecommerce-intencion",
          image: "/images/blog/blog_seo_ecommerce.png",
        },
        {
          title: "Content refresh que escala",
          excerpt: "Sube posiciones y leads actualizando lo que ya tienes.",
          date: "14 Enero, 2026",
          author: "Content CreamosTech",
          category: "Contenido",
          slug: "content-refresh-2026",
          image: "/images/blog/blog_content_refresh.png",
        },
        {
          title: "Automatización ecommerce",
          excerpt: "Carrito, postcompra y retención para elevar LTV.",
          date: "14 Enero, 2026",
          author: "Ecommerce CreamosTech",
          category: "Marketing",
          slug: "automatizacion-ecommerce-playbook",
          image: "/images/blog/blog_ecommerce_automation.png",
        },
        {
          title: "Servicios productizados",
          excerpt: "Paquetes claros, precios y playbooks para escalar delivery.",
          date: "14 Enero, 2026",
          author: "Growth CreamosTech",
          category: "Estrategia",
          slug: "servicios-productizados-growth",
          image: "/images/blog/blog_productized_services.png",
        },
      ],
    },
    resources: {
      title: "Recursos",
      description: "Herramientas, guías y plantillas accionables listas para usar en tu equipo.",
      items: [
        {
          title: "Plan de 90 días de estrategia digital",
          type: "Guía",
          level: "Avanzado",
          description: "Roadmap accionable para alinear marketing, ventas y medición en 90 días.",
          link: "/blog/plan-90-dias-estrategia-digital",
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
        {
          title: "Onboarding fintech",
          industry: "Finanzas",
          service: "Producto + Automatización",
          summary: "Rediseñamos KYC y nutrimos leads con workflows basados en riesgo y comportamiento.",
          metrics: ["-42% tiempo de activación", "+27% tasa de verificación", "+32% LTV a 90 días"],
          link: "/services/marketing-automation",
        },
        {
          title: "Ecommerce DTC en crecimiento",
          industry: "Ecommerce",
          service: "Performance + CRO",
          summary: "Optimizamos PDP, bundles y flujos postcompra con experimentos semanales.",
          metrics: ["+38% conversión en PDP", "+22% AOV", "3.6x ROAS blended"],
          link: "/services/seo-analytics",
        },
        {
          title: "Demand gen industrial",
          industry: "Industria B2B",
          service: "SEO + ABM",
          summary: "Creamos clusters técnicos, webinars y secuencias ABM para cuentas de alto valor.",
          metrics: ["+210% SQLs", "5.4% tasa demo→oportunidad", "-28% ciclo de venta"],
          link: "/services/digital-strategy",
        },
        {
          title: "Marketplace dos lados",
          industry: "Marketplace",
          service: "Producto + Contenido",
          summary: "Balanceamos oferta y demanda con landings localizadas, pricing tests y contenido UGC.",
          metrics: ["+55% registros lado oferta", "+31% bookings completados", "NPS +1.2 puntos"],
          link: "/services/content-creation",
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
          quote: "CreamosTech reestructuró nuestro funnel y reporting. Hoy sabemos qué mover cada semana para crecer.",
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
      launchNote: "Lanzamiento: Enero 2026. CreamosTech Digital Marketing Agency.",
      sections: {
        intro:
          "En CreamosTech valoramos tu privacidad y protegemos tus datos personales. Esta política describe cómo recopilamos, usamos y protegemos tu información.",
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
      lastUpdate: "Última actualización: Enero 2026. CreamosTech.",
      intro:
        "Bienvenido a CreamosTech. Al usar nuestro sitio y servicios aceptas estos términos y condiciones.",
      sections: [
        {
          title: "1. Uso del Sitio Web",
          body: "Contenido para información general y uso personal. Puede cambiar sin previo aviso. Uso no autorizado prohibido.",
        },
        {
          title: "2. Propiedad Intelectual",
          body: "Todo el material es propiedad de CreamosTech o usado bajo licencia. Reproducción prohibida sin acuerdo previo.",
        },
        {
          title: "3. Servicios y Consultoría",
          body: "Servicios sujetos a contratos específicos. Propuestas gratuitas no son obligación hasta acuerdo mutuo.",
        },
        {
          title: "4. Limitación de Responsabilidad",
          body: "CreamosTech no es responsable por daños derivados del uso del sitio o interrupciones temporales.",
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
        "CreamosTech is your strategic partner for digital transformation. We craft brand experiences, build high-converting sites, and run data-driven strategies that deliver measurable results.",
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
        "Don't just take our word for it. Here's what clients say about working with CreamosTech.",
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
      backToTop: "Back to top",
      trustBadges: {
        ssl: "SSL Secure",
        gdpr: "GDPR Compliant",
        support: "24/7 Support",
        iso: "ISO 27001",
      },
      contact: {
        title: "Contact",
        phone: "+34 912 345 678",
        email: "hello@creamostech.com",
        address: "Calle Gran Via 28, 28013 Madrid, Spain",
      },
      liveChat: "Live Chat",
      liveChatSubtitle: "Instant response",
    },
    blog: {
      title: "Blog & Resources",
      description: "Ideas, guides, and strategies to scale your business in the digital era.",
      posts: [
        {
          title: "90-Day Digital Strategy Plan",
          excerpt:
            "An actionable roadmap to align marketing and sales, launch quick wins, and build a measurable pipeline.",
          date: "Jan 14, 2026",
          author: "CreamosTech Strategy",
          category: "Strategy",
          slug: "plan-90-dias-estrategia-digital",
          image: "/images/blog/blog_strategy_plan.png",
        },
        {
          title: "B2B Technical SEO Guide 2026",
          excerpt: "Advanced checklist for performance, indexation, and schema to win rankings without endless content.",
          date: "Jan 14, 2026",
          author: "CreamosTech SEO",
          category: "SEO & Analytics",
          slug: "guia-seo-tecnico-b2b-2026",
          image: "/images/blog/blog_seo_guide.png",
        },
        {
          title: "Marketing Automation Playbook for B2B SaaS",
          excerpt: "Scoring, nurtures, and a clean handoff to sales so hot leads never get cold.",
          date: "Jan 14, 2026",
          author: "CreamosTech Automation",
          category: "Marketing Automation",
          slug: "playbook-automatizacion-saas-b2b",
          image: "/images/blog/blog_automation_playbook.png",
        },
        {
          title: "Redesign Your Website to Double Conversions",
          excerpt: "Six-step process: research, IA, forms, performance, and a safe SEO migration.",
          date: "Jan 14, 2026",
          author: "CreamosTech Product",
          category: "Web Design",
          slug: "redisenar-web-que-convierte",
          image: "/images/blog/blog_web_redesign.png",
        },
        {
          title: "AI Content System That Feeds Sales",
          excerpt: "Framework to brief, generate, QA, and distribute AI content that moves pipeline, not vanity metrics.",
          date: "Jan 14, 2026",
          author: "CreamosTech Content",
          category: "Content",
          slug: "sistema-contenidos-ia-ventas",
          image: "/images/blog/blog_ai_content.png",
        },
        {
          title: "B2B Branding That Sells",
          excerpt: "Positioning, narrative, and a visual system that translates into web and sales kits.",
          date: "Jan 14, 2026",
          author: "CreamosTech Branding",
          category: "Branding",
          slug: "branding-b2b-que-vende",
          image: "/images/blog/blog_b2b_branding.png",
        },
        {
          title: "ABM 2026 Demand Playbook",
          excerpt: "Dynamic lists, multichannel orchestration, and sales plays for long B2B deals.",
          date: "Jan 14, 2026",
          author: "CreamosTech Demand",
          category: "Marketing",
          slug: "abm-b2b-playbook-demand-gen",
          image: "/images/blog/blog_abm_2026.png",
        },
        {
          title: "30-Day CRO Wins",
          excerpt: "Shorter forms, social proof, and alternative offers to lift B2B conversion fast.",
          date: "Jan 14, 2026",
          author: "CreamosTech CRO",
          category: "UX/UI",
          slug: "cro-30-dias-b2b",
          image: "/images/blog/blog_cro_wins.png",
        },
        {
          title: "GA4 + Exec Dashboard in 7 Days",
          excerpt: "Clean events, standard naming, and an executive panel with CAC and pipeline.",
          date: "Jan 14, 2026",
          author: "CreamosTech Analytics",
          category: "Technology",
          slug: "ga4-dashboards-ejecutivos",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
        },
        {
          title: "LinkedIn Ads B2B 2026",
          excerpt: "Tight targeting, role-based creatives, and pipeline-focused measurement.",
          date: "Jan 14, 2026",
          author: "CreamosTech Paid",
          category: "Marketing",
          slug: "linkedin-ads-b2b-2026",
          image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=600&fit=crop",
        },
        {
          title: "Email Deliverability & Warmup",
          excerpt: "Authentication, warmup, and alerts to stay in the inbox in 2026.",
          date: "Jan 14, 2026",
          author: "CreamosTech Email",
          category: "Marketing",
          slug: "entregabilidad-email-b2b",
          image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&h=600&fit=crop",
        },
        {
          title: "Lead Scoring with Product Data",
          excerpt: "Prioritize with in-app signals and auto-alerts to sales.",
          date: "Jan 14, 2026",
          author: "CreamosTech Product Data",
          category: "Marketing",
          slug: "lead-scoring-product-data",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
        },
        {
          title: "Ecommerce SEO with Purchase Intent",
          excerpt: "Architecture, facets, CWV, and transactional copy that drives revenue.",
          date: "Jan 14, 2026",
          author: "CreamosTech SEO",
          category: "SEO",
          slug: "seo-ecommerce-intencion",
          image: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=800&h=600&fit=crop",
        },
        {
          title: "Content Refresh That Scales",
          excerpt: "Climb rankings and leads by updating what you already have.",
          date: "Jan 14, 2026",
          author: "CreamosTech Content",
          category: "Content",
          slug: "content-refresh-2026",
          image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=600&fit=crop",
        },
        {
          title: "Ecommerce Automation Playbook",
          excerpt: "Cart recovery, post-purchase, and retention flows that grow LTV.",
          date: "Jan 14, 2026",
          author: "CreamosTech Ecommerce",
          category: "Marketing",
          slug: "automatizacion-ecommerce-playbook",
          image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&h=600&fit=crop",
        },
        {
          title: "Productized Services for Growth",
          excerpt: "Packages, pricing, and playbooks to sell faster and protect margins.",
          date: "Jan 14, 2026",
          author: "CreamosTech Growth",
          category: "Strategy",
          slug: "servicios-productizados-growth",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
        },
      ],
    },
    resources: {
      title: "Resources",
      description: "Actionable guides, templates, and tools your team can ship with today.",
      items: [
        {
          title: "90-Day Digital Strategy Plan",
          type: "Guide",
          level: "Advanced",
          description: "Actionable roadmap to align marketing, sales, and measurement in 90 days.",
          link: "/blog/plan-90-dias-estrategia-digital",
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
        {
          title: "Fintech Onboarding",
          industry: "Finance",
          service: "Product + Automation",
          summary: "Redesigned KYC and nurtured leads with risk-based and behavioral workflows.",
          metrics: ["-42% time to activate", "+27% verification completion", "+32% LTV at 90 days"],
          link: "/services/marketing-automation",
        },
        {
          title: "Scaling DTC Ecommerce",
          industry: "Ecommerce",
          service: "Performance + CRO",
          summary: "Optimized PDPs, bundles, and post-purchase flows with weekly experiments.",
          metrics: ["+38% PDP conversion", "+22% AOV", "3.6x blended ROAS"],
          link: "/services/seo-analytics",
        },
        {
          title: "Industrial B2B Demand",
          industry: "Manufacturing",
          service: "SEO + ABM",
          summary: "Built technical content clusters, webinars, and ABM sequences for target accounts.",
          metrics: ["+210% SQLs", "5.4% demo->opportunity", "-28% sales cycle"],
          link: "/services/digital-strategy",
        },
        {
          title: "Two-Sided Marketplace",
          industry: "Marketplace",
          service: "Product + Content",
          summary: "Balanced supply and demand with localized landings, pricing tests, and UGC.",
          metrics: ["+55% supply signups", "+31% completed bookings", "+1.2 NPS points"],
          link: "/services/content-creation",
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
          quote: "CreamosTech rebuilt our funnel and reporting. We know exactly what to adjust each week to grow.",
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
      launchNote: "Launch: January 2026. CreamosTech Digital Marketing Agency.",
      sections: {
        intro:
          "At CreamosTech we value your privacy and protect your personal data. This policy explains how we collect, use, and safeguard your information.",
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
      lastUpdate: "Last update: January 2026. CreamosTech.",
      intro:
        "Welcome to CreamosTech. By using our site and services you agree to these terms and conditions.",
      sections: [
        {
          title: "1. Website Use",
          body: "Content is for general information and personal use. It may change without notice. Unauthorized use is prohibited.",
        },
        {
          title: "2. Intellectual Property",
          body: "All material is owned by CreamosTech or used under license. Reproduction requires prior agreement.",
        },
        {
          title: "3. Services and Consulting",
          body: "Services are subject to specific contracts. Free proposals are not an obligation until a mutual agreement is signed.",
        },
        {
          title: "4. Limitation of Liability",
          body: "CreamosTech is not liable for damages arising from use of this site or temporary interruptions.",
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
