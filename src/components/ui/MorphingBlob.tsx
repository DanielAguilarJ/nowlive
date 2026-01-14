'use client';

import { useEffect, useRef } from 'react';

interface MorphingBlobProps {
  className?: string;
  color?: string;
  size?: number;
}

export function MorphingBlob({ 
  className = '', 
  color = '#3b82f6',
  size = 400 
}: MorphingBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    let animationFrame: number;
    let time = 0;

    const drawBlob = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = size / 3;

      ctx.beginPath();

      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const noise1 = Math.sin(angle * 3 + time) * 20;
        const noise2 = Math.cos(angle * 2 - time * 0.7) * 15;
        const noise3 = Math.sin(angle * 4 + time * 1.3) * 10;
        
        const radius = baseRadius + noise1 + noise2 + noise3;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        if (angle === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();

      // Create gradient
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, baseRadius + 30
      );
      gradient.addColorStop(0, color + 'FF');
      gradient.addColorStop(0.5, color + 'CC');
      gradient.addColorStop(1, color + '00');

      ctx.fillStyle = gradient;
      ctx.fill();

      // Add blur effect
      ctx.filter = 'blur(20px)';
      ctx.fill();
      ctx.filter = 'none';

      time += 0.01;
      animationFrame = requestAnimationFrame(drawBlob);
    };

    drawBlob();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [color, size]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} animate-float`}
      style={{ filter: 'blur(40px)', opacity: 0.6 }}
    />
  );
}
