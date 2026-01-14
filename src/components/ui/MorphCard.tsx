'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface MorphCardProps {
  children: ReactNode;
  className?: string;
}

export function MorphCard({ children, className = '' }: MorphCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      gsap.to(card, {
        borderRadius: `
          ${50 + percentX * 10}% ${50 - percentX * 10}% 
          ${50 - percentY * 10}% ${50 + percentY * 10}% / 
          ${50 + percentY * 10}% ${50 + percentX * 10}% 
          ${50 - percentX * 10}% ${50 - percentY * 10}%
        `,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        borderRadius: '12px',
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-300 ${className}`}
      style={{ borderRadius: '12px' }}
    >
      {children}
    </div>
  );
}
