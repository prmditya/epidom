"use client"

import { useI18n } from "@/components/epidom/i18n-provider"

export function DataManageView() {
  const { t } = useI18n()
  const Column = ({ title }: { title: string }) => (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">{title}</h4>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <button key={i} className="rounded-full border bg-background px-3 py-2 text-left text-sm hover:bg-muted">
            Item
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr_1fr_380px]">
      <div className="xl:col-span-3 rounded-xl bg-card p-4 shadow">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Column title={t("pages.manageData") + " — " + t("pages.materialsList")} />
          <Column title={t("pages.manageData") + " — " + t("pages.recipesList")} />
          <Column title={t("pages.manageData") + " — " + t("pages.suppliersList")} />
        </div>
      </div>

      <aside className="rounded-xl bg-card p-4 shadow">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded bg-muted" aria-hidden />
          <div>
            <h3 className="text-lg font-semibold">{t("pages.classic")}</h3>
            <p className="text-sm text-muted-foreground">{t("pages.recipe")}</p>
          </div>
        </div>

        <div className="mt-4 grid gap-3">
          <div className="overflow-hidden rounded-xl border">
            <div className="bg-muted px-3 py-2 text-sm font-medium">{t("pages.ingredientSheet")}</div>
            <ul className="divide-y text-sm">
              {[
                { n: "Butter", q: "-0.75 Kg" },
                { n: "Wheat flour", q: "-0.132 Kg" },
                { n: "Sugar", q: "-0.20 Kg" },
              ].map((x) => (
                <li key={x.n} className="flex items-center justify-between px-3 py-2">
                  <span>{x.n}</span>
                  <span className="text-right">{x.q}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-xl border">
            <div className="bg-muted px-3 py-2 text-sm font-medium">{t("pages.editIngredients")}</div>
            <ul className="divide-y">
              {Array.from({ length: 8 }).map((_, i) => (
                <li key={i} className="flex items-center gap-2 px-3 py-2 text-sm">
                  <span className="flex-1">Ingredient</span>
                  <input className="w-24 rounded-md border bg-background px-2 py-1 text-right" defaultValue={0.0} />
                  <button
                    aria-label="Remove"
                    className="ml-1 h-6 w-6 rounded-full bg-destructive/10 text-destructive"
                    title="Remove"
                  >
                    ●
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-2 px-3 py-2">
              <button className="rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground">
                {t("actions.save")}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
