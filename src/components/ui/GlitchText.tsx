'use client';

import { useEffect, useRef } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function GlitchText({ text, className = '', speed = 3000 }: GlitchTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    let interval: NodeJS.Timeout;

    const glitch = () => {
      element.classList.add('glitching');
      setTimeout(() => {
        element.classList.remove('glitching');
      }, 300);
    };

    interval = setInterval(glitch, speed);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="relative inline-block">
      <div
        ref={textRef}
        className={`${className} relative inline-block glitch-text`}
        data-text={text}
      >
        {text}
      </div>
    </div>
  );
}
