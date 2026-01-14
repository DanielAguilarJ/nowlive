'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface PerspectiveCardProps {
  children: ReactNode;
  className?: string;
}

export function PerspectiveCard({ children, className = '' }: PerspectiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out',
      });

      if (glowRef.current) {
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;

        gsap.to(glowRef.current, {
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(59,130,246,0.4) 0%, transparent 60%)`,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          background: 'transparent',
          duration: 0.5,
        });
      }
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
      className={`relative ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{ transformStyle: 'preserve-3d' }}
      />
    </div>
  );
}
