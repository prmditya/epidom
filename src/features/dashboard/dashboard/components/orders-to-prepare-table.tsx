"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/components/lang/i18n-provider";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import ViewOrderDialog from "./view-order-dialog";
import { ExportButton } from "@/components/ui/export-button";
import type { Order } from "@/types/entities";
import { formatDate, formatCurrency } from "@/lib/utils/formatting";
import { CheckSquare, Trash2, FileEdit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface OrdersToPrepareTableProps {
  orders: Order[];
}

export default function OrdersToPrepareTable({ orders }: OrdersToPrepareTableProps) {
  const { t } = useI18n();
  const { toast } = useToast();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Select all / deselect all
  const allSelected = orders.length > 0 && selectedIds.length === orders.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < orders.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(orders.map((o) => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, orderId]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== orderId));
    }
  };

  const handleMarkAsProcessing = () => {
    // TODO: API call to update order statuses
    toast({
      title: "Orders Updated",
      description: `${selectedIds.length} order(s) marked as processing.`,
    });
    setSelectedIds([]);
  };

  const handleAssignToProduction = () => {
    // TODO: API call to assign orders to production
    toast({
      title: "Orders Assigned",
      description: `${selectedIds.length} order(s) assigned to production.`,
    });
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    // TODO: API call to delete orders
    toast({
      title: "Orders Deleted",
      description: `${selectedIds.length} order(s) deleted successfully.`,
      variant: "destructive",
    });
    setSelectedIds([]);
    setIsDeleteDialogOpen(false);
  };

  const handleExportSelected = () => {
    const selectedOrders = orders.filter((o) => selectedIds.includes(o.id));
    const exportData = selectedOrders.map((order) => ({
      "Order Number": order.orderNumber,
      Customer: order.customerName || "—",
      Email: order.customerEmail || "—",
      "Delivery Date": order.deliveryDate ? formatDate(order.deliveryDate) : "—",
      Status: order.status,
      Total: formatCurrency(order.total),
      "Items Count": order.items?.length || 0,
    }));

    return exportData;
  };

  return (
    <>
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg">{t("pages.ordersToPrepare")}</CardTitle>
          {selectedIds.length === 0 && (
            <div className="text-muted-foreground text-sm">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </div>
          )}
        </CardHeader>

        {/* Bulk Actions Toolbar */}
        <div className="bg-muted/50 flex h-[65px] items-center justify-between border-y px-6 py-3">
          <div className="scrollbar-hide flex w-full items-center justify-between overflow-auto">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">{selectedIds.length} selected</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(
                    "gap-2",
                    selectedIds.length === 0 && "pointer-events-none opacity-50"
                  )}
                  onClick={handleMarkAsProcessing}
                >
                  <CheckSquare className="h-4 w-4" />
                  Mark as Processing
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(
                    "gap-2",
                    selectedIds.length === 0 && "pointer-events-none opacity-50"
                  )}
                  onClick={handleAssignToProduction}
                >
                  <FileEdit className="h-4 w-4" />
                  Assign to Production
                </Button>
                <ExportButton
                  data={handleExportSelected()}
                  filename="selected-orders"
                  variant="outline"
                  size="sm"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className={cn(
                    "gap-2",
                    selectedIds.length === 0 && "pointer-events-none opacity-50"
                  )}
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className={cn("pointer-events-none opacity-50", selectedIds.length === 0 && "hidden")}
              onClick={() => setSelectedIds([])}
            >
              Clear Selection
            </Button>
          </div>
        </div>

        <CardContent className="-mx-4 overflow-x-auto sm:mx-0">
          <div className="min-w-[700px] px-4 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all orders"
                      className={someSelected ? "data-[state=checked]:bg-primary/50" : ""}
                    />
                  </TableHead>
                  <TableHead className="font-semibold">{t("tables.order")}</TableHead>
                  <TableHead className="font-semibold">{t("tables.date")}</TableHead>
                  <TableHead className="font-semibold">{t("tables.status")}</TableHead>
                  <TableHead className="text-right font-semibold">{t("tables.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-muted-foreground h-24 text-center">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((o) => (
                    <TableRow key={o.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(o.id)}
                          onCheckedChange={(checked) => handleSelectOne(o.id, checked as boolean)}
                          aria-label={`Select order ${o.orderNumber}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {o.customerName || o.orderNumber}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {o.deliveryDate ? formatDate(o.deliveryDate) : "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal">
                          {o.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          onClick={() => setViewingOrder(o)}
                          className="text-primary hover:text-primary/80 text-sm font-medium underline underline-offset-4 transition-colors"
                        >
                          {t("actions.view")}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Order Dialog */}
      {viewingOrder && (
        <ViewOrderDialog
          order={viewingOrder}
          open={!!viewingOrder}
          onOpenChange={(open: boolean) => !open && setViewingOrder(null)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleBulkDelete}
        title="Delete Orders"
        description={`Are you sure you want to delete ${selectedIds.length} order(s)? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
}
