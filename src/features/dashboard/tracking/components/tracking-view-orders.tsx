"use client";

import { Badge } from "@/components/ui/badge";

type Line = {
  id: string;
  product: string;
  current: string;
  min: string;
  recommended: string;
  toOrder: string;
};
type Supplier = {
  id: string;
  name: string;
  orderRef: string;
  status: "Official order" | "Draft";
  at: string;
  lines: Line[];
};

const suppliers: Supplier[] = [
  {
    id: "S1",
    name: "Selvana",
    orderRef: "PO-2025-001",
    status: "Official order",
    at: "10:05 AM",
    lines: [
      {
        id: "l1",
        product: "Butter",
        current: "10.22 Kg",
        min: "20.0 Kg",
        recommended: "25.0 Kg",
        toOrder: "14.8 Kg",
      },
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
    lines: [
      {
        id: "l1",
        product: "Milk",
        current: "3.50 L",
        min: "10.0 L",
        recommended: "11.0 L",
        toOrder: "7.5 L",
      },
    ],
  },
];

function Qty({ v, critical }: { v: string; critical?: boolean }) {
  return <span className={critical ? "text-destructive font-medium" : "text-foreground"}>{v}</span>;
}

export function TrackingViewOrders() {
  return (
    <div className="bg-card rounded-xl border shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-foreground text-lg font-semibold text-pretty md:text-xl">
          Orders to Place
        </h2>
      </div>

      <div className="space-y-4 p-4">
        {suppliers.map((s) => (
          <div key={s.id} className="bg-background min-w-0 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between gap-2 border-b p-3">
              <div className="flex items-center gap-3">
                <div className="bg-muted size-8 rounded" aria-hidden />
                <div className="grid">
                  <span className="leading-tight font-medium">{s.name}</span>
                  <span className="text-muted-foreground text-xs leading-tight">{s.orderRef}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={s.status === "Official order" ? "default" : "secondary"}>
                  {s.status}
                </Badge>
                <span className="text-muted-foreground text-sm">{s.at}</span>
              </div>
            </div>

            <div className="w-full overflow-x-auto p-3">
              <table className="w-full min-w-[560px] text-sm sm:min-w-[680px]">
                <thead>
                  <tr className="text-foreground/80">
                    <th className="min-w-[160px] py-2 text-left font-medium">Products</th>
                    <th className="py-2 text-right font-medium">Current units</th>
                    <th className="py-2 text-right font-medium">Minimum</th>
                    <th className="py-2 text-right font-medium">Recommended</th>
                    <th className="py-2 text-right font-medium">To order</th>
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
  );
}

export default TrackingViewOrders;
