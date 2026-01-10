'use client';

interface IconProps {
  className?: string;
  size?: number;
}

// Web Design Icon
export function WebDesignIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="4"
        y="8"
        width="40"
        height="28"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        className="transition-all duration-300"
      />
      <path
        d="M4 14H44"
        stroke="currentColor"
        strokeWidth="2"
        className="transition-all duration-300"
      />
      <circle cx="8" cy="11" r="1.5" fill="currentColor" />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      <circle cx="16" cy="11" r="1.5" fill="currentColor" />
      <rect
        x="8"
        y="18"
        width="14"
        height="14"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
        className="transition-all duration-300 origin-center group-hover:scale-105"
      />
      <path
        d="M26 18H40M26 22H36M26 26H38M26 30H34"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="transition-all duration-300"
      />
      <path
        d="M24 40V44M18 44H30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Strategy Icon
export function StrategyIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="currentColor"
        strokeWidth="2"
        className="transition-all duration-300"
      />
      <path
        d="M24 10V24L32 32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300 origin-bottom-left group-hover:rotate-12"
      />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <path
        d="M24 6V8M24 40V42M6 24H8M40 24H42M10.9 10.9L12.3 12.3M35.7 35.7L37.1 37.1M10.9 37.1L12.3 35.7M35.7 12.3L37.1 10.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Automation Icon
export function AutomationIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M24 4L28 12H20L24 4Z"
        fill="currentColor"
        className="transition-all duration-300 origin-center group-hover:translate-y-1"
      />
      <rect
        x="16"
        y="12"
        width="16"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M24 24V28"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="8"
        y="28"
        width="12"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        className="transition-all duration-300 group-hover:stroke-accent-500"
      />
      <rect
        x="28"
        y="28"
        width="12"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        className="transition-all duration-300 group-hover:stroke-accent-500"
      />
      <path
        d="M14 38V42M34 38V42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 28L14 28M28 28L34 28"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="24" cy="18" r="2" fill="currentColor" className="animate-pulse" />
    </svg>
  );
}

// Content Icon
export function ContentIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="6"
        y="6"
        width="36"
        height="36"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M6 16H42"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="10"
        y="20"
        width="16"
        height="18"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M30 20H38M30 26H36M30 32H38M30 38H34"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="transition-all duration-300"
      />
      <path
        d="M14 28L18 32L22 26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300 group-hover:stroke-accent-500"
      />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      <circle cx="16" cy="11" r="1.5" fill="currentColor" />
      <circle cx="20" cy="11" r="1.5" fill="currentColor" />
    </svg>
  );
}

// SEO Icon
export function SeoIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="20"
        cy="20"
        r="14"
        stroke="currentColor"
        strokeWidth="2"
        className="transition-all duration-300"
      />
      <path
        d="M30 30L42 42"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="transition-all duration-300 origin-top-left group-hover:scale-110"
      />
      <path
        d="M12 22L16 26L28 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300 group-hover:stroke-success-500"
      />
    </svg>
  );
}

// Brand Icon
export function BrandIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M24 4L30 16H18L24 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        className="transition-all duration-300 origin-bottom group-hover:-translate-y-1"
      />
      <circle
        cx="12"
        cy="28"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        className="transition-all duration-300 group-hover:stroke-accent-500"
      />
      <rect
        x="28"
        y="20"
        width="16"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        className="transition-all duration-300 group-hover:stroke-success-500"
      />
      <path
        d="M24 16V20M12 36V44M36 36V44M4 44H44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Arrow Right Icon
export function ArrowRightIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Star Icon
export function StarIcon({ className = '', size = 24, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Social Icons
export function TwitterIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function LinkedInIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function InstagramIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function FacebookIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// Check Icon
export function CheckIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 6L9 17L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Quote Icon
export function QuoteIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M14 24H6V16C6 12 8 8 14 8V14C12 14 10 15 10 18H14V24ZM30 24H22V16C22 12 24 8 30 8V14C28 14 26 15 26 18H30V24Z" />
    </svg>
  );
}
