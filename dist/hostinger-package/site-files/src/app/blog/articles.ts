import { absoluteUrl, siteConfig } from '@/lib/seo';

export type ArticleSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  heroImage: string;
  keywords: string[];
  summary: string;
  painPoints?: string[];
  sections: ArticleSection[];
  takeaways: string[];
  checklist?: string[];
  serviceCTA: {
    label: string;
    href: string;
    helper: string;
  };
};

export const blogArticles: BlogArticle[] = [
  {
    slug: 'plan-90-dias-estrategia-digital',
    title: 'Plan de 90 días para ordenar tu estrategia digital y generar pipeline',
    description:
      'Un playbook accionable para pasar de la dispersión táctica a un plan de 90 días con foco en ingresos: research, priorización, campañas y reporting ejecutivo.',
    category: 'Estrategia Digital',
    author: 'Estrategia CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '14 min',
    heroImage: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1400&h=900&fit=crop',
    keywords: [
      'plan 90 dias marketing',
      'estrategia digital 2026',
      'go to market',
      'roadmap de marketing',
      'alineacion marketing ventas',
    ],
    summary:
      'Si tu marketing está repartido entre campañas aisladas, este plan te ayuda a alinear objetivos, priorizar quick wins y lanzar un sistema medible en 90 días.',
    painPoints: [
      'No hay un backlog priorizado ni dueños claros por KPI.',
      'Las campañas funcionan por separado y no alimentan un pipeline unificado.',
      'Reporting incompleto: se miden clics pero no oportunidades ni revenue.',
      'Falta una cadencia semanal que obligue a decidir y re-priorizar.',
    ],
    sections: [
      {
        title: 'Días 0-10: diagnóstico veloz y datos mínimos',
        paragraphs: [
          'Arranca con un sprint de descubrimiento enfocado en negocio. Define ICP, mapa de dolor y propuesta de valor diferenciada por segmento.',
        ],
        bullets: [
          'Entrevistas relámpago a 5 clientes y 5 no clientes para validar fricciones y lenguaje real.',
          'Revisión de analítica: GA4, CRM y costos de adquisición por canal. Si falta tracking, se instala base mínima (UTMs, eventos clave).',
          'Inventario de activos existentes: ebooks, casos de éxito, email series, landings y creatividades reutilizables.',
        ],
      },
      {
        title: 'Días 11-30: quick wins que financian el plan',
        paragraphs: [
          'Prioriza acciones con alto impacto y baja complejidad para demostrar tracción temprana y obtener buy-in interno.',
        ],
        bullets: [
          'Lanza una landing foco en el problema #1 del ICP con oferta clara (demo, diagnóstico o audit express).',
          'Activa remarketing con creatividades de dolor/valor y prueba 2 CTAs: demo vs. calculadora/benchmark.',
          'Secuencia de emails de nutrición de 5 pasos conectada al CRM: bienvenida, caso similar, objeciones, ROI, cierre con agenda.',
          'Dashboard ejecutivo semanal: tráfico, leads calificados, oportunidades, costo por oportunidad y win rate.',
        ],
      },
      {
        title: 'Días 31-60: experimentos estructurados',
        paragraphs: [
          'Define 3 hipótesis de adquisición y 2 de conversión. Corre experimentos con horizonte de 2 semanas y criterios de éxito claros.',
        ],
        bullets: [
          'Canales: una prueba en paid (LinkedIn/Meta) con segmentación precisa y otra en orgánico (SEO/partnerships).',
          'Conversion rate optimization: test de titulares y prueba social en hero, más un flow de abandono de formulario en tiempo real.',
          'Contenido de medio-funnel: webinar táctico grabado y distribuido como serie corta para drips y paid.',
          'Lead routing y SLA: definición de MQL/SQL y tiempos máximos de respuesta con alertas automáticas.',
        ],
      },
      {
        title: 'Días 61-90: escalar, documentar y gobernar',
        paragraphs: [
          'Escala lo que funcionó, documenta procesos y deja gobernanza clara para seguir optimizando después del día 90.',
        ],
        bullets: [
          'Duplicar presupuesto sólo en campañas con CAC dentro del rango objetivo y ratio LTV/CAC > 3x.',
          'Documentar playbooks: briefs creativos, checklist de campañas, plantillas de reportes y SOPs para lanzamientos.',
          'Reunión de QBR: aprendizajes, backlog priorizado, riesgos y próximos OKRs alineados a revenue.',
          'Handoff a equipo interno: owners por canal, frecuencia de experimentos y definición de guardrails (CPA máximo, % presupuesto en tests).',
        ],
      },
      {
        title: 'Cadencia de control y métricas que importan',
        paragraphs: [
          'Sin cadencia no hay foco. Instala rituales ligeros que obliguen a decidir con datos.',
        ],
        bullets: [
          'Daily ligero: bloqueos y lanzamientos del día. 10 minutos.',
          'Weekly de performance: revisión de 5 métricas (leads calificados, SQL, pipeline, CAC, velocidad de venta).',
          'Retro bisemanal de experimentos: qué mantener, matar o escalar. Documenta en backlog vivo.',
          'Health dashboard: uptime del tracking, integridad de datos y calidad de scoring.',
        ],
      },
    ],
    takeaways: [
      'Define ICP, dolor y oferta antes de tocar presupuesto.',
      'Lanza rápido una landing y remarketing para financiar el plan.',
      'Experimenta con hipótesis acotadas y criterios de éxito claros.',
      'Cierra con gobernanza: owners, SOPs y guardrails de inversión.',
    ],
    checklist: [
      'UTMs y eventos clave activos en GA4 + CRM integrado',
      'Oferta clara por segmento (demo, audit, benchmark)',
      '2 campañas pagas y 1 orgánica con hipótesis explícita',
      'Dashboard ejecutivo semanal con pipeline y CAC',
      'Backlog priorizado y owners asignados por canal',
    ],
    serviceCTA: {
      label: 'Construir mi plan de 90 días',
      href: '/services/digital-strategy',
      helper: 'Hacemos el diagnóstico, roadmap y activación junto a tu equipo en 3 semanas.',
    },
  },
  {
    slug: 'guia-seo-tecnico-b2b-2026',
    title: 'Guía de SEO técnico B2B 2026: auditoría, performance y schema que posiciona',
    description:
      'Checklist avanzado para auditar tu SEO técnico en 2026: velocidad, indexación, arquitectura, schema y señalización de calidad para negocios B2B.',
    category: 'SEO & Analytics',
    author: 'SEO CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '13 min',
    heroImage: 'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=1400&h=900&fit=crop',
    keywords: ['seo tecnico', 'core web vitals', 'schema b2b', 'indexacion', 'arquitectura web'],
    summary:
      'El SEO B2B se gana con señales técnicas impecables. Esta guía resume los 20 puntos que revisamos en cada auditoría para subir posiciones sin depender solo de contenido.',
    painPoints: [
      'CWV inestables en móvil penalizando visibilidad.',
      'Arquitectura profunda sin enlaces internos suficientes.',
      'Datos estructurados incompletos o con warnings en Search Console.',
      'Logs sin revisar: bots gastando crawl budget en URLs irrelevantes.',
    ],
    sections: [
      {
        title: 'Core Web Vitals y experiencia en móvil primero',
        paragraphs: [
          'CWV sigue siendo señal de ranking. Optimiza LCP, CLS y INP con enfoque en recursos críticos y orden de renderizado.',
        ],
        bullets: [
          'Sirve imágenes AVIF/WebP y precarga la hero. Reduce CLS asegurando dimensiones fijas.',
          'Divide JS por rutas críticas, elimina scripts bloqueantes y usa `priority` en imágenes above the fold.',
          'Mide en dispositivos reales. Usa RUM y segmenta por plantilla para priorizar fixes de alto impacto.',
        ],
      },
      {
        title: 'Arquitectura y enlaces internos que reparten autoridad',
        paragraphs: [
          'Una IA bien pensada reduce dependencias de backlinks. Haz que cada clúster temático sea navegable en 3 clics.',
        ],
        bullets: [
          'Mapea clústers con pilares y subtemas. Implementa breadcrumbs y enlaces contextuales entre artículos.',
          'Evita canibalización: una URL, una intención. Usa canonical y redirecciones 301 limpias.',
          'Sitemaps por tipo de contenido y prioridad alta en pilares. Revisa 404 y 5xx semanalmente.',
        ],
      },
      {
        title: 'Indexación inteligente: limpia, prioriza y protege el crawl budget',
        paragraphs: [
          'Googlebot pierde tiempo si no le dices qué no rastrear. Limpia lo irrelevante y protege lo que genera negocio.',
        ],
        bullets: [
          'Bloquea en robots.txt parámetros sin valor y páginas de baja intención comercial.',
          'Implementa noindex en etiquetas, buscadores internos y versiones duplicadas.',
          'Revisa logs para detectar códigos 302 permanentes, cadenas de redirecciones y picos de 404.',
        ],
      },
      {
        title: 'Schema para entidades B2B y E-E-A-T',
        paragraphs: [
          'Los rich results mejoran CTR y comprensión semántica. Estructura datos en cada plantilla.',
        ],
        bullets: [
          'Organización y WebSite con `sameAs` a LinkedIn, Wikidata y redes oficiales.',
          'Article con autor verificado, fecha y `about` apuntando a servicios o industrias.',
          'FAQ y HowTo en páginas de soporte y guías. Marca testimonios con `Review` cuando aplique.',
        ],
      },
      {
        title: 'Medición y alertas proactivas',
        paragraphs: [
          'Instala alertas que avisen antes de perder tráfico por errores técnicos.',
        ],
        bullets: [
          'Alertas en Search Console para cobertura, CWV y anomalías de rastreo.',
          'Monitor de uptimes y lighthouse programático por plantilla.',
          'Dashboard de logs: % de hits de bots en URLs no estratégicas y tiempos de respuesta por status code.',
        ],
      },
    ],
    takeaways: [
      'Empieza por CWV real en móvil y elimina JS innecesario.',
      'Diseña clústers y enlaces internos antes de producir más contenido.',
      'Limpia indexación: robots, noindex y canonicals coherentes.',
      'Implementa schema completo y alertas técnicas proactivas.',
    ],
    checklist: [
      'LCP <2.5s e INP <200ms en mobile RUM',
      'Breadcrumbs + clústers enlazados en 3 clics',
      'Sitemaps limpios y logs revisados semanalmente',
      'Schema Article, FAQ y Organization sin warnings',
      'Alertas de cobertura y CWV en Search Console',
    ],
    serviceCTA: {
      label: 'Quiero una auditoría SEO técnica',
      href: '/services/seo-analytics',
      helper: 'Auditamos CWV, rastreo, schema y arquitectura, y entregamos plan de fixes priorizado.',
    },
  },
  {
    slug: 'playbook-automatizacion-saas-b2b',
    title: 'Playbook de automatización para SaaS B2B: scoring, nurtures y handoff limpio a ventas',
    description:
      'Arquitectura de automatización para SaaS B2B: scoring, rutas de lead, nurtures multicanal y playbooks para SDR con datos confiables.',
    category: 'Marketing Automation',
    author: 'Automation CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '12 min',
    heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&h=900&fit=crop',
    keywords: ['marketing automation', 'lead scoring', 'saas b2b', 'hubspot', 'drip campaigns'],
    summary:
      'Si cada lead recibe el mismo trato, se quema pipeline. Este playbook te muestra cómo priorizar, nutrir y entregar leads listos a ventas con datos limpios.',
    painPoints: [
      'No hay scoring y el equipo comercial pierde tiempo con leads fríos.',
      'Handoff desordenado: campos incompletos y falta de contexto.',
      'Campañas de nurturing genéricas sin variación por segmento o comportamiento.',
      'Reportes inconsistentes por falta de normalización de datos.',
    ],
    sections: [
      {
        title: 'Definir segmentos y señales de intención',
        paragraphs: [
          'Parte de la segmentación para que el scoring sea real. Define señales firmográficas, demográficas y de comportamiento.',
        ],
        bullets: [
          'Segmentos base: industria, tamaño, modelo (SaaS, services), país y stack tecnológico.',
          'Señales de intención: visitas a pricing, número de usuarios activos en trial, eventos in-app clave y descargas de assets de BOFU.',
          'Campos obligatorios en formularios + enriquecimiento automático (Clearbit/ZoomInfo) para evitar fricción.',
        ],
      },
      {
        title: 'Lead scoring híbrido: fit + intent',
        paragraphs: [
          'Combina fit (quién) e intent (qué hace). Ajusta pesos por canal para evitar sesgos de ads.',
        ],
        bullets: [
          'Score de fit (0-50): rol decisor, industria objetivo, tamaño de cuenta.',
          'Score de intent (0-50): vistas de pricing, solicitudes de demo, uso de features clave, engagement en emails.',
          'Umbrales claros: MQL (60), SAL (70), SQL (80). Triggers automáticos hacia SDR con contexto.',
        ],
      },
      {
        title: 'Nurtures multicanal y personalización ligera',
        paragraphs: [
          'Crea journeys diferenciados por segmento y nivel de intención. Usa email, in-app y retargeting coordinados.',
        ],
        bullets: [
          'Secuencia de bienvenida (5 correos): valor, caso similar, objeciones, ROI, CTA demo.',
          'Ramificación por comportamiento: si no abren en 7 días, mover a secuencia de engagement con contenido educativo.',
          'Retargeting sincronizado: creatividades alineadas a etapa (awareness, evaluation, purchase).',
          'Mensajes in-app para usuarios de trial con tips personalizados por uso de features.',
        ],
      },
      {
        title: 'Handoff a ventas y SLA claros',
        paragraphs: [
          'Un buen handoff evita repetición de preguntas y acelera el cierre.',
        ],
        bullets: [
          'Registro automático en CRM con origen, campaña, activos consumidos y score.',
          'Tareas para SDR con snippets de contexto y plantilla de primer contacto.',
          'SLA: respuesta en <15 minutos para leads calientes; alertas a managers si se incumple.',
          'Closed loop: feedback de calidad de leads para ajustar scoring y creatividades.',
        ],
      },
      {
        title: 'Medición: pipeline, no solo aperturas',
        paragraphs: [
          'Mide lo que mueve revenue. Ajusta campañas con base en pipeline y win rate, no en CTR.',
        ],
        bullets: [
          'Panel unificado: MQL, SAL, SQL, pipeline generado, win rate, ciclo de venta y CAC por canal.',
          'Atribución simple al inicio (position-based) y evoluciona a data-driven cuando haya volumen.',
          'Pruebas controladas: cambia un elemento por vez en nurtures (asunto, CTA, offer) para aislar impacto.',
        ],
      },
    ],
    takeaways: [
      'Segmenta y define señales antes de automatizar.',
      'Scoring híbrido fit + intent con umbrales claros.',
      'Nurtures multicanal con ramificación por comportamiento.',
      'Handoff limpio a ventas y reporting centrado en pipeline.',
    ],
    checklist: [
      'Campos normalizados y enriquecimiento automático activo',
      'Scoring configurado con pesos y umbrales MQL/SAL/SQL',
      'Journeys de email + retargeting sincronizados',
      'Tareas y SLA automáticos para SDR',
      'Dashboard de pipeline por canal y cohorte',
    ],
    serviceCTA: {
      label: 'Automatizar mi funnel B2B',
      href: '/services/marketing-automation',
      helper: 'Diseñamos scoring, nurtures y handoff en tu stack (HubSpot, Salesforce, ActiveCampaign).',
    },
  },
  {
    slug: 'redisenar-web-que-convierte',
    title: 'Cómo rediseñar tu web para duplicar conversiones sin perder SEO',
    description:
      'Proceso en 6 pasos para rediseñar tu web: research, propuesta de valor, arquitectura, UX de formularios, performance y migración SEO segura.',
    category: 'Web Design',
    author: 'Producto CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '11 min',
    heroImage: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1400&h=900&fit=crop',
    keywords: ['rediseño web', 'conversion rate optimization', 'migracion seo', 'ux b2b', 'cro'],
    summary:
      'Un rediseño no es solo estética. Esta guía prioriza research, mensajes claros, formularios sin fricción y una migración que conserve tu SEO.',
    painPoints: [
      'Webs que hablan de la empresa y no del dolor del cliente.',
      'Formularios largos sin validaciones ni autofill.',
      'Migraciones que rompen rankings por cambios de URLs y tracking.',
      'Velocidad lenta en móvil que mata la intención.',
    ],
    sections: [
      {
        title: 'Research rápido y propuesta de valor',
        paragraphs: [
          'Antes del diseño, aterriza la historia: problema, solución, prueba social y CTA.',
        ],
        bullets: [
          'Entrevistas cortas y análisis de chat/soporte para extraer objeciones reales.',
          'Propuesta de valor en 2 líneas: quién eres, qué resuelves y prueba de impacto.',
          'Mapa de priorización por secciones: hero, prueba social, beneficios, cómo funciona, pricing/contacto.',
        ],
      },
      {
        title: 'Arquitectura y navegación simple',
        paragraphs: [
          'Menú corto, rutas claras y navegación secundaria para recursos.',
        ],
        bullets: [
          'IA con máximo 3 niveles. URLs limpias con keywords y consistencia.',
          'Breadcrumbs y enlaces contextuales para SEO y UX.',
          'Módulos reutilizables y diseño modular para escalar nuevas páginas rápido.',
        ],
      },
      {
        title: 'Formularios y microcopy que convierten',
        paragraphs: [
          'Reduce fricción: menos campos, ayudas y promesa clara de siguiente paso.',
        ],
        bullets: [
          'Autofill y validaciones en línea. Evita campos abiertos innecesarios.',
          'Microcopy con prueba social junto al CTA. Ej: “+180 demos agendadas el último trimestre”.',
          'Ofertas alternativas: agenda directa vs. descarga para leads tempranos.',
        ],
      },
      {
        title: 'Performance y accesibilidad como base',
        paragraphs: [
          'Prioriza LCP, INP y buenas prácticas A11y.',
        ],
        bullets: [
          'Imágenes optimizadas, fonts con `display: swap` y lazy load en media secundarios.',
          'Contrastes AA, navegación con teclado y etiquetas ARIA en formularios.',
          'Monitor de CWV por plantilla y alertas ante regresiones.',
        ],
      },
      {
        title: 'Migración SEO sin perder rankings',
        paragraphs: [
          'Planifica redirects y mantiene tracking intacto.',
        ],
        bullets: [
          'Mapa de redirecciones 301 uno a uno y limpieza de 404.',
          'Mantén metadatos, schema y contenido clave; actualiza sitemaps y robots.',
          'Pruebas antes del go-live: crawl, validación de eventos y tests de formularios.',
        ],
      },
    ],
    takeaways: [
      'Empieza por la propuesta de valor y objeciones reales.',
      'Arquitectura simple y formularios cortos con prueba social.',
      'Performance y accesibilidad son conversión y SEO.',
      'Migra con redirects y validación de tracking antes del go-live.',
    ],
    checklist: [
      'Propuesta de valor clara en hero + CTA',
      'Arquitectura y URLs definidas con keywords',
      'Formularios cortos con autofill y microcopy',
      'CWV en verde y contrastes AA',
      'Mapa de redirecciones y tracking validado',
    ],
    serviceCTA: {
      label: 'Rediseñar mi web con conversión',
      href: '/services/web-design',
      helper: 'Investigación, UX/UI, desarrollo y migración SEO sin perder posicionamiento.',
    },
  },
  {
    slug: 'sistema-contenidos-ia-ventas',
    title: 'Sistema de contenidos con IA que alimenta ventas: de la idea a la distribución',
    description:
      'Framework para producir contenido con IA sin perder calidad: pilares, briefs, prompts, QA humano y distribución multicanal.',
    category: 'Contenido & Demand Gen',
    author: 'Contenido CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '12 min',
    heroImage: 'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=1400&h=900&fit=crop',
    keywords: ['contenido con ia', 'content ops', 'demand generation', 'prompting', 'workflow editorial'],
    summary:
      'IA acelera, pero sin proceso genera ruido. Este sistema combina prompts, QA humano y distribución inteligente para generar demanda real.',
    painPoints: [
      'Mucho contenido, poco pipeline.',
      'Prompts sin consistencia ni checklist de calidad.',
      'Sin reutilización: cada pieza nace y muere en un canal.',
      'No se mide impacto más allá de visitas.',
    ],
    sections: [
      {
        title: 'Elegir los pilares correctos',
        paragraphs: [
          'Define 4-6 pilares alineados a problemas y productos. Cada pilar tiene 3 etapas: awareness, consideration, decision.',
        ],
        bullets: [
          'Mapea preguntas reales desde ventas y soporte. Usa data de CRM y call recordings.',
          'Para cada pilar: 1 guía larga, 2 comparativas, 3 how-to, 3 assets visuales.',
          'Crea un glosario de estilo y tono para que la IA mantenga coherencia.',
        ],
      },
      {
        title: 'Prompts y briefs que evitan contenido genérico',
        paragraphs: [
          'Un buen brief reduce edición. Incluye objetivo, audiencia, estructura y fuentes.',
        ],
        bullets: [
          'Prompt base con contexto de marca, tono, ICP y objetivo de conversión.',
          'Estructuras claras (H2/H3) con CTAs internos hacia producto o demo.',
          'Checklist de QA: datos verificables, enlaces internos, claims respaldados.',
        ],
      },
      {
        title: 'Producción y QA humano',
        paragraphs: [
          'IA genera velocidad; el editor asegura precisión y autoridad.',
        ],
        bullets: [
          'Borrador IA + factual check + voz de experto (quotes de PM/CS).',
          'Optimiza para featured snippets: preguntas directas y listas claras.',
          'Añade ejemplos de clientes y capturas sin información sensible.',
        ],
      },
      {
        title: 'Distribución multicanal desde la misma pieza',
        paragraphs: [
          'Cada artículo debe generar múltiples derivados.',
        ],
        bullets: [
          'Versión corta para newsletter, hilo de LinkedIn y vídeo corto.',
          'Snippet para onboarding in-app y base de conocimiento.',
          'Campañas de remarketing con quotes y estadísticos clave.',
        ],
      },
      {
        title: 'Medir impacto en pipeline',
        paragraphs: [
          'Mide más allá de visitas: influencia en oportunidades.',
        ],
        bullets: [
          'Atribución: UTMs, eventos de scroll/CTA y asociación a oportunidades en CRM.',
          'Panel de contenidos: páginas asistiendo oportunidades, costo por oportunidad asistida y tiempo de lectura.',
          'Ritual quincenal: matar piezas sin performance, actualizar ganadoras y crear derivados.',
        ],
      },
    ],
    takeaways: [
      'Pilares ligados a problemas reales y producto.',
      'Prompts + briefs detallados para evitar contenido genérico.',
      'QA humano añade autoridad y evidencia.',
      'Distribuye y mide por pipeline, no solo tráfico.',
    ],
    checklist: [
      '6 pilares con piezas por etapa del funnel',
      'Prompt base + checklist de QA',
      'CTAs y enlaces internos en cada pieza',
      'Derivados planificados por canal (email, social, ads)',
      'Dashboard de impacto en pipeline',
    ],
    serviceCTA: {
      label: 'Montar mi sistema de contenidos',
      href: '/services/content-creation',
      helper: 'Diseñamos pilares, prompts, QA y distribución para que cada pieza alimente ventas.',
    },
  },
  {
    slug: 'branding-b2b-que-vende',
    title: 'Branding B2B que vende: posicionamiento, narrativa y handoff a web',
    description:
      'Metodología para construir una marca B2B que impacta revenue: posicionamiento, mensaje, sistema visual y traducción a la web.',
    category: 'Brand Identity',
    author: 'Branding CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '10 min',
    heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&h=900&fit=crop',
    keywords: ['branding b2b', 'posicionamiento', 'narrativa de marca', 'manual de marca', 'identidad visual'],
    summary:
      'Un buen branding no es un logo nuevo: es claridad de posición, mensaje consistente y un sistema que aterriza en tu web y ventas.',
    painPoints: [
      'Mensajes inconsistentes entre marketing y ventas.',
      'Identidad visual desalineada con el segmento objetivo.',
      'Web que no refleja el posicionamiento ni prueba social.',
      'Falta de assets listos para campañas y sales enablement.',
    ],
    sections: [
      {
        title: 'Posicionamiento y propuesta única',
        paragraphs: [
          'Define la categoría en la que compites y la promesa concreta que cumples mejor que nadie.',
        ],
        bullets: [
          'Mapa de competencia: quién ocupa cada territorio y qué whitespace existe.',
          'Claim de marca en 12 palabras máximo, validado con clientes y ventas.',
          'Prueba de promesa: caso corto con métrica clara y contexto.',
        ],
      },
      {
        title: 'Narrativa y mensajes por audiencia',
        paragraphs: [
          'Adapta el mismo núcleo a cada audiencia: decisores, usuarios y champions internos.',
        ],
        bullets: [
          'Story arc: problema, cambio del mercado, solución, prueba, siguiente paso.',
          'Mensajes por rol: negocio (ROI, riesgo), técnico (integraciones, seguridad), usuario (flujo, tiempo).',
          'Tone of voice: 3 reglas simples que guíen todo copy (ej: directo, empático, sin jerga vacía).',
        ],
      },
      {
        title: 'Sistema visual y componentes',
        paragraphs: [
          'Diseña un sistema que pueda vivir en web, ventas y producto.',
        ],
        bullets: [
          'Paleta, tipografía y grids definidos para web y presentaciones.',
          'Biblioteca de componentes UI y patrones para landings y casos.',
          'Guidelines de imágenes: estilo, personas, mockups y uso de íconos.',
        ],
      },
      {
        title: 'Handoff a web y ventas',
        paragraphs: [
          'El branding se prueba en la web y en las conversaciones.',
        ],
        bullets: [
          'Actualiza hero, secciones de prueba social y pricing con el nuevo mensaje.',
          'Kit de ventas: deck, one-pager, email templates y casos cortos listos.',
          'Checklist de consistencia: dominios, favicons, emails, firmas y redes.',
        ],
      },
      {
        title: 'Medir impacto de marca',
        paragraphs: [
          'La marca también se mide. Sigue estos indicadores.',
        ],
        bullets: [
          'Share of search y branded traffic.',
          'Win rate en deals con vs. sin contacto previo con marca.',
          'Lift en CTR de anuncios y tiempo en página tras el rebranding.',
        ],
      },
    ],
    takeaways: [
      'Posiciona con un claim claro y evidencia real.',
      'Adapta mensaje por audiencia manteniendo un núcleo único.',
      'Sistema visual reutilizable en web, ventas y producto.',
      'Mide marca con share of search, win rate y CTR.',
    ],
    checklist: [
      'Claim y prueba social validados con clientes',
      'Guía de voz y mensajes por audiencia',
      'Sistema visual con componentes y uso aprobado',
      'Kit de ventas actualizado y distribuido',
      'Métricas de marca definidas y monitoreadas',
    ],
    serviceCTA: {
      label: 'Crear o renovar mi marca',
      href: '/services/brand-identity',
      helper: 'Posicionamiento, narrativa, identidad visual y rollout a web y ventas en 6 semanas.',
    },
  },
  {
    slug: 'abm-b2b-playbook-demand-gen',
    title: 'ABM 2026: playbook de demanda para ciclos largos',
    description:
      'Framework ABM para deals complejos: segmentación, orquestación multicanal, sales enablement y medición de oportunidades influenciadas.',
    category: 'Marketing B2B',
    author: 'Demand CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '12 min',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&h=900&fit=crop',
    keywords: ['abm', 'demand gen', 'b2b', 'orquestacion', 'pipeline'],
    summary:
      'Si tus deals tardan meses, ABM orquestado es la vía. Este playbook combina listas dinámicas, creatividades por rol y sales plays coordinados.',
    painPoints: [
      'Listas estáticas que se quedan obsoletas al mes.',
      'Campañas sin personalización por cuenta o rol.',
      'Ventas sin contexto de marketing ni señales de intent.',
      'Falta de medición de oportunidades influenciadas.',
    ],
    sections: [
      {
        title: 'Listas vivas y señales de intent',
        paragraphs: [
          'El corazón del ABM es la lista. Usa datos firmográficos y de intent para activar y pausar cuentas semanalmente.',
        ],
        bullets: [
          'Fuentes: intent data, visitas anónimas a pricing, descargas técnicas y menciones en medios.',
          'Capas: industria, tamaño, stack, señales de compra y rol decisor vs. influenciador.',
          'Reglas de entrada/salida: si baja intent 2 semanas, pasa a nutrición ligera.',
        ],
      },
      {
        title: 'Orquestación multicanal por rol',
        paragraphs: [
          'Coordina paid, email, social e inbound con mensajes por rol y etapa.',
        ],
        bullets: [
          'Secuencias outbound para decisores + remarketing con prueba social.',
          'Ads con creatividades por dolor: riesgo (CFO), integración (CTO), valor (VP Marketing).',
          'Contenido por etapa: one-pager, caso corto, demo guiada grabada.',
        ],
      },
      {
        title: 'Sales plays y SLAs claros',
        paragraphs: [
          'Ventas debe seguir la misma coreografía que marketing.',
        ],
        bullets: [
          'Playcards por industria: objeciones frecuentes y respuestas.',
          'Alertas al SDR cuando una cuenta suma intent alto o visita pricing x3.',
          'SLA de contacto <15 minutos en picos de intent.',
        ],
      },
      {
        title: 'Medición: oportunidades influenciadas y velocidad',
        paragraphs: [
          'Mide la salud del programa por oportunidades y velocidad, no solo clics.',
        ],
        bullets: [
          'KPI: cuentas activas, oportunidades influenciadas, cycle time y win rate.',
          'Atribución simple: participación de canales en oportunidades y revenue.',
          'Revisión quincenal: matar tácticas sin lift y duplicar las de mejor LTV/CAC.',
        ],
      },
    ],
    takeaways: [
      'Listas dinámicas con intent y reglas de salida.',
      'Mensajes y creatividades por rol y etapa.',
      'Sales plays sincronizados con marketing y SLAs estrictos.',
      'Mide oportunidades influenciadas y velocidad de venta.',
    ],
    checklist: [
      'Lista activa con señales de intent y owner asignado',
      'Secuencias y ads por rol (CFO/CTO/VP)',
      'Alertas de intent conectadas al CRM',
      'Dashboard de oportunidades influenciadas y cycle time',
      'Retro quincenal con ventas y marketing',
    ],
    serviceCTA: {
      label: 'Lanzar mi programa ABM',
      href: '/services/digital-strategy',
      helper: 'Diseñamos listas dinámicas, orquestación multicanal y reporting de oportunidades.',
    },
  },
  {
    slug: 'cro-30-dias-b2b',
    title: 'Optimización de conversiones en 30 días: quick wins B2B',
    description:
      'Plan de 30 días para levantar la tasa de conversión: UX de formularios, prueba social, ofertas y experimentos rápidos.',
    category: 'CRO & UX',
    author: 'CRO CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '10 min',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop',
    keywords: ['cro', 'conversion rate', 'ux', 'experimentos', 'formularios'],
    summary:
      'Un mes para mover la aguja: simplifica formularios, refuerza confianza y prueba ofertas de alto intent con medición clara.',
    painPoints: [
      'Formularios largos con baja finalización.',
      'Poca prueba social cerca de los CTAs.',
      'Sin experiments board ni hipótesis claras.',
      'No se mide impacto en pipeline, solo en clics.',
    ],
    sections: [
      {
        title: 'Semana 1: fricción cero en formularios',
        paragraphs: [
          'Reduce campos, habilita autofill y valida en línea.',
        ],
        bullets: [
          'Máximo 6 campos para demo, split steps si es necesario.',
          'Ayudas contextuales y ejemplos de formato.',
          'Mensajes de error claros y en tiempo real.',
        ],
      },
      {
        title: 'Semana 2: confianza y prueba social',
        paragraphs: [
          'La decisión requiere evidencia cercana al CTA.',
        ],
        bullets: [
          'Testimonios y métricas cerca del formulario.',
          'Badges de seguridad y SLA de respuesta visible.',
          'Mini-casos con resultado y logo en 2 líneas.',
        ],
      },
      {
        title: 'Semana 3: ofertas y CTAs alternativos',
        paragraphs: [
          'No todos están listos para demo. Ofrece opciones.',
        ],
        bullets: [
          'CTA principal: demo/llamada. Secundario: audit o benchmark.',
          'Inline CTA en mitad de página para capturar intent medio.',
          'Prueba copy orientado a valor vs. urgencia.',
        ],
      },
      {
        title: 'Semana 4: experimentos y medición',
        paragraphs: [
          'Cierra el mes con experimentos controlados.',
        ],
        bullets: [
          'Hipótesis ICE/PIE y una variante por vez.',
          'Métricas: tasa de envío, SQL, costo por oportunidad.',
          'Dashboard semanal y decisiones: escalar, iterar, archivar.',
        ],
      },
    ],
    takeaways: [
      'Corta formularios, añade prueba social y alternativas de CTA.',
      'Planifica experimentos con hipótesis claras y una sola variable.',
      'Mide por oportunidades, no solo por clics.',
    ],
    checklist: [
      'Formularios <6 campos con autofill',
      'Prueba social junto al CTA',
      'Oferta secundaria (audit/benchmark)',
      'Experimentos con ICE/PIE y owner',
      'Dashboard con SQL y costo por oportunidad',
    ],
    serviceCTA: {
      label: 'Mejorar mi conversión en 30 días',
      href: '/services/web-design',
      helper: 'Audit CRO, redacción de microcopy y experimentos rápidos con reporting.',
    },
  },
  {
    slug: 'ga4-dashboards-ejecutivos',
    title: 'GA4 y dashboards ejecutivos en 7 días',
    description:
      'Implementación express: eventos clave, nomenclatura estándar y dashboard ejecutivo que conecta marketing con revenue.',
    category: 'SEO & Analytics',
    author: 'Analytics CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '9 min',
    heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&h=900&fit=crop',
    keywords: ['ga4', 'analytics', 'dashboard', 'tracking', 'kpi'],
    summary:
      'Configura GA4 con eventos claros y un dashboard que muestra funnel, CAC y pipeline en una semana.',
    painPoints: [
      'Eventos duplicados o sin naming.',
      'No se distingue lead marketing vs. sales.',
      'Dirección pide CAC y pipeline y solo hay clics.',
    ],
    sections: [
      {
        title: 'Día 1-2: mapa de eventos y naming',
        paragraphs: [
          'Define eventos por plantilla con nombres claros.',
        ],
        bullets: [
          'Formato: categoria_accion_label.',
          'Eventos: vista página, scroll 50%, CTA primario, envío de formulario.',
          'Campos: fuente, campaña, dispositivo y rol (si aplica).',
        ],
      },
      {
        title: 'Día 3-4: implementación y QA',
        paragraphs: [
          'Instala vía GTM y valida con modo preview.',
        ],
        bullets: [
          'Entornos prod/stg separados.',
          'Alertas cuando un evento cae a cero.',
          'Pruebas en móvil y desktop.',
        ],
      },
      {
        title: 'Día 5-6: dashboard ejecutivo',
        paragraphs: [
          'Crea vistas que respondan preguntas de negocio.',
        ],
        bullets: [
          'Panel: visitas calificadas, leads, SQL, CAC, LTV/CAC.',
          'Cortes por canal y campaña.',
          'Alertas de umbral: CAC > objetivo, conversión < baseline.',
        ],
      },
      {
        title: 'Día 7: handoff y governance',
        paragraphs: [
          'Documenta y asigna owners.',
        ],
        bullets: [
          'Playbook de nomenclatura y checklist de QA.',
          'Owner de datos y ritual semanal de revisión.',
          'Backlog de mejoras y experimentos.',
        ],
      },
    ],
    takeaways: [
      'Mapa de eventos y naming claro antes de medir.',
      'Dashboard que conecta con CAC y pipeline.',
      'Governance con owners y rituales.',
    ],
    checklist: [
      'Eventos clave en GA4 con naming estándar',
      'Alertas de caída de eventos',
      'Dashboard con CAC y SQL',
      'Documento de governance y owners',
    ],
    serviceCTA: {
      label: 'Configurar mi GA4 + dashboard',
      href: '/services/seo-analytics',
      helper: 'Implementamos tracking, QA y tablero ejecutivo listo para dirección.',
    },
  },
  {
    slug: 'linkedin-ads-b2b-2026',
    title: 'LinkedIn Ads B2B en 2026: segmentación, creatividades y medición',
    description:
      'Guía práctica para generar demanda en LinkedIn: audiencias, mensajes por rol, formatos y medición de pipeline.',
    category: 'Marketing Digital',
    author: 'Paid CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '11 min',
    heroImage: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1400&h=900&fit=crop',
    keywords: ['linkedin ads', 'b2b', 'paid media', 'segmentacion', 'creatividades'],
    summary:
      'LinkedIn sigue siendo el canal B2B estrella, pero caro. Aquí te mostramos cómo segmentar fino, crear ads por rol y medir pipeline.',
    painPoints: [
      'CPMs altos sin SQL generados.',
      'Segmentación amplia sin filtros firmográficos.',
      'Creatividades genéricas que no hablan de dolor.',
    ],
    sections: [
      {
        title: 'Audiencias y exclusiones',
        paragraphs: [
          'Define audiencias pequeñas y claras.',
        ],
        bullets: [
          'Industria + cargo + tamaño de empresa + país.',
          'Excluye clientes, empleados y etapas avanzadas si no aplica.',
          'Listas de cuentas + lookalikes solo tras validar intent.',
        ],
      },
      {
        title: 'Creatividades por rol y etapa',
        paragraphs: [
          'Habla del dolor específico de cada rol.',
        ],
        bullets: [
          'CFO: riesgo y eficiencia. CTO: integraciones. Marketing: pipeline y velocidad.',
          'Formatos: Single image para mensaje claro, Document para valor profundo, Conversation ads para ofertas.',
          'CTA por etapa: contenido MOFU, luego demo/audit.',
        ],
      },
      {
        title: 'Medición y optimización',
        paragraphs: [
          'Optimiza por pipeline, no por CTR.',
        ],
        bullets: [
          'Eventos en GA4 + UTMs consistentes.',
          'Panel: CPL, SQL, pipeline generado, CAC y payback.',
          'Tests: 1 variable por vez (copy, creativo, audiencia).',
        ],
      },
    ],
    takeaways: [
      'Segmenta por industria, cargo y tamaño con exclusiones claras.',
      'Creatividades y ofertas por rol y etapa del funnel.',
      'Optimiza por pipeline y CAC, no por clics.',
    ],
    checklist: [
      'Audiencias acotadas y listas de exclusión',
      'Ads por rol (CFO/CTO/Marketing)',
      'UTMs y eventos configurados',
      'Dashboard con CPL, SQL y pipeline',
      'Plan de tests con 1 variable',
    ],
    serviceCTA: {
      label: 'Optimizar mis LinkedIn Ads',
      href: '/services/digital-strategy',
      helper: 'Armamos audiencias, creatividades y reporting para reducir CAC en LinkedIn.',
    },
  },
  {
    slug: 'entregabilidad-email-b2b',
    title: 'Entregabilidad de email y warmup seguro en 2026',
    description:
      'Checklist para asegurar inbox placement: dominios, warming, contenido y monitoreo continuo.',
    category: 'Email Marketing',
    author: 'Email CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '8 min',
    heroImage: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1400&h=900&fit=crop',
    keywords: ['entregabilidad', 'email warmup', 'dmarc', 'spf', 'dkim'],
    summary:
      'Sin entregabilidad no hay revenue por email. Sigue este proceso para calentar dominios y evitar spam.',
    painPoints: [
      'Emails en spam tras 2 semanas.',
      'No hay DMARC o está mal configurado.',
      'Envios masivos desde dominios nuevos sin warming.',
    ],
    sections: [
      {
        title: 'Infraestructura y autenticación',
        paragraphs: [
          'Configura SPF, DKIM y DMARC antes de enviar.',
        ],
        bullets: [
          'Revisa registros y alinea dominios de envío.',
          'Subdominios dedicados para outbound.',
          'DMARC en modo monitor al inicio, luego p=quarantine.',
        ],
      },
      {
        title: 'Warmup progresivo',
        paragraphs: [
          'Sube volumen en 3-4 semanas.',
        ],
        bullets: [
          'Empieza con <40 emails/día y aumenta 20% diario.',
          'Mezcla emails de valor y respuestas genuinas.',
          'Monitorea bounce, spam y reputación (Postmaster).',
        ],
      },
      {
        title: 'Contenido y listas limpias',
        paragraphs: [
          'Lo que envías importa tanto como el dominio.',
        ],
        bullets: [
          'Copys personalizados y sin spam words.',
          'Listas verificadas y limpieza mensual.',
          'CTA claro y opción de opt-out visible.',
        ],
      },
      {
        title: 'Monitoreo y alertas',
        paragraphs: [
          'Detecta problemas antes de que escalen.',
        ],
        bullets: [
          'Alertas de bounce rate >3% o spam >0.3%.',
          'Pruebas periódicas de inbox placement.',
          'Rotación de remitentes y dominios si cae reputación.',
        ],
      },
    ],
    takeaways: [
      'Autenticación al día y subdominios dedicados.',
      'Warmup gradual con mezcla de envíos.',
      'Listas limpias y contenido personalizado.',
      'Alertas y rotación ante caídas de reputación.',
    ],
    checklist: [
      'SPF/DKIM/DMARC configurados',
      'Warmup planificado por semanas',
      'Verificación y limpieza de listas',
      'Alertas de bounce y spam',
      'Rotación de dominios y remitentes',
    ],
    serviceCTA: {
      label: 'Mejorar mi entregabilidad',
      href: '/services/marketing-automation',
      helper: 'Configuramos dominios, warming y monitoreo para mantener inbox placement.',
    },
  },
  {
    slug: 'lead-scoring-product-data',
    title: 'Lead scoring con datos de producto: prioriza lo que sí compra',
    description:
      'Combina comportamiento web y señales in-app para un scoring que entrega leads listos a ventas.',
    category: 'Marketing Automation',
    author: 'Product Data CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '9 min',
    heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&h=900&fit=crop',
    keywords: ['lead scoring', 'product data', 'intencion', 'saas', 'crm'],
    summary:
      'El scoring clásico se queda corto. Integra uso de producto y señales de intent para priorizar leads y no quemar al equipo.',
    painPoints: [
      'Scoring basado solo en firmographics.',
      'Sales recibe leads fríos y pierde tiempo.',
      'Sin feedback loop para ajustar pesos.',
    ],
    sections: [
      {
        title: 'Definir señales de fit e intent',
        paragraphs: [
          'Equilibra quién es (fit) y qué hace (intent).',
        ],
        bullets: [
          'Fit: industria, tamaño, rol decisor.',
          'Intent: vistas de pricing, uso de features core, sesiones activas.',
          'Pesos distintos por canal de origen.',
        ],
      },
      {
        title: 'Integrar datos de producto',
        paragraphs: [
          'Conecta el producto al CRM/marketing automation.',
        ],
        bullets: [
          'Eventos in-app a HubSpot/Salesforce.',
          'Umbrales: activación, uso recurrente, adopción de feature clave.',
          'Alertas automáticas al SDR si supera umbral.',
        ],
      },
      {
        title: 'SLAs y rutas automáticas',
        paragraphs: [
          'Define qué pasa cuando un lead cruza el umbral.',
        ],
        bullets: [
          'SQL automático cuando score >80.',
          'Rutas: ventas, nurture o producto-led onboarding.',
          'Notificaciones y tareas con contexto.',
        ],
      },
      {
        title: 'Feedback loop y optimización',
        paragraphs: [
          'Ajusta pesos con datos reales.',
        ],
        bullets: [
          'Revisión mensual con ventas: precisión del score.',
          'Análisis de cierres y pérdidas para recalibrar.',
          'Documenta cambios y mide impacto en win rate.',
        ],
      },
    ],
    takeaways: [
      'Scoring híbrido fit + intent con datos de producto.',
      'Rutas automáticas y alertas para leads calientes.',
      'Feedback mensual para recalibrar y mejorar win rate.',
    ],
    checklist: [
      'Eventos in-app conectados al CRM',
      'Pesos por fit e intent documentados',
      'Umbrales claros y rutas automáticas',
      'Alertas al SDR para leads calientes',
      'Review mensual de precisión del score',
    ],
    serviceCTA: {
      label: 'Implementar scoring con datos de producto',
      href: '/services/marketing-automation',
      helper: 'Integramos datos de uso y construimos scoring y alertas listas para ventas.',
    },
  },
  {
    slug: 'seo-ecommerce-intencion',
    title: 'SEO para ecommerce con intención de compra',
    description:
      'Estrategia SEO enfocada en intención transaccional: arquitectura, facetas, velocidad y UX de producto.',
    category: 'SEO & Analytics',
    author: 'SEO CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '11 min',
    heroImage: 'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=1400&h=900&fit=crop',
    keywords: ['seo ecommerce', 'intencion', 'facetas', 'velocidad', 'ux producto'],
    summary:
      'Ranking sin intención no vende. Optimiza tu ecommerce para queries transaccionales con velocidad y filtros inteligentes.',
    painPoints: [
      'Categorías sin enlaces internos ni facetas optimizadas.',
      'Páginas lentas en móvil.',
      'Contenido duplicado por filtros.',
    ],
    sections: [
      {
        title: 'Arquitectura y facetas',
        paragraphs: [
          'Haz las categorías navegables y optimiza filtros.',
        ],
        bullets: [
          'Rutas limpias: /categoria/subcategoria/producto.',
          'Facetas indexables solo cuando tienen demanda y stock.',
          'Enlaces internos desde guías y blogs hacia categorías clave.',
        ],
      },
      {
        title: 'Velocidad y CWV en PLP/PDP',
        paragraphs: [
          'Optimiza las plantillas críticas.',
        ],
        bullets: [
          'Imágenes WebP/AVIF y lazy load bajo el fold.',
          'Reduce JS de carruseles y usa tamaños fijos para evitar CLS.',
          'Prueba CWV real en móvil por plantilla.',
        ],
      },
      {
        title: 'Contenido y intención',
        paragraphs: [
          'Alinea copy con intención de compra.',
        ],
        bullets: [
          'Headers con beneficios, prueba social y stock/envíos.',
          'FAQs con preguntas de envío, devoluciones y garantía.',
          'Schema Product, FAQ y Breadcrumb.',
        ],
      },
      {
        title: 'Medición y alertas',
        paragraphs: [
          'Detecta caídas rápido.',
        ],
        bullets: [
          'Alertas por caídas de sesiones orgánicas en categorías clave.',
          'Monitorea CTR en Google Search Console y ajusta titles.',
          'Dashboard de revenue orgánico por categoría.',
        ],
      },
    ],
    takeaways: [
      'Arquitectura y facetas pensadas para intención transaccional.',
      'CWV sólido en PLP/PDP con imágenes optimizadas.',
      'Copy y FAQs alineados a compra + schema.',
      'Alertas de tráfico y revenue por categoría.',
    ],
    checklist: [
      'Facetas con demanda y sin duplicados',
      'CWV en verde en PLP/PDP',
      'Schema Product/FAQ/Breadcrumb',
      'Alertas de tráfico y CTR por categoría',
    ],
    serviceCTA: {
      label: 'Mejorar mi SEO ecommerce',
      href: '/services/seo-analytics',
      helper: 'Optimizamos arquitectura, CWV y contenidos para aumentar revenue orgánico.',
    },
  },
  {
    slug: 'content-refresh-2026',
    title: 'Content refresh: cómo escalar tráfico y leads con lo que ya tienes',
    description:
      'Proceso de actualización de contenidos para ganar posiciones, CTR y conversiones sin crear desde cero.',
    category: 'Contenido',
    author: 'Content CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '9 min',
    heroImage: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1400&h=900&fit=crop',
    keywords: ['content refresh', 'seo', 'ctr', 'conversiones'],
    summary:
      'Tienes assets valiosos. Refresca títulos, intención, pruebas y enlazado interno para subir posiciones y leads.',
    painPoints: [
      'Artículos en página 2 que no suben.',
      'Datos desactualizados y sin pruebas.',
      'Pocas conversiones pese a buen tráfico.',
    ],
    sections: [
      {
        title: 'Priorizar por potencial',
        paragraphs: [
          'Elige qué refrescar con datos.',
        ],
        bullets: [
          'Keywords en posición 7-20 con buen volumen.',
          'URLs con CTR bajo vs. benchmark de SERP.',
          'Páginas con tráfico pero baja conversión.',
        ],
      },
      {
        title: 'Actualizar intención y valor',
        paragraphs: [
          'Alinea el contenido a la intención actual.',
        ],
        bullets: [
          'Añade secciones BOFU y comparativas.',
          'Incluye datos 2026 y citas de expertos.',
          'Responde People Also Ask con FAQs claras.',
        ],
      },
      {
        title: 'Optimizar CTR y conversión',
        paragraphs: [
          'Título, meta y CTAs importan.',
        ],
        bullets: [
          'Titles con beneficio y año.',
          'CTA contextual en mitad y final del artículo.',
          'Enlaces internos a producto/servicios y pilares.',
        ],
      },
      {
        title: 'Medir y repetir',
        paragraphs: [
          'Itera cada 6-8 semanas.',
        ],
        bullets: [
          'Trackea posiciones, CTR y conversiones.',
          'Revisa si se gana featured snippet.',
          'Mantén un backlog y fechas de refresh.',
        ],
      },
    ],
    takeaways: [
      'Prioriza URLs con potencial y bajo CTR.',
      'Ajusta intención y añade prueba actualizada.',
      'Optimiza títulos y CTAs para conversión.',
      'Refresca en ciclos con medición.',
    ],
    checklist: [
      'Lista de URLs con potencial y fecha de refresh',
      'Datos y ejemplos 2026 añadidos',
      'Titles y metas optimizados con beneficio',
      'CTAs y enlaces internos actualizados',
      'Seguimiento de posiciones y conversiones',
    ],
    serviceCTA: {
      label: 'Actualizar mis contenidos',
      href: '/services/content-creation',
      helper: 'Auditamos, priorizamos y refrescamos contenido para ganar tráfico y leads.',
    },
  },
  {
    slug: 'automatizacion-ecommerce-playbook',
    title: 'Automatización para ecommerce: carritos, postcompra y retención',
    description:
      'Playbook de automatización ecommerce: recuperación de carrito, onboarding postcompra y flujos de retención que aumentan LTV.',
    category: 'Marketing Automation',
    author: 'Ecommerce CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '10 min',
    heroImage: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1400&h=900&fit=crop',
    keywords: ['automatizacion ecommerce', 'carrito abandonado', 'postcompra', 'retencion', 'ltv'],
    summary:
      'Automatiza para vender más y retener: secuencias de carrito, postcompra segmentado y campañas de reactivación.',
    painPoints: [
      'Carritos abandonados sin seguimiento.',
      'Postcompra genérico que no fomenta la segunda compra.',
      'Sin segmentación por valor o categoría.',
    ],
    sections: [
      {
        title: 'Recuperación de carrito efectiva',
        paragraphs: [
          'No basta un email. Usa secuencias y personalización.',
        ],
        bullets: [
          'Email + SMS con recordatorio y beneficio claro.',
          'Ofertas condicionadas por margen y valor del carrito.',
          'Deadline real y prueba social (reviews del producto).',
        ],
      },
      {
        title: 'Postcompra segmentado',
        paragraphs: [
          'Aumenta la segunda compra con onboarding útil.',
        ],
        bullets: [
          'Guías de uso, cuidado y cross-sell relevante.',
          'Encuesta NPS para detectar promotores y detractores.',
          'Secuencia distinta para primera vs. segunda compra.',
        ],
      },
      {
        title: 'Retención y reactivación',
        paragraphs: [
          'Mantén vivo el LTV.',
        ],
        bullets: [
          'Segmenta por RFM y categoría.',
          'Campañas de win-back con oferta y novedad de producto.',
          'Alertas de caída de frecuencia de compra.',
        ],
      },
      {
        title: 'Medición y governance',
        paragraphs: [
          'Controla impacto y evita fatiga.',
        ],
        bullets: [
          'Métricas: revenue recuperado, tasa de segunda compra, churn.',
          'Limitadores de frecuencia para no saturar.',
          'Documenta flujos y owners.',
        ],
      },
    ],
    takeaways: [
      'Secuencias de carrito multicanal y con personalización.',
      'Postcompra útil que impulsa la segunda compra.',
      'Retención con segmentación RFM y alertas.',
    ],
    checklist: [
      'Secuencia de carrito email+SMS',
      'Postcompra por tipo de cliente',
      'Segmentación RFM activa',
      'Alertas de caída de frecuencia',
      'Dashboard de revenue recuperado y LTV',
    ],
    serviceCTA: {
      label: 'Automatizar mi ecommerce',
      href: '/services/marketing-automation',
      helper: 'Configuramos flujos de carrito, postcompra y retención con medición clara.',
    },
  },
  {
    slug: 'servicios-productizados-growth',
    title: 'Servicios productizados: empaqueta tu oferta y escala delivery',
    description:
      'Cómo productizar servicios para vender más rápido: definición de paquetes, precios, playbooks y márgenes.',
    category: 'Estrategia Digital',
    author: 'Growth CreamosTech',
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readTime: '9 min',
    heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&h=900&fit=crop',
    keywords: ['servicios productizados', 'pricing', 'playbooks', 'agencias', 'saas'],
    summary:
      'Productizar reduce ciclos de venta y mejora márgenes. Aprende a definir paquetes, precios y playbooks repetibles.',
    painPoints: [
      'Propuestas ad hoc que tardan semanas.',
      'Márgenes inconsistentes y scope creep.',
      'Delivery sin playbooks ni checklists.',
    ],
    sections: [
      {
        title: 'Definir paquetes y outcomes',
        paragraphs: [
          'Empieza por el resultado, no por horas.',
        ],
        bullets: [
          'Paquetes claros: objetivo, entregables, tiempos.',
          'Incluye qué no está incluido para evitar creep.',
          'Evidencia: casos y métricas por paquete.',
        ],
      },
      {
        title: 'Pricing y márgenes',
        paragraphs: [
          'Precio basado en valor y capacidad.',
        ],
        bullets: [
          'Costo estándar por rol + margen objetivo.',
          'Opciones good/better/best con anclas de valor.',
          'Renovaciones y upsells definidos.',
        ],
      },
      {
        title: 'Playbooks y checklists',
        paragraphs: [
          'Entrega repetible con calidad.',
        ],
        bullets: [
          'SOPs por fase: kickoff, discovery, ejecución, QA.',
          'Plantillas de briefs, reportes y QBR.',
          'Roles y RACI claros.',
        ],
      },
      {
        title: 'Go-to-market y enablement',
        paragraphs: [
          'Vender paquetes requiere narrativa simple.',
        ],
        bullets: [
          'One-pagers y demos cortas por paquete.',
          'Secuencias de outreach y contenido alineado.',
          'Entrena a ventas en objeciones y casos.',
        ],
      },
    ],
    takeaways: [
      'Paquetes claros con outcomes y exclusiones.',
      'Pricing basado en valor y márgenes controlados.',
      'Playbooks y SOPs para delivery repetible.',
      'Enablement de ventas con materiales listos.',
    ],
    checklist: [
      'Paquetes y exclusiones documentados',
      'Márgenes objetivo por rol/paquete',
      'SOPs y checklists por fase',
      'One-pagers y demos listas',
      'Entrenamiento de ventas en objeciones',
    ],
    serviceCTA: {
      label: 'Productizar mis servicios',
      href: '/services/digital-strategy',
      helper: 'Definimos paquetes, pricing y playbooks para escalar tu delivery.',
    },
  },
];

export function getArticleBySlug(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}

export function buildJsonLd(article: BlogArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.heroImage,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/opengraph-image').toString(),
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`).toString(),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    keywords: article.keywords.join(', '),
  };
}
