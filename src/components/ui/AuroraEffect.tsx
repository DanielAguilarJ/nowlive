'use client';

import { useEffect, useRef } from 'react';

export function AuroraEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isVisibleRef = { current: true };
    let rafId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => { isVisibleRef.current = entries[0]?.isIntersecting ?? true; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const colors: [string, string][] = [
      ['#3b82f6', '#8b5cf6'],
      ['#ec4899', '#f43f5e'],
      ['#10b981', '#06b6d4'],
    ];

    // Cap at 24fps — aurora motion is slow, 24fps is imperceptible
    const frameDelay = 1000 / 24;
    let lastTime = 0;
    let time = 0;

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw);
      if (!isVisibleRef.current) return;
      if (now - lastTime < frameDelay) return;
      lastTime = now;

      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = 'rgba(15,23,42,0.05)';
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let x = 0; x < w; x += 10) {
          const y =
            h / 2 +
            Math.sin(x * 0.005 + time + i) * 100 +
            Math.sin(x * 0.01 - time * 0.7 + i * 2) * 50 +
            Math.cos(x * 0.003 + time * 1.3 + i * 3) * 80;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, w, 0);
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
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      aria-hidden="true"
    />
  );
}
