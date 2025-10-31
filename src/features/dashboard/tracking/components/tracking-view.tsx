"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/components/lang/i18n-provider";
import { StockLevelsTab } from "./stock-levels-tab";
import { MovementHistoryTab } from "./movement-history-tab";
import { TrackingDialogs } from "./tracking-dialogs";
import type { StockMovement } from "@/types/entities";
import type { StockRow } from "@/mocks/inventory.mock";

export function TrackingView() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"stock-levels" | "movement-history">("stock-levels");

  // Dialog state
  const [selectedMovement, setSelectedMovement] = useState<StockMovement | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isBulkRestockOpen, setIsBulkRestockOpen] = useState(false);
  const [selectedStockRows, setSelectedStockRows] = useState<StockRow[]>([]);

  // Handlers
  const handleBulkRestock = (rows: StockRow[]) => {
    setSelectedStockRows(rows);
    setIsBulkRestockOpen(true);
  };

  const handleMovementClick = (movement: StockMovement) => {
    setSelectedMovement(movement);
    setIsDetailsDialogOpen(true);
  };

  const handleBulkRestockClose = () => {
    setSelectedStockRows([]);
  };

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
          <StockLevelsTab onBulkRestock={handleBulkRestock} />
        </TabsContent>

        {/* Movement History Tab */}
        <TabsContent value="movement-history" className="space-y-4">
          <MovementHistoryTab onMovementClick={handleMovementClick} />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <TrackingDialogs
        isDetailsDialogOpen={isDetailsDialogOpen}
        onDetailsDialogChange={setIsDetailsDialogOpen}
        selectedMovement={selectedMovement}
        isBulkRestockOpen={isBulkRestockOpen}
        onBulkRestockChange={setIsBulkRestockOpen}
        selectedStockRows={selectedStockRows}
        onBulkRestockClose={handleBulkRestockClose}
      />
    </div>
  );
}

export default TrackingView;
