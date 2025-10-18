"use client";

import { useState } from "react";
import { useI18n } from "@/components/lang/i18n-provider";

const ITEMS = Array.from({ length: 12 }).map((_, i) => `Ingredient ${i + 1}`);

export function EditStockCard() {
  const [q, setQ] = useState("");
  const { t } = useI18n();
  const filtered = ITEMS.filter((r) =>
    r.toLowerCase().includes(q.toLowerCase())
  );

  const locale =
    (typeof navigator !== "undefined" && navigator.language) || "en";
  const nf2 = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const fmt2 = (n: number) => nf2.format(n);
  const unitKg = "Kg";
  const currency = "€";

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
          {filtered.map((name) => (
            <button
              key={name}
              className="rounded-full border bg-background px-3 py-2 text-left text-sm hover:bg-muted"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-card p-4 shadow">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded bg-muted" aria-hidden />
          <div>
            <p className="text-sm text-muted-foreground">
              {t("pages.ingredient")}
            </p>
            <h3 className="text-lg font-semibold">Sample Ingredient</h3>
          </div>
        </div>

        <div className="mt-4 grid gap-2 rounded-xl border p-4">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt>{t("pages.inStock")}</dt>
            <dd className="text-right">
              {fmt2(10)} {unitKg}
            </dd>
            <dt>Critical Level</dt>
            <dd className="text-right">
              {fmt2(1)} {unitKg}
            </dd>
            <dt>Threshold</dt>
            <dd className="text-right">
              {fmt2(3)} {unitKg}
            </dd>
            <dt>Price (Kg)</dt>
            <dd className="text-right">
              {fmt2(12.4)} {currency}
            </dd>
            <dt>Stock Value</dt>
            <dd className="text-right">
              {fmt2(124)} {currency}
            </dd>
          </dl>

          <div className="mt-2 flex items-center gap-2">
            <label htmlFor="adjust" className="text-sm">
              {t("pages.adjustStock")}
            </label>
            <input
              id="adjust"
              type="number"
              step="0.01"
              className="w-32 rounded-md border bg-background px-2 py-1 text-sm"
              defaultValue={10}
            />
            <button className="rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground">
              {t("actions.save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
