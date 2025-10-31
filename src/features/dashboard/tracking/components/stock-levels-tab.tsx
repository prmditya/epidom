"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, XCircle, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ExportButton } from "@/components/ui/export-button";
import { useI18n } from "@/components/lang/i18n-provider";
import { MOCK_STOCK_ROWS } from "@/mocks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export function StockLevelsTab() {
  const { t } = useI18n();

  // State
  const [stockSearchQuery, setStockSearchQuery] = useState("");

  // Filter stock rows
  const filteredStockRows = MOCK_STOCK_ROWS.filter((row) =>
    row.product.toLowerCase().includes(stockSearchQuery.toLowerCase())
  );

  // Export data
  const stockExportData = filteredStockRows.map((row) => ({
    Product: row.product,
    "Current Stock": row.currentStock,
    Unit: row.unit,
    "Min Stock": row.minStock,
    "Max Stock": row.maxStock,
  }));

  return (
    <div className="space-y-4">
      {/* Stock Table Card */}
      <div className="bg-card rounded-xl border shadow-sm">
        <div className="flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-foreground text-lg font-medium text-pretty">
            {t("tracking.stockLevels")}
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                type="text"
                placeholder={t("actions.searchPlaceholder")}
                value={stockSearchQuery}
                onChange={(e) => setStockSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <ExportButton
              data={stockExportData}
              filename="stock-levels"
              variant="outline"
              size="sm"
            />
          </div>
        </div>

        <div className="p-4">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow className="text-foreground/80">
                <TableHead className="py-2 pr-3 text-left font-medium">
                  {t("tables.products")}
                </TableHead>
                <TableHead className="w-1/2 py-2 pr-3 text-left font-medium">
                  {t("tracking.stockLevel")}
                </TableHead>
                <TableHead className="py-2 pr-3 text-right font-medium whitespace-nowrap">
                  {t("tables.currentUnits")}
                </TableHead>
                <TableHead className="py-2 pl-3 text-right font-medium">
                  {t("tables.status")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStockRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">
                    {t("messages.noResults")}
                  </TableCell>
                </TableRow>
              ) : (
                filteredStockRows.map((r) => {
                  const stockStatus = getStockStatus(r.currentStock, r.minStock, r.maxStock);
                  return (
                    <TableRow key={r.product} className={`border-t`}>
                      <TableCell className="py-3 pr-3">{r.product}</TableCell>
                      <TableCell className="py-3 pr-3">
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
                      </TableCell>
                      <TableCell className="py-3 pr-3 text-right">
                        {r.currentStock.toFixed(2)} {r.unit}
                      </TableCell>
                      <TableCell className="py-3 pl-3 text-right">
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
                          <XCircle
                            className="text-destructive inline size-5"
                            aria-label="Critical"
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
