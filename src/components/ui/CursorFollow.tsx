'use client';

import { useEffect, useRef } from 'react';

interface CursorFollowProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function CursorFollow({ 
  children, 
  className = '', 
  intensity = 20 
}: CursorFollowProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = (x / rect.width) * intensity;
      const moveY = (y / rect.height) * intensity;

      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={elementRef}
      className={`transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
