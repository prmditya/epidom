"use client"

import { Badge } from "@/components/ui/badge"

type Line = {
  id: string
  product: string
  current: string
  min: string
  recommended: string
  toOrder: string
}
type Supplier = {
  id: string
  name: string
  orderRef: string
  status: "Official order" | "Draft"
  at: string
  lines: Line[]
}

const suppliers: Supplier[] = [
  {
    id: "S1",
    name: "Selvana",
    orderRef: "PO-2025-001",
    status: "Official order",
    at: "10:05 AM",
    lines: [
      { id: "l1", product: "Butter", current: "10.22 Kg", min: "20.0 Kg", recommended: "25.0 Kg", toOrder: "14.8 Kg" },
      {
        id: "l2",
        product: "Chocolate",
        current: "9.15 Kg",
        min: "18.0 Kg",
        recommended: "22.0 Kg",
        toOrder: "12.9 Kg",
      },
    ],
  },
  {
    id: "S2",
    name: "Selvana",
    orderRef: "PO-2025-002",
    status: "Draft",
    at: "10:52 AM",
    lines: [{ id: "l1", product: "Milk", current: "3.50 L", min: "10.0 L", recommended: "11.0 L", toOrder: "7.5 L" }],
  },
]

function Qty({ v, critical }: { v: string; critical?: boolean }) {
  return <span className={critical ? "text-destructive font-medium" : "text-foreground"}>{v}</span>
}

export function TrackingViewOrders() {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-semibold text-foreground text-pretty md:text-xl">Orders to Place</h2>
      </div>

      <div className="p-4 space-y-4">
        {suppliers.map((s) => (
          <div key={s.id} className="rounded-lg border bg-background shadow-sm min-w-0">
            <div className="flex items-center justify-between gap-2 border-b p-3">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded bg-muted" aria-hidden />
                <div className="grid">
                  <span className="font-medium leading-tight">{s.name}</span>
                  <span className="text-xs text-muted-foreground leading-tight">{s.orderRef}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={s.status === "Official order" ? "default" : "secondary"}>{s.status}</Badge>
                <span className="text-sm text-muted-foreground">{s.at}</span>
              </div>
            </div>

            <div className="w-full overflow-x-auto p-3">
              <table className="w-full min-w-[560px] text-sm sm:min-w-[680px]">
                <thead>
                  <tr className="text-foreground/80">
                    <th className="text-left font-medium py-2 min-w-[160px]">Products</th>
                    <th className="text-right font-medium py-2">Current units</th>
                    <th className="text-right font-medium py-2">Minimum</th>
                    <th className="text-right font-medium py-2">Recommended</th>
                    <th className="text-right font-medium py-2">To order</th>
                  </tr>
                </thead>
                <tbody>
                  {s.lines.map((l) => (
                    <tr key={l.id} className="border-t">
                      <td className="py-2 font-medium">{l.product}</td>
                      <td className="py-2 text-right">
                        <Qty v={l.current} critical />
                      </td>
                      <td className="py-2 text-right">
                        <Qty v={l.min} />
                      </td>
                      <td className="py-2 text-right">
                        <Qty v={l.recommended} />
                      </td>
                      <td className="py-2 text-right">
                        <Qty v={l.toOrder} critical />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrackingViewOrders
