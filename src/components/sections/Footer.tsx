'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Button } from '@/components/ui';
import {
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
} from '@/components/icons';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

const footerLinks = {
  es: {
    services: [
      { label: 'Diseño Web', href: '/services/web-design' },
      { label: 'Estrategia Digital', href: '/services/digital-strategy' },
      { label: 'Marketing Automation', href: '/services/marketing-automation' },
      { label: 'Creación de Contenido', href: '/services/content-creation' },
      { label: 'SEO & Analytics', href: '/services/seo-analytics' },
      { label: 'Identidad de Marca', href: '/services/brand-identity' },
    ],
    company: [
      { label: 'Sobre Nosotros', href: '/#team' },
      { label: 'Nuestro Equipo', href: '/#team' },
      { label: 'Portfolio', href: '/#portfolio' },
      { label: 'Proceso', href: '/#process' },
      { label: 'Carreras', href: '/#cta' },
      { label: 'Contacto', href: '/#cta' },
    ],
    resources: [
      { label: 'Recursos', href: '/recursos' },
      { label: 'Blog', href: '/blog' },
      { label: 'Casos de Éxito', href: '/casos-de-exito' },
      { label: 'Testimonios', href: '/testimonios' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Privacidad', href: '/privacy' },
      { label: 'Términos de Servicio', href: '/terms' },
    ],
  },
  en: {
    services: [
      { label: 'Web Design', href: '/services/web-design' },
      { label: 'Digital Strategy', href: '/services/digital-strategy' },
      { label: 'Marketing Automation', href: '/services/marketing-automation' },
      { label: 'Content Creation', href: '/services/content-creation' },
      { label: 'SEO & Analytics', href: '/services/seo-analytics' },
      { label: 'Brand Identity', href: '/services/brand-identity' },
    ],
    company: [
      { label: 'About Us', href: '/#team' },
      { label: 'Our Team', href: '/#team' },
      { label: 'Portfolio', href: '/#portfolio' },
      { label: 'Process', href: '/#process' },
      { label: 'Careers', href: '/#cta' },
      { label: 'Contact', href: '/#cta' },
    ],
    resources: [
      { label: 'Resources', href: '/recursos' },
      { label: 'Blog', href: '/blog' },
      { label: 'Case Studies', href: '/casos-de-exito' },
      { label: 'Testimonials', href: '/testimonios' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
};

const socialLinks = [
  { icon: TwitterIcon, href: 'https://twitter.com/nowlive', label: 'Twitter' },
  { icon: LinkedInIcon, href: 'https://linkedin.com/company/nowlive', label: 'LinkedIn' },
  { icon: InstagramIcon, href: 'https://instagram.com/nowlive', label: 'Instagram' },
  { icon: FacebookIcon, href: 'https://facebook.com/nowlive', label: 'Facebook' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const t = getTranslations(lang);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/', '');
      if (pathname === '/') {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <footer className="bg-primary-900 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
                  NOW
                </span>
                <span className="text-white">LIVE</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              {t.footer.description}
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-white">
                  {t.footer.newsletterTitle}
                </h4>
                <div className="flex rounded-full border border-white/20 overflow-hidden">
                  <button
                    onClick={() => setLang('es')}
                    className={clsx(
                      'px-2 py-1 text-2xs font-semibold',
                      lang === 'es' ? 'bg-white text-primary-700' : 'text-white'
                    )}
                  >
                    ES
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={clsx(
                      'px-2 py-1 text-2xs font-semibold',
                      lang === 'en' ? 'bg-white text-primary-700' : 'text-white'
                    )}
                  >
                    EN
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletterPlaceholder}
                  required
                  className={clsx(
                    'flex-1 px-4 py-3 rounded-lg bg-primary-800 text-white',
                    'placeholder:text-gray-500 border border-primary-700',
                    'focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent',
                    'min-h-[44px]'
                  )}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                >
                  {isSubmitted ? '✓' : t.footer.newsletterSubmit}
                </Button>
              </form>
              {isSubmitted && (
                <p className="text-success-400 text-sm mt-2">
                  {t.footer.newsletterSuccess}
                </p>
              )}
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={clsx(
                      'w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center',
                      'text-gray-400 hover:text-white hover:bg-accent-500',
                      'transition-all duration-300 hover:shadow-glow'
                    )}
                    aria-label={social.label}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t.footer.services}
            </h4>
            <ul className="space-y-3">
              {footerLinks[lang].services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 hover:text-white transition-colors animated-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t.footer.company}
            </h4>
            <ul className="space-y-3">
              {footerLinks[lang].company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 hover:text-white transition-colors animated-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t.footer.resources}
            </h4>
            <ul className="space-y-3">
              {footerLinks[lang].resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 hover:text-white transition-colors animated-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} NOWLIVE. {t.footer.bottom}
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                {t.footer.terms}
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                {t.footer.cookies}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
