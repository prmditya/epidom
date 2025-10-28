"use client";

import { useState } from "react";
import { useI18n } from "@/components/lang/i18n-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ITEMS = Array.from({ length: 12 }).map((_, i) => `Ingredient ${i + 1}`);

export function EditStockCard() {
  const [q, setQ] = useState("");
  const { t } = useI18n();
  const filtered = ITEMS.filter((r) => r.toLowerCase().includes(q.toLowerCase()));

  // State for editable values
  const [inStock, setInStock] = useState(10);
  const [criticalLevel, setCriticalLevel] = useState(1);
  const [threshold, setThreshold] = useState(3);
  const [pricePerKg, setPricePerKg] = useState(12.4);

  const locale = (typeof navigator !== "undefined" && navigator.language) || "en";
  const nf2 = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const fmt2 = (n: number) => nf2.format(n);
  const unitKg = "Kg";
  const currency = "€";

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[320px_1fr]">
      <div className="bg-card rounded-xl p-4 shadow">
        <div className="mb-3">
          <div className="bg-muted rounded-full px-3 py-2">
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
              className="bg-background hover:bg-muted rounded-full border px-3 py-2 text-left text-sm"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 shadow">
        <div className="flex items-center gap-3">
          <div className="bg-muted h-12 w-12 rounded" aria-hidden />
          <div>
            <p className="text-muted-foreground text-sm">{t("pages.ingredient")}</p>
            <h3 className="text-lg font-semibold">Sample Ingredient</h3>
          </div>
        </div>

        <div className="mt-4 space-y-6 rounded-xl border p-6">
          {/* Read-only display values */}
          <div className="grid gap-4">
            <h4 className="text-sm font-semibold text-muted-foreground">Stock Information</h4>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <dt className="text-muted-foreground">Price per {unitKg}</dt>
              <dd className="text-right font-medium">
                {fmt2(pricePerKg)} {currency}
              </dd>
              <dt className="text-muted-foreground">Stock Value</dt>
              <dd className="text-right font-medium">
                {fmt2(inStock * pricePerKg)} {currency}
              </dd>
            </dl>
          </div>

          <div className="border-t pt-6">
            <h4 className="mb-4 text-sm font-semibold text-muted-foreground">Editable Values</h4>
            <div className="grid gap-4">
              {/* Current Stock */}
              <div className="grid gap-2">
                <Label htmlFor="inStock" className="text-sm">
                  {t("pages.inStock")} ({unitKg})
                </Label>
                <Input
                  id="inStock"
                  type="number"
                  step="0.01"
                  min="0"
                  value={inStock}
                  onChange={(e) => setInStock(parseFloat(e.target.value) || 0)}
                  className="max-w-[200px]"
                />
              </div>

              {/* Critical Level (minValue) */}
              <div className="grid gap-2">
                <Label htmlFor="criticalLevel" className="text-sm">
                  Critical Level ({unitKg})
                  <span className="text-muted-foreground ml-2 text-xs font-normal">
                    (Alerts when stock ≤ this value)
                  </span>
                </Label>
                <Input
                  id="criticalLevel"
                  type="number"
                  step="0.01"
                  min="0"
                  value={criticalLevel}
                  onChange={(e) => setCriticalLevel(parseFloat(e.target.value) || 0)}
                  className="max-w-[200px]"
                />
              </div>

              {/* Threshold (maxValue) */}
              <div className="grid gap-2">
                <Label htmlFor="threshold" className="text-sm">
                  Threshold ({unitKg})
                  <span className="text-muted-foreground ml-2 text-xs font-normal">
                    (Recommended maximum stock)
                  </span>
                </Label>
                <Input
                  id="threshold"
                  type="number"
                  step="0.01"
                  min="0"
                  value={threshold}
                  onChange={(e) => setThreshold(parseFloat(e.target.value) || 0)}
                  className="max-w-[200px]"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t pt-4">
            <Button
              className="w-full sm:w-auto"
              onClick={() => {
                console.log("Saving:", { inStock, criticalLevel, threshold });
                // TODO: Add API call to save values
              }}
            >
              {t("actions.save")} Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
