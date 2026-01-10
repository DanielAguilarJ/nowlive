'use client';

import { useState, useRef, useEffect } from 'react';
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
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    description: 'Complete redesign of a B2B SaaS platform focusing on user experience and conversion optimization.',
  },
  {
    id: 2,
    title: 'Verde Organic Rebrand',
    category: 'Brand',
    client: 'Verde Foods',
    services: ['Brand Identity', 'Packaging', 'Web Design'],
    result: '200% brand awareness increase',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop',
    description: 'Full brand identity overhaul for an organic food company, including packaging and digital presence.',
  },
  {
    id: 3,
    title: 'FitLife App Launch',
    category: 'Marketing',
    client: 'FitLife Health',
    services: ['Digital Strategy', 'Content', 'Paid Media'],
    result: '50K app downloads in 30 days',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    description: 'Multi-channel launch campaign for a health and fitness mobile application.',
  },
  {
    id: 4,
    title: 'Luxe Real Estate Portal',
    category: 'Web',
    client: 'Luxe Properties',
    services: ['Web Development', 'SEO', 'Content'],
    result: '3x organic traffic growth',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    description: 'Custom real estate platform with advanced search and virtual tour integration.',
  },
  {
    id: 5,
    title: 'EcoWear Brand Launch',
    category: 'Brand',
    client: 'EcoWear Apparel',
    services: ['Brand Strategy', 'Visual Identity', 'Marketing'],
    result: '$2M revenue in first year',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    description: 'End-to-end brand launch for a sustainable fashion startup.',
  },
  {
    id: 6,
    title: 'DataViz Analytics Dashboard',
    category: 'Web',
    client: 'DataViz Corp',
    services: ['UX Research', 'UI Design', 'Development'],
    result: '45% reduction in support tickets',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    description: 'Complex analytics dashboard designed for data scientists and business analysts.',
  },
];

export function Portfolio() {
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
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
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent-600 bg-accent-100 rounded-full">
              {t.portfolio.badge}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h2"
          animation="slide-up"
          delay={0.1}
          className="text-fluid-4xl font-bold text-primary-700 mb-4"
        >
            {t.portfolio.title}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.portfolio.description}
          </p>
        </ScrollReveal>
      </div>

      {/* Filter buttons */}
      <ScrollReveal direction="up" delay={0.3}>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={clsx(
                'px-6 py-3 rounded-full font-medium transition-all duration-300 min-h-[44px]',
                activeCategory === category
                  ? 'bg-accent-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {t.portfolio.categories[categories.indexOf(category)]}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Projects grid */}
      <div ref={gridRef} className="grid-portfolio">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="portfolio-card group cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <Card variant="default" padding="none" hover className="overflow-hidden h-full">
              {/* Image with parallax effect */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium bg-accent-500 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-700 mb-2 group-hover:text-accent-600 transition-colors">
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
                  <span className="text-sm font-medium text-success-600">{project.result}</span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8">
              <span className="inline-block px-3 py-1 text-sm font-medium text-accent-600 bg-accent-100 rounded-full mb-4">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl font-bold text-primary-700 mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-gray-500 mb-4">{t.portfolio.modal.client}: {selectedProject.client}</p>
              <p className="text-gray-600 mb-6">{selectedProject.description}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary-700 mb-2">{t.portfolio.modal.services}</h4>
                  <ul className="space-y-2">
                    {selectedProject.services.map((service, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-700 mb-2">{t.portfolio.modal.results}</h4>
                  <div className="bg-success-50 text-success-700 px-4 py-3 rounded-lg font-medium">
                    {selectedProject.result}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionContainer>
  );
}
