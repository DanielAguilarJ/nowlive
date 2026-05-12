'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Button } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

// ---------- static data ----------

const serviceIcons = [
  // Web Design
  <svg key="web" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  // Digital Strategy
  <svg key="strategy" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  // Marketing Automation
  <svg key="marketing" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  // Content Creation
  <svg key="content" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  // SEO
  <svg key="seo" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  // Brand Identity
  <svg key="brand" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
];

const serviceDescriptions = {
  es: [
    'Sitios web modernos y responsivos',
    'Planes digitales basados en datos',
    'Automatiza tu funnel de ventas',
    'Contenido que engancha y convierte',
    'Posicionamiento orgánico y analítica',
    'Identidad visual que impacta',
  ],
  en: [
    'Modern and responsive websites',
    'Data-driven digital plans',
    'Automate your sales funnel',
    'Content that engages and converts',
    'Organic positioning and analytics',
    'Visual identity that impacts',
  ],
};

const serviceLinks = {
  es: [
    { href: '/services/web-design', label: 'Diseño & Desarrollo Web' },
    { href: '/services/digital-strategy', label: 'Estrategia Digital' },
    { href: '/services/marketing-automation', label: 'Marketing Automation' },
    { href: '/services/content-creation', label: 'Creación de Contenido' },
    { href: '/services/seo-analytics', label: 'SEO & Analytics' },
    { href: '/services/brand-identity', label: 'Identidad de Marca' },
  ],
  en: [
    { href: '/services/web-design', label: 'Web Design & Development' },
    { href: '/services/digital-strategy', label: 'Digital Strategy' },
    { href: '/services/marketing-automation', label: 'Marketing Automation' },
    { href: '/services/content-creation', label: 'Content Creation' },
    { href: '/services/seo-analytics', label: 'SEO & Analytics' },
    { href: '/services/brand-identity', label: 'Brand Identity' },
  ],
} as const;

// Icons for each main nav section (used in mobile menu)
const navSectionIcons: Record<string, React.ReactElement> = {
  '#portfolio': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  '#process': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  '#team': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  '#testimonials': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
};

