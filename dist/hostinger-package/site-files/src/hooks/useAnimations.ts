'use client';

import { useEffect, useRef, useState, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for creating parallax effects on scroll
 * @param speed - Parallax speed multiplier (negative = opposite direction)
 * @param offset - Starting offset in pixels
 */
export function useParallax(speed: number = 0.5, offset: number = 0) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    // Set initial position
    gsap.set(element, { y: offset });

    // Create parallax animation
    const animation = gsap.to(element, {
      y: offset + 100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed, offset]);

  return elementRef;
}

/**
 * Hook for GSAP ScrollTrigger integration
 * @param config - ScrollTrigger configuration
 */
interface ScrollTriggerConfig {
  trigger?: RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export function useScrollTrigger(config: ScrollTriggerConfig = {}) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = config.trigger?.current || triggerRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: config.start || 'top 80%',
      end: config.end || 'bottom 20%',
      scrub: config.scrub,
      pin: config.pin,
      markers: config.markers,
      onEnter: () => {
        setIsActive(true);
        config.onEnter?.();
      },
      onLeave: () => {
        setIsActive(false);
        config.onLeave?.();
      },
      onEnterBack: () => {
        setIsActive(true);
        config.onEnterBack?.();
      },
      onLeaveBack: () => {
        setIsActive(false);
        config.onLeaveBack?.();
      },
    });

    return () => {
      trigger.kill();
    };
  }, [config]);

  return { triggerRef, isActive };
}

/**
 * Hook for Intersection Observer - detects when element is in viewport
 * @param options - IntersectionObserver options
 */
interface InViewportOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInViewport(options: InViewportOptions = {}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If triggerOnce and already animated, skip
    if (options.triggerOnce && hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          if (options.triggerOnce) {
            setHasAnimated(true);
            observer.disconnect();
          }
        } else if (!options.triggerOnce) {
          setIsInViewport(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, options.triggerOnce, hasAnimated]);

  return { elementRef, isInViewport };
}

/**
 * Hook for animated counter (number increment animation)
 * @param end - Target number
 * @param duration - Animation duration in ms
 * @param startOnView - Start animation when element is in viewport
 */
interface AnimatedCounterOptions {
  end: number;
  duration?: number;
  startOnView?: boolean;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function useAnimatedCounter({
  end,
  duration = 2000,
  startOnView = true,
  prefix = '',
  suffix = '',
  decimals = 0,
}: AnimatedCounterOptions) {
  const [count, setCount] = useState(0);
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);
  const { elementRef, isInViewport } = useInViewport({ triggerOnce: true });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (startOnView && !isInViewport) return;
    if (hasStarted.current) return;

    hasStarted.current = true;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setCount(end);
      setDisplayValue(`${prefix}${end.toFixed(decimals)}${suffix}`);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easedProgress * end);

      setCount(currentCount);
      setDisplayValue(
        `${prefix}${currentCount.toFixed(decimals)}${suffix}`
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setDisplayValue(`${prefix}${end.toFixed(decimals)}${suffix}`);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, startOnView, isInViewport, prefix, suffix, decimals]);

  return { elementRef, count, displayValue };
}

/**
 * Hook for stagger animation on children elements
 * @param staggerDelay - Delay between each child animation
 */
export function useStaggerAnimation(staggerDelay: number = 0.1) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isInViewport } = useInViewport({ triggerOnce: true });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isInViewport) return;

    const children = container.children;
    if (children.length === 0) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(children, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: staggerDelay,
        ease: 'power3.out',
      }
    );
  }, [isInViewport, staggerDelay]);

  return containerRef;
}
