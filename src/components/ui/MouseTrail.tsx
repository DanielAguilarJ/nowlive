'use client';

import { useEffect, useRef, useState } from 'react';

interface MouseTrailProps {
  color?: string;
  trailLength?: number;
}

export function MouseTrail({ color = '#3b82f6', trailLength = 20 }: MouseTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; life: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      setTrail(prev => [
        ...prev.slice(-trailLength),
        { x: e.clientX, y: e.clientY, life: 1 }
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setTrail(prev => {
        const newTrail = prev
          .map(point => ({
            ...point,
            life: point.life - 0.05
          }))
          .filter(point => point.life > 0);

        newTrail.forEach((point, i) => {
          const nextPoint = newTrail[i + 1];
          if (!nextPoint) return;

          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          
          ctx.strokeStyle = color + Math.floor(point.life * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = point.life * 3;
          ctx.lineCap = 'round';
          ctx.stroke();
        });

        return newTrail;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [color, trailLength]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9997]"
    />
  );
}
