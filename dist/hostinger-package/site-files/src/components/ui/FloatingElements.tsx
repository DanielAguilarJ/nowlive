'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

type FloatingElement = {
  size: number;
  left: number;
  top: number;
  opacity: number;
  shape: 'circle' | 'square' | 'triangle';
};

export function FloatingElements({ count = 20, className = '' }: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<FloatingElement[]>([]);

  // Generate elements only on client
  useEffect(() => {
    const newElements: FloatingElement[] = Array.from({ length: count }).map(() => {
      const size = 4 + Math.random() * 8;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const opacity = 0.1 + Math.random() * 0.3;
      const shapes: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      return { size, left, top, opacity, shape };
    });

    setElements(newElements);
  }, [count]);

  useEffect(() => {
    if (!containerRef.current || elements.length === 0) return;

    const domElements = containerRef.current.querySelectorAll('.float-element');

    domElements.forEach((element) => {
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
  }, [elements]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {elements.map((element, i) => (
        <div
          key={i}
          className={`float-element absolute pointer-events-none ${
            element.shape === 'circle' ? 'rounded-full' : element.shape === 'square' ? 'rounded-sm' : ''
          }`}
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            left: `${element.left}%`,
            top: `${element.top}%`,
            opacity: element.opacity,
            background: `linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)`,
            clipPath: element.shape === 'triangle' 
              ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
              : undefined,
          }}
        />
      ))}
    </div>
  );
}
