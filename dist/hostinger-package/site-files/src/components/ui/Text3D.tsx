'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface Text3DProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  color?: string;
}

export function Text3D({ 
  children, 
  className = '', 
  depth = 8,
  color = '#3b82f6' 
}: Text3DProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return;

      const rect = textRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      gsap.to(textRef.current, {
        textShadow: `
          ${x * depth}px ${y * depth}px 0 ${color}88,
          ${x * depth * 2}px ${y * depth * 2}px 0 ${color}66,
          ${x * depth * 3}px ${y * depth * 3}px 0 ${color}44,
          ${x * depth * 4}px ${y * depth * 4}px 10px rgba(0,0,0,0.3)
        `,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      if (!textRef.current) return;

      gsap.to(textRef.current, {
        textShadow: `
          1px 1px 0 ${color}88,
          2px 2px 0 ${color}66,
          3px 3px 0 ${color}44,
          4px 4px 10px rgba(0,0,0,0.3)
        `,
        duration: 0.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    textRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [depth, color]);

  return (
    <div
      ref={textRef}
      className={`font-bold ${className}`}
      style={{
        textShadow: `
          1px 1px 0 ${color}88,
          2px 2px 0 ${color}66,
          3px 3px 0 ${color}44,
          4px 4px 10px rgba(0,0,0,0.3)
        `,
      }}
    >
      {children}
    </div>
  );
}
