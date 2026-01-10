'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Button } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

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

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isServicePage = pathname.startsWith('/services');
  const { lang, setLang, openPrompt } = useLanguage();
  const t = useMemo(() => getTranslations(lang), [lang]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (href: string) => {
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
  };

  const handleLanguage = (nextLang: 'es' | 'en') => {
    setLang(nextLang);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isServicePage
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={clsx(
              'text-2xl font-bold transition-colors duration-300',
              isScrolled || isServicePage ? 'text-primary-700' : 'text-white'
            )}
            aria-label="NOWLIVE Home"
          >
            <span className="bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent">
              NOW
            </span>
            <span className={isScrolled || isServicePage ? 'text-primary-700' : 'text-white'}>
              LIVE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={clsx(
                  'flex items-center gap-1 text-sm font-medium transition-colors duration-300 animated-underline',
                  isScrolled || isServicePage
                    ? 'text-gray-700 hover:text-accent-500'
                    : 'text-white/90 hover:text-white'
                )}
              >
                {t.header.services}
                <svg
                  className={clsx(
                    'w-4 h-4 transition-transform duration-200',
                    isServicesOpen && 'rotate-180'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                  >
                    {serviceLinks[lang].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsServicesOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-accent-50 hover:text-accent-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {t.header.nav.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={clsx(
                  'text-sm font-medium transition-colors duration-300 animated-underline',
                  isScrolled || isServicePage
                    ? 'text-gray-700 hover:text-accent-500'
                    : 'text-white/90 hover:text-white'
                )}
              >
                {link.label}
              </button>
            ))}
            <Button
              variant={isScrolled || isServicePage ? 'primary' : 'outline'}
              size="sm"
              onClick={() => scrollToSection('#cta')}
              className={clsx(
                !(isScrolled || isServicePage) && 'border-white text-white hover:bg-white hover:text-primary-700'
              )}
            >
              {t.header.cta}
            </Button>

            <div className="flex items-center gap-2">
              <span className={clsx('text-xs uppercase font-semibold', isScrolled || isServicePage ? 'text-gray-600' : 'text-white/80')}>
                {t.header.languageLabel}
              </span>
              <div className="flex rounded-full border border-gray-200 bg-white/80 backdrop-blur-md shadow-sm overflow-hidden">
                {(['es', 'en'] as const).map((code) => (
                  <button
                    key={code}
                    onClick={() => handleLanguage(code)}
                    className={clsx(
                      'px-3 py-1 text-xs font-semibold transition-colors',
                      lang === code ? 'bg-accent-500 text-white' : 'text-gray-600 hover:text-accent-600'
                    )}
                  >
                    {code === 'es' ? 'ES' : 'EN'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={clsx(
              'md:hidden p-2 rounded-lg transition-colors',
              isScrolled || isServicePage ? 'text-primary-700' : 'text-white'
            )}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Services Accordion in Mobile */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700"
                >
                  <span>Servicios</span>
                  <svg
                    className={clsx(
                      'w-4 h-4 transition-transform duration-200',
                      isServicesOpen && 'rotate-180'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4"
                    >
                      {serviceLinks[lang].map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-accent-600"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {t.header.nav.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                variant="primary"
                fullWidth
                onClick={() => scrollToSection('#cta')}
                className="mt-4"
              >
                {t.header.cta}
              </Button>

              <div className="flex items-center justify-between px-2 pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLanguage('es')}
                    className={clsx(
                      'px-3 py-1 text-xs font-semibold rounded-full border',
                      lang === 'es' ? 'bg-accent-500 text-white border-accent-500' : 'border-gray-200 text-gray-700'
                    )}
                  >
                    ES
                  </button>
                  <button
                    onClick={() => handleLanguage('en')}
                    className={clsx(
                      'px-3 py-1 text-xs font-semibold rounded-full border',
                      lang === 'en' ? 'bg-accent-500 text-white border-accent-500' : 'border-gray-200 text-gray-700'
                    )}
                  >
                    EN
                  </button>
                </div>
                <button
                  onClick={openPrompt}
                  className="text-xs text-accent-600 underline"
                >
                  Elegir región
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
