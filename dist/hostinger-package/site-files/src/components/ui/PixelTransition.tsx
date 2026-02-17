'use client';

import { useEffect, useRef } from 'react';

interface PixelTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function PixelTransition({ isActive, onComplete }: PixelTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pixelSize = 20;
    const cols = Math.ceil(canvas.width / pixelSize);
    const rows = Math.ceil(canvas.height / pixelSize);
    let progress = 0;

    const animate = () => {
      ctx.fillStyle = '#1e293b';
      
      progress += 0.02;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const delay = (i + j) * 0.01;
          const pixelProgress = Math.max(0, Math.min(1, progress - delay));
          
          if (pixelProgress > 0) {
            ctx.globalAlpha = pixelProgress;
            ctx.fillRect(
              i * pixelSize,
              j * pixelSize,
              pixelSize - 1,
              pixelSize - 1
            );
          }
        }
      }

      if (progress < 2) {
        requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    animate();
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[10000] pointer-events-none"
    />
  );
}
