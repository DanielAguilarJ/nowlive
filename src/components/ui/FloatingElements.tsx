'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export function FloatingElements({ count = 20, className = '' }: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.float-element');

    elements.forEach((element) => {
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 2;
      const y = -20 + Math.random() * 40;
      const x = -20 + Math.random() * 40;
      const rotation = -15 + Math.random() * 30;
      const scale = 0.8 + Math.random() * 0.4;

      gsap.to(element, {
        y,
        x,
        rotation,
        scale,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, [count]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const size = 4 + Math.random() * 8;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const opacity = 0.1 + Math.random() * 0.3;
        const shapes = ['circle', 'square', 'triangle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        return (
          <div
            key={i}
            className={`float-element absolute pointer-events-none ${
              shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-sm' : ''
            }`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              opacity,
              background: `linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)`,
              clipPath: shape === 'triangle' 
                ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
                : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
