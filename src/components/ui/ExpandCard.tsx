'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface ExpandCardProps {
  children: ReactNode;
  expandedContent?: ReactNode;
  className?: string;
}

export function ExpandCard({ children, expandedContent, className = '' }: ExpandCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => {
    if (!cardRef.current || !expandedRef.current || !overlayRef.current) return;

    const card = cardRef.current;
    const expanded = expandedRef.current;
    const overlay = overlayRef.current;

    const rect = card.getBoundingClientRect();

    gsap.set(expanded, {
      position: 'fixed',
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      zIndex: 9999,
    });

    gsap.to(overlay, {
      opacity: 1,
      duration: 0.3,
    });

    gsap.to(expanded, {
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      width: '90vw',
      maxWidth: '1200px',
      height: 'auto',
      minHeight: '80vh',
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  const handleClose = () => {
    if (!expandedRef.current || !overlayRef.current) return;

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
    });

    gsap.to(expandedRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => {
        if (expandedRef.current) {
          expandedRef.current.style.display = 'none';
        }
      },
    });
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`cursor-pointer ${className}`}
        onClick={handleExpand}
      >
        {children}
      </div>

      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/80 opacity-0 pointer-events-none z-[9998]"
        style={{ display: 'none' }}
        onClick={handleClose}
      />

      <div
        ref={expandedRef}
        className="hidden bg-white rounded-lg shadow-2xl p-8"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          ✕
        </button>
        {expandedContent || children}
      </div>
    </>
  );
}
