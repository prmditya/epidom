"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/lang/i18n-provider";

type Order = {
  id: string;
  name: string;
  date: string;
  status: "Pending" | "Processing" | "Delivered";
};

interface OrderDetailsProps {
  selectedOrder: Order | null;
}

export function OrderDetails({ selectedOrder }: OrderDetailsProps) {
  const { t } = useI18n();

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{t("pages.orderDetails")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {selectedOrder ? (
          <>
            <div className="grid gap-1">
              <p className="text-sm text-muted-foreground">
                {t("labels.orderId")}
              </p>
              <p className="font-medium">{selectedOrder.id}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm text-muted-foreground">
                {t("tables.name")}
              </p>
              <p className="font-medium">{selectedOrder.name}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm text-muted-foreground">
                {t("tables.date")}
              </p>
              <p className="font-medium">{selectedOrder.date}</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm text-muted-foreground">
                {t("tables.status")}
              </p>
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
          <p className="text-sm text-muted-foreground">
            {t("messages.selectOrder")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
