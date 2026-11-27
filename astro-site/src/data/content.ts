// Typed access to the copy extracted from the old Next.js site (src/data/raw/*.json).
// Re-run `npm run extract` after editing the old sources; nothing here is invented.
import i18nRaw from './raw/i18n.json';
import offerRaw from './raw/offer.json';
import processRaw from './raw/process.json';
import aboutRaw from './raw/about.json';
import careersRaw from './raw/careers.json';
import clientsRaw from './raw/clientLogos.json';
import articlesRaw from './raw/articles.json';
import servicesIndexRaw from './raw/servicesIndex.json';
import webDesign from './raw/webDesign.json';
import digitalStrategy from './raw/digitalStrategy.json';
import marketingAutomation from './raw/marketingAutomation.json';
import contentCreation from './raw/contentCreation.json';
import seoAnalytics from './raw/seoAnalytics.json';
import brandIdentity from './raw/brandIdentity.json';
import type { Lang, ServiceSlug } from './site';
import { services } from './site';

type Raw = any; // eslint-disable-line @typescript-eslint/no-explicit-any

// Part of the old Spanish copy was typed without accents (e.g. "Analisis", "Mexico").
// Restore them in Spanish text only; search keywords and URLs stay exactly as written.
const accents: Record<string, string> = Object.fromEntries(
  (
    'optimización simulación numérica mecánicos energéticos ingeniería energías colaboración investigación automatización ' +
    'intención análisis definición métricas revisión código comunicación iteración fundación visión expansión latinoamérica ' +
    'transformación líderes innovación región españa asíncrona formación experimentación tecnologías política satisfacción ' +
    'alineación conversión función indexación migración decisión orquestación acción segmentación retención posición orgánico ' +
    'méxico misión diseño creación auditoría'
  )
    .split(/\s+/)
    .map((w) => [w.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace('n\u0303', 'n'), w]),
);
// "diseño"/"españa" lose their tilde in the key above; map them explicitly.
accents.diseno = 'diseño';
accents.espana = 'españa';
const SKIP = new Set(['keywords', 'slug', 'href', 'link', 'image', 'heroImage', 'icon', 'url']);
function fixText(s: string) {
  return s.replace(/[A-Za-z]+/g, (w) => {
    const hit = accents[w.toLowerCase()];
    if (!hit) return w;
    return w[0] === w[0].toUpperCase() ? hit[0].toUpperCase() + hit.slice(1) : hit;
  });
}
function fixEs<T>(v: T, key = ''): T {
  if (SKIP.has(key)) return v;
  if (typeof v === 'string') return fixText(v) as T;
  if (Array.isArray(v)) return v.map((x) => fixEs(x)) as T;
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fixEs(x, k)])) as T;
  return v;
}
const esFix = <T>(lang: Lang, v: T): T => (lang === 'es' ? fixEs(v) : v);

/** Spanish headings were written in English-style Title Case; Spanish uses sentence case. */
const keepCase = /^(CreamosTech|SEO|ROI|CRM|B2B|SaaS|WhatsApp|Google|Meta|TikTok|LinkedIn|YouTube|IA|AI|GA4|UX|UI|KPIs?|[A-Z0-9]{2,}|.*\d.*)$/;
export function sentence(lang: Lang, s: string) {
  if (lang !== 'es') return s;
  let first = true;
  return s.replace(/[\p{L}\p{N}][\p{L}\p{N}'’/-]*/gu, (w) => {
    if (first) {
      first = false;
      return w;
    }
    return keepCase.test(w) ? w : w.toLowerCase();
  });
}

const tr = {
  es: fixEs((i18nRaw as Raw).translations.es),
  en: (i18nRaw as Raw).translations.en,
} as Record<Lang, Raw>;

export const t = (lang: Lang) => tr[lang];

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  oldPrice?: string;
  price: string;
  perMonth?: string;
  cta: string;
  popular?: boolean;
  badge?: string;
  features: string[];
  results: string;
};
export const plans = (lang: Lang): Plan[] => (offerRaw as Raw).PLANS[lang];
export const spotsTotal: number = (offerRaw as Raw).SPOTS_TOTAL;

const stepTitlesEs = ['Descubrimiento', 'Estrategia', 'Ejecución', 'Optimización'];
export const processSteps = (lang: Lang) =>
  (tr[lang].process.steps as Raw[]).map((s, i) => ({
    ...s,
    title: lang === 'es' ? stepTitlesEs[i] : s.title,
    details: esFix(lang, (processRaw as Raw).stepDetails[lang][i] as string[]),
    duration: (processRaw as Raw).stepDurations[lang][i] as string,
  }));

