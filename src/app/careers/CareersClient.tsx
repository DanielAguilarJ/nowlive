"use client";

import Link from "next/link";
import { Header, Footer } from "@/components/sections";
import {
  SectionContainer,
  ParticlesBackground,
  ScrollReveal,
  Badge,
  MagneticButton,
  ScrollProgress,
} from "@/components/ui";
import { useLanguage } from "@/components/providers/LanguageProvider";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type JobListing = {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
};

const content = {
  es: {
    badge: "Únete al Equipo",
    headline: "Construye el futuro digital con nosotros",
    subheadline:
      "En CreamosTech buscamos personas apasionadas, curiosas y decididas a generar impacto real. Aquí no hay jerarquías rígidas, hay equipos que se apoyan y proyectos que inspiran.",
    perksTitle: "¿Por qué trabajar aquí?",
    perks: [
      { icon: "🏡", title: "Trabajo remoto", desc: "100% remoto con reuniones asincrónicas y cultura de flexibilidad." },
      { icon: "📚", title: "Aprendizaje continuo", desc: "Presupuesto anual para cursos, conferencias y libros técnicos." },
      { icon: "💰", title: "Compensación competitiva", desc: "Salario acorde al mercado + bonos por desempeño y metas." },
      { icon: "🌍", title: "Equipo global", desc: "Colabora con talento de más de 10 países en proyectos internacionales." },
      { icon: "⚡", title: "Proyectos retadores", desc: "Trabaja con marcas reconocidas y desafíos técnicos reales." },
      { icon: "🎉", title: "Cultura sana", desc: "Equilibrio vida-trabajo, celebraciones de logros y sin horas extra forzadas." },
    ],
    openRolesTitle: "Posiciones abiertas",
    openRoles: [
      {
        title: "Senior Frontend Developer",
        department: "Tecnología",
        location: "Remoto",
        type: "Tiempo completo",
        description:
          "Buscamos un desarrollador frontend con experiencia en React/Next.js, TypeScript y Tailwind para crear interfaces de alto rendimiento y excelente UX.",
      },
      {
        title: "Estratega de Contenido",
        department: "Marketing",
        location: "Remoto",
        type: "Tiempo completo",
        description:
          "Responsable de planificar y ejecutar estrategias de contenido multicanal: blogs, redes sociales, email y SEO para clientes de distintas industrias.",
      },
      {
        title: "Director de Cuentas",
        department: "Cuentas",
        location: "Remoto / Híbrido",
        type: "Tiempo completo",
        description:
          "Gestión de relaciones con clientes clave, coordinación de equipos internos y garantía de entrega de resultados dentro de plazos y presupuesto.",
      },
      {
        title: "Especialista SEO & Analytics",
        department: "SEO",
        location: "Remoto",
        type: "Tiempo completo",
        description:
          "Auditorías técnicas, link building, optimización on-page, configuración de GA4 y dashboards de performance para múltiples clientes.",
      },
      {
        title: "Diseñador UX/UI Senior",
        department: "Diseño",
        location: "Remoto",
        type: "Tiempo completo",
        description:
          "Diseño de productos digitales desde investigación de usuario hasta entrega en Figma. Experiencia en design systems y pruebas de usabilidad.",
      },
    ],
    noMatchTitle: "¿No encuentras tu rol?",
    noMatchDesc:
      "Aunque no tengas una vacante que encaje exactamente, siempre revisamos perfiles excepcionales. Envíanos tu CV y cuéntanos cómo puedes aportar.",
    noMatchCTA: "Enviar candidatura espontánea",
    applyLabel: "Aplicar ahora →",
    processTitle: "Proceso de selección",
    processSteps: [
      { step: "01", title: "Aplica online", desc: "Envía tu CV y carta de motivación a través de nuestro formulario." },
      { step: "02", title: "Screening call", desc: "Una llamada de 30 min con nuestro equipo de talento para conocerte." },
      { step: "03", title: "Prueba técnica", desc: "Desafío práctico relacionado con el rol (max. 3 horas)." },
      { step: "04", title: "Entrevista final", desc: "Conversación con el líder del equipo y oferta si hay fit mutuo." },
    ],
  },
  en: {
    badge: "Join the Team",
    headline: "Build the digital future with us",
    subheadline:
      "At CreamosTech we look for passionate, curious people determined to make a real impact. No rigid hierarchies here — just supportive teams and inspiring projects.",
    perksTitle: "Why work here?",
    perks: [
      { icon: "🏡", title: "Remote work", desc: "100% remote with async meetings and a flexibility culture." },
      { icon: "📚", title: "Continuous learning", desc: "Annual budget for courses, conferences, and technical books." },
      { icon: "💰", title: "Competitive compensation", desc: "Market-aligned salary + performance and goal bonuses." },
      { icon: "🌍", title: "Global team", desc: "Collaborate with talent from 10+ countries on international projects." },
      { icon: "⚡", title: "Challenging projects", desc: "Work with recognized brands and real technical challenges." },
      { icon: "🎉", title: "Healthy culture", desc: "Work-life balance, achievement celebrations, and no forced overtime." },
    ],
    openRolesTitle: "Open positions",
    openRoles: [
      {
        title: "Senior Frontend Developer",
        department: "Technology",
        location: "Remote",
        type: "Full-time",
        description:
          "Looking for a frontend developer experienced in React/Next.js, TypeScript, and Tailwind to build high-performance interfaces with excellent UX.",
      },
      {
        title: "Content Strategist",
        department: "Marketing",
        location: "Remote",
        type: "Full-time",
        description:
          "Responsible for planning and executing multi-channel content strategies: blogs, social media, email, and SEO for clients across industries.",
      },
      {
        title: "Account Director",
        department: "Accounts",
        location: "Remote / Hybrid",
        type: "Full-time",
        description:
          "Manage key client relationships, coordinate internal teams, and guarantee delivery of results within timelines and budget.",
      },
      {
        title: "SEO & Analytics Specialist",
        department: "SEO",
        location: "Remote",
        type: "Full-time",
        description:
          "Technical audits, link building, on-page optimization, GA4 setup, and performance dashboards for multiple clients.",
      },
      {
        title: "Senior UX/UI Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        description:
          "Design digital products from user research to Figma delivery. Experience in design systems and usability testing.",
      },
    ],
    noMatchTitle: "Didn't find your role?",
    noMatchDesc:
      "Even if no vacancy matches exactly, we always review exceptional profiles. Send your CV and tell us how you can contribute.",
    noMatchCTA: "Send open application",
    applyLabel: "Apply now →",
    processTitle: "Selection process",
    processSteps: [
      { step: "01", title: "Apply online", desc: "Submit your CV and cover letter through our form." },
      { step: "02", title: "Screening call", desc: "A 30-min call with our talent team to get to know you." },
      { step: "03", title: "Technical challenge", desc: "Practical challenge related to the role (max. 3 hours)." },
      { step: "04", title: "Final interview", desc: "Conversation with the team lead and offer if there's mutual fit." },
    ],
  },
} as const;

