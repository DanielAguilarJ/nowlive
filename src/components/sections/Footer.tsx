'use client';

import { useState, useEffect, useCallback } from 'react';
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

/* ──────────────────────────────────────────────
   Footer link data (i18n)
   ────────────────────────────────────────────── */
const footerLinks = {
  es: {
    services: [
      { label: 'Diseno Web', href: '/services/web-design' },
      { label: 'Estrategia Digital', href: '/services/digital-strategy' },
      { label: 'Marketing Automation', href: '/services/marketing-automation' },
      { label: 'Creacion de Contenido', href: '/services/content-creation' },
      { label: 'SEO & Analytics', href: '/services/seo-analytics' },
      { label: 'Identidad de Marca', href: '/services/brand-identity' },
    ],
    company: [
      { label: 'Sobre Nosotros', href: '/about' },
      { label: 'Nuestro Equipo', href: '/about#team' },
      { label: 'Portfolio', href: '/casos-de-exito' },
      { label: 'Proceso', href: '/about#process' },
      { label: 'Carreras', href: '/careers' },
      { label: 'Contacto', href: '/contact' },
    ],
    resources: [
      { label: 'Recursos', href: '/recursos' },
      { label: 'Blog', href: '/blog' },
      { label: 'Casos de Exito', href: '/casos-de-exito' },
      { label: 'Testimonios', href: '/testimonios' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Privacidad', href: '/privacy' },
      { label: 'Terminos de Servicio', href: '/terms' },
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
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about#team' },
      { label: 'Portfolio', href: '/casos-de-exito' },
      { label: 'Process', href: '/about#process' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
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
  { icon: TwitterIcon, href: 'https://twitter.com/creamostech', label: 'Twitter', color: '#1DA1F2' },
  { icon: LinkedInIcon, href: 'https://linkedin.com/company/creamostech', label: 'LinkedIn', color: '#0A66C2' },
  { icon: InstagramIcon, href: 'https://instagram.com/creamostech', label: 'Instagram', color: '#E4405F' },
  { icon: FacebookIcon, href: 'https://facebook.com/creamostech', label: 'Facebook', color: '#1877F2' },
];

/* ──────────────────────────────────────────────
   Inline SVG icons for contact and trust badges
   ────────────────────────────────────────────── */
function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  );
}

function MapPinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ShieldCheckIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function GlobeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function HeadsetIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0118 0v6" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
    </svg>
  );
}

function AwardIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    </svg>
  );
}

function ArrowUpIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function ChatBubbleIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
  );
}

function CheckCircleIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Footer Component
   ────────────────────────────────────────────── */
