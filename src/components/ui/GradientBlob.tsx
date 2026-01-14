'use client';

import { useEffect, useRef } from 'react';

interface GradientBlobProps {
  className?: string;
  colors?: string[];
}

export function GradientBlob({ 
  className = '', 
  colors = ['#3b82f6', '#8b5cf6', '#ec4899'] 
}: GradientBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blobRef.current) return;

    let mouseX = 0;
    let mouseY = 0;
    let blobX = 0;
    let blobY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!blobRef.current) return;

      blobX += (mouseX - blobX) * 0.05;
      blobY += (mouseY - blobY) * 0.05;

      blobRef.current.style.transform = `translate(${blobX}px, ${blobY}px)`;

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className={`fixed pointer-events-none z-0 ${className}`}
      style={{
        width: '600px',
        height: '600px',
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
        background: `radial-gradient(circle, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
        filter: 'blur(80px)',
        opacity: 0.3,
        left: '-300px',
        top: '-300px',
        animation: 'morph 10s ease-in-out infinite',
      }}
    />
  );
}
