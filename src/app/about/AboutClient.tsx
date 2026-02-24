"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import Link from "next/link";
import { Header, Footer, CTA } from "@/components/sections";
import {
  SectionContainer,
  ParticlesBackground,
  ScrollReveal,
  Badge,
  Typewriter,
  AnimatedNumber,
  MagneticButton,
  ScrollProgress,
} from "@/components/ui";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getTranslations } from "@/lib/i18n";

const roleGradients = [
  "from-blue-500 to-purple-600",
  "from-pink-500 to-rose-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-indigo-600",
  "from-orange-500 to-amber-600",
  "from-cyan-500 to-blue-600",
];

const processIcons = [
  <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>,
  <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>,
  <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  <svg key="4" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>,
];

/* ---------------------------------------------------------------
   Animated gradient SVG icons for the Values section
   Each icon gets a unique gradient ID so they can coexist in the DOM.
   --------------------------------------------------------------- */
const ValueIconTarget = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="grad-target" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6">
          <animate attributeName="stop-color" values="#3B82F6;#8B5CF6;#3B82F6" dur="4s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stopColor="#8B5CF6">
          <animate attributeName="stop-color" values="#8B5CF6;#EC4899;#8B5CF6" dur="4s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" stroke="url(#grad-target)" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="6" stroke="url(#grad-target)" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" fill="url(#grad-target)" />
  </svg>
);

const ValueIconLightbulb = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="grad-bulb" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B">
          <animate attributeName="stop-color" values="#F59E0B;#EC4899;#F59E0B" dur="4s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stopColor="#EC4899">
          <animate attributeName="stop-color" values="#EC4899;#8B5CF6;#EC4899" dur="4s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    <path
      d="M9 21h6m-3-3v3m-4-7.46A6 6 0 1117.46 9 6 6 0 0113 13.54V18H11v-4.46z"
      stroke="url(#grad-bulb)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="12" y1="2" x2="12" y2="3" stroke="url(#grad-bulb)" strokeWidth="1.5" strokeLinecap="round">
      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
    </line>
    <line x1="4.22" y1="4.22" x2="4.93" y2="4.93" stroke="url(#grad-bulb)" strokeWidth="1.5" strokeLinecap="round">
      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0.2s" />
    </line>
    <line x1="19.78" y1="4.22" x2="19.07" y2="4.93" stroke="url(#grad-bulb)" strokeWidth="1.5" strokeLinecap="round">
      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0.4s" />
    </line>
  </svg>
);

const ValueIconHandshake = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="grad-hand" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981">
          <animate attributeName="stop-color" values="#10B981;#3B82F6;#10B981" dur="4s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stopColor="#3B82F6">
          <animate attributeName="stop-color" values="#3B82F6;#8B5CF6;#3B82F6" dur="4s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    <path
      d="M17.5 12.5L14 16l-2.5-1.5L8 17l-4-3 3-3 2.5 1 2-2 3-1 3 3.5z"
      stroke="url(#grad-hand)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 10l5-4 3.5 1L14 4l6 4"
      stroke="url(#grad-hand)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 10v4l-2.5 3"
      stroke="url(#grad-hand)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ValueIconSearch = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="grad-search" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1">
          <animate attributeName="stop-color" values="#6366F1;#EC4899;#6366F1" dur="4s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stopColor="#EC4899">
          <animate attributeName="stop-color" values="#EC4899;#F59E0B;#EC4899" dur="4s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    <circle cx="11" cy="11" r="7" stroke="url(#grad-search)" strokeWidth="1.5" />
    <path d="M16.5 16.5L21 21" stroke="url(#grad-search)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 8v6m-3-3h6" stroke="url(#grad-search)" strokeWidth="1.5" strokeLinecap="round">
      <animate attributeName="opacity" values="1;0.4;1" dur="3s" repeatCount="indefinite" />
    </path>
  </svg>
);

const valueIcons = [
  <ValueIconTarget key="target" />,
  <ValueIconLightbulb key="bulb" />,
  <ValueIconHandshake key="hand" />,
  <ValueIconSearch key="search" />,
];

/* ---------------------------------------------------------------
   Timeline milestones
   --------------------------------------------------------------- */
