'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

/**
 * OPTIMIZED Particles Background
 * - Canvas rendering happens off main thread when possible
 * - Reduced particle count for better performance
 * - RequestAnimationFrame with throttling
 * - Intersection Observer to pause when not visible
 */
export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true, // Optimization for smoother animation
    });
    if (!ctx) return;

    // Set canvas size with device pixel ratio for crisp rendering
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasSize, 150);
    };
    window.addEventListener('resize', handleResize);

    // Intersection Observer to pause animation when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Particle settings - REDUCED for better performance
    const particleCount = Math.min(30, Math.floor(window.innerWidth / 40)); // Adaptive count
    const particles: Particle[] = [];
    const mouse = { x: 0, y: 0, isMoving: false };
    const connectionDistance = 120; // Reduced from 150

    // Create particles only once
    const rect = canvas.getBoundingClientRect();
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.3, // Slower for better performance
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5, // Smaller particles
        opacity: Math.random() * 0.4 + 0.2,
      });
    }
    particlesRef.current = particles;

    // Throttled mouse move handler
    let mouseMoveTimeout: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isMoving = true;

      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        mouse.isMoving = false;
      }, 100);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Optimized animation loop
    let lastTime = 0;
    const targetFPS = 30; // Cap at 30fps for better performance
    const frameDelay = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (!isVisible) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Throttle to target FPS
      const elapsed = currentTime - lastTime;
      if (elapsed < frameDelay) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime - (elapsed % frameDelay);

      if (!ctx || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges with boundary buffer
        const buffer = 10;
        if (particle.x < -buffer || particle.x > rect.width + buffer) {
          particle.vx *= -1;
          particle.x = Math.max(-buffer, Math.min(rect.width + buffer, particle.x));
        }
        if (particle.y < -buffer || particle.y > rect.height + buffer) {
          particle.vy *= -1;
          particle.y = Math.max(-buffer, Math.min(rect.height + buffer, particle.y));
        }

        // Mouse interaction (only when mouse is moving)
        if (mouse.isMoving) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            const force = (80 - distance) / 80;
            particle.vx -= (dx / distance) * force * 0.03;
            particle.vy -= (dy / distance) * force * 0.03;
          }
        }

        // Damping to prevent excessive speed
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();

        // Draw connections (only to nearby particles for performance)
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(resizeTimeout);
      clearTimeout(mouseMoveTimeout);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ 
        mixBlendMode: 'screen',
        // Reserve exact space to prevent CLS
        width: '100vw',
        height: '100vh',
      }}
      aria-hidden="true"
    />
  );
}
