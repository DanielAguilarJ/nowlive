'use client';

import { useEffect, useRef } from 'react';

export function DNA() {
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const amplitude = 100;
      const frequency = 0.02;
      const segments = 50;

      for (let i = 0; i < segments; i++) {
        const y = (canvas.height / segments) * i;
        const offset = Math.sin(y * frequency + time) * amplitude;

        // Left strand
        const x1 = centerX - offset;
        // Right strand
        const x2 = centerX + offset;

        // Draw circles
        const gradient1 = ctx.createRadialGradient(x1, y, 0, x1, y, 8);
        gradient1.addColorStop(0, '#3b82f6');
        gradient1.addColorStop(1, '#3b82f6' + '66');
        
        ctx.beginPath();
        ctx.arc(x1, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient1;
        ctx.fill();

        const gradient2 = ctx.createRadialGradient(x2, y, 0, x2, y, 8);
        gradient2.addColorStop(0, '#ec4899');
        gradient2.addColorStop(1, '#ec4899' + '66');

        ctx.beginPath();
        ctx.arc(x2, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient2;
        ctx.fill();

        // Draw connecting line
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 + Math.abs(offset) / amplitude * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw strands
        if (i > 0) {
          const prevY = (canvas.height / segments) * (i - 1);
          const prevOffset = Math.sin(prevY * frequency + time) * amplitude;
          const prevX1 = centerX - prevOffset;
          const prevX2 = centerX + prevOffset;

          ctx.beginPath();
          ctx.moveTo(prevX1, prevY);
          ctx.lineTo(x1, y);
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(prevX2, prevY);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = 'rgba(236, 72, 153, 0.5)';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      time += 0.02;
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
