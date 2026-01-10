"use client";

import { ReactNode } from 'react';

interface Logo {
  name: string;
  logo: ReactNode;
}

interface LogoMarqueeProps {
  logos: Logo[];
  speed?: number;
}

export function LogoMarquee({ logos, speed = 30 }: LogoMarqueeProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="mx-12 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity"
          >
            {logo.logo}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee ${speed}s linear infinite;
        }
      `}</style>
    </div>
  );
}