const timelineMilestones = {
  es: [
    { year: "2012", title: "Fundacion", desc: "Nace CreamosTech con la vision de transformar el marketing digital." },
    { year: "2015", title: "50 proyectos", desc: "Alcanzamos nuestros primeros 50 proyectos exitosos entregados." },
    { year: "2018", title: "Expansion LATAM", desc: "Abrimos operaciones en varios paises de Latinoamerica." },
    { year: "2020", title: "100+ clientes", desc: "Superamos los 100 clientes activos en medio de la transformacion digital global." },
    { year: "2023", title: "Lideres en innovacion", desc: "Reconocidos como lideres en innovacion digital en la region." },
    { year: "2024", title: "AI-First Agency", desc: "Adoptamos la inteligencia artificial como eje central de todas nuestras soluciones." },
  ],
  en: [
    { year: "2012", title: "Founded", desc: "CreamosTech is born with the vision to transform digital marketing." },
    { year: "2015", title: "50 projects", desc: "We reach our first 50 successfully delivered projects." },
    { year: "2018", title: "LATAM Expansion", desc: "We open operations across multiple Latin American countries." },
    { year: "2020", title: "100+ clients", desc: "We surpass 100 active clients amidst the global digital transformation." },
    { year: "2023", title: "Innovation leaders", desc: "Recognized as digital innovation leaders in the region." },
    { year: "2024", title: "AI-First Agency", desc: "We adopt artificial intelligence as the core of all our solutions." },
  ],
};

/* ---------------------------------------------------------------
   Tech Stack data
   --------------------------------------------------------------- */
