'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionContainer, ScrollReveal, AnimatedText } from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const avatars = [
  '/images/team/member_1.png',
  '/images/team/member_2.png',
  '/images/team/member_3.png',
  '/images/team/member_4.png',
  '/images/team/member_5.png',
  '/images/team/member_6.png',
];

// Role gradient colors
const roleGradients = [
  'from-blue-500 to-purple-600',
  'from-pink-500 to-rose-600',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-indigo-600',
  'from-orange-500 to-amber-600',
  'from-cyan-500 to-blue-600',
];

export function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.team-card', {
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.1,
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

  return (
    <SectionContainer
      id="team"
      background="white"
      padding="lg"
    >
      <div className="text-center mb-16">
        <ScrollReveal direction="up">
          <span className="inline-block px-3 py-1 text-badge text-accent-600 bg-gradient-to-r from-accent-100 to-purple-100 rounded-full">
            {t.team.badge}
          </span>
        </ScrollReveal>

        <AnimatedText
          as="h2"
          animation="slide-up"
          delay={0.1}
          className="text-fluid-4xl text-primary-700 mb-4 text-section-heading"
        >
          {t.team.title}
        </AnimatedText>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-body">
            {t.team.description}
          </p>
        </ScrollReveal>
      </div>

      {/* Team grid */}
      <div ref={containerRef} className="grid-team">
        {t.team.members.map((member, idx) => (
          <div key={member.name} className="team-card group tilt-card-wrapper">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 group-hover:shadow-2xl tilt-card-inner">
              {/* Image container */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={avatars[idx]}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Social icons - revealed on hover */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 social-icons-reveal">
                  <a href="#" className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent-500 hover:scale-110 transition-all duration-300 border border-white/20">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent-500 hover:scale-110 transition-all duration-300 border border-white/20">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Info section */}
              <div className="p-6 text-center relative">
                {/* Role badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className={`inline-block px-4 py-1.5 text-xs font-bold text-white rounded-full bg-gradient-to-r ${roleGradients[idx]} shadow-lg whitespace-nowrap max-w-[90%] truncate`}>
                    {member.role}
                  </span>
                </div>

                <h3 className="text-lg text-primary-700 group-hover:text-accent-600 transition-colors text-card-heading">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>

                {/* Decorative bottom line */}
                <div className="mt-4 mx-auto w-12 h-1 rounded-full bg-gradient-to-r from-accent-400 to-purple-500 opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