const serviceRaw: Record<string, Raw> = {
  webDesign,
  digitalStrategy,
  marketingAutomation,
  contentCreation,
  seoAnalytics,
  brandIdentity,
};

export type ServiceCard = {
  slug: ServiceSlug;
  code: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
};

export const serviceCards = (lang: Lang): ServiceCard[] =>
  services.map((s, i) => {
    const card = tr[lang].services.cards[i];
    return {
      slug: s.slug,
      code: s.code,
      icon: s.icon,
      title: card.title,
      description: card.description,
      features: card.features,
    };
  });

export const serviceDetail = (lang: Lang, slug: ServiceSlug) => {
  const meta = services.find((s) => s.slug === slug)!;
  return esFix(lang, serviceRaw[meta.key].content[lang]) as Raw;
};

export const serviceQuote = (lang: Lang, slug: ServiceSlug) => {
  const q = (servicesIndexRaw as Raw).serviceTestimonials[`/services/${slug}`];
  return q ? { text: esFix(lang, q[lang] as string), author: q.author as string } : null;
};

/** Portfolio. Client names, results and images are the user's confirmed cases; Spanish copy translated from the original English. */
const portfolioBase = [
  { client: 'TechFlow Inc.', image: 'techflow_saas', category: 'web' },
  { client: 'VitaHealth Systems', image: 'health_portal', category: 'marketing' },
  { client: 'FinTrack Global', image: 'finance_app', category: 'web' },
  { client: 'Luxe Properties', image: 'real_estate', category: 'brand' },
  { client: 'Aurum & Co.', image: 'fashion_store', category: 'marketing' },
  { client: 'SkillStream EdTech', image: 'education_platform', category: 'brand' },
] as const;

