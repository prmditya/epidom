"use client"
import { useI18n } from "./i18n-provider"

const opts = [
  { label: "EN", value: "en" },
  { label: "FR", value: "fr" },
  { label: "ID", value: "id" },
] as const

export default function LangSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useI18n()
  return (
    <select
      aria-label="Language"
      className={`rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground ${className}`}
      value={locale}
      onChange={(e) => setLocale(e.target.value as any)}
    >
      {opts.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
