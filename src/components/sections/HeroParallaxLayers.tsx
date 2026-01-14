'use client';

import { useRef, useEffect } from 'react';

// Dynamically import GSAP only when this component loads
let gsap: any;
let ScrollTrigger: any;

const loadGSAP = async () => {
  if (!gsap) {
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');
    gsap = gsapModule.default;
    ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  }
  return { gsap, ScrollTrigger };
};

interface HeroParallaxLayersProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

export function HeroParallaxLayers({ heroRef }: HeroParallaxLayersProps) {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    const initAnimations = async () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) return;

      // Load GSAP dynamically
      const { gsap: gsapLib } = await loadGSAP();

      // Create animations
      ctx = gsapLib.context(() => {
        // Layer 1 - Slowest parallax
        if (layer1Ref.current) {
          gsapLib.to(layer1Ref.current, {
            y: 100,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }

        // Layer 2 - Medium parallax
        if (layer2Ref.current) {
          gsapLib.to(layer2Ref.current, {
            y: 150,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }

        // Layer 3 - Fastest parallax
        if (layer3Ref.current) {
          gsapLib.to(layer3Ref.current, {
            y: 200,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      }, heroRef);
    };

    initAnimations();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [heroRef]);

  return (
    <div className="absolute inset-0">
      {/* Layer 1 - Gradient base */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 will-change-transform"
      />

      {/* Layer 2 - Grid pattern */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 bg-grid-pattern opacity-20 will-change-transform"
      />

      {/* Layer 3 - Decorative shapes */}
      <div
        ref={layer3Ref}
        className="absolute inset-0 will-change-transform"
      >
        {/* Animated circles - Pure CSS animations, no JS needed */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-float" />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: '-3s' }} 
        />
        <div 
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-success-500/10 rounded-full blur-2xl animate-float" 
          style={{ animationDelay: '-1.5s' }} 
        />
      </div>
    </div>
  );
}
