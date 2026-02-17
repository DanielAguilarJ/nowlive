// Mock data store for admin dashboard
// In production, replace with a real database

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  status: 'draft' | 'published' | 'scheduled';
  publishedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  featured: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  services: string[];
  challenge: string;
  solution: string;
  results: { metric: string; value: string; improvement: string }[];
  featuredImage: string;
  gallery: string[];
  status: 'draft' | 'published';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  service?: string;
  budget?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  repliedAt?: string;
}

export interface DashboardStats {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: number;
  avgSessionDuration: string;
  bounceRate: string;
  conversionRate: string;
  newContacts: number;
  pendingTestimonials: number;
  publishedPosts: number;
  draftPosts: number;
}

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Tendencias de Marketing Digital para 2026',
    slug: 'tendencias-marketing-digital-2026',
    excerpt: 'Descubre las principales tendencias que dominarán el marketing digital este año.',
    content: '<p>El marketing digital evoluciona constantemente...</p>',
    author: 'Admin CreamosTech',
    category: 'Marketing Digital',
    tags: ['tendencias', 'marketing', '2026', 'digital'],
    featuredImage: '/blog/tendencias-2026.jpg',
    status: 'published',
    publishedAt: '2026-01-10T10:00:00Z',
    createdAt: '2026-01-08T15:30:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
    views: 1250,
  },
  {
    id: '2',
    title: 'Guía Completa de SEO Técnico',
    slug: 'guia-seo-tecnico-completa',
    excerpt: 'Todo lo que necesitas saber sobre SEO técnico para mejorar tu posicionamiento.',
    content: '<p>El SEO técnico es fundamental...</p>',
    author: 'Editor CreamosTech',
    category: 'SEO',
    tags: ['seo', 'técnico', 'guía', 'posicionamiento'],
    featuredImage: '/blog/seo-tecnico.jpg',
    status: 'published',
    publishedAt: '2026-01-05T09:00:00Z',
    createdAt: '2026-01-03T11:00:00Z',
    updatedAt: '2026-01-05T09:00:00Z',
    views: 890,
  },
  {
    id: '3',
    title: 'Automatización de Email Marketing: Mejores Prácticas',
    slug: 'automatizacion-email-marketing',
    excerpt: 'Aprende a crear flujos de email automatizados que convierten.',
    content: '<p>La automatización del email marketing...</p>',
    author: 'Admin CreamosTech',
    category: 'Email Marketing',
    tags: ['email', 'automatización', 'conversiones'],
    featuredImage: '/blog/email-automation.jpg',
    status: 'draft',
    createdAt: '2026-01-12T14:00:00Z',
    updatedAt: '2026-01-12T14:00:00Z',
    views: 0,
  },
  {
    id: '4',
    title: 'Diseño Web Moderno: Principios y Tendencias',
    slug: 'diseno-web-moderno-principios',
    excerpt: 'Explora los principios del diseño web moderno y las últimas tendencias.',
    content: '<p>El diseño web moderno se basa en...</p>',
    author: 'Admin CreamosTech',
    category: 'Diseño Web',
    tags: ['diseño', 'web', 'UI', 'UX'],
    featuredImage: '/blog/diseno-web.jpg',
    status: 'scheduled',
    scheduledAt: '2026-01-20T10:00:00Z',
    createdAt: '2026-01-11T16:00:00Z',
    updatedAt: '2026-01-11T16:00:00Z',
    views: 0,
  },
];

// Mock Testimonials
export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María García',
    company: 'TechStart SL',
    role: 'CEO',
    content: 'CreamosTech transformó completamente nuestra presencia digital. Los resultados superaron todas nuestras expectativas.',
    rating: 5,
    avatar: '/testimonials/maria.jpg',
    featured: true,
    status: 'approved',
    createdAt: '2025-12-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    company: 'Innovate Corp',
    role: 'Director de Marketing',
    content: 'Profesionales excepcionales. Su estrategia de marketing automation nos ayudó a triplicar nuestras conversiones.',
    rating: 5,
    avatar: '/testimonials/carlos.jpg',
    featured: true,
    status: 'approved',
    createdAt: '2025-11-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'Ana Martínez',
    company: 'Digital Solutions',
    role: 'CMO',
    content: 'El equipo de CreamosTech es increíble. Su enfoque en datos nos dio claridad sobre dónde invertir nuestro presupuesto.',
    rating: 4,
    avatar: '/testimonials/ana.jpg',
    featured: false,
    status: 'approved',
    createdAt: '2025-10-05T09:15:00Z',
  },
  {
    id: '4',
    name: 'Roberto Sánchez',
    company: 'EcoTech',
    role: 'Fundador',
    content: 'Excelente trabajo en el rediseño de nuestra web. La experiencia del usuario mejoró significativamente.',
    rating: 5,
    avatar: '/testimonials/roberto.jpg',
    featured: false,
    status: 'pending',
    createdAt: '2026-01-10T11:00:00Z',
  },
];

