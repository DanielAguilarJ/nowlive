'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionContainer, ScrollReveal, AnimatedText } from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    quote:
      'CreamosTech transformed our digital presence completely. Their strategic approach and creative execution helped us increase our conversion rates by 200%. They\'re not just vendors, they\'re true partners.',
    author: 'Sarah Johnson',
    title: 'CEO, TechFlow Inc.',
    avatar: '/images/testimonials/testimonial_1.png',
    rating: 5,
    company: 'TechFlow',
  },
  {
    id: 2,
    quote:
      'The team at CreamosTech exceeded our expectations in every way. Their attention to detail, creative solutions, and responsive communication made our rebrand project a huge success.',
    author: 'Michael Chen',
    title: 'Marketing Director, Verde Foods',
    avatar: '/images/testimonials/testimonial_2.png',
    rating: 5,
    company: 'Verde Foods',
  },
  {
    id: 3,
    quote:
      'Working with CreamosTech was a game-changer for our app launch. Their marketing strategy drove 50,000 downloads in the first month. Highly recommend their services!',
    author: 'Emily Rodriguez',
    title: 'Founder, FitLife Health',
    avatar: '/images/testimonials/testimonial_3.png',
    rating: 5,
    company: 'FitLife Health',
  },
  {
    id: 4,
    quote:
      'The SEO and content strategy CreamosTech developed for us tripled our organic traffic within six months. Their data-driven approach delivers real results.',
    author: 'David Park',
    title: 'VP of Digital, Luxe Properties',
    avatar: '/images/team/member_6.png',
    rating: 5,
    company: 'Luxe Properties',
  },
];

/** Split quote text: first sentence gets the accent highlight, the rest is normal. */
function splitQuote(quote: string): { highlighted: string; rest: string } {
  const match = quote.match(/^([^.!?]+[.!?])\s*/);
  if (match) {
    return { highlighted: match[1], rest: quote.slice(match[0].length) };
  }
  return { highlighted: quote, rest: '' };
}

