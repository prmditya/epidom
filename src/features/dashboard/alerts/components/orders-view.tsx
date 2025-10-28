"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ORDERS_SUPPLIERS } from "@/mocks";

export function OrdersView() {
  const { t } = useI18n();
  return (
    <section className="space-y-6">
      <h2 className="sr-only">{t("pages.ordersTitle")}</h2>
      {ORDERS_SUPPLIERS.map((s, idx) => (
        <div
          key={idx}
          className="bg-card relative z-0 rounded-xl border p-4 shadow-md transition-shadow hover:z-10 hover:shadow-lg sm:p-5"
        >
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="from-primary/20 to-primary/10 text-primary bg-gradient-to-br text-lg font-bold">
                  {s.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold">{s.name}</p>
                <a
                  href={s.contactHref}
                  className="text-primary hover:text-primary/80 block truncate text-sm underline underline-offset-2 transition-colors"
                >
                  {s.contactLabel}
                </a>
              </div>
            </div>
            <Badge className="border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              {t("alerts.orderPlaced")}
            </Badge>
          </div>

          <div className="-mx-4 overflow-x-auto sm:mx-0">
            <div className="min-w-[720px] px-4 sm:px-0">
              <div className="overflow-hidden rounded-lg border shadow-sm">
                <div className="from-foreground/90 to-foreground/80 text-background flex bg-gradient-to-r px-4 py-3 text-xs font-bold">
                  <div className="w-2/6">{t("tables.products")}</div>
                  <div className="w-1/6 text-center">{t("tables.currentUnits")}</div>
                  <div className="w-1/6 text-center">{t("tables.recommended")}</div>
                  <div className="w-1/6 text-center">{t("tables.toOrder")}</div>
                  <div className="w-1/6 pr-1 text-right">{t("tables.date")}</div>
                </div>
                <ul className="divide-border divide-y">
                  {s.items.map((it, i) => (
                    <li
                      key={i}
                      className="hover:bg-muted/30 flex items-center px-4 py-3 text-sm transition-colors"
                    >
                      <div className="w-2/6 font-medium">{it.product}</div>
                      <div className="w-1/6 text-center font-semibold text-red-600 dark:text-red-400">
                        {it.current}
                      </div>
                      <div className="w-1/6 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                        {it.required}
                      </div>
                      <div className="w-1/6 text-center">
                        <a
                          href="#"
                          className="text-primary hover:text-primary/80 font-semibold underline underline-offset-2 transition-colors"
                        >
                          {it.toOrder}
                        </a>
                      </div>
                      <div className="text-muted-foreground w-1/6 text-right text-xs">{s.date}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
