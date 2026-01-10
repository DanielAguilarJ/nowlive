'use client';

import { ReactNode, CSSProperties } from 'react';
import { clsx } from 'clsx';
import { useInViewport } from '@/hooks/useAnimations';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  className,
  style,
  threshold = 0.1,
}: ScrollRevealProps) {
  const { elementRef, isInViewport } = useInViewport({
    triggerOnce: true,
    threshold,
  });

  const getTransform = (visible: boolean): string => {
    if (visible) return 'translate3d(0, 0, 0)';

    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'none':
        return 'translate3d(0, 0, 0)';
      default:
        return `translate3d(0, ${distance}px, 0)`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={clsx('will-change-transform', className)}
      style={{
        ...style,
        opacity: isInViewport ? 1 : 0,
        transform: getTransform(isInViewport),
        transition: `opacity ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay}s, transform ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
