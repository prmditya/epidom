"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertsToggle } from "@/components/epidom/alerts-toggle"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { useI18n } from "@/components/epidom/i18n-provider"

const ordersSuppliers = [
  {
    name: "Soframa",
    contactHref: "#0434392611",
    contactLabel: "0434392611",
    status: "Order placed",
    date: "10.08.24",
    items: [
      { product: "Butter", current: "10.22 Kg", required: "20.05 Kg", toOrder: "9.83 Kg" },
      { product: "Dark chocolate", current: "10.22 Kg", required: "20.05 Kg", toOrder: "15.87 Kg" },
      { product: "Butter", current: "10.22 Kg", required: "20.05 Kg", toOrder: "12.16 Kg" },
    ],
  },
  {
    name: "Soframa",
    contactHref: "#0434392611",
    contactLabel: "0434392611",
    status: "Order placed",
    date: "10.08.24",
    items: [
      { product: "Butter", current: "10.22 Kg", required: "20.05 Kg", toOrder: "9.83 Kg" },
      { product: "Dark chocolate", current: "10.22 Kg", required: "20.05 Kg", toOrder: "15.87 Kg" },
      { product: "Butter", current: "10.22 Kg", required: "20.05 Kg", toOrder: "12.16 Kg" },
    ],
  },
  {
    name: "Soframa",
    contactHref: "#0434392611",
    contactLabel: "0434392611",
    status: "Order placed",
    date: "10.08.24",
    items: [
      { product: "Butter", current: "10.22 Kg", required: "20.05 Kg", toOrder: "9.83 Kg" },
      { product: "Milk chocolate", current: "10.22 Kg", required: "20.05 Kg", toOrder: "15.87 Kg" },
    ],
  },
]

function OrdersView() {
  const { t } = useI18n()
  return (
    <section className="space-y-6">
      <h2 className="sr-only">{t("pages.ordersTitle")}</h2>
      {ordersSuppliers.map((s, idx) => (
        <div key={idx} className="rounded-xl border bg-card shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center" aria-hidden="true">
                <span className="text-lg font-bold text-primary">{s.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base truncate">{s.name}</p>
                <a href={s.contactHref} className="text-sm text-primary hover:text-primary/80 underline underline-offset-2 truncate block transition-colors">
                  {s.contactLabel}
                </a>
              </div>
            </div>
            <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 text-xs font-semibold self-start sm:self-center">
              {t("alerts.orderPlaced")}
            </span>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[720px] px-4 sm:px-0">
              <div className="rounded-lg border overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-foreground/90 to-foreground/80 text-background text-xs font-bold px-4 py-3 flex">
                  <div className="w-2/6">{t("tables.products")}</div>
                  <div className="w-1/6 text-center">{t("tables.currentUnits")}</div>
                  <div className="w-1/6 text-center">{t("tables.recommended")}</div>
                  <div className="w-1/6 text-center">{t("tables.toOrder")}</div>
                  <div className="w-1/6 text-right pr-1">{t("tables.date")}</div>
                </div>
                <ul className="divide-y divide-border">
                  {s.items.map((it, i) => (
                    <li key={i} className="flex items-center px-4 py-3 text-sm hover:bg-muted/30 transition-colors">
                      <div className="w-2/6 font-medium">{it.product}</div>
                      <div className="w-1/6 text-center font-semibold text-red-600 dark:text-red-400">{it.current}</div>
                      <div className="w-1/6 text-center font-semibold text-emerald-600 dark:text-emerald-400">{it.required}</div>
                      <div className="w-1/6 text-center">
                        <a href="#" className="text-primary hover:text-primary/80 underline underline-offset-2 font-semibold transition-colors">
                          {it.toOrder}
                        </a>
                      </div>
                      <div className="w-1/6 text-right text-muted-foreground text-xs">{s.date}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default function AlertsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isOrders = searchParams.get("view") === "orders"
  const { t } = useI18n()

  const handleToggle = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    if (isOrders) {
      params.delete("view")
    } else {
      params.set("view", "orders")
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [isOrders, pathname, router, searchParams])

  return (
    <>
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-0 sm:px-1 py-4">
          <CardTitle className="text-xl md:text-2xl font-bold">
            {isOrders ? t("pages.ordersTitle") : t("pages.alertsTitle")}
          </CardTitle>
          <Button size="sm" className="rounded-full shadow-md hover:shadow-lg transition-all self-start sm:self-center" aria-pressed={isOrders} onClick={handleToggle}>
            {isOrders ? t("actions.backToAlerts") : t("actions.ordersToPlace")}
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {isOrders ? (
            <OrdersView />
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[640px] md:min-w-0">
                <AlertsToggle />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
