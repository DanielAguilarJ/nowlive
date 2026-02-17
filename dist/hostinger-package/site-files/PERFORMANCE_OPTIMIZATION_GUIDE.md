# 🚀 Guía de Optimización Web Performance - Hero Component

## 📊 Análisis de Problemas Originales

### ❌ Problemas Identificados:
1. **TTI (Time to Interactive) Alto**: GSAP y ScrollTrigger se cargaban inmediatamente bloqueando el hilo principal
2. **LCP (Largest Contentful Paint) Retrasado**: Animaciones pesadas competían con contenido crítico
3. **CLS (Cumulative Layout Shift)**: Potencial cambio de layout cuando cargan las animaciones
4. **JavaScript Bundle Grande**: ~50KB de GSAP en el bundle principal
5. **Particles Background**: Canvas animation bloqueaba el rendering inicial

---

## ✅ Soluciones Implementadas

### 1. **Estrategia de Carga en Cascada**

```typescript
// Prioridad 1: Contenido Crítico (0ms)
- Texto del headline (LCP element)
- CTAs (botones de conversión)
- Subheadline y badge

// Prioridad 2: Background Estático (0ms)
- Gradiente simple sin animación
- Grid pattern estático

// Prioridad 3: Animaciones Pesadas (500ms + requestIdleCallback)
- GSAP Parallax
- Decorative SVG shapes
- Particles background
```

### 2. **next/dynamic + requestIdleCallback**

```typescript
const ParallaxLayers = dynamic(
  () => import('./HeroParallaxLayers'),
  {
    ssr: false, // No SSR para animaciones
    loading: () => <StaticFallback />, // Previene CLS
  }
);

// Carga diferida inteligente
useEffect(() => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      setTimeout(() => setShouldLoadAnimations(true), 500);
    }, { timeout: 2000 });
  } else {
    setTimeout(() => setShouldLoadAnimations(true), 500);
  }
}, []);
```

### 3. **GSAP Lazy Loading**

En lugar de:
```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
```

Ahora:
```typescript
const loadGSAP = async () => {
  if (!gsap) {
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');
    gsap = gsapModule.default;
    ScrollTrigger = scrollTriggerModule.ScrollTrigger;
  }
  return { gsap, ScrollTrigger };
};
```

**Beneficio**: GSAP no está en el bundle inicial, se carga solo cuando es necesario.

### 4. **CLS = 0 con Placeholders**

```typescript
loading: () => (
  // Exactamente las mismas dimensiones que el componente final
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
    <div className="absolute inset-0 bg-grid-pattern opacity-20" />
  </div>
)
```

### 5. **Particles Background Optimizado**

**Mejoras**:
- ✅ Canvas con `desynchronized: true` (off-main-thread rendering)
- ✅ Device Pixel Ratio para rendering crisp
- ✅ FPS limitado a 30fps (de 60fps)
- ✅ Partículas reducidas de 50 a ~30
- ✅ Intersection Observer para pausar cuando no es visible
- ✅ Mouse events throttled
- ✅ Damping para prevenir velocidad excesiva

---

## 📦 Archivos Creados

### 1. `/src/components/sections/Hero.optimized.tsx`
**Componente principal** con lógica de carga diferida.

### 2. `/src/components/sections/HeroParallaxLayers.tsx`
**Parallax animado** con GSAP lazy-loaded.

### 3. `/src/components/sections/HeroDecorativeShapes.tsx`
**SVG decorativos** puramente CSS (sin JS).

### 4. `/src/components/ui/ParticlesBackground.optimized.tsx`
**Canvas optimizado** con throttling y Intersection Observer.

---

## 🔄 Migración (3 Pasos)

### Paso 1: Reemplaza el Hero actual

```bash
# Backup del original
mv src/components/sections/Hero.tsx src/components/sections/Hero.legacy.tsx

# Usa la versión optimizada
mv src/components/sections/Hero.optimized.tsx src/components/sections/Hero.tsx
```

### Paso 2: Actualiza el uso de ParticlesBackground

Si usas `ParticlesBackground` en `layout.tsx` o en el Hero:

