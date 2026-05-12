'use client';

import { useState, useRef, useEffect, useCallback, MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionContainer, ScrollReveal, AnimatedText, Card } from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = ['all', 'web', 'marketing', 'brand'] as const;

const projects = [
  {
    id: 1,
    title: 'TechFlow SaaS Platform',
    category: 'Web',
    client: 'TechFlow Inc.',
    services: ['Web Design', 'Development', 'UX/UI'],
    result: '156% increase in conversions',
    image: '/images/portfolio/techflow_saas.png',
    description: 'Complete redesign of a B2B SaaS platform focusing on user experience and conversion optimization.',
    featured: true,
  },
  {
    id: 2,
    title: 'VitaHealth Patient Portal',
    category: 'Marketing',
    client: 'VitaHealth Systems',
    services: ['Growth Strategy', 'Content Marketing', 'Lead Gen'],
    result: '40% reduction in admin time',
    image: '/images/portfolio/health_portal.png',
    description: 'Comprehensive digital marketing campaign for a healthcare portal, driving patient acquisition and engagement.',
    featured: true,
  },
  {
    id: 3,
    title: 'FinTrack Invest App',
    category: 'Web',
    client: 'FinTrack Global',
    services: ['React Development', 'Security', 'Real-time Data'],
    result: '100K active daily users',
    image: '/images/portfolio/finance_app.png',
    description: 'High-performance investment tracking dashboard with real-time market data visualization.',
    featured: false,
  },
  {
    id: 4,
    title: 'Luxe Real Estate Portal',
    category: 'Brand',
    client: 'Luxe Properties',
    services: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
    result: '3x organic traffic growth',
    image: '/images/portfolio/real_estate.png',
    description: 'Premium brand identity and visual language for a luxury real estate company targeting high-net-worth clients.',
    featured: false,
  },
  {
    id: 5,
    title: 'Aurum & Co. E-commerce',
    category: 'Marketing',
    client: 'Aurum & Co.',
    services: ['E-commerce Strategy', 'Paid Ads', 'Email Automation'],
    result: '$2M revenue in first year',
    image: '/images/portfolio/fashion_store.png',
    description: 'Full-funnel marketing strategy for a luxury fashion brand, from awareness campaigns to retention flows.',
    featured: false,
  },
  {
    id: 6,
    title: 'SkillStream Learning',
    category: 'Brand',
    client: 'SkillStream EdTech',
    services: ['Brand Naming', 'Logo Design', 'Brand Voice'],
    result: '45% higher course completion',
    image: '/images/portfolio/education_platform.png',
    description: 'Complete brand identity overhaul for an edtech startup, positioning them as the go-to platform for professional upskilling.',
    featured: false,
  },
];

/* ------------------------------------------------------------------
   Hover parallax hook: shifts the card image based on cursor position
   ------------------------------------------------------------------ */
function useParallaxTilt(intensity = 15) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const img = el.querySelector('img') as HTMLElement | null;
      if (img) {
        img.style.transform = `scale(1.08) translate(${x * intensity}px, ${y * intensity}px)`;
      }
    },
    [intensity],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const img = el.querySelector('img') as HTMLElement | null;
    if (img) {
      img.style.transform = 'scale(1) translate(0, 0)';
    }
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}

/* ------------------------------------------------------------------
   Portfolio Card component
   ------------------------------------------------------------------ */
