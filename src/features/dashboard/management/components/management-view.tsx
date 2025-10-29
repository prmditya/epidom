"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeProductionCard } from "./recipe-production";
import { ProductionHistoryCard } from "./production-history";
import { EditStockCard } from "./edit-stock";
import { OrdersTable } from "./orders-table";
import { OrderDetails } from "./order-details";
import { useI18n } from "@/components/lang/i18n-provider";
import { MOCK_ORDERS } from "@/mocks";
import type { Order } from "@/types/entities";

export function ManagementView() {
  const [selected, setSelected] = useState<Order | null>(MOCK_ORDERS[0] || null);
  const { t } = useI18n();

  return (
    <Tabs defaultValue="delivery" className="grid w-full gap-6">
      <TabsList className="bg-muted/50 -mx-4 w-full justify-start overflow-x-auto rounded-lg p-1.5 px-4 whitespace-nowrap shadow-sm backdrop-blur-sm sm:mx-0 sm:px-1.5">
        <TabsTrigger
          className="data-[state=active]:bg-card shrink-0 transition-all data-[state=active]:shadow-md"
          value="delivery"
        >
          {t("tabs.delivery")}
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-card shrink-0 transition-all data-[state=active]:shadow-md"
          value="recipe"
        >
          {t("tabs.recipeProduction")}
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-card shrink-0 transition-all data-[state=active]:shadow-md"
          value="history"
        >
          {t("tabs.productionHistory")}
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-card shrink-0 transition-all data-[state=active]:shadow-md"
          value="stock"
        >
          {t("tabs.editStock")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="delivery" className="grid w-full gap-4 lg:grid-cols-3">
        <OrdersTable
          orders={MOCK_ORDERS}
          selectedOrder={selected}
          onOrderSelect={setSelected}
        />
        <OrderDetails selectedOrder={selected} />
      </TabsContent>

      <TabsContent value="recipe">
        <RecipeProductionCard />
      </TabsContent>

      <TabsContent value="history">
        <ProductionHistoryCard />
      </TabsContent>

      <TabsContent value="stock">
        <EditStockCard />
      </TabsContent>
    </Tabs>
  );
}
