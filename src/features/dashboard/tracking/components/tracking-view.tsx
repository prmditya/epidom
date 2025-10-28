"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, XCircle, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

type Row = {
  product: string;
  currentStock: number;
  minStock: number; // Critical level - triggers red when current <= min
  maxStock: number; // Threshold - full when current >= max
  unit: string;
};

const rows: Row[] = [
  { product: "Butter", currentStock: 25.01, minStock: 5, maxStock: 20, unit: "Kg" }, // >= max: grey dark 100%
  { product: "Dark chocolate", currentStock: 23.05, minStock: 5, maxStock: 25, unit: "Kg" }, // >= max: grey dark 100%
  { product: "White chocolate", currentStock: 15, minStock: 5, maxStock: 25, unit: "Kg" }, // between: grey
  { product: "Peanuts", currentStock: 12, minStock: 5, maxStock: 20, unit: "Kg" }, // between: grey
  { product: "Strawberry", currentStock: 8, minStock: 5, maxStock: 20, unit: "Units" }, // between: grey
  { product: "Pecans", currentStock: 6, minStock: 5, maxStock: 20, unit: "Kg" }, // between: grey
  { product: "Flour", currentStock: 4, minStock: 5, maxStock: 20, unit: "Kg" }, // <= min: red
  { product: "Eggs", currentStock: 3, minStock: 5, maxStock: 20, unit: "Units" }, // <= min: red
  { product: "Lime", currentStock: 2, minStock: 5, maxStock: 20, unit: "Units" }, // <= min: red
];

function getStockStatus(currentStock: number, minStock: number, maxStock: number) {
  if (currentStock <= minStock) {
    return {
      color: "destructive",
      percentage: (currentStock / maxStock) * 100,
      status: "critical",
    } as const;
  } else if (currentStock >= maxStock) {
    return { color: "dark", percentage: 100, status: "ok" } as const;
  } else {
    return {
      color: "muted",
      percentage: (currentStock / maxStock) * 100,
      status: "warning",
    } as const;
  }
}

export function TrackingView() {
  const [searchQuery, setSearchQuery] = useState("");

  // TODO: Replace with API call - filtering will be done on backend
  // Example: const { data: rows } = useQuery(['stock', searchQuery], () => fetchStock(searchQuery));

  return (
    <div className="bg-card rounded-xl border shadow-sm">
      <div className="flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-foreground text-lg font-medium text-pretty">Active Stock Tracking</h2>
        <div className="relative w-full sm:w-64">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-foreground/80">
              <th className="py-2 pr-3 text-left font-medium">Products</th>
              <th className="w-1/2 py-2 pr-3 text-left font-medium">Level</th>
              <th className="py-2 pr-3 text-right font-medium whitespace-nowrap">Units / Weight</th>
              <th className="py-2 pl-3 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const stockStatus = getStockStatus(r.currentStock, r.minStock, r.maxStock);
              return (
                <tr key={r.product} className="border-t">
                  <td className="py-3 pr-3">{r.product}</td>
                  <td className="py-3 pr-3">
                    <Progress
                      value={stockStatus.percentage}
                      className={
                        stockStatus.color === "dark"
                          ? "bg-muted [&>div]:bg-foreground/80"
                          : stockStatus.color === "muted"
                            ? "bg-muted [&>div]:bg-foreground/40"
                            : "bg-muted [&>div]:bg-destructive"
                      }
                    />
                  </td>
                  <td className="py-3 pr-3 text-right">
                    {r.currentStock.toFixed(2)} {r.unit}
                  </td>
                  <td className="py-3 pl-3 text-right">
                    {stockStatus.status === "ok" && (
                      <CheckCircle2 className="text-primary inline size-5" aria-label="OK" />
                    )}
                    {stockStatus.status === "warning" && (
                      <AlertCircle
                        className="text-foreground/70 inline size-5"
                        aria-label="Warning"
                      />
                    )}
                    {stockStatus.status === "critical" && (
                      <XCircle className="text-destructive inline size-5" aria-label="Critical" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrackingView;
