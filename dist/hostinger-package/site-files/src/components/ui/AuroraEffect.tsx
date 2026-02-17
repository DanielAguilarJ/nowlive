'use client';

import { useEffect, useRef } from 'react';

export function AuroraEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    let time = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x += 10) {
          const y = 
            canvas.height / 2 +
            Math.sin(x * 0.005 + time + i) * 100 +
            Math.sin(x * 0.01 - time * 0.7 + i * 2) * 50 +
            Math.cos(x * 0.003 + time * 1.3 + i * 3) * 80;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const colors = [
          ['#3b82f6', '#8b5cf6'],
          ['#ec4899', '#f43f5e'],
          ['#10b981', '#06b6d4'],
        ];

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, colors[i][0] + '33');
        gradient.addColorStop(0.5, colors[i][1] + '66');
        gradient.addColorStop(1, colors[i][0] + '33');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 80;
        ctx.lineCap = 'round';
        ctx.filter = 'blur(30px)';
        ctx.stroke();
        ctx.filter = 'none';
      }

      time += 0.01;
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  );
}
