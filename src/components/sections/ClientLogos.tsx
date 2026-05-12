'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { SectionContainer, ScrollReveal, AnimatedText, Button } from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';

// SVG Logo placeholders representing tech/agency partner logos
const logos = [
    {
        name: 'TechFlow', svg: (
            <svg viewBox="0 0 120 40" className="h-8 w-auto">
                <rect x="4" y="8" width="24" height="24" rx="6" fill="currentColor" opacity="0.8" />
                <text x="36" y="26" fontSize="16" fontWeight="700" fill="currentColor">TechFlow</text>
            </svg>
        )
    },
    {
        name: 'VitaHealth', svg: (
            <svg viewBox="0 0 140 40" className="h-8 w-auto">
                <circle cx="16" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <path d="M10 20 L14 24 L22 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="36" y="26" fontSize="16" fontWeight="700" fill="currentColor">VitaHealth</text>
            </svg>
        )
    },
    {
        name: 'FinTrack', svg: (
            <svg viewBox="0 0 120 40" className="h-8 w-auto">
                <path d="M4 28 L12 16 L20 22 L28 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="36" y="26" fontSize="16" fontWeight="700" fill="currentColor">FinTrack</text>
            </svg>
        )
    },
    {
        name: 'Luxe', svg: (
            <svg viewBox="0 0 100 40" className="h-8 w-auto">
                <rect x="4" y="10" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="8" y="14" width="12" height="12" rx="1" fill="currentColor" opacity="0.3" />
                <text x="32" y="26" fontSize="16" fontWeight="700" fill="currentColor">Luxe</text>
            </svg>
        )
    },
    {
        name: 'Aurum & Co.', svg: (
            <svg viewBox="0 0 140 40" className="h-8 w-auto">
                <polygon points="16,6 28,30 4,30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <text x="36" y="26" fontSize="16" fontWeight="700" fill="currentColor">Aurum & Co.</text>
            </svg>
        )
    },
    {
        name: 'SkillStream', svg: (
            <svg viewBox="0 0 140 40" className="h-8 w-auto">
                <path d="M4 20 Q10 8, 16 20 Q22 32, 28 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <text x="36" y="26" fontSize="16" fontWeight="700" fill="currentColor">SkillStream</text>
            </svg>
        )
    },
    {
        name: 'NovaSoft', svg: (
            <svg viewBox="0 0 130 40" className="h-8 w-auto">
                <circle cx="16" cy="20" r="10" fill="currentColor" opacity="0.2" />
                <circle cx="16" cy="20" r="5" fill="currentColor" opacity="0.6" />
                <text x="32" y="26" fontSize="16" fontWeight="700" fill="currentColor">NovaSoft</text>
            </svg>
        )
    },
    {
        name: 'DataBridge', svg: (
            <svg viewBox="0 0 140 40" className="h-8 w-auto">
                <path d="M4 14 L16 14 L20 26 L24 14 L36 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <text x="42" y="26" fontSize="16" fontWeight="700" fill="currentColor">DataBridge</text>
            </svg>
        )
    },
];

// Second row uses a shuffled order for visual variety
const logosRow2 = [logos[4], logos[1], logos[6], logos[3], logos[7], logos[0], logos[5], logos[2]];

// Trust indicator data with unique icon keys
const trustIndicators = [
    {
        icon: 'projects',
        es: '150+ proyectos entregados',
        en: '150+ projects delivered',
    },
    {
        icon: 'satisfaction',
        es: '98% satisfaccion',
        en: '98% satisfaction',
    },
    {
        icon: 'support',
        es: 'Soporte dedicado 24/7',
        en: 'Dedicated 24/7 support',
    },
];

/**
 * Animated counter that counts up from 0 to `end` when it enters the viewport.
 */
function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;

                    const prefersReducedMotion = window.matchMedia(
                        '(prefers-reduced-motion: reduce)'
                    ).matches;

                    if (prefersReducedMotion) {
                        setCount(end);
                        return;
                    }

                    const duration = 2000;
                    let startTime: number | null = null;
                    const animate = (ts: number) => {
                        if (!startTime) startTime = ts;
                        const progress = Math.min((ts - startTime) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * end));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [end]);

    return (
        <span ref={ref} className="text-mono-number">
            {count}{suffix}
        </span>
    );
}

/**
 * Animated SVG icon for the trust indicators. Each icon has a subtle
 * entrance animation (scale + fade) driven by CSS.
 */
function TrustIcon({ icon }: { icon: string }) {
    const iconClass = 'w-5 h-5 text-success-500 transition-transform duration-500 group-hover/trust:scale-125';

    switch (icon) {
        case 'projects':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            );
        case 'satisfaction':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            );
        case 'support':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            );
        default:
            return null;
    }
}

/**
 * Individual logo item with tooltip on hover.
 */
