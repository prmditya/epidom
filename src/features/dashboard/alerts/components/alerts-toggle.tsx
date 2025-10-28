"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ALERT_SUPPLIERS } from "@/mocks";

export function AlertsToggle() {
  const { t } = useI18n();

  return (
    <section className="space-y-6">
      <h2 className="sr-only">{t("pages.alertsTitle")}</h2>
      {ALERT_SUPPLIERS.map((supplier, idx) => (
        <div
          key={idx}
          className="bg-card relative z-0 rounded-xl border p-4 shadow-md transition-shadow hover:z-10 hover:shadow-lg sm:p-5"
        >
          {/* Supplier Header */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="from-primary/20 to-primary/10 text-primary bg-gradient-to-br text-lg font-bold">
                  {supplier.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold">{supplier.name}</p>
                <a
                  href={supplier.contactHref}
                  className="text-primary hover:text-primary/80 block truncate text-sm underline underline-offset-2 transition-colors"
                >
                  {supplier.contactLabel}
                </a>
              </div>
            </div>
            <Badge
              variant={supplier.status === "Critical" ? "destructive" : "outline"}
              className={
                supplier.status === "Critical"
                  ? ""
                  : "border-orange-300 bg-orange-100 text-orange-700 dark:border-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
              }
            >
              {supplier.status}
            </Badge>
          </div>

          {/* Materials Table with Progress Bars */}
          <div className="-mx-4 overflow-x-auto sm:mx-0">
            <div className="min-w-[720px] px-4 sm:px-0">
              <div className="overflow-hidden rounded-lg border shadow-sm">
                <div className="from-foreground/90 to-foreground/80 text-background flex bg-gradient-to-r px-4 py-3 text-xs font-bold">
                  <div className="w-2/6">{t("tables.products")}</div>
                  <div className="w-2/6 text-center">Stock Level</div>
                  <div className="w-1/6 text-center">{t("tables.currentUnits")}</div>
                  <div className="w-1/6 text-center">{t("tables.recommended")}</div>
                </div>
                <ul className="divide-border divide-y">
                  {supplier.items.map((item, i) => (
                    <li
                      key={i}
                      className="hover:bg-muted/30 flex items-center px-4 py-3 text-sm transition-colors"
                    >
                      <div className="w-2/6 font-medium">{item.product}</div>
                      <div className="w-2/6 px-3">
                        <Progress
                          value={item.stockPercentage * 100}
                          className="bg-muted [&>div]:bg-destructive h-2"
                        />
                      </div>
                      <div className="w-1/6 text-center font-semibold text-red-600 dark:text-red-400">
                        {item.current}
                      </div>
                      <div className="w-1/6 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                        {item.recommended}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Date Footer */}
          <div className="mt-3 text-right">
            <span className="text-muted-foreground text-xs">
              {t("tables.date")}: {supplier.date}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