const portfolioCopy: Record<Lang, { title: string; result: string; description: string; services: string[] }[]> = {
  es: [
    { title: 'Plataforma SaaS TechFlow', result: '+156 % en conversiones', description: 'Rediseño completo de una plataforma SaaS B2B centrado en experiencia de usuario y conversión.', services: ['Diseño web', 'Desarrollo', 'UX/UI'] },
    { title: 'Portal de pacientes VitaHealth', result: '−40 % de tiempo administrativo', description: 'Campaña integral de marketing digital para un portal de salud: captación y retención de pacientes.', services: ['Estrategia de crecimiento', 'Marketing de contenidos', 'Generación de leads'] },
    { title: 'App de inversión FinTrack', result: '100 mil usuarios activos al día', description: 'Panel de inversiones de alto rendimiento con visualización de mercado en tiempo real.', services: ['Desarrollo React', 'Seguridad', 'Datos en tiempo real'] },
    { title: 'Portal inmobiliario Luxe', result: '3x tráfico orgánico', description: 'Identidad premium y lenguaje visual para una inmobiliaria de lujo enfocada en clientes de alto patrimonio.', services: ['Estrategia de marca', 'Identidad visual', 'Manual de marca'] },
    { title: 'E-commerce Aurum & Co.', result: '$2M de ingresos el primer año', description: 'Estrategia de embudo completo para una marca de moda de lujo, de campañas de alcance a flujos de recompra.', services: ['Estrategia e-commerce', 'Anuncios pagados', 'Email automatizado'] },
    { title: 'SkillStream Learning', result: '+45 % de cursos terminados', description: 'Renovación total de marca para una startup edtech, posicionada como la plataforma de actualización profesional.', services: ['Naming', 'Logotipo', 'Voz de marca'] },
  ],
  en: [
    { title: 'TechFlow SaaS Platform', result: '156% increase in conversions', description: 'Complete redesign of a B2B SaaS platform focusing on user experience and conversion optimization.', services: ['Web Design', 'Development', 'UX/UI'] },
    { title: 'VitaHealth Patient Portal', result: '40% reduction in admin time', description: 'Comprehensive digital marketing campaign for a healthcare portal, driving patient acquisition and engagement.', services: ['Growth Strategy', 'Content Marketing', 'Lead Gen'] },
    { title: 'FinTrack Invest App', result: '100K active daily users', description: 'High-performance investment tracking dashboard with real-time market data visualization.', services: ['React Development', 'Security', 'Real-time Data'] },
    { title: 'Luxe Real Estate Portal', result: '3x organic traffic growth', description: 'Premium brand identity and visual language for a luxury real estate company targeting high-net-worth clients.', services: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines'] },
    { title: 'Aurum & Co. E-commerce', result: '$2M revenue in first year', description: 'Full-funnel marketing strategy for a luxury fashion brand, from awareness campaigns to retention flows.', services: ['E-commerce Strategy', 'Paid Ads', 'Email Automation'] },
    { title: 'SkillStream Learning', result: '45% higher course completion', description: 'Complete brand identity overhaul for an edtech startup, positioning them as the go-to platform for professional upskilling.', services: ['Brand Naming', 'Logo Design', 'Brand Voice'] },
  ],
};

export const portfolio = (lang: Lang) =>
  portfolioBase.map((p, i) => ({ ...p, ...portfolioCopy[lang][i], image: `/images/portfolio/${p.image}.webp` }));

/** Home testimonials: original English quotes, Spanish translated faithfully. */
const homeQuotes: Record<Lang, { quote: string; author: string; role: string; company: string }[]> = {
  es: [
    { quote: 'CreamosTech transformó por completo nuestra presencia digital. Su enfoque estratégico y su ejecución creativa nos ayudaron a subir nuestras conversiones un 200 %. No son proveedores, son socios.', author: 'Sarah Johnson', role: 'CEO', company: 'TechFlow Inc.' },
    { quote: 'El equipo superó nuestras expectativas en todo. El detalle, las soluciones creativas y la comunicación rápida hicieron de nuestro rebranding un gran éxito.', author: 'Michael Chen', role: 'Director de Marketing', company: 'Verde Foods' },
    { quote: 'Trabajar con CreamosTech cambió el lanzamiento de nuestra app. Su estrategia generó 50,000 descargas el primer mes.', author: 'Emily Rodriguez', role: 'Fundadora', company: 'FitLife Health' },
    { quote: 'La estrategia de SEO y contenido que nos hicieron triplicó nuestro tráfico orgánico en seis meses. Su enfoque basado en datos da resultados reales.', author: 'David Park', role: 'VP de Digital', company: 'Luxe Properties' },
  ],
  en: [
    { quote: "CreamosTech transformed our digital presence completely. Their strategic approach and creative execution helped us increase our conversion rates by 200%. They're not just vendors, they're true partners.", author: 'Sarah Johnson', role: 'CEO', company: 'TechFlow Inc.' },
    { quote: 'The team at CreamosTech exceeded our expectations in every way. Their attention to detail, creative solutions, and responsive communication made our rebrand project a huge success.', author: 'Michael Chen', role: 'Marketing Director', company: 'Verde Foods' },
    { quote: 'Working with CreamosTech was a game-changer for our app launch. Their marketing strategy drove 50,000 downloads in the first month.', author: 'Emily Rodriguez', role: 'Founder', company: 'FitLife Health' },
    { quote: 'The SEO and content strategy CreamosTech developed for us tripled our organic traffic within six months. Their data-driven approach delivers real results.', author: 'David Park', role: 'VP of Digital', company: 'Luxe Properties' },
  ],
};
export const homeTestimonials = (lang: Lang) => homeQuotes[lang];

export const about = (lang: Lang) => ({
  timeline: esFix(lang, (aboutRaw as Raw).timelineMilestones[lang]) as { year: string; title: string; desc: string }[],
  culture: esFix(lang, (aboutRaw as Raw).cultureData[lang]) as { title: string; desc: string }[],
  tools: ((aboutRaw as Raw).techStack as { name: string }[]).map((x) => x.name),
});

export const careers = (lang: Lang) => esFix(lang, (careersRaw as Raw).content[lang]);

export type Article = {
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
  sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
  takeaways: string[];
  checklist?: string[];
  serviceCTA: { label: string; href: string; helper: string };
};
export const articles: Article[] = (fixEs((articlesRaw as Raw).blogArticles) as Article[])
  .map((a) => ({ ...a, heroImage: a.heroImage.replace(/^\/images\/blog\/(.+)\.png$/, '/images/blog/$1.webp') }))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/** Every FAQ on the site: the general ones plus each service page's questions. */
export const allFaqs = (lang: Lang) => {
  const general = (tr[lang].faq.items as { question: string; answer: string }[]).map((f) => ({ ...f, group: lang === 'es' ? 'General' : 'General' }));
  const perService = services.flatMap((s, i) =>
    (serviceDetail(lang, s.slug).faq.items as { question: string; answer: string }[]).map((f) => ({
      ...f,
      group: tr[lang].services.cards[i].title as string,
    })),
  );
  return [...general, ...perService];
};

export const clients = (lang: Lang) => ({
  logos: ((clientsRaw as Raw).logos as { name: string }[]).map((l) => l.name),
  indicators: esFix(lang, ((clientsRaw as Raw).trustIndicators as Record<Lang, string>[]).map((x) => x[lang])),
});