function LogoItem({ logo }: { logo: typeof logos[number] }) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className="relative flex-shrink-0 px-4 sm:px-8 md:px-12 flex items-center justify-center logo-grayscale text-gray-600 hover:text-accent-600"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {logo.svg}

            {/* Tooltip */}
            <div
                className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-primary-800 text-white text-xs font-medium rounded-lg shadow-lg whitespace-nowrap transition-all duration-200 pointer-events-none ${
                    showTooltip
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-1'
                }`}
            >
                {logo.name}
                {/* Tooltip arrow */}
                <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-primary-800" />
            </div>
        </div>
    );
}

export function ClientLogos() {
    const { lang } = useLanguage();

    const scrollToPortfolio = useCallback(() => {
        const portfolio = document.getElementById('portfolio');
        if (portfolio) {
            portfolio.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <SectionContainer id="clients" background="white" padding="md" className="relative overflow-hidden">
            <div className="text-center mb-12">
                <ScrollReveal direction="up">
                    <span className="inline-block px-4 py-2 mb-4 text-badge text-accent-600 bg-accent-100 rounded-full">
                        {lang === 'es' ? 'Clientes que Confian en Nosotros' : 'Trusted By Leading Brands'}
                    </span>
                </ScrollReveal>

                <AnimatedText
                    as="h2"
                    animation="slide-up"
                    delay={0.1}
                    className="text-fluid-3xl text-primary-700 mb-4 text-section-heading"
                >
                    {lang === 'es'
                        ? 'Empresas que ya crecen con nosotros'
                        : 'Companies already growing with us'}
                </AnimatedText>

                {/* Animated company counter */}
                <ScrollReveal direction="up" delay={0.2}>
                    <div className="flex items-center justify-center gap-2 mt-2 mb-2">
                        <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent-50 to-violet-50 rounded-2xl border border-accent-100/60">
                            {/* Animated building icon */}
                            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-violet-500 text-white shadow-md">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </span>
                            <div className="text-left">
                                <span className="block text-2xl font-bold text-primary-700 leading-tight">
                                    <AnimatedCounter end={8} suffix="+" />
                                </span>
                                <span className="block text-sm text-gray-500 font-medium">
                                    {lang === 'es'
                                        ? 'empresas confian en nosotros'
                                        : 'companies trust us'}
                                </span>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Marquee Row 1 - Left direction (faster) */}
            <div className="relative">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Scrolling strip */}
                <div className="overflow-hidden">
                    <div className="marquee-strip-fast">
                        {/* First set */}
                        {logos.map((logo, idx) => (
                            <LogoItem key={`r1-first-${idx}`} logo={logo} />
                        ))}
                        {/* Duplicate for seamless loop */}
                        {logos.map((logo, idx) => (
                            <LogoItem key={`r1-second-${idx}`} logo={logo} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Marquee Row 2 - Reverse direction */}
            <div className="relative mt-6">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Scrolling strip - reverse */}
                <div className="overflow-hidden">
                    <div className="marquee-strip-fast-reverse">
                        {/* First set */}
                        {logosRow2.map((logo, idx) => (
                            <LogoItem key={`r2-first-${idx}`} logo={logo} />
                        ))}
                        {/* Duplicate for seamless loop */}
                        {logosRow2.map((logo, idx) => (
                            <LogoItem key={`r2-second-${idx}`} logo={logo} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Trust indicators with animated icons */}
            <ScrollReveal direction="up" delay={0.3}>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-12 text-sm text-gray-500">
                    {trustIndicators.map((indicator) => (
                        <div
                            key={indicator.icon}
                            className="group/trust flex items-center gap-2 transition-colors duration-300 hover:text-gray-700 cursor-default"
                        >
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-success-50 transition-all duration-300 group-hover/trust:bg-success-100 group-hover/trust:shadow-md">
                                <TrustIcon icon={indicator.icon} />
                            </span>
                            <span className="font-medium">
                                {lang === 'es' ? indicator.es : indicator.en}
                            </span>
                        </div>
                    ))}
                </div>
            </ScrollReveal>

            {/* CTA Button */}
            <ScrollReveal direction="up" delay={0.4}>
                <div className="flex justify-center mt-8">
                    <Button
                        variant="outline"
                        size="md"
                        onClick={scrollToPortfolio}
                        className="group"
                        rightIcon={
                            <svg
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        }
                    >
                        {lang === 'es' ? 'Ver Casos de Exito' : 'View Case Studies'}
                    </Button>
                </div>
            </ScrollReveal>

            {/* Inline styles for faster marquee and reverse animation */}
            <style jsx>{`
                .marquee-strip-fast {
                    display: flex;
                    animation: marquee-scroll 18s linear infinite;
                    width: max-content;
                }
                .marquee-strip-fast:hover {
                    animation-play-state: paused;
                }
                .marquee-strip-fast-reverse {
                    display: flex;
                    animation: marquee-scroll-reverse 22s linear infinite;
                    width: max-content;
                }
                .marquee-strip-fast-reverse:hover {
                    animation-play-state: paused;
                }
                @keyframes marquee-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-scroll-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </SectionContainer>
    );
}
