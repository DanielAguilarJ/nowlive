'use client';

import { useEffect, useRef } from 'react';

interface TypewriterMultilineProps {
  lines: string[];
  className?: string;
  typingSpeed?: number;
  lineDelay?: number;
}

export function TypewriterMultiline({
  lines,
  className = '',
  typingSpeed = 50,
  lineDelay = 1000,
}: TypewriterMultilineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let currentLine = 0;
    let currentChar = 0;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (currentLine >= lines.length) return;

      const lineElement = container.children[currentLine] as HTMLElement;
      if (!lineElement) return;

      if (currentChar < lines[currentLine].length) {
        lineElement.textContent += lines[currentLine][currentChar];
        currentChar++;
        timeoutId = setTimeout(type, typingSpeed);
      } else {
        currentLine++;
        currentChar = 0;
        if (currentLine < lines.length) {
          timeoutId = setTimeout(type, lineDelay);
        }
      }
    };

    type();

    return () => clearTimeout(timeoutId);
  }, [lines, typingSpeed, lineDelay]);

  return (
    <div ref={containerRef} className={className}>
      {lines.map((_, index) => (
        <div key={index} className="font-mono min-h-[1.5em]">
          <span className="animate-pulse">▎</span>
        </div>
      ))}
    </div>
  );
}
