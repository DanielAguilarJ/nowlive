// Search-result titles and descriptions per path. The visible page copy stays as it is;
// these only replace the <title> and meta description where the page copy reads poorly in Google.
// Titles stay within ~60 characters (Base adds "| CreamosTech" only when it still fits),
// descriptions within 120–158 characters. Every claim here already appears on the site.

type Meta = { title?: string; description?: string };

export const seoMeta: Record<string, Meta> = {
  // ---------- Español ----------
  '/': {
    description:
      'Agencia de marketing digital en Aguascalientes: páginas web que venden, embudos automáticos, WhatsApp, anuncios, contenido y SEO. Auditoría gratis en 24 h.',
  },
  '/services/': {
    description:
      'Diseño web, estrategia digital, automatización, contenido, SEO y branding: seis servicios conectados en una sola línea de ventas. Agencia en Aguascalientes.',
  },
  '/services/web-design/': {
    title: 'Diseño de páginas web en Aguascalientes',
    description:
      'Páginas web rápidas, adaptables al celular y con SEO desde el diseño, hechas para convertir visitas en clientes. Planes con certificado SSL y auditoría gratis.',
  },
  '/services/digital-strategy/': {
    title: 'Estrategia de marketing digital para empresas',
    description:
      'Investigación de mercado, análisis de competencia, roadmap de 12 meses y KPIs para que cada peso de marketing tenga un objetivo. Agencia en Aguascalientes.',
  },
  '/services/marketing-automation/': {
    title: 'Automatización de marketing y lead scoring',
    description:
      'Workflows, emails y lead scoring que nutren y califican a tus prospectos 24/7 mientras tu equipo vende. Agencia en Aguascalientes, auditoría gratis.',
  },
  '/services/content-creation/': {
    title: 'Creación de contenido para redes sociales',
    description:
      'Stories, reels, blogs SEO y video con calendario editorial, diseño y copy para cada pieza. Contenido que trae clientes. Agencia en Aguascalientes.',
  },
  '/services/seo-analytics/': {
    title: 'Agencia SEO en Aguascalientes y analítica web',
    description:
      'Posicionamiento en Google con SEO técnico, keywords objetivo, Google Business optimizado, link building y reportes mensuales para que te encuentren.',
  },
  '/services/brand-identity/': {
    title: 'Diseño de logotipo e identidad de marca',
    description:
      'Logotipo, paleta de colores, tipografía, voz de marca y manual completo para una marca que se recuerda. Estudio de branding y marketing en Aguascalientes.',
  },
  '/about/': {
    title: 'Sobre CreamosTech: agencia de marketing en Aguascalientes',
  },
  '/blog/': {
    title: 'Blog de marketing digital, SEO y ventas',
    description:
      'Guías de SEO, automatización, conversión, contenido y estrategia digital para empresas que quieren vender más por internet. Por el equipo de CreamosTech.',
  },
  '/casos-de-exito/': {
    title: 'Casos de éxito de marketing digital',
    description:
      'Estrategias reales que escalaron adquisición, retención e ingresos de clientes con web, SEO, automatización, contenido y anuncios. Mira cómo trabajamos.',
  },
  '/testimonios/': {
    title: 'Testimonios de clientes',
    description:
      'Lo que dicen los clientes que trabajan con CreamosTech de forma continua: más conversiones, más tráfico orgánico, lanzamientos de apps y rebranding.',
  },
  '/recursos/': {
    title: 'Recursos de marketing digital',
    description:
      'Herramientas, guías y plantillas de marketing digital listas para usar en tu equipo: estrategia, SEO, automatización, conversión y contenido para vender más.',
  },
  '/faq/': {
    description:
      'Respuestas sobre tiempos de resultados, contratos, comunicación y cómo trabajamos junto a tu equipo. ¿Te queda una duda? Escríbenos por WhatsApp.',
  },
  '/careers/': {
    title: 'Vacantes en marketing digital, trabajo remoto',
    description:
      'Buscamos personas curiosas y decididas a generar impacto real. Trabajo 100 % remoto, aprendizaje continuo y proyectos con marcas reconocidas. Mira las vacantes.',
  },
  '/privacy/': {
    title: 'Política de privacidad',
    description:
      'Qué datos recopila CreamosTech cuando nos contactas, para qué los usamos, cómo los protegemos y qué derechos tienes sobre tu información personal.',
  },
  '/terms/': {
    title: 'Términos de servicio',
    description:
      'Condiciones de uso del sitio y de los servicios de CreamosTech: propiedad intelectual, servicios y consultoría, limitación de responsabilidad y jurisdicción.',
  },

  // ---------- Blog (títulos cortos para que Google no los corte) ----------
  '/blog/plan-90-dias-estrategia-digital/': { title: 'Plan de 90 días para tu estrategia digital' },
  '/blog/guia-seo-tecnico-b2b-2026/': { title: 'Guía de SEO técnico B2B 2026: auditoría y schema' },
  '/blog/playbook-automatizacion-saas-b2b/': { title: 'Automatización para SaaS B2B: scoring y nurtures' },
  '/blog/redisenar-web-que-convierte/': { title: 'Rediseñar tu web para duplicar conversiones sin perder SEO' },
  '/blog/sistema-contenidos-ia-ventas/': { title: 'Sistema de contenidos con IA que alimenta ventas' },
  '/blog/branding-b2b-que-vende/': { title: 'Branding B2B que vende: posicionamiento y narrativa' },
  '/blog/cro-30-dias-b2b/': { title: 'Optimización de conversiones en 30 días: quick wins B2B' },
  '/blog/linkedin-ads-b2b-2026/': { title: 'LinkedIn Ads B2B 2026: segmentación y medición' },
  '/blog/lead-scoring-product-data/': { title: 'Lead scoring con datos de producto' },
  '/blog/content-refresh-2026/': { title: 'Content refresh: más tráfico y leads con lo que ya tienes' },
  '/blog/automatizacion-ecommerce-playbook/': { title: 'Automatización para ecommerce: carritos y retención' },
  '/blog/servicios-productizados-growth/': { title: 'Servicios productizados: empaqueta y escala tu oferta' },
  '/blog/entregabilidad-email-b2b/': {
    description:
      'Cómo calentar un dominio, configurar SPF, DKIM y DMARC y cuidar la reputación para que tus correos B2B lleguen a la bandeja de entrada y no a spam en 2026.',
  },

  // ---------- English ----------
  '/en/': {
    description:
      'Digital marketing agency in Aguascalientes, Mexico: websites that sell, automated funnels, WhatsApp, ads, content and SEO. Free audit in under 24 hours.',
  },
  '/en/services/': {
    description:
      'Web design, digital strategy, automation, content, SEO and branding: six connected services on one sales line. Agency in Aguascalientes, Mexico.',
  },
  '/en/services/web-design/': {
    title: 'Web Design & Development Agency',
    description:
      'Fast, mobile-ready websites with SEO built in from the first draft, designed to turn visitors into customers. Plans include an SSL certificate and a free audit.',
  },
  '/en/services/digital-strategy/': {
    title: 'Digital Marketing Strategy for Businesses',
  },
  '/en/services/marketing-automation/': {
    title: 'Marketing Automation and Lead Scoring',
    description:
      'Workflows, email and lead scoring that nurture and qualify your prospects 24/7 while your team focuses on closing. Free automation audit from CreamosTech.',
  },
  '/en/services/content-creation/': {
    title: 'Social Media Content Creation',
  },
  '/en/services/seo-analytics/': {
    title: 'SEO Agency and Web Analytics',
    description:
      'Rank on Google with technical SEO, target keywords, an optimized Google Business profile, link building and monthly reports, so the people searching find you.',
  },
  '/en/services/brand-identity/': {
    title: 'Logo Design and Brand Identity',
  },
  '/en/about/': {
    title: 'About CreamosTech, a Digital Marketing Agency',
  },
  '/en/recursos/': {
    title: 'Digital Marketing Resources',
  },
  '/en/careers/': {
    title: 'Remote Digital Marketing Jobs',
    description:
      'We look for curious people set on making a real impact. 100% remote work, continuous learning and projects with well-known brands. See the open positions.',
  },
  '/en/testimonios/': {
    description:
      'What clients who work with CreamosTech on an ongoing basis say: more conversions, more organic traffic, app launches and rebrands that delivered results.',
  },
  '/en/privacy/': {
    description:
      'What data CreamosTech collects when you contact us, what we use it for, how we protect it and which rights you have over your personal information.',
  },
  '/en/terms/': {
    description:
      'Terms for using the CreamosTech website and services: intellectual property, services and consulting, limitation of liability and jurisdiction.',
  },
};

export function seoFor(path: string): Meta {
  return seoMeta[path] ?? {};
}

/** schema.org FAQPage built from the same questions the page shows. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
