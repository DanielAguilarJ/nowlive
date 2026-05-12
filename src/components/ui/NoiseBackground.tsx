'use client';

import { useEffect, useRef } from 'react';

export function NoiseBackground() {
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

    // Cap noise at 10fps — imperceptible difference, huge CPU savings
    const frameDelay = 1000 / 10;
    let lastTime = 0;

    const animate = (now: number) => {
      rafId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;
      if (now - lastTime < frameDelay) return;
      lastTime = now;

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buf = new Uint32Array(imageData.data.buffer);
      for (let i = 0; i < buf.length; i++) {
        if (Math.random() < 0.5) {
          const v = Math.random() * 0x20 | 0;
          buf[i] = 0xff000000 | (v << 16) | (v << 8) | v;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };

    rafId = requestAnimationFrame(animate);

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
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
      aria-hidden="true"
    />
  );
}
