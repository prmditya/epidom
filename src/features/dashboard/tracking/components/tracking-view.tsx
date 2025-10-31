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

  return (
    <div className="min-h-[calc(100vh-150px)] space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid gap-2">
          <h1 className="text-4xl font-bold tracking-tight">{t("nav.tracking")}</h1>
          <p className="text-muted-foreground text-sm">{t("pages.trackingStatus")}</p>
        </div>
      </div>

      <StockLevelsTab />
    </div>
  );
}

export default TrackingView;
