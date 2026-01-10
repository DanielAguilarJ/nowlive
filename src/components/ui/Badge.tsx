'use client';

import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'accent' | 'gradient';
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = 'default',
  className = '',
  icon,
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    success: 'bg-success-100 text-success-700 border-success-200',
    accent: 'bg-accent-100 text-accent-700 border-accent-200',
    gradient: 'bg-gradient-to-r from-accent-500 to-purple-500 text-white border-transparent',
  };

  return (
    <motion.span
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border ${variants[variant]} ${className}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </motion.span>
  );
}

interface PulsingDotProps {
  color?: 'accent' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function PulsingDot({ color = 'accent', size = 'md' }: PulsingDotProps) {
  const colors = {
    accent: 'bg-accent-500',
    success: 'bg-success-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <span className="relative flex">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors[color]} opacity-75`}
      />
      <span className={`relative inline-flex rounded-full ${sizes[size]} ${colors[color]}`} />
    </span>
  );
}

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({
  content,
  children,
  position = 'top',
}: TooltipProps) {
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`absolute ${positions[position]} px-3 py-2 text-xs text-white bg-primary-900 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50`}
      >
        {content}
        <div
          className={`absolute w-2 h-2 bg-primary-900 transform rotate-45 ${
            position === 'top'
              ? 'top-full left-1/2 -translate-x-1/2 -mt-1'
              : position === 'bottom'
              ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1'
              : position === 'left'
              ? 'left-full top-1/2 -translate-y-1/2 -ml-1'
              : 'right-full top-1/2 -translate-y-1/2 -mr-1'
          }`}
        />
      </div>
    </div>
  );
}
