'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: clsx(
    'bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700',
    'text-white shadow-lg',
    'hover:shadow-glow hover:scale-105',
    'focus:ring-accent-500',
    'active:scale-95'
  ),
  secondary: clsx(
    'bg-primary-700 text-white',
    'hover:bg-primary-600 hover:shadow-lg',
    'focus:ring-primary-500',
    'active:scale-95'
  ),
  outline: clsx(
    'border-2 border-accent-500 text-accent-500',
    'hover:bg-accent-500 hover:text-white',
    'focus:ring-accent-500',
    'active:scale-95'
  ),
  ghost: clsx(
    'text-gray-700 bg-transparent',
    'hover:bg-gray-100',
    'focus:ring-gray-300',
    'active:bg-gray-200'
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-[36px]',
  md: 'px-6 py-3 text-base min-h-[44px]',
  lg: 'px-8 py-4 text-lg min-h-[52px]',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        // Base styles
        'inline-flex items-center justify-center gap-2',
        'font-semibold rounded-lg',
        'transition-all duration-300 ease-power3-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        'relative overflow-hidden ripple',
        // Variant styles
        variantStyles[variant],
        // Size styles
        sizeStyles[size],
        // Full width
        fullWidth && 'w-full',
        // Custom classes
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
