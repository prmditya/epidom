"use client";

import { useMemo, useState } from "react";

const THRESHOLDS = [
  { product: "Butter", pct: 0.8, qty: "10.22 Kg", date: "10.08.24" },
  { product: "Dark chocolate", pct: 0.6, qty: "9.15 Kg", date: "08.08.24" },
  { product: "White chocolate", pct: 0.55, qty: "7.85 Kg", date: "25.07.24" },
];

export function AlertsToggle() {
  const [ordersView, setOrdersView] = useState(false);

  return (
    <>
      {!ordersView ? (
        <div className="bg-card overflow-hidden rounded-xl border shadow">
          <div className="bg-muted grid grid-cols-[1fr_1fr_160px_140px] px-3 py-2 text-sm font-medium">
            <span>Products</span>
            <span>Threshold</span>
            <span>Units/Weight</span>
            <span>Date</span>
          </div>
          <ul className="divide-y">
            {THRESHOLDS.map((r) => (
              <li
                key={r.product}
                className="grid grid-cols-[1fr_1fr_160px_140px] items-center gap-2 px-3 py-2 text-sm"
              >
                <span>{r.product}</span>
                <div className="bg-muted h-2 w-full rounded">
                  <div
                    className="bg-destructive h-2 rounded"
                    style={{ width: `${r.pct * 100}%` }}
                  />
                </div>
                <span className="text-destructive font-medium">{r.qty}</span>
                <span>{r.date}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <OrdersLikeList />
      )}
    </>
  );
}

function OrdersLikeList() {
  const rows = useMemo(
    () => [
      {
        supplier: "Soframa",
        ref: "0434392611",
        status: "Order placed",
        items: [
          { name: "Butter", current: "10.22 Kg", min: "20.05 Kg", rec: "20.05 Kg", to: "9.83 Kg" },
          {
            name: "Dark chocolate",
            current: "10.22 Kg",
            min: "20.05 Kg",
            rec: "20.05 Kg",
            to: "15.87 Kg",
          },
          { name: "Butter", current: "10.22 Kg", min: "20.05 Kg", rec: "20.05 Kg", to: "12.16 Kg" },
        ],
        date: "10.08.24",
      },
    ],
    []
  );

  return (
    <div className="min-w-0 space-y-4">
      {rows.map((row, idx) => (
        <div key={idx} className="bg-card overflow-hidden rounded-xl shadow">
          <div className="flex items-center gap-3 border-b px-4 py-3">
            <div className="bg-muted h-10 w-10 rounded" aria-hidden />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <a href="#" className="text-sm font-medium underline">
                  {row.supplier}
                </a>
                <a href="#" className="text-muted-foreground text-xs underline">
                  {row.ref}
                </a>
                <span className="ml-2 rounded-full bg-emerald-600/15 px-2 py-0.5 text-xs text-emerald-700">
                  {row.status}
                </span>
              </div>
            </div>
            <div className="text-sm">{row.date}</div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm sm:min-w-[680px]">
              <thead className="bg-muted">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Products</th>
                  <th className="px-3 py-2 text-right font-medium">Units/Current</th>
                  <th className="px-3 py-2 text-right font-medium">Min</th>
                  <th className="px-3 py-2 text-right font-medium">Recommended</th>
                  <th className="px-3 py-2 text-right font-medium">To order</th>
                </tr>
              </thead>
              <tbody>
                {row.items.map((it, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-3 py-2">{it.name}</td>
                    <td className="text-destructive px-3 py-2 text-right">{it.current}</td>
                    <td className="px-3 py-2 text-right">{it.min}</td>
                    <td className="px-3 py-2 text-right text-emerald-600">{it.rec}</td>
                    <td className="text-primary px-3 py-2 text-right">{it.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