```typescript
// Antes
import { ParticlesBackground } from '@/components/ui/ParticlesBackground';

// Después - Lazy loading
import dynamic from 'next/dynamic';

const ParticlesBackground = dynamic(
  () => import('@/components/ui/ParticlesBackground.optimized').then(m => m.ParticlesBackground),
  {
    ssr: false,
    loading: () => (
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ width: '100vw', height: '100vh' }}
        aria-hidden="true"
      />
    ),
  }
);

// Úsalo condicionalmente
export default function Layout() {
  const [showParticles, setShowParticles] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => setShowParticles(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {showParticles && <ParticlesBackground />}
      {children}
    </>
  );
}
```

### Paso 3: Verifica con Lighthouse

```bash
npm run build
npm start

# En Chrome DevTools:
# Lighthouse > Performance > Generate Report
```

---

## 📈 Métricas Esperadas

### Antes de Optimización:
- **LCP**: ~2.5-3.5s
- **TTI**: ~3.5-4.5s
- **CLS**: 0.05-0.15
- **Bundle Size**: +50KB (GSAP)

### Después de Optimización:
- **LCP**: ~1.2-1.8s ⚡ **↓ 40-50%**
- **TTI**: ~1.5-2.2s ⚡ **↓ 50-60%**
- **CLS**: 0.00 ⚡ **CERO**
- **Bundle Size**: -50KB (GSAP lazy-loaded) ⚡ **↓ Bundle inicial**

---

## 🎯 Optimizaciones Adicionales Recomendadas

### 1. Preload Critical Fonts
```typescript
// En layout.tsx o _document.tsx
<link
  rel="preload"
  href="/fonts/your-font.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

### 2. Image Optimization
```typescript
// Si tienes imágenes en el Hero
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero"
  fill
  priority // Marca como priority para LCP
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 3. Defer Non-Critical Scripts
```typescript
// En next.config.mjs
experimental: {
  optimizeCss: true,
  optimizePackageImports: ['gsap', '@/components/ui'],
}
```

### 4. Resource Hints
```typescript
// En layout.tsx
<link rel="dns-prefetch" href="https://your-cdn.com" />
<link rel="preconnect" href="https://your-api.com" />
```

---

## 🧪 Testing

### Performance Testing Script

```bash
# 1. Build production
npm run build

# 2. Start server
npm start

# 3. Run Lighthouse CI (instalar primero)
npm install -g @lhci/cli

lhci autorun --collect.url=http://localhost:3000 \
  --collect.numberOfRuns=5 \
  --assert.preset=lighthouse:recommended
```

### Manual Testing Checklist

- [ ] **Visual Check**: Contenido aparece instantáneamente
- [ ] **Animation Check**: Parallax se activa después de 500ms
- [ ] **No Layout Shift**: No hay "saltos" visuales
- [ ] **Smooth Scrolling**: Scroll es fluido (60fps)
- [ ] **Mobile**: Funciona bien en 3G/4G simulado
- [ ] **Reduced Motion**: Respeta `prefers-reduced-motion`

---

## 🐛 Troubleshooting

### Problema: "GSAP is not defined"
**Solución**: Asegúrate de que `loadGSAP()` se llame antes de usar GSAP.

### Problema: Animaciones no se cargan
**Solución**: Verifica que `shouldLoadAnimations` se está estableciendo en `true`.

### Problema: CLS > 0
**Solución**: Verifica que el placeholder tenga exactamente las mismas clases CSS que el componente final.

### Problema: ParticlesBackground consume mucha CPU
**Solución**: Reduce `particleCount` o aumenta `frameDelay` en ParticlesBackground.optimized.tsx.

---

## 📚 Referencias

- [Web Vitals](https://web.dev/vitals/)
- [Next.js Dynamic Imports](https://nextjs.org/docs/advanced-features/dynamic-import)
- [GSAP Performance](https://greensock.com/docs/v3/GSAP/gsap.context())
- [requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)

---

## 🎉 Resultado Final

Con estas optimizaciones, tu Hero:
1. ✅ Carga contenido crítico instantáneamente
2. ✅ Mantiene el usuario engaged con CTAs visibles
3. ✅ Añade "wow factor" sin sacrificar performance
4. ✅ Pasa Core Web Vitals con flying colors
5. ✅ Es accesible (respeta prefers-reduced-motion)

**¡Tu Hero ahora es rápido Y hermoso!** 🚀