export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const t = getTranslations(lang);

  /* ── Back to top visibility ── */
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /* ── Newsletter submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail('');

    // Reset after 4 seconds
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  /* ── Smooth scroll for hash links ── */
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

  /* ── Trust badge data ── */
  const trustBadges = [
    { icon: ShieldCheckIcon, label: t.footer.trustBadges.ssl, color: 'text-green-400' },
    { icon: GlobeIcon, label: t.footer.trustBadges.gdpr, color: 'text-blue-400' },
    { icon: HeadsetIcon, label: t.footer.trustBadges.support, color: 'text-purple-400' },
    { icon: AwardIcon, label: t.footer.trustBadges.iso, color: 'text-amber-400' },
  ];

  return (
    <>
      <footer className="relative bg-primary-900 text-white">
        {/* ═══════════════════════════════════════
            Decorative gradient top border
           ═══════════════════════════════════════ */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #10b981, #3b82f6)',
            backgroundSize: '300% 100%',
            animation: 'gradient-shift 6s ease infinite',
          }}
        />

        {/* ═══════════════════════════════════════
            Trust badges row
           ═══════════════════════════════════════ */}
        <div className="border-b border-primary-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-16">
              {trustBadges.map((badge) => {
                const IconComp = badge.icon;
                return (
                  <div
                    key={badge.label}
                    className="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-105"
                  >
                    <div className={clsx(
                      'flex items-center justify-center w-9 h-9 rounded-lg bg-primary-800/80',
                      'group-hover:bg-primary-700 transition-colors duration-300',
                    )}>
                      <span className={clsx(badge.color, 'transition-colors duration-300')}>
                        <IconComp size={18} />
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            Main footer content
           ═══════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* ── Brand column ── */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-4 text-display">
                <span className="text-2xl">
                  <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
                    NOW
                  </span>
                  <span className="text-white">
                    LIVE
                  </span>
                </span>
              </Link>
              <p className="text-gray-400 max-w-xs text-body mb-6">
                {t.footer.description}
              </p>

              {/* Newsletter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white text-card-heading">
                    {t.footer.newsletterTitle}
                  </h4>
                  <div className="flex rounded-full border border-white/20 overflow-hidden">
                    <button
                      onClick={() => setLang('es')}
                      className={clsx(
                        'px-2 py-1 text-2xs font-semibold transition-colors duration-200',
                        lang === 'es' ? 'bg-white text-primary-700' : 'text-white hover:bg-white/10'
                      )}
                    >
                      ES
                    </button>
                    <button
                      onClick={() => setLang('en')}
                      className={clsx(
                        'px-2 py-1 text-2xs font-semibold transition-colors duration-200',
                        lang === 'en' ? 'bg-white text-primary-700' : 'text-white hover:bg-white/10'
                      )}
                    >
                      EN
                    </button>
                  </div>
                </div>

                {/* Newsletter form with success animation */}
                <div className="relative">
                  <form
                    onSubmit={handleSubmit}
                    className={clsx(
                      'flex flex-col sm:flex-row gap-2 transition-all duration-500',
                      isSubmitted && 'opacity-0 scale-95 pointer-events-none'
                    )}
                  >
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
                        'min-h-[44px] transition-all duration-300'
                      )}
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isSubmitting}
                    >
                      {t.footer.newsletterSubmit}
                    </Button>
                  </form>

                  {/* Success overlay animation */}
                  <div
                    className={clsx(
                      'absolute inset-0 flex items-center justify-center gap-3',
                      'transition-all duration-500',
                      isSubmitted
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-90 pointer-events-none'
                    )}
                  >
                    <div className="flex items-center gap-2 bg-success-500/15 border border-success-500/30 rounded-lg px-5 py-3">
                      <span className={clsx(
                        'text-success-400 transition-transform duration-700',
                        isSubmitted && 'animate-bounce-in'
                      )}>
                        <CheckCircleIcon size={22} />
                      </span>
                      <p className="text-success-400 text-sm font-medium">
                        {t.footer.newsletterSuccess}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links with hover tooltips */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <div key={social.label} className="relative">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={clsx(
                          'w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center',
                          'text-gray-400 hover:text-white',
                          'transition-all duration-300 hover:shadow-glow hover:-translate-y-1'
                        )}
                        style={{
                          backgroundColor: hoveredSocial === social.label ? social.color : undefined,
                        }}
                        aria-label={social.label}
                        onMouseEnter={() => setHoveredSocial(social.label)}
                        onMouseLeave={() => setHoveredSocial(null)}
                      >
                        <IconComponent size={18} />
                      </a>
                      {/* Tooltip */}
                      <div
                        className={clsx(
                          'absolute -top-9 left-1/2 -translate-x-1/2',
                          'bg-white text-primary-900 text-xs font-semibold px-2.5 py-1 rounded-md',
                          'whitespace-nowrap shadow-lg',
                          'transition-all duration-200 pointer-events-none',
                          hoveredSocial === social.label
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-1'
                        )}
                      >
                        {social.label}
                        {/* Tooltip arrow */}
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-white rotate-45" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Services links ── */}
            <div>
              <Link
                href="/services"
                className="text-sm font-semibold text-white uppercase tracking-wider mb-4 hover:text-accent-400 transition-colors block"
              >
                {t.footer.services}
              </Link>
              <ul className="space-y-3">
                {footerLinks[lang].services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-gray-400 hover:text-white transition-colors animated-underline text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Company links ── */}
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
                      className="text-gray-400 hover:text-white transition-colors animated-underline text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Resources links ── */}
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
                      className="text-gray-400 hover:text-white transition-colors animated-underline text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact info column ── */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {t.footer.contact.title}
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`tel:${t.footer.contact.phone.replace(/\s/g, '')}`}
                    className="group flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="mt-0.5 text-accent-400 group-hover:text-accent-300 transition-colors shrink-0">
                      <PhoneIcon size={16} />
                    </span>
                    <span className="text-sm">{t.footer.contact.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${t.footer.contact.email}`}
                    className="group flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="mt-0.5 text-accent-400 group-hover:text-accent-300 transition-colors shrink-0">
                      <MailIcon size={16} />
                    </span>
                    <span className="text-sm">{t.footer.contact.email}</span>
                  </a>
                </li>
                <li>
                  <div className="group flex items-start gap-3 text-gray-400">
                    <span className="mt-0.5 text-accent-400 shrink-0">
                      <MapPinIcon size={16} />
                    </span>
                    <span className="text-sm leading-relaxed">{t.footer.contact.address}</span>
                  </div>
                </li>
              </ul>

              {/* ── Live Chat CTA ── */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    // Open chat widget or navigate to contact
                    window.location.href = '/contact';
                  }}
                  className={clsx(
                    'group relative flex items-center gap-3 w-full',
                    'bg-gradient-to-r from-accent-500 to-accent-600',
                    'hover:from-accent-400 hover:to-accent-500',
                    'text-white px-4 py-3 rounded-xl',
                    'transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5',
                    'overflow-hidden'
                  )}
                >
                  {/* Animated shimmer on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s infinite',
                      }}
                    />
                  </div>
                  <span className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-white/20">
                    <ChatBubbleIcon size={18} />
                  </span>
                  <div className="relative text-left">
                    <span className="block text-sm font-semibold leading-tight">
                      {t.footer.liveChat}
                    </span>
                    <span className="block text-xs text-white/70 leading-tight mt-0.5">
                      {t.footer.liveChatSubtitle}
                    </span>
                  </div>
                  {/* Pulsing dot indicator */}
                  <span className="relative ml-auto flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            Bottom bar
           ═══════════════════════════════════════ */}
        <div className="border-t border-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} CreamosTech. {t.footer.bottom}
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

      {/* ═══════════════════════════════════════
          Back to Top floating button
         ═══════════════════════════════════════ */}
      <button
        onClick={scrollToTop}
        aria-label={t.footer.backToTop}
        className={clsx(
          'fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50',
          'w-12 h-12 rounded-full',
          'bg-accent-500 hover:bg-accent-400 text-white',
          'shadow-lg hover:shadow-glow',
          'flex items-center justify-center',
          'transition-all duration-300',
          showBackToTop
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
        )}
      >
        <ArrowUpIcon size={20} />
      </button>
    </>
  );
}
