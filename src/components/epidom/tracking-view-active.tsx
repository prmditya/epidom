"use client"

import { CheckCircle2, AlertCircle, XCircle } from "lucide-react"

type Row = {
  product: string
  levelPct: number // 0..100
  quantity: string
  status: "ok" | "warning" | "critical"
}

const rows: Row[] = [
  { product: "Butter", levelPct: 82, quantity: "25.01 Kg", status: "ok" },
  { product: "Dark chocolate", levelPct: 76, quantity: "23.05 Kg", status: "ok" },
  { product: "White chocolate", levelPct: 71, quantity: "22.91 Kg", status: "ok" },
  { product: "Peanuts", levelPct: 61, quantity: "18.02 Kg", status: "ok" },
  { product: "Strawberry", levelPct: 38, quantity: "19 Units", status: "warning" },
  { product: "Pecans", levelPct: 33, quantity: "17.09 Kg", status: "warning" },
  { product: "Flour", levelPct: 18, quantity: "2.01 Kg", status: "critical" },
  { product: "Eggs", levelPct: 12, quantity: "5 Units", status: "critical" },
  { product: "Lime", levelPct: 5, quantity: "2 Units", status: "critical" },
]

function LevelBar({ pct, color }: { pct: number; color: "primary" | "muted" | "destructive" }) {
  return (
    <div className="w-full h-2 rounded-full bg-muted">
      <div
        className={
          color === "primary"
            ? "bg-primary h-2 rounded-full"
            : color === "destructive"
              ? "bg-destructive h-2 rounded-full"
              : "bg-foreground/60 h-2 rounded-full"
        }
        style={{ width: `${Math.min(Math.max(pct, 0), 100)}%` }}
      />
    </div>
  )
}

export function TrackingViewActive() {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-medium text-foreground text-pretty">Active Stock Tracking</h2>
      </div>

      <div className="overflow-x-auto p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-foreground/80">
              <th className="text-left font-medium py-2 pr-3">Products</th>
              <th className="text-left font-medium py-2 pr-3 w-1/2">Level</th>
              <th className="text-right font-medium py-2 pr-3 whitespace-nowrap">Units / Weight</th>
              <th className="text-right font-medium py-2 pl-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.product} className="border-t">
                <td className="py-3 pr-3">{r.product}</td>
                <td className="py-3 pr-3">
                  <LevelBar
                    pct={r.levelPct}
                    color={r.status === "ok" ? "primary" : r.status === "warning" ? "muted" : "destructive"}
                  />
                </td>
                <td className="py-3 pr-3 text-right">{r.quantity}</td>
                <td className="py-3 pl-3 text-right">
                  {r.status === "ok" && <CheckCircle2 className="inline size-5 text-primary" aria-label="OK" />}
                  {r.status === "warning" && (
                    <AlertCircle className="inline size-5 text-foreground/70" aria-label="Warning" />
                  )}
                  {r.status === "critical" && (
                    <XCircle className="inline size-5 text-destructive" aria-label="Critical" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TrackingViewActive
