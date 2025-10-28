"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, XCircle, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { MOCK_STOCK_ROWS } from "@/mocks";

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
  const filteredRows = MOCK_STOCK_ROWS.filter((row) =>
    row.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            {filteredRows.map((r) => {
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
