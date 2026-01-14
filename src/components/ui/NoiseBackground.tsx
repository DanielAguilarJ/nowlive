'use client';

import { useEffect, useRef } from 'react';

export function NoiseBackground() {
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

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        if (Math.random() < 0.5) {
          buffer[i] = 0xff000000 | (Math.random() * 0x20 << 16) | (Math.random() * 0x20 << 8) | Math.random() * 0x20;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      generateNoise();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
    />
  );
}