const techStack = [
  {
    name: "React",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.97 14.496L9.668 7.15H10v9.7H8.87V9.386l6.986 8.92A7.97 7.97 0 0112 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8a7.97 7.97 0 01-3.03 6.496z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6" />
        <path d="M13.5 11v1.5h-2V18h-1.75v-5.5h-2V11h5.75z" fill="white" />
        <path d="M17.5 18c-.83 0-1.47-.19-1.94-.57a1.88 1.88 0 01-.68-1.4h1.6c.04.23.14.42.32.55.17.14.4.2.7.2.28 0 .5-.05.65-.16.14-.11.22-.26.22-.44 0-.2-.1-.35-.3-.46-.2-.1-.53-.22-.99-.35-.5-.14-.9-.28-1.2-.43a1.79 1.79 0 01-.7-.6c-.17-.26-.25-.58-.25-.96 0-.56.22-1 .65-1.35.43-.34 1-.51 1.7-.51.73 0 1.32.17 1.75.52.43.35.67.82.72 1.4h-1.58a.77.77 0 00-.28-.5c-.16-.13-.37-.19-.63-.19-.23 0-.42.05-.55.14a.44.44 0 00-.2.38c0 .2.1.36.31.47.2.1.53.22.98.34.5.14.9.28 1.2.44.3.15.55.36.73.6.18.26.27.58.27.97 0 .56-.22 1.01-.66 1.36-.44.34-1.03.51-1.78.51z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#339933">
        <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.94.47 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.09-.21-.21-.21H8.22c-.12 0-.21.09-.21.21v8.07c0 .66-.68 1.31-1.78.76L4.17 16.2a.27.27 0 01-.13-.23V7.39c0-.1.05-.18.13-.23l7.44-4.3a.27.27 0 01.26 0l7.44 4.3c.08.05.13.14.13.23v8.58c0 .1-.05.18-.13.23l-7.44 4.3a.27.27 0 01-.26 0l-1.88-1.12a.2.2 0 00-.2-.02c-.65.37-.78.41-1.39.62-.15.05-.38.14.08.41l2.45 1.45c.24.14.51.21.78.21.27 0 .55-.07.78-.21l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3a1.57 1.57 0 00-.78-.2z" />
      </svg>
    ),
  },
  {
    name: "Python",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M11.9 2c-1.35 0-2.6.1-3.7.3-3.22.57-3.8 1.77-3.8 3.98v2.92h7.6v.97H5.23c-2.21 0-4.14 1.33-4.75 3.86-.7 2.9-.73 4.71 0 7.74.54 2.26 1.83 3.86 4.04 3.86h2.62V22.5c0-2.51 2.17-4.72 4.75-4.72h7.59c2.11 0 3.8-1.74 3.8-3.87v-7.3c0-2.07-1.74-3.62-3.8-3.98a22.36 22.36 0 00-3.7-.32h-3.88zM8.18 4.4a1.44 1.44 0 110 2.88 1.44 1.44 0 010-2.88z" fill="#3776AB" />
        <path d="M12.1 22c1.35 0 2.6-.1 3.7-.3 3.22-.57 3.8-1.77 3.8-3.98v-2.92h-7.6v-.97h6.77c2.21 0 4.14-1.33 4.75-3.86.7-2.9.73-4.71 0-7.74-.54-2.26-1.83-3.86-4.04-3.86h-2.62V1.5c0 2.51-2.17 4.72-4.75 4.72H4.52c-2.11 0-3.8 1.74-3.8 3.87v7.3c0 2.07 1.74 3.62 3.8 3.98 1.1.2 2.35.32 3.7.32h3.88zm3.72-2.4a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88z" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    name: "AWS",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#FF9900">
        <path d="M6.76 14.18c0 .33.04.6.1.8.08.2.17.42.3.65.05.08.07.16.07.23 0 .1-.06.2-.19.3l-.64.43c-.09.06-.18.09-.26.09-.1 0-.2-.05-.3-.15a3.08 3.08 0 01-.36-.47 8.16 8.16 0 01-.31-.59c-.78.92-1.76 1.38-2.93 1.38-.84 0-1.5-.24-1.99-.72-.49-.48-.73-1.12-.73-1.92 0-.85.3-1.54.9-2.06.6-.53 1.4-.79 2.42-.79.34 0 .68.03 1.04.08.36.05.73.13 1.12.23v-.73c0-.76-.16-1.29-.47-1.6-.32-.31-.86-.46-1.63-.46-.35 0-.71.04-1.08.13-.37.09-.73.2-1.08.35-.16.07-.28.11-.35.13a.6.6 0 01-.15.03c-.13 0-.2-.1-.2-.29v-.5c0-.15.02-.27.07-.34.05-.08.14-.15.28-.23.35-.18.77-.33 1.26-.45A6.2 6.2 0 014.68 7c.97 0 1.68.22 2.13.66.44.44.67 1.1.67 2v2.63h-.72zM3.56 15c.33 0 .67-.06 1.02-.18.36-.12.67-.34.93-.63.16-.19.27-.4.34-.64.07-.24.1-.53.1-.87v-.42c-.28-.08-.58-.14-.88-.18a7.3 7.3 0 00-.9-.06c-.66 0-1.14.13-1.47.4-.32.27-.48.65-.48 1.15 0 .47.12.82.37 1.06.24.25.59.37 1.04.37h-.07zm8.68 1.14c-.17 0-.28-.03-.35-.1-.07-.06-.13-.2-.18-.38L9.44 7.93c-.05-.19-.08-.31-.08-.37 0-.15.07-.23.22-.23h1c.17 0 .3.03.36.1.07.06.12.2.17.38l1.63 6.42 1.51-6.42c.04-.19.1-.32.17-.38.07-.06.2-.1.36-.1h.81c.18 0 .3.03.37.1.07.06.13.2.17.38l1.53 6.51 1.68-6.51c.05-.19.1-.32.17-.38a.54.54 0 01.37-.1h.95c.15 0 .23.07.23.23 0 .05-.01.1-.02.16-.01.06-.04.14-.07.23l-2.35 7.73c-.05.19-.11.32-.18.38-.07.06-.2.1-.35.1h-.87c-.18 0-.3-.03-.37-.1-.07-.07-.13-.2-.17-.39l-1.5-6.26-1.49 6.25c-.04.19-.1.32-.17.39-.07.07-.2.1-.37.1h-.87zm13.87.3a7.1 7.1 0 01-1.63-.2c-.53-.13-.95-.27-1.23-.44-.17-.1-.29-.21-.33-.32a.82.82 0 01-.07-.32v-.52c0-.2.07-.29.22-.29.06 0 .12.01.18.03.06.02.14.06.24.1.32.14.67.26 1.05.34.39.08.77.12 1.16.12.61 0 1.09-.11 1.42-.33.34-.22.51-.54.51-.96 0-.28-.09-.52-.27-.7-.18-.19-.52-.36-1.01-.52l-1.45-.45c-.73-.23-1.27-.57-1.6-1.01a2.32 2.32 0 01-.49-1.42c0-.41.09-.77.27-1.09.18-.32.42-.6.73-.82.31-.23.66-.4 1.07-.51.41-.12.84-.17 1.3-.17.23 0 .47.01.71.04.25.03.48.08.7.13.22.06.42.12.6.2.19.07.33.14.43.22.14.1.25.2.31.31.06.1.09.24.09.4v.48c0 .2-.08.29-.22.29-.08 0-.2-.04-.37-.12a5.9 5.9 0 00-2.23-.42c-.56 0-1 .09-1.3.27-.31.18-.46.47-.46.87 0 .28.1.53.3.72.2.2.57.39 1.1.56l1.43.45c.72.23 1.24.55 1.56.97.32.41.47.88.47 1.4 0 .42-.09.8-.26 1.14-.18.34-.42.63-.74.87-.31.24-.69.42-1.12.54-.45.13-.93.2-1.45.2z" />
        <path d="M22.26 18.4c-2.77 2.05-6.78 3.13-10.23 3.13-4.84 0-9.2-1.79-12.49-4.76-.26-.23-.03-.55.28-.37 3.56 2.07 7.95 3.31 12.49 3.31 3.06 0 6.43-.64 9.53-1.95.47-.2.86.3.42.64z" />
        <path d="M23.46 17.01c-.35-.45-2.33-.21-3.22-.11-.27.03-.31-.2-.07-.37 1.58-1.11 4.16-.79 4.47-.42.3.37-.08 2.98-1.56 4.22-.23.19-.44.09-.34-.16.33-.82 1.07-2.71.72-3.16z" />
      </svg>
    ),
  },
  {
    name: "Google Cloud",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M15.54 8.45l1.43-1.43.07-.63A8 8 0 005.04 12H6.5l.29-.5s.76-1.28.76-1.28a4.87 4.87 0 017.99-1.77z" fill="#EA4335" />
        <path d="M19.96 10A8.03 8.03 0 0017.5 6.39l-1.96 1.96a4.87 4.87 0 011.82 3.34L19.96 10z" fill="#4285F4" />
        <path d="M12 16.87a4.87 4.87 0 01-4.64-3.4L5.4 15.44A8 8 0 0012 20v-3.13z" fill="#34A853" />
        <path d="M12 16.87V20a8 8 0 007.96-8.27l-2.6 1.58a4.87 4.87 0 01-5.36 3.56z" fill="#4285F4" />
        <path d="M7.36 13.48A4.85 4.85 0 017.13 12c0-.52.08-1.01.23-1.48L5.4 8.56A8 8 0 004 12c0 1.27.3 2.48.84 3.55l2.52-2.07z" fill="#FBBC05" />
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M8 24c2.21 0 4-1.79 4-4v-4H8c-2.21 0-4 1.79-4 4s1.79 4 4 4z" fill="#0ACF83" />
        <path d="M4 12c0-2.21 1.79-4 4-4h4v8H8c-2.21 0-4-1.79-4-4z" fill="#A259FF" />
        <path d="M4 4c0-2.21 1.79-4 4-4h4v8H8C5.79 8 4 6.21 4 4z" fill="#F24E1E" />
        <path d="M12 0h4c2.21 0 4 1.79 4 4s-1.79 4-4 4h-4V0z" fill="#FF7262" />
        <path d="M20 12c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" fill="#1ABCFE" />
      </svg>
    ),
  },
  {
    name: "Adobe Creative",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#FF0000">
        <path d="M9.07 2H2v20l7.07-20zM14.93 2H22v20l-7.07-20zM12 9.6L16.24 22h-3.17l-1.27-3.94H8.63L12 9.6z" />
      </svg>
    ),
  },
];