// Mock Case Studies
export const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Transformación Digital de TechStart',
    slug: 'transformacion-digital-techstart',
    client: 'TechStart SL',
    industry: 'Tecnología',
    services: ['Diseño Web', 'SEO', 'Marketing Automation'],
    challenge: 'TechStart necesitaba modernizar su presencia digital y aumentar la generación de leads.',
    solution: 'Desarrollamos una nueva web con UX optimizado e implementamos estrategia de inbound marketing.',
    results: [
      { metric: 'Tráfico Orgánico', value: '+245%', improvement: 'en 6 meses' },
      { metric: 'Generación de Leads', value: '+180%', improvement: 'trimestre a trimestre' },
      { metric: 'Tasa de Conversión', value: '4.8%', improvement: 'desde 1.2%' },
    ],
    featuredImage: '/cases/techstart-hero.jpg',
    gallery: ['/cases/techstart-1.jpg', '/cases/techstart-2.jpg'],
    status: 'published',
    featured: true,
    createdAt: '2025-10-01T10:00:00Z',
    updatedAt: '2025-10-15T14:00:00Z',
  },
  {
    id: '2',
    title: 'Rebranding de Innovate Corp',
    slug: 'rebranding-innovate-corp',
    client: 'Innovate Corp',
    industry: 'Consultoría',
    services: ['Identidad de Marca', 'Diseño Web', 'Contenido'],
    challenge: 'La marca había perdido relevancia en el mercado y necesitaba renovarse.',
    solution: 'Creamos una nueva identidad visual y narrativa de marca alineada con sus valores.',
    results: [
      { metric: 'Reconocimiento de Marca', value: '+89%', improvement: 'en encuestas' },
      { metric: 'Engagement Social', value: '+320%', improvement: 'en 3 meses' },
      { metric: 'Nuevos Clientes', value: '+45%', improvement: 'año a año' },
    ],
    featuredImage: '/cases/innovate-hero.jpg',
    gallery: ['/cases/innovate-1.jpg', '/cases/innovate-2.jpg'],
    status: 'published',
    featured: true,
    createdAt: '2025-08-15T10:00:00Z',
    updatedAt: '2025-09-01T11:00:00Z',
  },
];

