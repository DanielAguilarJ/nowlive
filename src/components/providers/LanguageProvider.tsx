"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "es" | "en";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  origin: string | null;
  setOrigin: (origin: string) => void;
  openPrompt: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "nowlive-lang";
const ORIGIN_STORAGE_KEY = "nowlive-origin";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("es");
  const [origin, setOriginState] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const savedLang = (typeof window !== "undefined"
      ? (localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null)
      : null) || null;
    const savedOrigin = typeof window !== "undefined" ? localStorage.getItem(ORIGIN_STORAGE_KEY) : null;

    if (savedLang) {
      setLangState(savedLang);
    } else if (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("es")) {
      setLangState("es");
    } else {
      setLangState("en");
    }

    if (savedOrigin) {
      setOriginState(savedOrigin);
    } else {
      setShowPrompt(true);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  }, [lang]);

  const setLang = (next: Language) => {
    setLangState(next);
  };

  const setOrigin = (next: string) => {
    setOriginState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(ORIGIN_STORAGE_KEY, next);
    }
  };

  const handleSelection = (nextLang: Language, selectedOrigin: string) => {
    setLang(nextLang);
    setOrigin(selectedOrigin);
    setShowPrompt(false);
  };

  const value = useMemo(
    () => ({ lang, setLang, origin, setOrigin, openPrompt: () => setShowPrompt(true) }),
    [lang, origin]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
      {showPrompt && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <p className="text-sm font-semibold text-accent-600 uppercase tracking-wide mb-2">
              ¿Desde dónde nos visitas?
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Elige tu región e idioma</h3>
            <p className="text-gray-600 mb-6">
              Personalizamos el idioma automáticamente, pero puedes elegirlo manualmente. Podrás cambiarlo en cualquier momento.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => handleSelection("es", "LATAM/ES")}
                className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left shadow-sm transition hover:border-accent-300 hover:shadow-glow"
              >
                <span className="text-xl" aria-hidden>
                  🇪🇸
                </span>
                <span>
                  <span className="block text-sm font-semibold text-gray-900">Latinoamérica / España</span>
                  <span className="block text-xs text-gray-500">Idioma: Español</span>
                </span>
              </button>
              <button
                onClick={() => handleSelection("en", "US/Intl")}
                className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left shadow-sm transition hover:border-accent-300 hover:shadow-glow"
              >
                <span className="text-xl" aria-hidden>
                  🇺🇸
                </span>
                <span>
                  <span className="block text-sm font-semibold text-gray-900">USA / International</span>
                  <span className="block text-xs text-gray-500">Language: English</span>
                </span>
              </button>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className="mt-5 text-sm text-gray-500 hover:text-gray-700"
            >
              Ahora no
            </button>
          </div>
        </div>
      )}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
