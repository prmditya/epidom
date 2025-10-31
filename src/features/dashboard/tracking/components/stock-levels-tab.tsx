"use client";

import { useState, useMemo } from "react";
import { CheckCircle2, AlertCircle, XCircle, Search, PackagePlus, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ExportButton } from "@/components/ui/export-button";
import { useI18n } from "@/components/lang/i18n-provider";
import { MOCK_STOCK_ROWS } from "@/mocks";
import type { StockRow } from "@/mocks/inventory.mock";

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

interface StockLevelsTabProps {
  onBulkRestock: (selectedRows: StockRow[]) => void;
}

export function StockLevelsTab({ onBulkRestock }: StockLevelsTabProps) {
  const { t } = useI18n();

  // State
  const [stockSearchQuery, setStockSearchQuery] = useState("");
  const [selectedStockItems, setSelectedStockItems] = useState<string[]>([]);

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

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStockItems(filteredStockRows.map((row) => row.product));
    } else {
      setSelectedStockItems([]);
    }
  };

  const handleSelectItem = (productName: string, checked: boolean) => {
    if (checked) {
      setSelectedStockItems([...selectedStockItems, productName]);
    } else {
      setSelectedStockItems(selectedStockItems.filter((p) => p !== productName));
    }
  };

  const handleClearSelection = () => {
    setSelectedStockItems([]);
  };

  const handleBulkRestock = () => {
    onBulkRestock(selectedStockRows);
  };

  // Get selected stock row objects
  const selectedStockRows = useMemo(() => {
    return filteredStockRows.filter((row) => selectedStockItems.includes(row.product));
  }, [filteredStockRows, selectedStockItems]);

  // Check selection state
  const isAllSelected =
    filteredStockRows.length > 0 && selectedStockItems.length === filteredStockRows.length;
  const isSomeSelected =
    selectedStockItems.length > 0 && selectedStockItems.length < filteredStockRows.length;

  return (
    <div className="space-y-4">
      {/* Bulk Actions Toolbar */}
      {selectedStockItems.length > 0 && (
        <div className="bg-primary/10 border-primary/20 flex items-center justify-between gap-4 rounded-lg border px-4 py-3">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
              aria-label={t("tracking.selectAll")}
            />
            <span className="text-sm font-medium">
              {t("tracking.itemsSelected").replace(
                "{count}",
                selectedStockItems.length.toString()
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="default" onClick={handleBulkRestock} className="gap-2">
              <PackagePlus className="h-4 w-4" />
              {t("tracking.restockSelected")}
            </Button>
            <ExportButton
              data={selectedStockRows.map((row) => ({
                Product: row.product,
                "Current Stock": row.currentStock,
                Unit: row.unit,
                "Min Stock": row.minStock,
                "Max Stock": row.maxStock,
              }))}
              filename="selected-stock-items"
              variant="outline"
              size="sm"
            />
            <Button size="sm" variant="ghost" onClick={handleClearSelection} className="gap-2">
              <X className="h-4 w-4" />
              {t("tracking.clearSelection")}
            </Button>
          </div>
        </div>
      )}

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
          <table className="w-full text-sm">
            <thead>
              <tr className="text-foreground/80">
                <th className="py-2 pr-3 text-left">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                    aria-label={t("tracking.selectAll")}
                  />
                </th>
                <th className="py-2 pr-3 text-left font-medium">{t("tables.products")}</th>
                <th className="w-1/2 py-2 pr-3 text-left font-medium">
                  {t("tracking.stockLevel")}
                </th>
                <th className="py-2 pr-3 text-right font-medium whitespace-nowrap">
                  {t("tables.currentUnits")}
                </th>
                <th className="py-2 pl-3 text-right font-medium">{t("tables.status")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredStockRows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-muted-foreground py-8 text-center">
                    {t("messages.noResults")}
                  </td>
                </tr>
              ) : (
                filteredStockRows.map((r) => {
                  const stockStatus = getStockStatus(r.currentStock, r.minStock, r.maxStock);
                  const isSelected = selectedStockItems.includes(r.product);
                  return (
                    <tr
                      key={r.product}
                      className={`border-t ${isSelected ? "bg-primary/5" : ""}`}
                    >
                      <td className="py-3 pr-2">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            handleSelectItem(r.product, checked as boolean)
                          }
                          aria-label={`${t("tracking.selectItem")} ${r.product}`}
                        />
                      </td>
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
                          <CheckCircle2
                            className="text-primary inline size-5"
                            aria-label="OK"
                          />
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
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
