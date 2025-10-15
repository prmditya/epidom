"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { dictionaries, type Locale } from "./i18n-dictionaries"

type I18nContextType = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("locale") : null
    if (saved === "en" || saved === "fr" || saved === "id") setLocaleState(saved)
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem("locale", l)
    } catch {}
  }, [])

  const t = useCallback(
    (key: string) => {
      const parts = key.split(".")
      const dive = (obj: any) => parts.reduce((acc, p) => (acc ? acc[p] : undefined), obj)
      const cur = dive(dictionaries[locale])
      if (typeof cur === "string") return cur
      const fallback = dive(dictionaries.en)
      return typeof fallback === "string" ? fallback : key
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
