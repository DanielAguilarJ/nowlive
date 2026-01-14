'use client';

import { ReactNode } from 'react';

interface ScrollSnapSectionProps {
  children: ReactNode;
  className?: string;
}

export function ScrollSnapSection({ children, className = '' }: ScrollSnapSectionProps) {
  return (
    <div className={`snap-start min-h-screen flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

export function ScrollSnapContainer({ children }: { children: ReactNode }) {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {children}
    </div>
  );
}
