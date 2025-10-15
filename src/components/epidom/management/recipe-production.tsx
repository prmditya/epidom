"use client"

import { useState } from "react"
import { useI18n } from "@/components/epidom/i18n-provider"

const RECIPES = Array.from({ length: 12 }).map((_, i) => `Recipe ${i + 1}`)
const INGREDIENTS = [
  { name: "Flour", current: "20.00 Kg", used: "-0.75 Kg" },
  { name: "Sugar", current: "10.00 Kg", used: "-0.12 Kg" },
  { name: "Milk", current: "6.00 L", used: "-0.20 L" },
  { name: "Eggs", current: "60 units", used: "-06.00 units" },
  { name: "Dark chocolate", current: "12.40 Kg", used: "-0.45 Kg" },
]

export function RecipeProductionCard() {
  const { t } = useI18n()
  const [q, setQ] = useState("")
  const filtered = RECIPES.filter((r) => r.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[320px_1fr]">
      <div className="rounded-xl bg-card p-4 shadow">
        <div className="mb-3">
          <div className="rounded-full bg-muted px-3 py-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("actions.searchByName")}
              className="w-full bg-transparent text-sm outline-none"
              aria-label={t("actions.searchByName")}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
          {filtered.map((name, idx) => (
            <button key={idx} className="rounded-full border bg-background px-3 py-2 text-left text-sm hover:bg-muted">
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-card p-4 shadow">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded bg-muted" aria-hidden />
          <div>
            <p className="text-sm text-muted-foreground">{t("pages.recipe")}</p>
            <h3 className="text-lg font-semibold">Sample Recipe</h3>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border">
          <div className="grid grid-cols-3 bg-muted px-3 py-2 text-sm font-medium">
            <span>{t("pages.ingredient")}</span>
            <span className="text-right">{t("pages.currentQty")}</span>
            <span className="text-right text-destructive">{t("pages.usedQty")}</span>
          </div>
          <ul className="divide-y">
            {INGREDIENTS.map((it) => (
              <li key={it.name} className="grid grid-cols-3 px-3 py-2 text-sm">
                <span>{it.name}</span>
                <span className="text-right">{it.current}</span>
                <span className="text-right text-destructive">{it.used}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