export default function CareersClient() {
  const { lang } = useLanguage();
  const c = content[lang as "es" | "en"] ?? content.es;

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 lg:py-44 bg-primary-900 text-white">
          <ParticlesBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 to-primary-900 z-0" />

          <SectionContainer background="transparent" padding="sm">
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <ScrollReveal>
                <Badge className="mb-8 bg-accent-500 text-white border-none px-6 py-2 text-sm uppercase tracking-widest">
                  {c.badge}
                </Badge>
                <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-none">
                  {c.headline}
                </h1>
                <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed opacity-90">
                  {c.subheadline}
                </p>
                <div className="mt-12">
                  <MagneticButton>
                    <a
                      href="#open-roles"
                      className="inline-flex items-center gap-3 px-10 py-5 bg-accent-500 hover:bg-accent-600 text-white font-black uppercase tracking-widest text-sm rounded-full transition-all duration-300 shadow-xl hover:shadow-accent-500/40"
                    >
                      {lang === "es" ? "Ver posiciones abiertas" : "View open positions"}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                  </MagneticButton>
                </div>
              </ScrollReveal>
            </div>
          </SectionContainer>
        </section>

        {/* Perks */}
        <SectionContainer background="white" padding="xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <ScrollReveal>
                <Badge className="mb-6 text-accent-600 bg-accent-50 border border-accent-100">
                  {c.perksTitle}
                </Badge>
                <h2 className="text-5xl md:text-6xl font-black text-primary-900 tracking-tighter">
                  {lang === "es" ? "Más que un trabajo" : "More than a job"}
                </h2>
              </ScrollReveal>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {c.perks.map((perk, i) => (
                <ScrollReveal key={perk.title} delay={i * 0.08}>
                  <div className="bg-gray-50 rounded-[2rem] p-10 border border-gray-100 hover:border-accent-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="text-5xl mb-6">{perk.icon}</div>
                    <h3 className="text-xl font-black text-primary-900 mb-3 group-hover:text-accent-600 transition-colors">
                      {perk.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">{perk.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionContainer>

        {/* Open roles */}
        <SectionContainer id="open-roles" background="gray" padding="xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <ScrollReveal>
                <Badge className="mb-6 text-accent-600 bg-accent-50 border border-accent-100">
                  {c.openRolesTitle}
                </Badge>
                <h2 className="text-5xl md:text-6xl font-black text-primary-900 tracking-tighter">
                  {lang === "es" ? "Posiciones disponibles" : "Available positions"}
                </h2>
              </ScrollReveal>
            </div>

            <div className="space-y-6">
              {c.openRoles.map((role, i) => (
                <ScrollReveal key={role.title} delay={i * 0.08}>
                  <div className="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-10 hover:border-accent-200 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="text-xs font-black uppercase tracking-widest text-accent-600 bg-accent-50 px-3 py-1 rounded-full border border-accent-100">
                            {role.department}
                          </span>
                          <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {role.location}
                          </span>
                          <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {role.type}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black text-primary-900 tracking-tight mb-3 group-hover:text-accent-600 transition-colors">
                          {role.title}
                        </h3>
                        <p className="text-gray-500 leading-relaxed">{role.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <Link
                          href={`/contact?role=${encodeURIComponent(role.title)}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-900 hover:bg-accent-600 text-white font-black uppercase tracking-widest text-xs rounded-full transition-all duration-300 whitespace-nowrap group-hover:bg-accent-600"
                        >
                          {c.applyLabel}
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionContainer>

        {/* Hiring process */}
        <SectionContainer background="dark" padding="xl">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <ScrollReveal>
                <Badge className="mb-6 bg-accent-500 text-white border-none">
                  {lang === "es" ? "Cómo es el proceso" : "How it works"}
                </Badge>
                <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                  {c.processTitle}
                </h2>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {c.processSteps.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 0.1}>
                  <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 text-center hover:bg-white/10 transition-colors duration-300">
                    <div className="w-16 h-16 rounded-full bg-accent-500 text-white font-black text-xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-accent-500/30">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
                    <p className="text-primary-200 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionContainer>

        {/* No match CTA */}
        <SectionContainer background="white" padding="xl">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary-900 to-primary-800 rounded-[3rem] p-16 md:p-20 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,107,53,0.15),transparent)]" />
              <div className="relative z-10">
                <div className="text-6xl mb-6">💌</div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
                  {c.noMatchTitle}
                </h2>
                <p className="text-primary-200 text-lg leading-relaxed mb-10">
                  {c.noMatchDesc}
                </p>
                <MagneticButton>
                  <Link
                    href="mailto:careers@creamostech.com"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-accent-500 hover:bg-accent-600 text-white font-black uppercase tracking-widest text-sm rounded-full transition-all duration-300 shadow-xl hover:shadow-accent-500/40"
                  >
                    {c.noMatchCTA}
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
