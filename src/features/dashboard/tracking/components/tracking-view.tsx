"use client";

import { useState, useMemo } from "react";
import { CheckCircle2, AlertCircle, XCircle, Search, PackagePlus, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExportButton } from "@/components/ui/export-button";
import { useI18n } from "@/components/lang/i18n-provider";
import { MOCK_STOCK_ROWS, MOCK_STOCK_MOVEMENTS } from "@/mocks";
import { MovementFiltersComponent, type MovementFilters } from "./movement-filters";
import { MovementsTable } from "./movements-table";
import { MovementDetailsDialog } from "./movement-details-dialog";
import { AddMovementDialog } from "./add-movement-dialog";
import { BulkRestockDialog } from "./bulk-restock-dialog";
import { StockHistoryDialog } from "./stock-history-dialog";
import RestockDialog from "./restock-dialog";
import type { StockMovement } from "@/types/entities";
import type { DateRange } from "react-day-picker";
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

export function TrackingView() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"stock-levels" | "movement-history">("stock-levels");

  // Stock Levels State
  const [stockSearchQuery, setStockSearchQuery] = useState("");
  const [selectedStockItems, setSelectedStockItems] = useState<string[]>([]); // Track by product name
  const [isBulkRestockOpen, setIsBulkRestockOpen] = useState(false);

  // Movement History State & Filters
  const [movementFilters, setMovementFilters] = useState<MovementFilters>({
    search: "",
    types: [],
    dateRange: undefined,
  });

  // Pagination state (for backend API)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Dialog state
  const [selectedMovement, setSelectedMovement] = useState<StockMovement | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  // TODO: Replace with TanStack Query hook for fetching movements
  // Example implementation:
  // const { data: movementsData, isLoading, error, refetch } = useQuery({
  //   queryKey: ['movements', movementFilters, currentPage, pageSize],
  //   queryFn: () => fetchMovements({
  //     search: movementFilters.search,
  //     types: movementFilters.types,
  //     dateFrom: movementFilters.dateRange?.from?.toISOString(),
  //     dateTo: movementFilters.dateRange?.to?.toISOString(),
  //     page: currentPage,
  //     limit: pageSize,
  //   }),
  // });
  //
  // const movements = movementsData?.movements || [];
  // const totalCount = movementsData?.totalCount || 0;

  const handleApplyFilters = () => {
    console.log("Applying filters for TanStack Query:", {
      ...movementFilters,
      page: currentPage,
      limit: pageSize,
    });
    // When using TanStack Query, simply call refetch() or the query will auto-refetch
    // when dependencies in queryKey change
  };

  // TODO: Remove mock data when API is ready
  // For now, using mock data to demonstrate UI
  const filteredStockRows = MOCK_STOCK_ROWS.filter((row) =>
    row.product.toLowerCase().includes(stockSearchQuery.toLowerCase())
  );

  // TODO: Replace with data from TanStack Query (see useQuery hook above)
  // When using TanStack Query:
  // const movements = movementsData?.movements || [];
  // For now, using mock data:
  const movements: StockMovement[] = MOCK_STOCK_MOVEMENTS;

  // Export data formatters
  const stockExportData = filteredStockRows.map((row) => ({
    Product: row.product,
    "Current Stock": row.currentStock,
    Unit: row.unit,
    "Min Stock": row.minStock,
    "Max Stock": row.maxStock,
  }));

  const movementsExportData = movements.map((mov) => ({
    Date: new Date(mov.createdAt).toLocaleString(),
    Material: mov.materialId || "",
    Type: mov.type,
    Quantity: `${mov.quantity} ${mov.unit}`,
    Reason: mov.reason,
    User: mov.userName,
    Reference: mov.referenceId || "-",
  }));

  // Bulk selection handlers
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
    setIsBulkRestockOpen(true);
  };

  // Get selected stock row objects for bulk actions
  const selectedStockRows = useMemo(() => {
    return filteredStockRows.filter((row) => selectedStockItems.includes(row.product));
  }, [filteredStockRows, selectedStockItems]);

  // Check if all visible items are selected
  const isAllSelected =
    filteredStockRows.length > 0 && selectedStockItems.length === filteredStockRows.length;
  const isSomeSelected =
    selectedStockItems.length > 0 && selectedStockItems.length < filteredStockRows.length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid gap-2">
          <h1 className="text-4xl font-bold tracking-tight">{t("nav.tracking")}</h1>
          <p className="text-muted-foreground text-sm">{t("pages.trackingStatus")}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as typeof activeTab)}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="stock-levels">{t("tabs.stockLevels")}</TabsTrigger>
          <TabsTrigger value="movement-history">{t("tabs.movementHistory")}</TabsTrigger>
        </TabsList>

        {/* Stock Levels Tab */}
        <TabsContent value="stock-levels" className="space-y-4">
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
        </TabsContent>

        {/* Movement History Tab */}
        <TabsContent value="movement-history" className="space-y-4">
          <div className="bg-card rounded-xl border p-4 shadow-sm">
            {/* Filters */}
            <div className="mb-4">
              <MovementFiltersComponent
                filters={movementFilters}
                onFiltersChange={setMovementFilters}
                onApplyFilters={handleApplyFilters}
              />
            </div>

            {/* Header with Actions */}
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-lg font-medium">{t("tracking.movementHistory")}</h2>
                <p className="text-muted-foreground text-sm">
                  {t("tracking.showingMovements").replace("{count}", movements.length.toString())}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ExportButton
                  data={movementsExportData}
                  filename="stock-movements"
                  variant="outline"
                  size="sm"
                />
                <AddMovementDialog />
              </div>
            </div>

            {/* Movements Table */}
            <MovementsTable
              movements={movements}
              totalCount={movements.length} // TODO: Get from API response
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={(page) => {
                setCurrentPage(page);
                handleApplyFilters(); // Triggers API call with new page
              }}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1); // Reset to first page
                handleApplyFilters(); // Triggers API call with new page size
              }}
              onSortChange={(field, order) => {
                console.log("Sort changed:", field, order);
                // TODO: With TanStack Query, sorting params should be in queryKey
                // Add sortField and sortOrder to state, then the query will auto-refetch
                // Example:
                // setSortField(field);
                // setSortOrder(order);
                // queryKey: ['movements', filters, page, pageSize, field, order]
              }}
              onRowClick={(movement) => {
                setSelectedMovement(movement);
                setIsDetailsDialogOpen(true);
              }}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Movement Details Dialog */}
      <MovementDetailsDialog
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        movement={selectedMovement}
      />

      {/* Bulk Restock Dialog */}
      <BulkRestockDialog
        selectedItems={selectedStockRows}
        open={isBulkRestockOpen}
        onOpenChange={(open) => {
          setIsBulkRestockOpen(open);
          // Clear selection after dialog closes
          if (!open) {
            handleClearSelection();
          }
        }}
      />
    </div>
  );
}

export default TrackingView;
