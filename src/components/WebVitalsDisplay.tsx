'use client';

import { useState, useEffect } from 'react';
import { measureWebVitals } from '@/lib/performance';

interface WebVitalsDisplayProps {
  /** Solo mostrar en desarrollo */
  devOnly?: boolean;
}

/**
 * Performance Metrics Display
 * 
 * Componente visual para monitorear Web Vitals en tiempo real
 * Útil durante desarrollo y testing
 */
export function WebVitalsDisplay({ devOnly = true }: WebVitalsDisplayProps) {
  const [metrics, setMetrics] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Solo mostrar en desarrollo si devOnly=true
    if (devOnly && process.env.NODE_ENV !== 'development') {
      return;
    }

    // Medir métricas después de un delay
    const timeout = setTimeout(async () => {
      const webVitals = await measureWebVitals();
      setMetrics(webVitals);
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [devOnly]);

  // Keyboard shortcut para toggle
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + P para toggle
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!metrics) return null;

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'bg-green-500';
      case 'needs-improvement':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRatingEmoji = (rating: string) => {
    switch (rating) {
      case 'good':
        return '✅';
      case 'needs-improvement':
        return '⚠️';
      case 'poor':
        return '❌';
      default:
        return '❓';
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-[9998] bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-gray-800 transition-all text-xs font-mono"
        title="Toggle Performance Metrics (Ctrl+Shift+P)"
      >
        📊 Perf
      </button>

      {/* Metrics Panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 z-[9999] bg-gray-900/95 backdrop-blur-sm text-white p-4 rounded-lg shadow-2xl border border-gray-700 max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">🚀 Web Vitals</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="space-y-2">
            {/* LCP */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span>{getRatingEmoji(metrics.lcp.rating)}</span>
                <span className="font-medium">LCP</span>
                <span className="text-gray-400" title="Largest Contentful Paint">
                  (Largest Contentful Paint)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono">{metrics.lcp.value}{metrics.lcp.unit}</span>
                <div
                  className={`w-2 h-2 rounded-full ${getRatingColor(
                    metrics.lcp.rating
                  )}`}
                />
              </div>
            </div>

            {/* CLS */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span>{getRatingEmoji(metrics.cls.rating)}</span>
                <span className="font-medium">CLS</span>
                <span className="text-gray-400" title="Cumulative Layout Shift">
                  (Cumulative Layout Shift)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono">{metrics.cls.value}</span>
                <div
                  className={`w-2 h-2 rounded-full ${getRatingColor(
                    metrics.cls.rating
                  )}`}
                />
              </div>
            </div>

            {/* FID */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span>{getRatingEmoji(metrics.fid.rating)}</span>
                <span className="font-medium">FID</span>
                <span className="text-gray-400" title="First Input Delay">
                  (First Input Delay)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono">
                  {metrics.fid.value > 0 ? `${metrics.fid.value}${metrics.fid.unit}` : 'N/A'}
                </span>
                <div
                  className={`w-2 h-2 rounded-full ${
                    metrics.fid.value > 0
                      ? getRatingColor(metrics.fid.rating)
                      : 'bg-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* TTI */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span>{getRatingEmoji(metrics.tti.rating)}</span>
                <span className="font-medium">TTI</span>
                <span className="text-gray-400" title="Time to Interactive">
                  (Time to Interactive)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono">{metrics.tti.value}{metrics.tti.unit}</span>
                <div
                  className={`w-2 h-2 rounded-full ${getRatingColor(
                    metrics.tti.rating
                  )}`}
                />
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Good</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span>Improve</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span>Poor</span>
              </div>
            </div>
          </div>

          {/* Shortcut hint */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            Press <kbd className="px-1 bg-gray-800 rounded">Ctrl</kbd> +{' '}
            <kbd className="px-1 bg-gray-800 rounded">Shift</kbd> +{' '}
            <kbd className="px-1 bg-gray-800 rounded">P</kbd> to toggle
          </div>
        </div>
      )}
    </>
  );
}

/**
 * EJEMPLO DE USO:
 * 
 * // app/layout.tsx
 * import { WebVitalsDisplay } from '@/components/WebVitalsDisplay';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <WebVitalsDisplay devOnly={true} />
 *       </body>
 *     </html>
 *   );
 * }
 */
