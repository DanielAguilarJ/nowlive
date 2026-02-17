'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticCursorProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  speed?: number;
}

export function MagneticCursor({ 
  children, 
  className = '',
  strength = 0.4,
  speed = 0.15
}: MagneticCursorProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const bounds = useRef({ left: 0, top: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!elementRef.current || !cursorRef.current) return;

    const element = elementRef.current;
    const cursor = cursorRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      bounds.current = element.getBoundingClientRect();
      const relX = e.clientX - bounds.current.left;
      const relY = e.clientY - bounds.current.top;
      
      gsap.to(element, {
        x: (relX - bounds.current.width / 2) * strength,
        y: (relY - bounds.current.height / 2) * strength,
        ease: 'power3.out',
        duration: speed,
      });

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        ease: 'elastic.out(1, 0.3)',
        duration: 0.5,
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, speed]);

  return (
    <>
      <div ref={elementRef} className={`relative ${className}`}>
        {children}
      </div>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
