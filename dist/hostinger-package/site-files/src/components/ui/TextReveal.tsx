'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.reveal-word');

    gsap.set(words, { 
      opacity: 0,
      y: 20,
      rotateX: -90,
    });

    gsap.to(words, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.03,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, [text, delay]);

  const words = text.split(' ');

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ perspective: '1000px' }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-2">
          <span className="reveal-word inline-block" style={{ transformOrigin: '50% 100%' }}>
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}
