'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // start hidden, reveal after mount
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Only render on pointer-capable devices
    const noPointer = window.matchMedia('(pointer: coarse)').matches;
    if (noPointer || window.innerWidth < 768) return;
    setIsMobile(false);

    const follower = followerRef.current;
    if (!follower) return;

    const animate = () => {
      if (follower) {
        follower.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const moveCursor = (e: MouseEvent) => {
      const dx = e.clientX - positionRef.current.x;
      const dy = e.clientY - positionRef.current.y;
      positionRef.current.x += dx * 0.15;
      positionRef.current.y += dy * 0.15;
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || !(target instanceof HTMLElement)) return;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      ref={followerRef}
      className={`fixed top-0 left-0 w-8 h-8 border-2 rounded-full pointer-events-none z-[9998] transition-all duration-200 ${
        isHovering ? 'border-accent-400 scale-150' : 'border-accent-500/50 scale-100'
      }`}
      style={{ transform: 'translate3d(0,0,0) translate(-50%,-50%)', willChange: 'transform' }}
    />
  );
}
