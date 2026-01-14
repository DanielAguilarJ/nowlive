'use client';

import { useEffect, useRef } from 'react';

export function FireflyEffect() {
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

    interface Firefly {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      brightness: number;
      targetBrightness: number;
      flickerSpeed: number;
    }

    const fireflies: Firefly[] = [];

    for (let i = 0; i < 50; i++) {
      fireflies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        brightness: Math.random(),
        targetBrightness: Math.random(),
        flickerSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireflies.forEach((firefly) => {
        firefly.x += firefly.vx;
        firefly.y += firefly.vy;

        if (firefly.x < 0 || firefly.x > canvas.width) firefly.vx *= -1;
        if (firefly.y < 0 || firefly.y > canvas.height) firefly.vy *= -1;

        // Flicker effect
        if (Math.abs(firefly.brightness - firefly.targetBrightness) < 0.05) {
          firefly.targetBrightness = Math.random();
        }
        firefly.brightness += (firefly.targetBrightness - firefly.brightness) * firefly.flickerSpeed;

        const gradient = ctx.createRadialGradient(
          firefly.x, firefly.y, 0,
          firefly.x, firefly.y, firefly.radius * 8
        );
        gradient.addColorStop(0, `rgba(255, 230, 100, ${firefly.brightness})`);
        gradient.addColorStop(0.5, `rgba(255, 200, 0, ${firefly.brightness * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 200, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.radius * 8, 0, Math.PI * 2);
        ctx.fill();
      });

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
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
