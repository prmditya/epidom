"use client";

import { useI18n } from "@/components/lang/i18n-provider";

const ROWS = [
  { recipe: "Cocoa powder", at: "2024-07-08 23:11" },
  { recipe: "Butter", at: "2024-07-09 07:04" },
  { recipe: "Milk chocolate", at: "2024-07-12 09:11" },
  { recipe: "Lemon", at: "2024-07-16 12:04" },
  { recipe: "Strawberry", at: "2024-07-21 08:11" },
];

export function ProductionHistoryCard() {
  const { t } = useI18n();
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button className="rounded-full bg-muted px-3 py-1.5 text-sm hover:bg-muted/80">
          {t("actions.today")}
        </button>
        <button className="rounded-full bg-muted px-3 py-1.5 text-sm hover:bg-muted/80">
          {t("actions.thisWeek")}
        </button>
        <button className="rounded-full bg-muted px-3 py-1.5 text-sm hover:bg-muted/80">
          {t("actions.thisMonth")}
        </button>
        <button className="ml-auto rounded-full border px-3 py-1.5 text-sm">
          {t("actions.archive")}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow">
        <div className="grid grid-cols-[1fr_200px] bg-muted px-3 py-2 text-sm font-medium">
          <span>{t("tables.recipe")}</span>
          <span>{t("pages.dateTime")}</span>
        </div>
        <ul className="divide-y">
          {ROWS.map((r) => (
            <li
              key={r.recipe + r.at}
              className="grid grid-cols-[1fr_200px] px-3 py-2 text-sm"
            >
              <span>{r.recipe}</span>
              <span>{r.at}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
