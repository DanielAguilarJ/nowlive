'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  speed?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  width,
  height,
  fill = false,
  speed = 0.3,
  className,
  containerClassName,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    if (!container || !image) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    // Calculate parallax offset based on container height
    const offset = container.offsetHeight * speed;

    // Set initial position
    gsap.set(image, { y: -offset / 2 });

    // Create parallax effect
    const animation = gsap.to(image, {
      y: offset / 2,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      animation.kill();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'overflow-hidden relative',
        containerClassName
      )}
    >
      <div
        ref={imageRef}
        className={clsx(
          'will-change-transform',
          fill ? 'absolute inset-0' : 'relative',
          className
        )}
        style={{
          // Scale up to hide edges during parallax
          transform: 'scale(1.2)',
        }}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 800}
            height={height || 600}
            className="object-cover w-full h-auto"
            priority={priority}
          />
        )}
      </div>
    </div>
  );
}
