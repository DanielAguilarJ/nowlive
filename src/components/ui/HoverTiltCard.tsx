'use client';

import { useRef, ReactNode, CSSProperties } from 'react';
import gsap from 'gsap';

interface HoverTiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
}

export function HoverTiltCard({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  scale = 1.05,
  glare = true,
}: HoverTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * maxTilt;
    const rotateY = ((centerX - x) / centerX) * maxTilt;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: scale,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: perspective,
    });

    if (glare && glareRef.current) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      gsap.to(glareRef.current, {
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });

    if (glare && glareRef.current) {
      gsap.to(glareRef.current, {
        background: 'transparent',
        duration: 0.3,
      });
    }
  };

  const style: CSSProperties = {
    transformStyle: 'preserve-3d',
    perspective: `${perspective}px`,
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{ transformStyle: 'preserve-3d' }}
        />
      )}
    </div>
  );
}
