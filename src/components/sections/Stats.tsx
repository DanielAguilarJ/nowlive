'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionContainer, ScrollReveal } from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Icons per stat
const statIcons = [
  // Proyectos - Trophy
  <svg key="trophy" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15l-2 5h4l-2-5zm0 0a7 7 0 007-7V4H5v4a7 7 0 007 7zM5 4H3v3a3 3 0 003 3M19 4h2v3a3 3 0 01-3 3" />
  </svg>,
  // Satisfaccion - Heart
  <svg key="heart" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>,
  // Anos - Clock
  <svg key="clock" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Equipo - Users
  <svg key="users" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
  // Impresiones - Eye
  <svg key="eye" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>,
  // ROI - Chart
  <svg key="chart" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>,
];

// Progress ring percentage targets per stat
const ringTargets = [75, 98, 60, 50, 83, 100];

// Trending up arrow indicator
function TrendingUpArrow() {
  return (
    <svg
      className="inline-block w-5 h-5 ml-1.5 text-emerald-400 translate-y-[-2px]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );
}

// Sparkle burst that appears when the counter finishes
function SparkleBurst({ active }: { active: boolean }) {
  return (
    <span
      className={`
        pointer-events-none absolute inset-0 flex items-center justify-center
        transition-all duration-700
        ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
      `}
      aria-hidden="true"
    >
      {/* Four tiny sparkle dots radiating outward */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const tx = Math.cos(angle) * (active ? 28 : 0);
        const ty = Math.sin(angle) * (active ? 28 : 0);
        return (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent-400"
            style={{
              transform: `translate(${tx}px, ${ty}px) scale(${active ? 1 : 0})`,
              opacity: active ? 0 : 1,
              transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 60}ms`,
              animation: active ? `sparkle-fade 0.8s ${i * 60}ms ease-out forwards` : 'none',
            }}
          />
        );
      })}
      {/* Central flash */}
      <span
        className="absolute w-10 h-10 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
          transform: `scale(${active ? 2 : 0})`,
          opacity: active ? 0 : 1,
          transition: 'all 0.6s ease-out',
          animation: active ? 'sparkle-flash 0.6s ease-out forwards' : 'none',
        }}
      />
    </span>
  );
}

function ProgressRing({ percentage, delay, uniqueId }: { percentage: number; delay: number; uniqueId: string }) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setInView(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={containerRef} className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <defs>
          {/* Unique gradient per ring so they can coexist */}
          <linearGradient id={`stat-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6">
              <animate attributeName="stop-color" values="#3B82F6;#8B5CF6;#3B82F6" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#8B5CF6">
              <animate attributeName="stop-color" values="#8B5CF6;#EC4899;#8B5CF6" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#EC4899">
              <animate attributeName="stop-color" values="#EC4899;#3B82F6;#EC4899" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          {/* Inner glow filter */}
          <filter id={`glow-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          strokeWidth="3"
          className="stat-ring-bg"
        />

        {/* Glow layer (rendered behind the main arc) */}
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          strokeWidth="8"
          stroke={`url(#stat-grad-${uniqueId})`}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? offset : circumference}
          opacity="0.3"
          filter={`url(#glow-${uniqueId})`}
          style={{
            transition: 'stroke-dashoffset 2s cubic-bezier(0.33, 1, 0.68, 1)',
          }}
        />

        {/* Main arc */}
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          strokeWidth="3.5"
          stroke={`url(#stat-grad-${uniqueId})`}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? offset : circumference}
          style={{
            transition: 'stroke-dashoffset 2s cubic-bezier(0.33, 1, 0.68, 1)',
          }}
        />
      </svg>
    </div>
  );
}

function AnimatedCounter({ end, suffix = '', duration = 2000, delay = 0, onComplete }: {
  end: number; suffix?: string; duration?: number; delay?: number; onComplete?: () => void;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setTimeout(() => setStarted(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.round(eased * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    };
    requestAnimationFrame(animate);
  }, [started, end, duration, onComplete]);

  return (
    <div ref={ref} className="relative inline-flex items-center text-4xl md:text-5xl text-white tracking-tight text-mono-number">
      {count}{suffix}
      <TrendingUpArrow />
    </div>
  );
}

export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  const [completedCounters, setCompletedCounters] = useState<Set<number>>(new Set());

  const handleCounterComplete = useCallback((index: number) => {
    setCompletedCounters((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.stat-card', {
        y: 60,
        opacity: 0,
        scale: 0.9,
        rotateX: 15,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const subtitleES = 'Datos reales, impacto verificable.';
  const subtitleEN = 'Real data, verified impact.';

  return (
    <SectionContainer id="stats" padding="lg" background="transparent" className="relative overflow-hidden">
      {/* Sparkle keyframes injected once */}
      <style>{`
        @keyframes sparkle-fade {
          0%   { opacity: 1; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(1); }
          100% { opacity: 0; transform: translate(calc(var(--tw-translate-x) * 1.8), calc(var(--tw-translate-y) * 1.8)) scale(0); }
        }
        @keyframes sparkle-flash {
          0%   { opacity: 0.6; transform: scale(0.5); }
          100% { opacity: 0; transform: scale(2.5); }
        }
      `}</style>

      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 -z-20" />
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10" />
      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay -z-10" />
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      <div className="text-center mb-16">
        <ScrollReveal direction="up">
          <span className="inline-block px-4 py-2 mb-4 text-badge text-accent-300 bg-accent-500/10 rounded-full border border-accent-500/20">
            {t.stats.badge}
          </span>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <h2 className="text-fluid-4xl text-white mb-4 text-section-heading">
            {t.stats.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto text-body">
            {t.stats.description}
          </p>
          {/* Descriptive subtitle */}
          <p className="text-sm text-gray-400/80 max-w-xl mx-auto mt-2 italic tracking-wide">
            {lang === 'es' ? subtitleES : subtitleEN}
          </p>
        </ScrollReveal>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.stats.items.map((stat, index) => (
          <div
            key={index}
            className="stat-card group"
            style={{ perspective: '1000px' }}
          >
            <div
              className="
                relative rounded-2xl p-8 h-full
                transition-all duration-500 ease-out
                group-hover:translate-y-[-6px]
                bg-white/[0.04] backdrop-blur-xl saturate-[1.8]
                border border-white/[0.08]
                shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]
                group-hover:bg-white/[0.08]
                group-hover:border-white/[0.18]
                group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15),0_0_40px_rgba(59,130,246,0.12),0_0_80px_rgba(139,92,246,0.06)]
              "
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 gradient-border-animated" />

              {/* Soft inner highlight (top-left) */}
              <div className="absolute top-0 left-0 w-full h-1/2 rounded-t-2xl bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Progress ring */}
                <ProgressRing
                  percentage={ringTargets[index]}
                  delay={index * 150}
                  uniqueId={`ring-${index}`}
                />

                {/* Icon centered in ring */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-500/20 to-purple-500/20 flex items-center justify-center text-accent-400 group-hover:text-accent-300 transition-colors group-hover:scale-110 transform duration-300">
                    {statIcons[index]}
                  </div>
                </div>

                {/* Number with sparkle */}
                <div className="relative inline-block">
                  <SparkleBurst active={completedCounters.has(index)} />
                  <AnimatedCounter
                    end={stat.number}
                    suffix={stat.suffix}
                    delay={index * 150}
                    onComplete={() => handleCounterComplete(index)}
                  />
                </div>

                {/* Label */}
                <h3 className="text-lg text-white mt-3 mb-1 text-card-heading">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
