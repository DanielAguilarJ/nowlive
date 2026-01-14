'use client';

import { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  scrambleSpeed?: number;
}

export function TextScramble({ 
  text, 
  className = '', 
  speed = 50,
  scrambleSpeed = 20 
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('');
  const frameRequest = useRef<number>();
  const frame = useRef(0);

  useEffect(() => {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let resolve: () => void;
    const queue: Array<{ from: string; to: string; start: number; end: number }> = [];
    
    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        
        if (frame.current >= end) {
          complete++;
          output += to;
        } else if (frame.current >= start) {
          if (!to || Math.random() < 0.28) {
            output += chars[Math.floor(Math.random() * chars.length)];
          } else {
            output += to;
          }
        } else {
          output += from;
        }
      }

      setDisplayText(output);

      if (complete === queue.length) {
        resolve();
      } else {
        frameRequest.current = requestAnimationFrame(update);
        frame.current++;
      }
    };

    const setText = (newText: string) => {
      const oldText = displayText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise<void>((res) => (resolve = res));

      queue.length = 0;

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * scrambleSpeed);
        const end = start + Math.floor(Math.random() * scrambleSpeed);
        queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(frameRequest.current!);
      frame.current = 0;
      update();

      return promise;
    };

    setText(text);

    return () => {
      cancelAnimationFrame(frameRequest.current!);
    };
  }, [text, scrambleSpeed]);

  return <span className={className}>{displayText}</span>;
}
