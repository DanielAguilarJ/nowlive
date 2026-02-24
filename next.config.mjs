/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compresión gzip/brotli de respuestas HTTP
  compress: true,

  // Elimina la cabecera X-Powered-By para reducir tamaño de headers
  poweredByHeader: false,

  // Optimización de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
    // Formatos modernos: AVIF y WebP reducen peso hasta un 50% vs JPEG/PNG
    formats: ['image/avif', 'image/webp'],
    // Aumentar cache TTL de imágenes a 30 días
    minimumCacheTTL: 2592000,
    // Limitar tamaños de dispositivos para generar menos variantes
    deviceSizes: [640, 750, 828, 1080, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Optimizar importaciones de paquetes pesados con barrel exports
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'lucide-react', '@radix-ui/react-icons'],
  },

  // Cabeceras HTTP para cache agresivo de assets estáticos
  async headers() {
    return [
      {
        // Assets de Next.js (JS, CSS con hash → inmutables)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Imágenes, fuentes y archivos públicos estáticos
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // Fuentes autohospedadas
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // HTML: no cachear (siempre fresco)
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