/* ---------------------------------------------------------------
   Culture section data
   --------------------------------------------------------------- */
const cultureData = {
  es: [
    {
      title: "Remote-first",
      desc: "Trabajamos desde donde nos sentimos mejor. Nuestro equipo esta distribuido por toda Latinoamerica y Espana, colaborando de forma asincrona y eficiente.",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      title: "Aprendizaje y crecimiento",
      desc: "Cada miembro tiene un presupuesto dedicado a formacion. Hacemos tech talks semanales y fomentamos la experimentacion con nuevas tecnologias.",
      gradient: "from-violet-500 to-purple-400",
    },
    {
      title: "Equilibrio vida-trabajo",
      desc: "Horarios flexibles, viernes cortos y politica de desconexion digital. Creemos que un equipo descansado produce resultados extraordinarios.",
      gradient: "from-emerald-500 to-teal-400",
    },
  ],
  en: [
    {
      title: "Remote-first",
      desc: "We work from wherever we feel best. Our team is distributed across Latin America and Spain, collaborating asynchronously and efficiently.",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      title: "Learning & Growth",
      desc: "Every member has a dedicated training budget. We hold weekly tech talks and encourage experimentation with new technologies.",
      gradient: "from-violet-500 to-purple-400",
    },
    {
      title: "Work-life balance",
      desc: "Flexible hours, short Fridays, and a digital disconnect policy. We believe a well-rested team produces extraordinary results.",
      gradient: "from-emerald-500 to-teal-400",
    },
  ],
};

