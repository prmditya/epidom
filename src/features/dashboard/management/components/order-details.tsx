"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/lang/i18n-provider";
import type { Order } from "@/types/entities";
import { formatDate } from "@/lib/utils/formatting";

interface OrderDetailsProps {
  selectedOrder: Order | null;
}

export function OrderDetails({ selectedOrder }: OrderDetailsProps) {
  const { t } = useI18n();

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{t("pages.orderDetails")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {selectedOrder ? (
          <>
            <div className="grid gap-1">
              <p className="text-muted-foreground text-sm">Order Number</p>
              <p className="font-medium">{selectedOrder.orderNumber}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-muted-foreground text-sm">Customer</p>
              <p className="font-medium">{selectedOrder.customerName || "—"}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-muted-foreground text-sm">Delivery Date</p>
              <p className="font-medium">
                {selectedOrder.deliveryDate ? formatDate(selectedOrder.deliveryDate) : "—"}
              </p>
            </div>
            <div className="grid gap-1">
              <p className="text-muted-foreground text-sm">{t("tables.status")}</p>
              <p className="font-medium">{selectedOrder.status}</p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button size="sm">{t("actions.markProcessing")}</Button>
              <Button size="sm" variant="secondary">
                {t("actions.markDelivered")}
              </Button>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground text-sm">{t("messages.selectOrder")}</p>
        )}
      </CardContent>
    </Card>
  );
}
