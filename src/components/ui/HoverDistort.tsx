'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface HoverDistortProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function HoverDistort({ 
  children, 
  className = '', 
  intensity = 20 
}: HoverDistortProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current || !contentRef.current) return;

    const element = elementRef.current;
    const content = contentRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      gsap.to(content, {
        x: deltaX * intensity,
        y: deltaY * intensity,
        skewX: deltaX * 5,
        skewY: deltaY * 5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(content, {
        x: 0,
        y: 0,
        skewX: 0,
        skewY: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div ref={elementRef} className={`relative overflow-hidden ${className}`}>
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
