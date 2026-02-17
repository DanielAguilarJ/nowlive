'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Easing function (easeOutCubic)
      const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);
      const easedProgress = easeOutCubic(progress);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

interface StatsCardProps {
  number: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export function StatsCard({
  number,
  suffix = '',
  prefix = '',
  label,
  description,
  icon,
}: StatsCardProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:border-accent-300 transition-all duration-300 hover:shadow-xl">
        {icon && (
          <div className="w-12 h-12 mb-4 text-accent-500 flex items-center justify-center bg-accent-100 rounded-xl">
            {icon}
          </div>
        )}
        <div className="text-5xl font-bold text-primary-700 mb-2">
          <AnimatedNumber
            value={number}
            prefix={prefix}
            suffix={suffix}
            duration={2500}
          />
        </div>
        <div className="text-lg font-semibold text-gray-900 mb-1">{label}</div>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
    </div>
  );
}
