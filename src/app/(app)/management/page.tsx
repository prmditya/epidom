"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeProductionCard } from "@/features/app/management/components/recipe-production";
import { ProductionHistoryCard } from "@/features/app/management/components/production-history";
import { EditStockCard } from "@/features/app/management/components/edit-stock";
import { OrdersTable } from "@/features/app/management/components/ordersTable";
import { OrderDetails } from "@/features/app/management/components/orderDetails";
import { UsersTable } from "@/features/app/management/components/usersTable";
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
  { id: "U-1", email: "addressemail@gmail.com", role: "Admin" },
  { id: "U-2", email: "addressemail@gmail.com", role: "Viewer" },
  { id: "U-3", email: "addressemail@gmail.com", role: "Manager" },
  { id: "U-4", email: "addressemail@gmail.com", role: "Viewer" },
  { id: "U-5", email: "addressemail@gmail.com", role: "Viewer" },
  { id: "U-6", email: "addressemail@gmail.com", role: "Viewer" },
];

export default function ManagementPage() {
  const [selected, setSelected] = useState<Order | null>(orders[0]);
  const { t } = useI18n();

  return (
    <Tabs defaultValue="delivery" className="grid gap-6 w-full overflow-hidden">
      <TabsList className="w-full justify-start overflow-x-auto whitespace-nowrap rounded-lg p-1.5 bg-muted/50 backdrop-blur-sm shadow-sm -mx-4 px-4 sm:mx-0 sm:px-1.5">
        <TabsTrigger
          className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
          value="delivery"
        >
          {t("tabs.delivery")}
        </TabsTrigger>
        <TabsTrigger
          className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
          value="recipe"
        >
          {t("tabs.recipeProduction")}
        </TabsTrigger>
        <TabsTrigger
          className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
          value="history"
        >
          {t("tabs.productionHistory")}
        </TabsTrigger>
        <TabsTrigger
          className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
          value="stock"
        >
          {t("tabs.editStock")}
        </TabsTrigger>
        <TabsTrigger
          className="shrink-0 data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
          value="permissions"
        >
          {t("tabs.managePermissions")}
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="delivery"
        className="grid gap-4 lg:grid-cols-3 w-full"
      >
        <OrdersTable
          orders={orders}
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

      <TabsContent value="permissions" className="w-full">
        <UsersTable users={users} />
      </TabsContent>
    </Tabs>
  );
}
