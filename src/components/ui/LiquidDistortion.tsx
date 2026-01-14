'use client';

import { useEffect, useRef } from 'react';

export function LiquidDistortion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const mouse = { x: 0, y: 0, radius: 150 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const drawLiquid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < canvas.width; x += 10) {
        for (let y = 0; y < canvas.height; y += 10) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            
            const offsetX = Math.cos(angle) * force * 30;
            const offsetY = Math.sin(angle) * force * 30;

            const wave = Math.sin(time + distance * 0.02) * 5;

            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY + wave, 2 * force, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${200 + force * 60}, 100%, 60%, ${force * 0.5})`;
            ctx.fill();
          }
        }
      }

      time += 0.05;
      requestAnimationFrame(drawLiquid);
    };

    drawLiquid();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9996]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
