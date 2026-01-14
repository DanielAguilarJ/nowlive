'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface InfiniteScrollProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
  pauseOnHover?: boolean;
}

export function InfiniteScroll({
  children,
  speed = 30,
  direction = 'left',
  className = '',
  pauseOnHover = true,
}: InfiniteScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    // Clone the content for seamless loop
    const clone = content.cloneNode(true) as HTMLDivElement;
    container.appendChild(clone);

    const isHorizontal = direction === 'left' || direction === 'right';
    const size = isHorizontal ? content.offsetWidth : content.offsetHeight;
    
    const animationProps: gsap.TweenVars = {
      duration: size / speed,
      ease: 'none',
      repeat: -1,
    };

    if (direction === 'left') {
      animationProps.x = -size;
    } else if (direction === 'right') {
      animationProps.x = size;
    } else if (direction === 'up') {
      animationProps.y = -size;
    } else {
      animationProps.y = size;
    }

    animationRef.current = gsap.to([content, clone], animationProps);

    return () => {
      animationRef.current?.kill();
      if (clone.parentNode) {
        clone.parentNode.removeChild(clone);
      }
    };
  }, [speed, direction]);

  const handleMouseEnter = () => {
    if (pauseOnHover && animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && animationRef.current) {
      animationRef.current.resume();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={contentRef} className="inline-block">
        {children}
      </div>
    </div>
  );
}
