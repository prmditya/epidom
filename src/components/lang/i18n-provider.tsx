"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { translations } from "@/locales"

export type Locale = "en" | "fr" | "id"

type I18nContextType = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

type TranslationValue = string | number | ((arg: number) => string);
type TranslationObject = { [key: string]: TranslationValue | TranslationObject };

function get(obj: TranslationObject, path: string): TranslationValue | undefined {
  return path
    .split(".")
    .reduce((acc: TranslationObject | TranslationValue | undefined, key) => 
      (acc && typeof acc === 'object' && !Array.isArray(acc) ? acc[key] : undefined), obj) as TranslationValue | undefined;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    // Check both 'locale' and 'lang' keys for backwards compatibility
    const saved =
      (typeof window !== "undefined" ? window.localStorage.getItem("locale") : null) ||
      (typeof window !== "undefined" ? window.localStorage.getItem("lang") : null)
    if (saved === "en" || saved === "fr" || saved === "id") {
      setLocaleState(saved)
      if (typeof document !== "undefined") {
        document.documentElement.lang = saved
      }
    }
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem("locale", l)
      window.localStorage.setItem("lang", l) // Store in both for compatibility
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = l
    }
  }, [])

  const t = useCallback(
    (key: string) => {
      const value = get(translations[locale], key)
      // Support function values like footer.rights(year)
      if (typeof value === "function") {
        return value(new Date().getFullYear())
      }
      // Convert number to string if needed
      return String(value ?? key)
    },
    [locale],
  )

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