function StarRating({ rating, animated = false }: { rating: number; animated?: boolean }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 transition-all duration-300 ${i < rating ? 'text-yellow-400' : 'text-gray-600'
            } ${animated ? 'animate-bounce-in' : ''}`}
          style={animated ? { animationDelay: `${i * 100}ms` } : {}}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/** Small verified checkmark badge */
function VerifiedBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-300 text-xs font-semibold select-none"
      title="Verified client"
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      Verified
    </span>
  );
}

/** Company logo placeholder icon */
function CompanyLogoPlaceholder() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-accent-500/15 text-accent-400 mr-1.5 flex-shrink-0">
      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const isAnimating = useRef(false);

  /** Animate the card out then in when the index changes. */
  const animateSlideTransition = useCallback((direction: 'next' | 'prev', onMidpoint: () => void) => {
    if (!slideRef.current || isAnimating.current) {
      onMidpoint();
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onMidpoint();
      return;
    }

    isAnimating.current = true;
    const xOut = direction === 'next' ? -60 : 60;
    const xIn = direction === 'next' ? 60 : -60;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Slide out current content
    tl.to(slideRef.current, {
      x: xOut,
      opacity: 0,
      scale: 0.96,
      duration: 0.3,
      ease: 'power2.in',
    });

    // At midpoint, swap the data
    tl.call(onMidpoint);

    // Slide in new content
    tl.fromTo(
      slideRef.current,
      { x: xIn, opacity: 0, scale: 0.96 },
      { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
    );

    // Fade-in the quote text with a subtle stagger
    tl.fromTo(
      quoteRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
      '-=0.25',
    );
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex || isAnimating.current) return;
      const dir = index > currentIndex ? 'next' : 'prev';
      animateSlideTransition(dir, () => {
        setCurrentIndex(index);
      });
    },
    [currentIndex, animateSlideTransition],
  );

  const nextSlide = useCallback(() => {
    const next = (currentIndex + 1) % testimonials.length;
    animateSlideTransition('next', () => {
      setCurrentIndex(next);
    });
  }, [currentIndex, animateSlideTransition]);

  const prevSlide = useCallback(() => {
    const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
    animateSlideTransition('prev', () => {
      setCurrentIndex(prev);
    });
  }, [currentIndex, animateSlideTransition]);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation (left / right arrow keys)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Only respond when the section (or one of its children) is focused or
      // the user is not inside an input / textarea.
      const active = document.activeElement;
      const isInput =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        active instanceof HTMLSelectElement;
      if (isInput) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  // GSAP scroll-triggered entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.testimonial-section', {
        y: 50,
        opacity: 0,
        duration: 0.8,
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

  const current = testimonials[currentIndex];
  const { highlighted, rest } = useMemo(() => splitQuote(current.quote), [current.quote]);

  return (
    <SectionContainer
      id="testimonials"
      background="transparent"
      padding="lg"
      className="relative overflow-hidden"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 -z-20" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />
      {/* Decorative blurs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl -z-10" />

      <div className="text-center mb-16">
        <ScrollReveal direction="up">
          <span className="inline-block px-4 py-2 mb-4 text-badge text-accent-300 bg-accent-500/10 rounded-full border border-accent-500/20">
            {t.testimonials.badge}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h2"
          animation="slide-up"
          delay={0.1}
          className="text-fluid-4xl text-white mb-4 text-section-heading"
        >
          {t.testimonials.title}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto text-body">
            {t.testimonials.description}
          </p>
        </ScrollReveal>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="testimonial-section max-w-4xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
      >
        <div className="relative">
          {/* Main testimonial card */}
          <div
            ref={slideRef}
            className="relative rounded-2xl p-8 md:p-12 glass-card will-change-transform"
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial ${currentIndex + 1} of ${testimonials.length}`}
          >
            {/* Large quote mark */}
            <div className="absolute top-6 right-8 text-accent-500/20">
              <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
              </svg>
            </div>

            {/* Stars */}
            <div className="mb-6">
              <StarRating rating={current.rating} animated />
            </div>

            {/* Quote with highlighted first sentence */}
            <blockquote
              ref={quoteRef}
              className="text-xl md:text-2xl text-white/90 mb-8 relative z-10 text-quote leading-relaxed"
            >
              &ldquo;
              <span className="text-accent-300 font-bold not-italic">
                {highlighted}
              </span>
              {rest && (
                <> {rest}</>
              )}
              &rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              {/* Avatar with gradient ring */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-accent-400 via-purple-500 to-accent-600 animate-[spin_6s_linear_infinite] opacity-80" />
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary-900 bg-primary-900">
                  <Image
                    src={current.avatar}
                    alt={current.author}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <div className="text-white text-lg text-card-heading flex items-center flex-wrap">
                  {current.author}
                  <VerifiedBadge />
                </div>
                <div className="text-gray-400">
                  {current.title}
                </div>
                <div className="text-accent-400 text-sm font-medium flex items-center mt-0.5">
                  <CompanyLogoPlaceholder />
                  {current.company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent-500 transition-all duration-300 border border-white/10 hover:border-accent-400 hover:scale-110 group"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent-500 transition-all duration-300 border border-white/10 hover:border-accent-400 hover:scale-110 group"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        {/* Mini preview cards */}
        <div className="hidden md:flex justify-center gap-4 mt-8">
          {testimonials.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => goToSlide(idx)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${idx === currentIndex
                ? 'bg-white/10 border border-white/20 shadow-lg scale-105'
                : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/10'
                }`}
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image src={item.avatar} alt={item.author} fill className="object-cover" />
              </div>
              <span className={`text-sm font-medium ${idx === currentIndex ? 'text-white' : 'text-gray-400'
                }`}>
                {item.author.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
