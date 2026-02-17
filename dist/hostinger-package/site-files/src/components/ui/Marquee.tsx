'use client';

import { useRef, useEffect, Children, type ReactNode } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface MarqueeProps {
  items?: ReactNode[];
  children?: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  items,
  children,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}: MarqueeProps) {
  const resolvedItems = items ?? Children.toArray(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;

    if (!container || !inner) return;

    const innerWidth = inner.scrollWidth / 2;
    const duration = innerWidth / speed;

    const animation = gsap.to(inner, {
      x: direction === 'left' ? -innerWidth : innerWidth,
      duration,
      ease: 'none',
      repeat: -1,
    });

    if (pauseOnHover) {
      container.addEventListener('mouseenter', () => animation.pause());
      container.addEventListener('mouseleave', () => animation.play());
    }

    return () => {
      animation.kill();
    };
  }, [speed, direction, pauseOnHover]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="flex gap-8 w-fit">
        {/* Render items twice for seamless loop */}
        {[...resolvedItems, ...resolvedItems].map((item, index) => (
          <div key={index} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

interface LogoItem {
  name: string;
  logo: string | React.ReactNode;
}

interface LogoMarqueeProps {
  logos: LogoItem[];
  title?: string;
  className?: string;
}

export function LogoMarquee({ logos, title, className = '' }: LogoMarqueeProps) {
  const logoItems = logos.map((logo, index) => (
    <div
      key={index}
      className="h-16 px-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
    >
      {typeof logo.logo === 'string' ? (
        <div className="relative h-full w-32">
          <Image src={logo.logo} alt={logo.name} fill sizes="128px" className="object-contain" />
        </div>
      ) : (
        logo.logo
      )}
    </div>
  ));

  return (
    <div className={`py-12 ${className}`}>
      {title && (
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </p>
        </div>
      )}
      <Marquee items={logoItems} speed={30} />
    </div>
  );
}

interface StatMarqueeProps {
  stats: Array<{
    value: string | number;
    suffix?: string;
    label: string;
  }>;
  className?: string;
}

export function StatMarquee({ stats, className = '' }: StatMarqueeProps) {
  const statItems = stats.map((stat, index) => (
    <div
      key={index}
      className="flex flex-col items-center justify-center px-8 py-4 bg-white rounded-xl shadow-sm border border-gray-200"
    >
      <div className="text-3xl font-bold text-accent-600 mb-1">
        {stat.value}
        {stat.suffix}
      </div>
      <div className="text-sm text-gray-600 whitespace-nowrap">{stat.label}</div>
    </div>
  ));

  return (
    <div className={`py-8 ${className}`}>
      <Marquee items={statItems} speed={40} pauseOnHover />
    </div>
  );
}
