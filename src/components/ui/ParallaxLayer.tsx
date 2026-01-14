'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal';
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className = '',
  direction = 'vertical',
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layerRef.current) return;

    const handleScroll = () => {
      if (!layerRef.current) return;

      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;

      if (direction === 'vertical') {
        layerRef.current.style.transform = `translateY(${rate}px)`;
      } else {
        layerRef.current.style.transform = `translateX(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);

  return (
    <div ref={layerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

export function ParallaxSection({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} style={{ perspective: '1px', overflowX: 'hidden' }}>
      {children}
    </div>
  );
}
