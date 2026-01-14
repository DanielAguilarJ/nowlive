'use client';

import { useEffect, useRef } from 'react';

interface WaveTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function WaveText({ text, className = '', delay = 0 }: WaveTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.wave-char');
    
    chars.forEach((char, index) => {
      const element = char as HTMLElement;
      element.style.animationDelay = `${delay + index * 0.05}s`;
    });
  }, [text, delay]);

  return (
    <div ref={containerRef} className={`inline-flex ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="wave-char inline-block animate-wave"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