// Mock Contact Messages
export const mockContactMessages: ContactMessage[] = [
  {
    id: '1',
    name: 'Laura Fernández',
    email: 'laura@empresa.com',
    phone: '+34 612 345 678',
    company: 'Empresa ABC',
    subject: 'Consulta sobre servicios de SEO',
    message: 'Hola, estamos interesados en mejorar nuestro posicionamiento en Google. ¿Podrían enviarnos más información sobre sus servicios de SEO?',
    service: 'SEO & Analytics',
    budget: '5000-10000',
    status: 'new',
    createdAt: '2026-01-14T09:30:00Z',
  },
  {
    id: '2',
    name: 'Pedro López',
    email: 'pedro@startup.io',
    company: 'Startup IO',
    subject: 'Diseño de página web',
    message: 'Necesitamos una nueva web para nuestra startup. Estamos en fase de crecimiento y queremos una web profesional que refleje nuestra marca.',
    service: 'Diseño Web',
    budget: '10000-20000',
    status: 'read',
    createdAt: '2026-01-13T14:15:00Z',
  },
  {
    id: '3',
    name: 'Isabel Torres',
    email: 'isabel@consultoria.es',
    phone: '+34 698 765 432',
    company: 'Consultoría Torres',
    subject: 'Estrategia de marketing digital',
    message: 'Buscamos una agencia que nos ayude a desarrollar una estrategia integral de marketing digital. Actualmente no tenemos presencia online significativa.',
    service: 'Estrategia Digital',
    budget: '20000+',
    status: 'replied',
    createdAt: '2026-01-10T11:00:00Z',
    repliedAt: '2026-01-11T10:30:00Z',
  },
  {
    id: '4',
    name: 'Miguel Ruiz',
    email: 'miguel@tienda.com',
    subject: 'Consulta general',
    message: 'Me gustaría saber más sobre sus servicios y precios. Tenemos una tienda online y queremos aumentar nuestras ventas.',
    status: 'archived',
    createdAt: '2026-01-05T16:45:00Z',
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalVisits: 45678,
  uniqueVisitors: 32456,
  pageViews: 125890,
  avgSessionDuration: '3:24',
  bounceRate: '42.5%',
  conversionRate: '3.8%',
  newContacts: 12,
  pendingTestimonials: 3,
  publishedPosts: 15,
  draftPosts: 4,
};

// Activity types
export interface Activity {
  id: string;
  type: 'contact' | 'testimonial' | 'post' | 'case_study' | 'user';
  action: string;
  description: string;
  timestamp: string;
  user?: string;
}

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'contact',
    action: 'Nuevo mensaje',
    description: 'Laura Fernández envió una consulta sobre SEO',
    timestamp: '2026-01-14T09:30:00Z',
  },
  {
    id: '2',
    type: 'testimonial',
    action: 'Testimonio pendiente',
    description: 'Roberto Sánchez dejó un nuevo testimonio',
    timestamp: '2026-01-10T11:00:00Z',
  },
  {
    id: '3',
    type: 'post',
    action: 'Post publicado',
    description: '10 Tendencias de Marketing Digital para 2026',
    timestamp: '2026-01-10T10:00:00Z',
    user: 'Admin CreamosTech',
  },
  {
    id: '4',
    type: 'contact',
    action: 'Mensaje respondido',
    description: 'Isabel Torres - Estrategia de marketing digital',
    timestamp: '2026-01-11T10:30:00Z',
    user: 'Admin CreamosTech',
  },
  {
    id: '5',
    type: 'case_study',
    action: 'Caso publicado',
    description: 'Transformación Digital de TechStart',
    timestamp: '2025-10-15T14:00:00Z',
    user: 'Admin CreamosTech',
  },
];

// Analytics data for charts
export interface AnalyticsData {
  date: string;
  visits: number;
  pageViews: number;
  conversions: number;
}

export const mockAnalyticsData: AnalyticsData[] = [
  { date: '2026-01-08', visits: 1234, pageViews: 3456, conversions: 45 },
  { date: '2026-01-09', visits: 1456, pageViews: 3890, conversions: 52 },
  { date: '2026-01-10', visits: 1678, pageViews: 4234, conversions: 61 },
  { date: '2026-01-11', visits: 1234, pageViews: 3123, conversions: 38 },
  { date: '2026-01-12', visits: 987, pageViews: 2456, conversions: 29 },
  { date: '2026-01-13', visits: 1567, pageViews: 4012, conversions: 58 },
  { date: '2026-01-14', visits: 1890, pageViews: 4567, conversions: 72 },
];

// Traffic sources
export interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

export const mockTrafficSources: TrafficSource[] = [
  { source: 'Google Organic', visits: 18234, percentage: 39.9, trend: 'up' },
  { source: 'Direct', visits: 12456, percentage: 27.3, trend: 'stable' },
  { source: 'Social Media', visits: 8234, percentage: 18.0, trend: 'up' },
  { source: 'Referral', visits: 4567, percentage: 10.0, trend: 'down' },
  { source: 'Email', visits: 2187, percentage: 4.8, trend: 'up' },
];

// Top pages
export interface TopPage {
  page: string;
  views: number;
  avgTime: string;
  bounceRate: string;
}

export const mockTopPages: TopPage[] = [
  { page: '/', views: 15678, avgTime: '2:45', bounceRate: '38%' },
  { page: '/services/web-design', views: 8234, avgTime: '3:12', bounceRate: '42%' },
  { page: '/contact', views: 6789, avgTime: '4:30', bounceRate: '25%' },
  { page: '/blog/tendencias-marketing-digital-2026', views: 5432, avgTime: '5:15', bounceRate: '35%' },
  { page: '/casos-de-exito', views: 4321, avgTime: '3:45', bounceRate: '40%' },
];
