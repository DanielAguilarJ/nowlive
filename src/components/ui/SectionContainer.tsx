'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
  background?: 'white' | 'gray' | 'dark' | 'gradient' | 'transparent';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
}

const backgroundStyles = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  dark: 'bg-primary-700 text-white',
  gradient: 'bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white',
  transparent: 'bg-transparent',
};

const paddingStyles = {
  none: 'py-0',
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
  xl: 'py-24 md:py-40',
};

const maxWidthStyles = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

export function SectionContainer({
  children,
  className,
  id,
  as: Component = 'section',
  background = 'white',
  padding = 'md',
  maxWidth = '7xl',
}: SectionContainerProps) {
  return (
    <Component
      id={id}
      className={clsx(
        // Background
        backgroundStyles[background],
        // Padding
        paddingStyles[padding],
        // Custom class
        className
      )}
    >
      <div
        className={clsx(
          'mx-auto px-4 sm:px-6 lg:px-8',
          maxWidthStyles[maxWidth]
        )}
      >
        {children}
      </div>
    </Component>
  );
}
