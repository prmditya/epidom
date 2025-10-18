"use client";

import React from "react";
import { translations, type Lang } from "@/locales";

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string) => string;
};

const I18nContext = React.createContext<I18nContextValue | undefined>(
  undefined
);

function get(obj: any, path: string): any {
  return path
    .split(".")
    .reduce((acc: any, key) => (acc ? acc[key] : undefined), obj);
}

export function I18nProviderIlmi({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("en");

  // initialize from localStorage or navigator
  React.useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? (localStorage.getItem("lang") as Lang | null)
        : null;
    if (stored && (stored === "en" || stored === "fr" || stored === "id")) {
      setLangState(stored);
      document.documentElement.lang = stored;
      return;
    }
    // derive from browser
    const nav =
      typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "";
    const inferred: Lang = nav.startsWith("fr")
      ? "fr"
      : nav.startsWith("id")
      ? "id"
      : "en";
    setLangState(inferred);
    document.documentElement.lang = inferred;
  }, []);

  const setLang = React.useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  }, []);

  const t = React.useCallback(
    (path: string) => {
      const value = get(translations[lang], path);
      if (typeof value === "function") {
        // functions like footer.rights(year)
        return value(new Date().getFullYear());
      }
      return value ?? path;
    },
    [lang]
  );

  const value: I18nContextValue = { lang, setLang, t };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
