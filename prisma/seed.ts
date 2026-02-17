import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@creamostech.com' },
    update: {},
    create: {
      email: 'admin@creamostech.com',
      password: hashedPassword,
      name: 'Admin CreamosTech',
      role: 'admin',
    },
  });
  console.log('✅ User created:', user.email);

  // Create blog posts
  const blogPosts = [
    {
      title: '10 Tendencias de Marketing Digital para 2026',
      slug: 'tendencias-marketing-digital-2026',
      excerpt: 'Descubre las principales tendencias que dominarán el marketing digital este año.',
      content: '<p>El marketing digital evoluciona constantemente...</p>',
      author: 'Admin CreamosTech',
      category: 'Marketing Digital',
      tags: JSON.stringify(['tendencias', 'marketing', '2026', 'digital']),
      featuredImage: '/blog/tendencias-2026.jpg',
      status: 'published',
      publishedAt: new Date('2026-01-10T10:00:00Z'),
      views: 1250,
    },
    {
      title: 'Guía Completa de SEO Técnico',
      slug: 'guia-seo-tecnico-completa',
      excerpt: 'Todo lo que necesitas saber sobre SEO técnico para mejorar tu posicionamiento.',
      content: '<p>El SEO técnico es fundamental...</p>',
      author: 'Editor CreamosTech',
      category: 'SEO',
      tags: JSON.stringify(['seo', 'técnico', 'guía', 'posicionamiento']),
      featuredImage: '/blog/seo-tecnico.jpg',
      status: 'published',
      publishedAt: new Date('2026-01-05T09:00:00Z'),
      views: 890,
    },
    {
      title: 'Automatización de Email Marketing: Mejores Prácticas',
      slug: 'automatizacion-email-marketing',
      excerpt: 'Aprende a crear flujos de email automatizados que convierten.',
      content: '<p>La automatización del email marketing...</p>',
      author: 'Admin CreamosTech',
      category: 'Email Marketing',
      tags: JSON.stringify(['email', 'automatización', 'conversiones']),
      featuredImage: '/blog/email-automation.jpg',
      status: 'draft',
      views: 0,
    },
    {
      title: 'Diseño Web Moderno: Principios y Tendencias',
      slug: 'diseno-web-moderno-principios',
      excerpt: 'Explora los principios del diseño web moderno y las últimas tendencias.',
      content: '<p>El diseño web moderno se basa en...</p>',
      author: 'Admin CreamosTech',
      category: 'Diseño Web',
      tags: JSON.stringify(['diseño', 'web', 'UI', 'UX']),
      featuredImage: '/blog/diseno-web.jpg',
      status: 'scheduled',
      scheduledAt: new Date('2026-01-20T10:00:00Z'),
      views: 0,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }
  console.log('✅ Blog posts created');

  // Create testimonials
  const testimonials = [
    {
      name: 'María García',
      company: 'TechStart SL',
      role: 'CEO',
      content: 'CreamosTech transformó completamente nuestra presencia digital. Los resultados superaron todas nuestras expectativas.',
      rating: 5,
      avatar: '/testimonials/maria.jpg',
      featured: true,
      status: 'approved',
    },
    {
      name: 'Carlos Rodríguez',
      company: 'Innovate Corp',
      role: 'Director de Marketing',
      content: 'Profesionales excepcionales. Su estrategia de marketing automation nos ayudó a triplicar nuestras conversiones.',
      rating: 5,
      avatar: '/testimonials/carlos.jpg',
      featured: true,
      status: 'approved',
    },
    {
      name: 'Ana Martínez',
      company: 'Digital Solutions',
      role: 'CMO',
      content: 'El equipo de CreamosTech es increíble. Su enfoque en datos nos dio claridad sobre dónde invertir nuestro presupuesto.',
      rating: 4,
      avatar: '/testimonials/ana.jpg',
      featured: false,
      status: 'approved',
    },
    {
      name: 'Roberto Sánchez',
      company: 'EcoTech',
      role: 'Fundador',
      content: 'Excelente trabajo en el rediseño de nuestra web. La experiencia del usuario mejoró significativamente.',
      rating: 5,
      avatar: '/testimonials/roberto.jpg',
      featured: false,
      status: 'pending',
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log('✅ Testimonials created');

  // Create case studies
  const caseStudies = [
    {
      title: 'Transformación Digital de TechStart',
      slug: 'transformacion-digital-techstart',
      client: 'TechStart SL',
      industry: 'Tecnología',
      services: JSON.stringify(['Diseño Web', 'SEO', 'Marketing Automation']),
      challenge: 'TechStart necesitaba modernizar su presencia digital y aumentar la generación de leads.',
      solution: 'Desarrollamos una nueva web con UX optimizado e implementamos estrategia de inbound marketing.',
      results: JSON.stringify([
        { metric: 'Tráfico Orgánico', value: '+245%', improvement: 'en 6 meses' },
        { metric: 'Generación de Leads', value: '+180%', improvement: 'trimestre a trimestre' },
        { metric: 'Tasa de Conversión', value: '4.8%', improvement: 'desde 1.2%' },
      ]),
      featuredImage: '/cases/techstart-hero.jpg',
      gallery: JSON.stringify(['/cases/techstart-1.jpg', '/cases/techstart-2.jpg']),
      status: 'published',
      featured: true,
    },
    {
      title: 'Rebranding de Innovate Corp',
      slug: 'rebranding-innovate-corp',
      client: 'Innovate Corp',
      industry: 'Consultoría',
      services: JSON.stringify(['Identidad de Marca', 'Diseño Web', 'Contenido']),
      challenge: 'La marca había perdido relevancia en el mercado y necesitaba renovarse.',
      solution: 'Creamos una nueva identidad visual y narrativa de marca alineada con sus valores.',
      results: JSON.stringify([
        { metric: 'Reconocimiento de Marca', value: '+89%', improvement: 'en encuestas' },
        { metric: 'Engagement Social', value: '+320%', improvement: 'en 3 meses' },
        { metric: 'Nuevos Clientes', value: '+45%', improvement: 'año a año' },
      ]),
      featuredImage: '/cases/innovate-hero.jpg',
      gallery: JSON.stringify(['/cases/innovate-1.jpg', '/cases/innovate-2.jpg']),
      status: 'published',
      featured: true,
    },
  ];

  for (const caseStudy of caseStudies) {
    await prisma.caseStudy.create({ data: caseStudy });
  }
  console.log('✅ Case studies created');

  // Create contact messages
  const contactMessages = [
    {
      name: 'Laura Fernández',
      email: 'laura@empresa.com',
      phone: '+34 612 345 678',
      company: 'Empresa ABC',
      subject: 'Consulta sobre servicios de SEO',
      message: 'Hola, estamos interesados en mejorar nuestro posicionamiento en Google. ¿Podrían enviarnos más información sobre sus servicios de SEO?',
      service: 'SEO & Analytics',
      budget: '5000-10000',
      status: 'new',
    },
    {
      name: 'Pedro López',
      email: 'pedro@startup.io',
      company: 'Startup IO',
      subject: 'Diseño de página web',
      message: 'Necesitamos una nueva web para nuestra startup. Estamos en fase de crecimiento y queremos una web profesional que refleje nuestra marca.',
      service: 'Diseño Web',
      budget: '10000-20000',
      status: 'read',
    },
    {
      name: 'Isabel Torres',
      email: 'isabel@consultoria.es',
      phone: '+34 698 765 432',
      company: 'Consultoría Torres',
      subject: 'Estrategia de marketing digital',
      message: 'Buscamos una agencia que nos ayude a desarrollar una estrategia integral de marketing digital. Actualmente no tenemos presencia online significativa.',
      service: 'Estrategia Digital',
      budget: '20000+',
      status: 'replied',
      repliedAt: new Date('2026-01-11T10:30:00Z'),
    },
    {
      name: 'Miguel Ruiz',
      email: 'miguel@tienda.com',
      subject: 'Consulta general',
      message: 'Me gustaría saber más sobre sus servicios y precios. Tenemos una tienda online y queremos aumentar nuestras ventas.',
      status: 'archived',
    },
  ];

  for (const message of contactMessages) {
    await prisma.contactMessage.create({ data: message });
  }
  console.log('✅ Contact messages created');

  // Create analytics data
  const analyticsData = [
    { date: new Date('2026-01-08'), visits: 1234, pageViews: 3456, conversions: 45 },
    { date: new Date('2026-01-09'), visits: 1456, pageViews: 3890, conversions: 52 },
    { date: new Date('2026-01-10'), visits: 1678, pageViews: 4234, conversions: 61 },
    { date: new Date('2026-01-11'), visits: 1234, pageViews: 3123, conversions: 38 },
    { date: new Date('2026-01-12'), visits: 987, pageViews: 2456, conversions: 29 },
    { date: new Date('2026-01-13'), visits: 1567, pageViews: 4012, conversions: 58 },
    { date: new Date('2026-01-14'), visits: 1890, pageViews: 4567, conversions: 72 },
  ];

  for (const analytics of analyticsData) {
    await prisma.analytics.create({ data: analytics });
  }
  console.log('✅ Analytics data created');

  // Create activities
  const activities = [
    {
      type: 'contact',
      action: 'Nuevo mensaje',
      description: 'Laura Fernández envió una consulta sobre SEO',
      user: undefined,
    },
    {
      type: 'testimonial',
      action: 'Testimonio pendiente',
      description: 'Roberto Sánchez dejó un nuevo testimonio',
      user: undefined,
    },
    {
      type: 'post',
      action: 'Post publicado',
      description: '10 Tendencias de Marketing Digital para 2026',
      user: 'Admin CreamosTech',
    },
    {
      type: 'contact',
      action: 'Mensaje respondido',
      description: 'Isabel Torres - Estrategia de marketing digital',
      user: 'Admin CreamosTech',
    },
    {
      type: 'case_study',
      action: 'Caso publicado',
      description: 'Transformación Digital de TechStart',
      user: 'Admin CreamosTech',
    },
  ];

  for (const activity of activities) {
    await prisma.activity.create({ data: activity });
  }
  console.log('✅ Activities created');

  console.log('🎉 Seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