function PortfolioCard({
  project,
  onClick,
}: {
  project: (typeof projects)[0];
  onClick: () => void;
}) {
  const { ref, handleMouseMove, handleMouseLeave } = useParallaxTilt(12);

  return (
    <div
      className="portfolio-card group cursor-pointer"
      onClick={onClick}
    >
      <Card variant="default" padding="none" hover className="overflow-hidden h-full relative">
        {/* Featured ribbon */}
        {project.featured && (
          <div className="absolute top-4 left-0 z-20">
            <div className="relative flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-r-full shadow-lg">
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>Featured</span>
            </div>
          </div>
        )}

        {/* Image with parallax effect */}
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-64 overflow-hidden"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            className="object-cover transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="text-sm font-medium bg-accent-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl text-primary-700 mb-2 group-hover:text-accent-600 transition-colors text-card-heading">
            {project.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.services.slice(0, 3).map((service, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
              >
                {service}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{project.client}</span>
            <span className="text-sm font-semibold text-success-600 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {project.result}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------
   Filter bar with sliding indicator
   ------------------------------------------------------------------ */
function FilterBar({
  categories: cats,
  active,
  labels,
  onChange,
}: {
  categories: readonly string[];
  active: string;
  labels: string[];
  onChange: (cat: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Move the indicator to the active button
  useEffect(() => {
    const btn = buttonRefs.current.get(active);
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    if (!btn || !container || !indicator) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    indicator.style.width = `${btnRect.width}px`;
    indicator.style.transform = `translateX(${btnRect.left - containerRect.left}px)`;
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center gap-1 p-1.5 bg-gray-100 rounded-full"
    >
      {/* Sliding pill indicator */}
      <div
        ref={indicatorRef}
        className="absolute top-1.5 left-0 h-[calc(100%-12px)] bg-accent-500 rounded-full shadow-lg transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ willChange: 'transform, width' }}
      />

      {cats.map((cat, idx) => (
        <button
          key={cat}
          ref={(el) => {
            if (el) buttonRefs.current.set(cat, el);
          }}
          onClick={() => onChange(cat)}
          className={clsx(
            'relative z-10 px-5 py-2.5 rounded-full font-medium text-sm transition-colors duration-300 min-h-[44px] whitespace-nowrap',
            active === cat
              ? 'text-white'
              : 'text-gray-600 hover:text-gray-900',
          )}
        >
          {labels[idx]}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
   Project detail modal
   ------------------------------------------------------------------ */
function ProjectModal({
  project,
  t,
  onClose,
}: {
  project: (typeof projects)[0];
  t: ReturnType<typeof getTranslations>;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Entry animation
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(
      panel,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)', delay: 0.05 },
    );

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) {
      onClose();
      return;
    }

    gsap.to(panel, { opacity: 0, scale: 0.95, y: 20, duration: 0.25, ease: 'power2.in' });
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.25,
      delay: 0.05,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={panelRef}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient header with image */}
        <div className="relative h-80 overflow-hidden rounded-t-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-accent-600/20" />

          {/* Header content overlaid on gradient */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-accent-500/80 backdrop-blur-sm rounded-full mb-3">
              {project.category}
            </span>
            <h3 className="text-3xl text-white mb-1 text-section-heading drop-shadow-lg">
              {project.title}
            </h3>
            <p className="text-white/70 text-sm">
              {t.portfolio.modal.client}: {project.client}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/20"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          <p className="text-gray-600 mb-8 text-body leading-relaxed">
            {project.description}
          </p>

          {/* Result highlight card */}
          <div className="relative mb-8 p-6 rounded-xl bg-gradient-to-br from-success-50 via-emerald-50 to-teal-50 border border-success-200/60 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-success-200/30 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-wider text-success-600 mb-1">
                {t.portfolio.modal.results}
              </p>
              <p className="text-2xl font-bold text-success-700 text-card-heading">
                {project.result}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Services */}
            <div>
              <h4 className="text-primary-700 mb-3 text-card-heading">{t.portfolio.modal.services}</h4>
              <ul className="space-y-2.5">
                {project.services.map((service, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 mr-3 flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA area */}
            <div className="flex flex-col justify-between">
              <div className="bg-gray-50 rounded-xl p-5 mb-4">
                <p className="text-sm text-gray-500 mb-1">{t.portfolio.modal.client}</p>
                <p className="text-lg font-semibold text-primary-700">{project.client}</p>
              </div>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/25 group/btn"
              >
                <span>View Live Project</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Main Portfolio section
   ------------------------------------------------------------------ */
export function Portfolio() {
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.portfolio-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <SectionContainer
      id="portfolio"
      background="white"
      padding="lg"
    >
      <div className="text-center mb-12">
        <ScrollReveal direction="up">
          <span className="inline-block px-4 py-2 mb-4 text-badge text-accent-600 bg-accent-100 rounded-full">
            {t.portfolio.badge}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h2"
          animation="slide-up"
          delay={0.1}
          className="text-fluid-4xl text-primary-700 mb-4 text-section-heading"
        >
          {t.portfolio.title}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-body">
            {t.portfolio.description}
          </p>
        </ScrollReveal>
      </div>

      {/* Filter buttons with sliding indicator */}
      <ScrollReveal direction="up" delay={0.3}>
        <div className="flex justify-center mb-12">
          <FilterBar
            categories={categories}
            active={activeCategory}
            labels={t.portfolio.categories}
            onChange={setActiveCategory}
          />
        </div>
      </ScrollReveal>

      {/* Projects grid */}
      <div ref={gridRef} className="grid-portfolio">
        {filteredProjects.map((project) => (
          <PortfolioCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          t={t}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </SectionContainer>
  );
}
