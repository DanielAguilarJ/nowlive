'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animation?: 'fadeUp' | 'fadeIn' | 'slideIn' | 'rotate' | 'scale';
}

export function SplitText({ 
  text, 
  className = '', 
  delay = 0,
  stagger = 0.03,
  animation = 'fadeUp'
}: SplitTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');

    const animations = {
      fadeUp: {
        y: 20,
        opacity: 0,
        rotation: 0,
        scale: 1,
      },
      fadeIn: {
        opacity: 0,
        y: 0,
        rotation: 0,
        scale: 1,
      },
      slideIn: {
        x: -50,
        opacity: 0,
        rotation: 0,
        scale: 1,
      },
      rotate: {
        opacity: 0,
        rotation: 90,
        y: 10,
        scale: 1,
      },
      scale: {
        opacity: 0,
        scale: 0,
        y: 0,
        rotation: 0,
      },
    };

    gsap.fromTo(
      chars,
      animations[animation],
      {
        y: 0,
        x: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 0.8,
        delay: delay,
        stagger: stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [text, delay, stagger, animation]);

  const splitText = text.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
    >
      {char}
    </span>
  ));

  return (
    <div ref={textRef} className={className}>
      {splitText}
    </div>
  );
}

export function SplitTextByWord({ 
  text, 
  className = '', 
  delay = 0,
  stagger = 0.05,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.querySelectorAll('.word');

    gsap.fromTo(
      words,
      {
        y: 50,
        opacity: 0,
        rotationX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        delay: delay,
        stagger: stagger,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [text, delay, stagger]);

  const words = text.split(' ').map((word, i) => (
    <span key={i} className="word inline-block mr-2" style={{ perspective: '1000px' }}>
      {word}
    </span>
  ));

  return (
    <div ref={textRef} className={className}>
      {words}
    </div>
  );
}
