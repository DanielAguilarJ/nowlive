'use client';

/**
 * Purely decorative SVG shapes
 * Loaded lazily as they don't affect LCP or TTI
 * Uses CSS animations only (no JS)
 */
export function HeroDecorativeShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Triangle */}
      <svg
        className="absolute top-20 left-10 w-24 h-24 text-accent-500/20 animate-spin-slow"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <polygon points="50,5 95,75 5,75" fill="currentColor" />
      </svg>

      {/* Square */}
      <svg
        className="absolute bottom-32 right-20 w-32 h-32 text-accent-400/20 animate-bounce-gentle"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <rect x="10" y="10" width="80" height="80" rx="10" fill="currentColor" />
      </svg>

      {/* Circle */}
      <svg
        className="absolute top-1/3 right-10 w-20 h-20 text-success-500/20 animate-float"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="40" fill="currentColor" />
      </svg>
    </div>
  );
}