// Section IDs to track for the active section indicator
const TRACKED_SECTIONS = ['services', 'portfolio', 'process', 'team', 'testimonials', 'cta'] as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isServicePage = pathname.startsWith('/services');
  const { lang, setLang, openPrompt } = useLanguage();
  const t = useMemo(() => getTranslations(lang), [lang]);

  // ---------- Scroll handler: isScrolled + progress bar + blur ----------
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Calculate overall page scroll progress (0..1)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      setScrollProgress(progress);

      // Blur amount ramps from 0 to 1 over the first 200px of scroll
      const blur = Math.min(scrollY / 200, 1);
      setBlurAmount(blur);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---------- IntersectionObserver for active section tracking ----------
  useEffect(() => {
    if (isServicePage) return; // only track on homepage

    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    TRACKED_SECTIONS.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(sectionId, entry.intersectionRatio);
            } else {
              visibleSections.delete(sectionId);
            }

            // Pick the section with the highest intersection ratio
            let best: string | null = null;
            let bestRatio = 0;
            visibleSections.forEach((ratio, id) => {
              if (ratio > bestRatio) {
                bestRatio = ratio;
                best = id;
              }
            });
            setActiveSection(best ? `#${best}` : null);
          });
        },
        {
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
          rootMargin: '-80px 0px -30% 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isServicePage, pathname]);

  // ---------- Click outside to close mega menu ----------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ---------- Lock body scroll on mobile menu open ----------
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // ---------- helpers ----------
  const scrollToSection = useCallback((href: string) => {
    if (href.startsWith('#')) {
      if (isServicePage) {
        window.location.href = '/' + href;
        return;
      }
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  }, [isServicePage]);

  const handleLanguage = useCallback((nextLang: 'es' | 'en') => {
    setLang(nextLang);
    setIsMobileMenuOpen(false);
  }, [setLang]);

  const isDark = !(isScrolled || isServicePage);

  // Determine if a nav item matches the currently-visible section
  const isActiveLink = (href: string) => activeSection === href;

  // Check if services section is active (for the "Servicios" top-level button)
  const isServicesActive = activeSection === '#services';

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled || isServicePage
          ? 'header-scrolled py-3 shadow-lg'
          : 'bg-transparent py-5'
      )}
      style={
        isScrolled || isServicePage
          ? {
              backgroundColor: `rgba(255, 255, 255, ${0.88 + blurAmount * 0.07})`,
              backdropFilter: `blur(${8 + blurAmount * 16}px)`,
              WebkitBackdropFilter: `blur(${8 + blurAmount * 16}px)`,
            }
          : {
              backdropFilter: blurAmount > 0 ? `blur(${blurAmount * 8}px)` : undefined,
              WebkitBackdropFilter: blurAmount > 0 ? `blur(${blurAmount * 8}px)` : undefined,
            }
      }
    >
      {/* ---- Scroll progress bar (2px gradient at very top) ---- */}
      <div
        className="absolute top-0 left-0 h-[2px] z-[60] pointer-events-none"
        style={{
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #f97316)',
          transition: 'width 80ms linear',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo with scale on scroll */}
          <Link
            href="/"
            className={clsx(
              'text-display transition-all duration-500',
              isScrolled ? 'text-xl' : 'text-2xl',
              isDark ? 'text-white' : 'text-primary-700'
            )}
            aria-label="CreamosTech Home"
          >
            <span className="bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent">
              NOW
            </span>
            <span className={isDark ? 'text-white' : 'text-primary-700'}>
              LIVE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Services Mega Menu */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className={clsx(
                  'relative flex items-center gap-1 text-sm text-nav transition-colors duration-300 py-2',
                  isDark
                    ? 'text-white/90 hover:text-white'
                    : 'text-gray-700 hover:text-accent-500',
                  isServicesActive && !isDark && 'text-accent-600 font-semibold',
                  isServicesActive && isDark && 'text-white font-semibold',
                )}
              >
                {t.header.services}
                <svg
                  className={clsx(
                    'w-4 h-4 transition-transform duration-300',
                    isServicesOpen && 'rotate-180'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {/* Gradient underline indicator -- shows on hover or when section is active */}
                <span className={clsx(
                  'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent-400 to-purple-500 transition-all duration-300 rounded-full',
                  isServicesOpen || isServicesActive ? 'w-full' : 'w-0'
                )} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[min(480px,calc(100vw-2rem))] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/80 py-4 px-2 overflow-hidden"
                  >
                    {/* Header of mega menu */}
                    <div className="px-4 pb-3 mb-2 border-b border-gray-100">
                      <p className="text-badge text-accent-600">
                        {lang === 'es' ? 'Nuestros Servicios' : 'Our Services'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-1">
                      {serviceLinks[lang].map((link, idx) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsServicesOpen(false)}
                          className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gradient-to-r hover:from-accent-50 hover:to-purple-50 hover:text-accent-600 transition-all duration-200 group"
                        >
                          <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent-100 flex items-center justify-center text-accent-600 group-hover:bg-accent-500 group-hover:text-white transition-all duration-200 mt-0.5">
                            {serviceIcons[idx]}
                          </span>
                          <div>
                            <div className="text-card-heading">{link.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5 group-hover:text-accent-500">
                              {serviceDescriptions[lang][idx]}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {t.header.nav.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  onMouseEnter={() => setActiveNavItem(link.href)}
                  onMouseLeave={() => setActiveNavItem(null)}
                  className={clsx(
                    'relative text-sm text-nav transition-colors duration-300 py-2',
                    isDark
                      ? 'text-white/90 hover:text-white'
                      : 'text-gray-700 hover:text-accent-500',
                    active && !isDark && 'text-accent-600 font-semibold',
                    active && isDark && 'text-white font-semibold',
                  )}
                >
                  {link.label}
                  {/* Active dot indicator */}
                  {active && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Gradient underline on hover or active */}
                  <span className={clsx(
                    'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent-400 to-purple-500 transition-all duration-300 rounded-full',
                    activeNavItem === link.href || active ? 'w-full' : 'w-0'
                  )} />
                </button>
              );
            })}

            {/* CTA button with "New" badge */}
            <div className="relative">
              <Button
                variant={isDark ? 'outline' : 'primary'}
                size="sm"
                onClick={() => scrollToSection('#cta')}
                className={clsx(
                  'relative overflow-hidden transition-all duration-300',
                  isDark && 'border-white text-white hover:bg-white hover:text-primary-700'
                )}
              >
                {t.header.cta}
              </Button>
              {/* Notification badge */}
              <span className="absolute -top-2 -right-2 flex items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-50" />
                <span className="relative inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-gradient-to-r from-accent-500 to-purple-500 rounded-full shadow-lg">
                  {lang === 'es' ? 'Nuevo' : 'New'}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className={clsx(
                'flex rounded-full border overflow-hidden transition-all duration-300',
                isDark
                  ? 'border-white/30 bg-white/10 backdrop-blur-md'
                  : 'border-gray-200 bg-white/80 backdrop-blur-md shadow-sm'
              )}>
                {(['es', 'en'] as const).map((code) => (
                  <button
                    key={code}
                    onClick={() => handleLanguage(code)}
                    className={clsx(
                      'px-3 py-1.5 text-xs font-semibold transition-all duration-300',
                      lang === code
                        ? 'bg-accent-500 text-white'
                        : isDark ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-accent-600'
                    )}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={clsx(
              'lg:hidden relative p-2 rounded-xl transition-all duration-300',
              isDark ? 'text-white hover:bg-white/10' : 'text-primary-700 hover:bg-gray-100'
            )}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span className={clsx(
                'block w-6 h-0.5 rounded-full transform transition-all duration-300 origin-center',
                isDark ? 'bg-white' : 'bg-primary-700',
                isMobileMenuOpen && 'rotate-45 translate-y-[9px]'
              )} />
              <span className={clsx(
                'block w-4 h-0.5 rounded-full transition-all duration-300',
                isDark ? 'bg-white' : 'bg-primary-700',
                isMobileMenuOpen && 'opacity-0 translate-x-4'
              )} />
              <span className={clsx(
                'block w-6 h-0.5 rounded-full transform transition-all duration-300 origin-center',
                isDark ? 'bg-white' : 'bg-primary-700',
                isMobileMenuOpen && '-rotate-45 -translate-y-[9px]'
              )} />
            </div>
          </button>
        </nav>
      </div>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-0 bg-primary-900/98 backdrop-blur-xl z-[49]"
          >
            <div className="flex flex-col justify-center items-center h-full px-8 pt-20 pb-12 overflow-y-auto">
              {/* Services Accordion */}
              <div className="w-full max-w-sm mb-2">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={clsx(
                    'flex items-center justify-between w-full py-4 text-xl font-medium border-b border-white/10 transition-colors',
                    isServicesActive ? 'text-accent-400' : 'text-white/90'
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-accent-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </span>
                    {t.header.services}
                  </span>
                  <svg
                    className={clsx(
                      'w-5 h-5 transition-transform duration-300',
                      isServicesOpen && 'rotate-180'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 overflow-hidden"
                    >
                      {serviceLinks[lang].map((link, idx) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 py-3 text-white/70 hover:text-accent-400 transition-colors"
                        >
                          <span className="text-accent-400">{serviceIcons[idx]}</span>
                          <span className="text-sm">{link.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Nav items with section icons */}
              {t.header.nav.map((link, idx) => {
                const active = isActiveLink(link.href);
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.05 }}
                    onClick={() => scrollToSection(link.href)}
                    className={clsx(
                      'w-full max-w-sm py-4 text-xl font-medium border-b border-white/10 text-left transition-colors flex items-center gap-3',
                      active ? 'text-accent-400' : 'text-white/90 hover:text-accent-400'
                    )}
                  >
                    {/* Section icon */}
                    <span className={clsx(
                      'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                      active
                        ? 'bg-accent-500/20 text-accent-400'
                        : 'bg-white/10 text-white/50'
                    )}>
                      {navSectionIcons[link.href] || (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                    </span>
                    <span>{link.label}</span>
                    {/* Active section indicator dot */}
                    {active && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-2 h-2 rounded-full bg-accent-400"
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* CTA with notification badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-sm mt-8 relative"
              >
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => scrollToSection('#cta')}
                  className="text-lg py-4"
                >
                  {t.header.cta}
                </Button>
                {/* Mobile CTA notification badge */}
                <span className="absolute -top-2 right-4 flex items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-50" />
                  <span className="relative inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-bold leading-none text-white bg-gradient-to-r from-accent-500 to-purple-500 rounded-full shadow-lg">
                    {lang === 'es' ? 'Nuevo' : 'New'}
                  </span>
                </span>
              </motion.div>

              {/* Language + region */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex items-center gap-4 mt-8"
              >
                <div className="flex rounded-full border border-white/20 overflow-hidden bg-white/10 backdrop-blur-sm">
                  {(['es', 'en'] as const).map((code) => (
                    <button
                      key={code}
                      onClick={() => handleLanguage(code)}
                      className={clsx(
                        'px-4 py-2 text-sm font-semibold transition-all',
                        lang === code ? 'bg-accent-500 text-white' : 'text-white/60 hover:text-white'
                      )}
                    >
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button
                  onClick={openPrompt}
                  className="text-sm text-accent-400 hover:text-accent-300 underline"
                >
                  {lang === 'es' ? 'Elegir región' : 'Select region'}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
