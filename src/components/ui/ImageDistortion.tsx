'use client';

import { useEffect, useRef } from 'react';

interface ImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageDistortion({ src, alt, className = '' }: ImageDistortionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = src;
    img.crossOrigin = 'anonymous';
    imgRef.current = img;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      const mouse = { x: 0, y: 0 };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * canvas.width;
        mouse.y = ((e.clientY - rect.top) / rect.height) * canvas.height;
      };

      canvas.addEventListener('mousemove', handleMouseMove);

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const sliceHeight = 2;
        for (let y = 0; y < canvas.height; y += sliceHeight) {
          const distanceFromMouse = Math.abs(mouse.y - y);
          const maxDistance = 100;
          const distortion = Math.max(0, 1 - distanceFromMouse / maxDistance);
          
          const offset = Math.sin(y * 0.1 + Date.now() * 0.002) * distortion * 20;

          ctx.drawImage(
            img,
            0, y, canvas.width, sliceHeight,
            offset, y, canvas.width, sliceHeight
          );
        }

        requestAnimationFrame(animate);
      };

      animate();
    };

    return () => {
      if (imgRef.current) {
        canvas.removeEventListener('mousemove', () => {});
      }
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ maxWidth: '100%', height: 'auto' }}
      aria-label={alt}
    />
  );
}
