'use client';

import { ReactNode, CSSProperties, RefObject, Fragment } from 'react';
import { clsx } from 'clsx';
import { useInViewport } from '@/hooks/useAnimations';

type AnimationType =
  | 'fade-in'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'word-by-word'
  | 'char-by-char';

interface AnimatedTextProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

export function AnimatedText({
  children,
  as: Component = 'div',
  animation = 'fade-in',
  delay = 0,
  duration = 0.5,
  className,
  style,
}: AnimatedTextProps) {
  const { elementRef, isInViewport } = useInViewport({ triggerOnce: true });

  // Animation styles based on type
  const getInitialStyles = (): CSSProperties => {
    const base: CSSProperties = {
      opacity: 0,
      transition: `all ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay}s`,
    };

    switch (animation) {
      case 'slide-up':
        return { ...base, transform: 'translateY(30px)' };
      case 'slide-down':
        return { ...base, transform: 'translateY(-30px)' };
      case 'slide-left':
        return { ...base, transform: 'translateX(30px)' };
      case 'slide-right':
        return { ...base, transform: 'translateX(-30px)' };
      case 'scale':
        return { ...base, transform: 'scale(0.9)' };
      default:
        return base;
    }
  };

  const getAnimatedStyles = (): CSSProperties => {
    return {
      opacity: 1,
      transform: 'translateY(0) translateX(0) scale(1)',
      transition: `all ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay}s`,
    };
  };

  // For word-by-word or char-by-char animations
  if (animation === 'word-by-word' || animation === 'char-by-char') {
    const text = typeof children === 'string' ? children : '';
    const items = animation === 'word-by-word' ? text.split(' ') : Array.from(text);

    return (
      <Component
        ref={elementRef as RefObject<HTMLDivElement>}
        className={clsx('inline-block', className)}
        style={style}
      >
        {items.map((item, index) => {
          // Spaces can collapse when wrapped in inline-block spans.
          // Rendering them as plain text nodes keeps layout/wrapping correct.
          if (animation === 'char-by-char' && item === ' ') {
            return <Fragment key={index}>{' '}</Fragment>;
          }

          const shouldRenderWordSeparator =
            animation === 'word-by-word' && index < items.length - 1;

          return (
            <Fragment key={index}>
              <span
                className="inline-block"
                style={{
                  opacity: isInViewport ? 1 : 0,
                  transform: isInViewport ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay + index * 0.05}s`,
                }}
              >
                {item}
              </span>
              {shouldRenderWordSeparator ? ' ' : null}
            </Fragment>
          );
        })}
      </Component>
    );
  }

  return (
    <Component
      ref={elementRef as RefObject<HTMLDivElement>}
      className={clsx(className)}
      style={{
        ...style,
        ...(isInViewport ? getAnimatedStyles() : getInitialStyles()),
      }}
    >
      {children}
    </Component>
  );
}
