'use client';

import { ReactNode, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const variantStyles = {
  default: 'bg-white shadow-card',
  elevated: 'bg-white shadow-xl',
  outlined: 'bg-white border border-gray-200',
  glass: 'bg-white/10 backdrop-blur-lg border border-white/20',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const roundedStyles = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
};

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = true,
  rounded = 'xl',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        // Base styles
        'transition-all duration-300 ease-power3-out',
        // Variant
        variantStyles[variant],
        // Padding
        paddingStyles[padding],
        // Rounded
        roundedStyles[rounded],
        // Hover effect
        hover && 'hover:scale-[1.02] hover:shadow-card-hover',
        // Will-change for performance
        'will-change-transform',
        // Custom classes
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
