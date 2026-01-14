'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerReveal({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.children;

    gsap.fromTo(
      items,
      {
        y: 60,
        opacity: 0,
        scale: 0.9,
        rotationX: -20,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: staggerDelay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [staggerDelay]);

  return (
    <div ref={containerRef} className={className} style={{ perspective: '1000px' }}>
      {children}
    </div>
  );
}
