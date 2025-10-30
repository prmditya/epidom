"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeProductionCard } from "../recipe-production/recipe-production";
import { ProductionHistoryCard } from "../production-history/production-history";
import { EditStockCard } from "../edit-stock/edit-stock";
import { OrdersTable } from "../delivery/orders-table";
import { OrderDetails } from "../delivery/order-details";
import ScheduleDeliveryDialog from "../delivery/schedule-delivery-dialog";
import UpdateOrderStatusDialog from "../delivery/update-order-status-dialog";
import EditOrderDialog from "../delivery/edit-order-dialog";
import PrintOrderDialog from "../delivery/print-order-dialog";
import { useI18n } from "@/components/lang/i18n-provider";
import { MOCK_ORDERS } from "@/mocks";
import type { Order } from "@/types/entities";

export function ManagementView() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(MOCK_ORDERS[0] || null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [updateStatusDialogOpen, setUpdateStatusDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [orderToSchedule, setOrderToSchedule] = useState<Order | null>(null);
  const [orderToUpdate, setOrderToUpdate] = useState<Order | null>(null);
  const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);
  const [orderToPrint, setOrderToPrint] = useState<Order | null>(null);
  const { t } = useI18n();

  // Handler for scheduling delivery
  const handleScheduleDelivery = (order: Order) => {
    setOrderToSchedule(order);
    setScheduleDialogOpen(true);
  };

  // Handler for updating status
  const handleUpdateStatus = (order: Order) => {
    setOrderToUpdate(order);
    setUpdateStatusDialogOpen(true);
  };

  // Handler for editing order
  const handleEditOrder = (order: Order) => {
    setOrderToEdit(order);
    setEditDialogOpen(true);
  };

  // Handler for printing order
  const handlePrintOrder = (order: Order) => {
    setOrderToPrint(order);
    setPrintDialogOpen(true);
  };

  // Handler for deleting order (placeholder for now)
  const handleDeleteOrder = (orderId: string) => {
    // TODO: Implement delete confirmation
    console.log("Delete order:", orderId);
  };

  // Handler for cancelling order
  const handleCancelOrder = (orderId: string) => {
    // This will open the update status dialog with CANCELLED status
    const order = MOCK_ORDERS.find((o) => o.id === orderId);
    if (order) {
      handleUpdateStatus(order);
    }
  };

  return (
    <>
      <Tabs defaultValue="delivery" className="grid w-full gap-6">
        <TabsList className="bg-muted/50 -mx-4 w-full justify-start overflow-x-auto rounded-lg p-1.5 px-4 whitespace-nowrap shadow-sm backdrop-blur-sm sm:mx-0 sm:px-1.5">
          <TabsTrigger
            className="data-[state=active]:bg-card shrink-0 transition-all data-[state=active]:shadow-md"
            value="delivery"
          >
            {t("tabs.delivery") || "Delivery"}
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-card shrink-0 transition-all data-[state=active]:shadow-md"
            value="recipe"
          >
            {t("tabs.recipeProduction") || "Recipe Production"}
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-card shrink-0 transition-all data-[state=active]:shadow-md"
            value="history"
          >
            {t("tabs.productionHistory") || "Production History"}
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-card shrink-0 transition-all data-[state=active]:shadow-md"
            value="stock"
          >
            {t("tabs.editStock") || "Edit Stock"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="delivery" className="grid w-full gap-4 lg:grid-cols-3">
          <OrdersTable
            orders={MOCK_ORDERS}
            selectedOrder={selectedOrder}
            onOrderSelect={setSelectedOrder}
            onEditOrder={handleEditOrder}
            onScheduleDelivery={handleScheduleDelivery}
            onUpdateStatus={handleUpdateStatus}
            onPrintOrder={handlePrintOrder}
            onDeleteOrder={handleDeleteOrder}
          />
          <OrderDetails
            selectedOrder={selectedOrder}
            onEdit={handleEditOrder}
            onScheduleDelivery={handleScheduleDelivery}
            onUpdateStatus={handleUpdateStatus}
            onPrintOrder={handlePrintOrder}
            onCancelOrder={handleCancelOrder}
          />
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

      {/* Dialogs */}
      <ScheduleDeliveryDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
        order={orderToSchedule}
      />
      <UpdateOrderStatusDialog
        open={updateStatusDialogOpen}
        onOpenChange={setUpdateStatusDialogOpen}
        order={orderToUpdate}
      />
      <EditOrderDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} order={orderToEdit} />
      <PrintOrderDialog
        open={printDialogOpen}
        onOpenChange={setPrintDialogOpen}
        order={orderToPrint}
      />
    </>
  );
}
