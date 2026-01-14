'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface ScrollAnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export function ScrollAnimatedSection({ 
  children, 
  className = '' 
}: ScrollAnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on scroll position
      const start = rect.top + rect.height;
      const end = rect.bottom;
      const progress = 1 - Math.max(0, Math.min(1, start / windowHeight));

      // Apply various effects based on progress
      section.style.opacity = `${progress}`;
      section.style.transform = `scale(${0.95 + progress * 0.05})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={sectionRef} className={`transition-opacity ${className}`}>
      {children}
    </div>
  );
}

export function PinSection({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let scrollY = 0;
    let currentY = 0;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      scrollY = window.scrollY;
      const rect = sectionRef.current.getBoundingClientRect();
      
      if (rect.top <= 0 && rect.bottom > window.innerHeight) {
        currentY += (scrollY - currentY) * 0.1;
        sectionRef.current.style.transform = `translateY(${-currentY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
