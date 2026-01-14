/**
 * Performance Testing Utilities
 * 
 * Herramientas para medir y validar mejoras en Web Vitals
 */

/**
 * Mide LCP (Largest Contentful Paint)
 */
export function measureLCP(): Promise<number> {
  return new Promise((resolve) => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = lastEntry.renderTime || lastEntry.loadTime;
        resolve(lcp);
        observer.disconnect();
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // Timeout de seguridad
      setTimeout(() => {
        observer.disconnect();
        resolve(0);
      }, 10000);
    } else {
      resolve(0);
    }
  });
}

/**
 * Mide CLS (Cumulative Layout Shift)
 */
export function measureCLS(): Promise<number> {
  return new Promise((resolve) => {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });

      // Medir durante 5 segundos
      setTimeout(() => {
        observer.disconnect();
        resolve(clsValue);
      }, 5000);
    } else {
      resolve(0);
    }
  });
}

/**
 * Mide FID (First Input Delay)
 */
export function measureFID(): Promise<number> {
  return new Promise((resolve) => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstInput = entries[0] as any;
        const fid = firstInput.processingStart - firstInput.startTime;
        resolve(fid);
        observer.disconnect();
      });

      observer.observe({ entryTypes: ['first-input'] });

      // Timeout de 30 segundos
      setTimeout(() => {
        observer.disconnect();
        resolve(0);
      }, 30000);
    } else {
      resolve(0);
    }
  });
}

/**
 * Mide TTI (Time to Interactive) aproximado
 */
export function measureTTI(): Promise<number> {
  return new Promise((resolve) => {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationTiming = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;

      if (navigationTiming) {
        // Aproximación de TTI usando domInteractive
        const tti = navigationTiming.domInteractive;
        resolve(tti);
      } else {
        resolve(0);
      }
    } else {
      resolve(0);
    }
  });
}

/**
 * Medición completa de Web Vitals
 */
export async function measureWebVitals() {
  const [lcp, cls, fid, tti] = await Promise.all([
    measureLCP(),
    measureCLS(),
    measureFID(),
    measureTTI(),
  ]);

  return {
    lcp: {
      value: Math.round(lcp),
      rating: lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs-improvement' : 'poor',
      unit: 'ms',
    },
    cls: {
      value: Number(cls.toFixed(3)),
      rating: cls <= 0.1 ? 'good' : cls <= 0.25 ? 'needs-improvement' : 'poor',
      unit: '',
    },
    fid: {
      value: Math.round(fid),
      rating: fid <= 100 ? 'good' : fid <= 300 ? 'needs-improvement' : 'poor',
      unit: 'ms',
    },
    tti: {
      value: Math.round(tti),
      rating: tti <= 3800 ? 'good' : tti <= 7300 ? 'needs-improvement' : 'poor',
      unit: 'ms',
    },
  };
}

/**
 * Hook de React para mostrar métricas en desarrollo
 */
export function useWebVitalsMonitor(enabled: boolean = process.env.NODE_ENV === 'development') {
  if (typeof window === 'undefined' || !enabled) return;

  measureWebVitals().then((metrics) => {
    console.group('🎯 Web Vitals Performance Metrics');
    console.log('LCP (Largest Contentful Paint):', metrics.lcp);
    console.log('CLS (Cumulative Layout Shift):', metrics.cls);
    console.log('FID (First Input Delay):', metrics.fid);
    console.log('TTI (Time to Interactive):', metrics.tti);
    console.groupEnd();

    // Alert si alguna métrica es "poor"
    const poorMetrics = Object.entries(metrics)
      .filter(([_, metric]) => metric.rating === 'poor')
      .map(([name]) => name.toUpperCase());

    if (poorMetrics.length > 0) {
      console.warn(
        `⚠️ Performance Warning: ${poorMetrics.join(', ')} need improvement`
      );
    }
  });
}

/**
 * EJEMPLO DE USO EN LAYOUT O PAGE:
 * 
 * // app/layout.tsx
 * 'use client';
 * 
 * import { useWebVitalsMonitor } from '@/lib/performance';
 * 
 * export default function RootLayout({ children }) {
 *   useWebVitalsMonitor(true);
 * 
 *   return (
 *     <html>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * 
 * // Para testing manual:
 * import { measureWebVitals } from '@/lib/performance';
 * 
 * const metrics = await measureWebVitals();
 * console.log(metrics);
 */

/**
 * Utilidad para comparar antes/después
 */
export async function comparePerformance() {
  const start = performance.now();
  
  await new Promise((resolve) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(resolve as IdleRequestCallback);
    } else {
      setTimeout(resolve, 0);
    }
  });

  const idleTime = performance.now() - start;

  return {
    mainThreadBlocking: idleTime > 50,
    idleTime: Math.round(idleTime),
    recommendation:
      idleTime > 50
        ? 'Main thread is blocked. Consider lazy loading heavy scripts.'
        : 'Main thread is available. Good performance!',
  };
}
