'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export function SmoothScrollReveal({ children, className = '' }: SmoothScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0,
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function ZoomScrollReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      {
        scale: 0.5,
        opacity: 0,
        filter: 'blur(20px)',
      },
      {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
