"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeProductionCard } from "@/features/dashboard/management/components/recipe-production";
import { ProductionHistoryCard } from "@/features/dashboard/management/components/production-history";
import { EditStockCard } from "@/features/dashboard/management/components/edit-stock";
import { OrdersTable } from "@/features/dashboard/management/components/orders-table";
import { OrderDetails } from "@/features/dashboard/management/components/order-details";
import { UsersTable } from "@/features/dashboard/management/components/users-table";
import { useI18n } from "@/components/lang/i18n-provider";

type Order = {
  id: string;
  name: string;
  date: string;
  status: "Pending" | "Processing" | "Delivered";
};
type UserRow = {
  id: string;
  email: string;
  role: "Admin" | "Manager" | "Viewer";
};

const orders: Order[] = [
  { id: "O-1001", name: "Baguette x50", date: "2025-10-15", status: "Pending" },
  {
    id: "O-1002",
    name: "Croissant x80",
    date: "2025-10-15",
    status: "Processing",
  },
  {
    id: "O-1003",
    name: "Pain au chocolat x60",
    date: "2025-10-16",
    status: "Pending",
  },
  {
    id: "O-1004",
    name: "Brioche x20",
    date: "2025-10-16",
    status: "Delivered",
  },
];

const users: UserRow[] = [
  { id: "U-1", email: "mrcaoevan@gmail.com", role: "Admin" },
  { id: "U-2", email: "mrcaoevan@gmail.com", role: "Viewer" },
  { id: "U-3", email: "mrcaoevan@gmail.com", role: "Manager" },
  { id: "U-4", email: "mrcaoevan@gmail.com", role: "Viewer" },
  { id: "U-5", email: "mrcaoevan@gmail.com", role: "Viewer" },
  { id: "U-6", email: "mrcaoevan@gmail.com", role: "Viewer" },
];

export default function ManagementPage() {
  const [selected, setSelected] = useState<Order | null>(orders[0]);
  const { t } = useI18n();

  return (
    <Tabs defaultValue="delivery" className="grid w-full gap-6 overflow-hidden">
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
        <OrdersTable orders={orders} selectedOrder={selected} onOrderSelect={setSelected} />
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
