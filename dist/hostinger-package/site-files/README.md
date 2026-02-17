# CreamosTech - Digital Marketing Agency Landing Page

A modern, responsive landing page for CreamosTech, a full-service digital marketing agency. Built with Next.js 15, TypeScript, Tailwind CSS, GSAP, Framer Motion, and Lenis for a premium user experience.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Advanced Animations**: GSAP ScrollTrigger for parallax effects, Framer Motion for UI interactions
- **Smooth Scroll**: Lenis for buttery-smooth scrolling experience
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Accessibility**: WCAG AA compliant, semantic HTML, keyboard navigation
- **Performance**: Optimized images, code splitting, lazy loading
- **SEO Ready**: Meta tags, OpenGraph, JSON-LD schemas

## 📦 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: 
  - [GSAP](https://greensock.com/gsap/) with ScrollTrigger
  - [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Images**: [Unsplash](https://unsplash.com/) (for demo purposes)

## 🛠️ Installation

1. Clone the repository:
   \`\`\`bash
   cd creamostech
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
src/
├── app/
│   ├── globals.css      # Global styles, Tailwind directives
│   ├── layout.tsx       # Root layout with metadata & providers
│   └── page.tsx         # Main landing page
├── components/
│   ├── icons/           # SVG icons as React components
│   ├── providers/       # Context providers (SmoothScroll)
│   ├── sections/        # Page sections (Hero, Services, etc.)
│   └── ui/              # Reusable UI components
└── hooks/               # Custom React hooks
\`\`\`

## 🎨 Components

### UI Components
- **Button**: Primary, secondary, outline, ghost variants with loading states
- **Card**: Flexible card component with multiple variants
- **SectionContainer**: Standardized section wrapper with backgrounds
- **AnimatedText**: Text with fade-in, word-by-word, character animations
- **ParallaxImage**: Images with scroll-based parallax effect
- **ScrollReveal**: Wrapper for scroll-triggered reveal animations

### Custom Hooks
- **useParallax**: GSAP-powered parallax effect
- **useScrollTrigger**: ScrollTrigger integration
- **useInViewport**: Intersection Observer wrapper
- **useAnimatedCounter**: Animated number counter
- **useStaggerAnimation**: Staggered child animations

## 🎭 Animations

### GSAP ScrollTrigger
- Multi-layer background parallax in Hero section
- Service cards stagger reveal
- Process timeline animated line
- Team cards fade-in on scroll

### Framer Motion
- Mobile menu open/close animations
- Smooth state transitions

### CSS Animations
- Custom keyframes defined in Tailwind config
- Float, pulse, shimmer, gradient-shift effects
- Reduced motion support for accessibility

## ⚡ Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic per-route splitting
- **Will-Change**: Applied to animated elements
- **RequestAnimationFrame**: Smooth 60fps animations
- **GSAP Cleanup**: Proper ScrollTrigger cleanup on unmount

## ♿ Accessibility

- Semantic HTML5 structure
- ARIA labels on interactive elements
- Color contrast 4.5:1 minimum (WCAG AA)
- Keyboard navigation support
- Respects \`prefers-reduced-motion\` preference
- Focus states on all interactive elements

## 🔍 SEO

- Optimized meta tags
- OpenGraph and Twitter cards
- JSON-LD schemas (Organization, LocalBusiness)
- Proper heading hierarchy
- Alt text on all images

## 📄 Scripts

- \`npm run dev\` - Start development server with Turbopack
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint

## 🎯 Sections

1. **Hero**: Multi-layer parallax background, animated headline
2. **Services**: 6 service cards with icons, hover effects
3. **Portfolio**: Filterable project grid, modal detail view
4. **Process**: 4-step timeline with animated connector
5. **Team**: Team member grid with hover overlays
6. **Testimonials**: Client quotes with ratings
7. **CTA**: Animated counters, gradient background
8. **Footer**: Newsletter signup, sitemap, social links

## 🌈 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #0F172A | Backgrounds, text |
| Accent | #3B82F6 | Buttons, highlights |
| Success | #10B981 | Positive states |
| Gray | #E5E7EB | Borders, secondary |

## 📝 License

MIT License - feel free to use this template for your projects!

---

Built with ❤️ by CreamosTech