const cultureIcons = [
  // Globe / Remote
  <svg key="remote" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.6 9h16.8M3.6 15h16.8" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" />
  </svg>,
  // Book / Learning
  <svg key="learn" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>,
  // Heart / Balance
  <svg key="balance" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8.25c-.966-1.144-2.536-1.894-4.125-1.894C5.089 6.356 3 8.466 3 11.28c0 5.775 9 10.47 9 10.47s9-4.695 9-10.47c0-2.814-2.089-4.924-4.875-4.924-1.59 0-3.159.75-4.125 1.894z" />
  </svg>,
];

export default function AboutClient() {
  const { lang } = useLanguage();
  const t = getTranslations(lang);

  const values = lang === "es"
    ? [
        { title: "Resultados primero", desc: "Medimos el exito por el impacto real en tu negocio, no por metricas de vanidad." },
        { title: "Innovacion constante", desc: "Adoptamos las ultimas tecnologias y tendencias para mantenerte siempre un paso adelante." },
        { title: "Alianza genuina", desc: "Somos una extension de tu equipo. Tu exito es nuestro exito." },
        { title: "Transparencia total", desc: "Reportes claros, comunicacion abierta y sin sorpresas en presupuesto o plazos." },
      ]
    : [
        { title: "Results first", desc: "We measure success by the real impact on your business, not vanity metrics." },
        { title: "Constant innovation", desc: "We adopt the latest technologies and trends to keep you one step ahead." },
        { title: "Genuine partnership", desc: "We're an extension of your team. Your success is our success." },
        { title: "Full transparency", desc: "Clear reports, open communication, and no surprises in budget or timelines." },
      ];

  const milestones = lang === "es" ? timelineMilestones.es : timelineMilestones.en;
  const culture = lang === "es" ? cultureData.es : cultureData.en;

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 lg:py-44 bg-primary-900 text-white">
          <ParticlesBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 to-primary-900 z-0" />

          <SectionContainer background="transparent" padding="sm">
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <ScrollReveal>
                <Badge className="mb-8 bg-accent-500 text-white border-none px-6 py-2 text-sm uppercase tracking-widest">
                  {lang === "es" ? "Sobre Nosotros" : "About Us"}
                </Badge>
                <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter">
                  {lang === "es" ? "Somos el equipo que" : "We are the team that"}
                  <span className="block text-accent-400 mt-2">
                    <Typewriter
                      words={
                        lang === "es"
                          ? ["hace crecer marcas.", "convierte datos en resultados.", "construye el futuro digital."]
                          : ["grows brands.", "turns data into results.", "builds digital futures."]
                      }
                    />
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed opacity-90">
                  {t.footer.description}
                </p>
              </ScrollReveal>
            </div>
          </SectionContainer>
        </section>

        {/* Stats strip */}
        <div className="relative z-20 -mt-16">
          <SectionContainer background="transparent" padding="sm">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
              {t.stats.items.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i * 0.07}>
                  <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 text-center group hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-black text-primary-900 tracking-tighter flex items-end justify-center gap-0.5">
                      <AnimatedNumber value={stat.number} />
                      <span className="text-accent-500 text-2xl">{stat.suffix}</span>
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mt-2 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </SectionContainer>
        </div>

        {/* Mission & Values */}
        <SectionContainer background="white" padding="xl">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
              <ScrollReveal direction="left">
                <Badge className="mb-6 text-accent-600 bg-accent-50 border border-accent-100">
                  {lang === "es" ? "Nuestra Mision" : "Our Mission"}
                </Badge>
                <h2 className="text-5xl md:text-6xl font-black text-primary-900 tracking-tighter mb-8 leading-none">
                  {lang === "es"
                    ? "Impulsar el crecimiento digital de nuestros clientes"
                    : "Driving digital growth for our clients"}
                </h2>
                <p className="text-xl text-gray-500 leading-relaxed mb-8">
                  {lang === "es"
                    ? "Fundada en 2012, CreamosTech nacio con la mision de democratizar el marketing digital de alto rendimiento para empresas de todos los tamanos. Combinamos estrategia, creatividad y tecnologia para generar resultados medibles."
                    : "Founded in 2012, CreamosTech was born with the mission to democratize high-performance digital marketing for businesses of all sizes. We combine strategy, creativity, and technology to generate measurable results."}
                </p>
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary-900 hover:bg-primary-800 text-white font-black uppercase tracking-widest text-sm rounded-full transition-all duration-300"
                  >
                    {lang === "es" ? "Trabajar con nosotros" : "Work with us"}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </MagneticButton>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="grid grid-cols-2 gap-6">
                  {values.map((v, i) => (
                    <div
                      key={v.title}
                      className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 hover:border-accent-200 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="mb-4 w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                        {valueIcons[i]}
                      </div>
                      <h3 className="text-lg font-black text-primary-900 mb-2">{v.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </SectionContainer>

        {/* Company Timeline */}
        <SectionContainer background="gray" padding="xl">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <ScrollReveal>
                <Badge className="mb-6 text-accent-600 bg-accent-50 border border-accent-100">
                  {lang === "es" ? "Nuestra Historia" : "Our Journey"}
                </Badge>
                <h2 className="text-5xl md:text-7xl font-black text-primary-900 tracking-tighter">
                  {lang === "es" ? "Hitos clave" : "Key milestones"}
                </h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-6">
                  {lang === "es"
                    ? "Mas de una decada construyendo el futuro digital, un hito a la vez."
                    : "Over a decade building the digital future, one milestone at a time."}
                </p>
              </ScrollReveal>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Central vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-200 via-accent-400 to-accent-200 hidden md:block" />
              {/* Mobile left line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-200 via-accent-400 to-accent-200 md:hidden" />

              <div className="space-y-12 md:space-y-16">
                {milestones.map((m, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <ScrollReveal key={m.year} delay={i * 0.1}>
                      <div className="relative flex items-center md:justify-center">
                        {/* Dot on line */}
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-accent-500 border-4 border-white shadow-lg shadow-accent-500/30 z-10" />

                        {/* Content card */}
                        <div
                          className={`ml-14 md:ml-0 md:w-5/12 ${
                            isLeft ? "md:mr-auto md:pr-12 md:text-right" : "md:ml-auto md:pl-12 md:text-left"
                          }`}
                        >
                          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <span className="inline-block text-sm font-black uppercase tracking-[0.2em] text-accent-500 mb-2 bg-accent-50 px-4 py-1 rounded-full">
                              {m.year}
                            </span>
                            <h3 className="text-2xl font-black text-primary-900 mb-2 tracking-tight">{m.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">{m.desc}</p>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Tech Stack */}
        <SectionContainer background="white" padding="xl">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <ScrollReveal>
                <Badge className="mb-6 text-accent-600 bg-accent-50 border border-accent-100">
                  {lang === "es" ? "Nuestras Herramientas" : "Our Tools"}
                </Badge>
                <h2 className="text-5xl md:text-7xl font-black text-primary-900 tracking-tighter">
                  Tech Stack
                </h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-6">
                  {lang === "es"
                    ? "Las tecnologias con las que construimos experiencias digitales de clase mundial."
                    : "The technologies we use to build world-class digital experiences."}
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 md:gap-6">
              {techStack.map((tech, i) => (
                <ScrollReveal key={tech.name} delay={i * 0.06}>
                  <div className="group flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-accent-200 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 aspect-square">
                    <div className="mb-3 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      {tech.icon}
                    </div>
                    <span className="text-xs font-bold text-gray-500 group-hover:text-primary-900 text-center leading-tight transition-colors duration-300">
                      {tech.name}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionContainer>

        {/* Team */}
        <SectionContainer id="team" background="gray" padding="xl">
          <div className="text-center mb-20">
            <ScrollReveal>
              <Badge className="mb-6 text-accent-600 bg-accent-50 border border-accent-100">
                {t.team.badge}
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black text-primary-900 tracking-tighter">
                {t.team.title}
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-6">{t.team.description}</p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.team.members.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.08}>
                <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-accent-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  {/* Avatar */}
                  <div className={`relative h-56 bg-gradient-to-br ${roleGradients[index % roleGradients.length]} overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center text-5xl font-black text-white shadow-2xl">
                        {member.name.charAt(0)}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-8">
                    <h3 className="text-xl font-black text-primary-900 tracking-tight">{member.name}</h3>
                    <p className="text-accent-600 font-bold text-sm uppercase tracking-widest mt-1 mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-500 leading-relaxed text-sm">{member.bio}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </SectionContainer>

        {/* Culture */}
        <SectionContainer background="white" padding="xl">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <ScrollReveal>
                <Badge className="mb-6 text-accent-600 bg-accent-50 border border-accent-100">
                  {lang === "es" ? "Nuestra Cultura" : "Our Culture"}
                </Badge>
                <h2 className="text-5xl md:text-7xl font-black text-primary-900 tracking-tighter">
                  {lang === "es" ? "Como trabajamos" : "How we work"}
                </h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-6">
                  {lang === "es"
                    ? "Creemos que la mejor tecnologia la construyen personas felices y motivadas."
                    : "We believe the best technology is built by happy, motivated people."}
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {culture.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.12}>
                  <div className="relative group bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 hover:border-accent-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                    {/* Gradient accent top bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {cultureIcons[i]}
                    </div>
                    <h3 className="text-2xl font-black text-primary-900 mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionContainer>

        {/* Process */}
        <SectionContainer id="process" background="dark" padding="xl">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <ScrollReveal>
                <Badge className="mb-6 bg-accent-500 text-white border-none">
                  {t.process.badge}
                </Badge>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                  {t.process.title}
                </h2>
                <p className="text-xl text-primary-200 max-w-2xl mx-auto mt-6">
                  {t.process.description}
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.process.steps.map((step, index) => (
                <ScrollReveal key={step.number} delay={index * 0.12}>
                  <div className="relative group">
                    {/* Connector line */}
                    {index < t.process.steps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-white/10 z-0 -translate-x-4" />
                    )}

                    <div className="relative z-10 bg-white/5 border border-white/10 rounded-[2rem] p-8 text-center hover:bg-white/10 transition-colors duration-300">
                      {/* Icon */}
                      <div className="w-20 h-20 rounded-full bg-accent-500 text-white mx-auto mb-6 flex items-center justify-center shadow-xl shadow-accent-500/30 group-hover:scale-110 transition-transform duration-300">
                        {processIcons[index]}
                      </div>

                      {/* Step number */}
                      <span className="text-xs font-black uppercase tracking-[0.3em] text-accent-400 mb-3 block">
                        {lang === "es" ? "Paso" : "Step"} {step.number}
                      </span>
                      <h3 className="text-2xl font-black text-white mb-4">{step.title}</h3>
                      <p className="text-primary-200 leading-relaxed text-sm">{step.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionContainer>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
