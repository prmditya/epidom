"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertsToggle } from "@/features/dashboard/alerts/components/alerts-toggle";
import { OrdersView } from "@/features/dashboard/alerts/components/orders-view";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useI18n } from "@/components/lang/i18n-provider";
import { useAlertsCount } from "@/features/dashboard/alerts/hooks/use-alerts-count";

export default function AlertsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOrders = searchParams.get("view") === "orders";
  const { t } = useI18n();
  const alertsCount = useAlertsCount();

  const handleToggle = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (isOrders) {
      params.delete("view");
    } else {
      params.set("view", "orders");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [isOrders, pathname, router, searchParams]);

  return (
    <>
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="flex flex-col justify-between gap-3 px-0 py-4 sm:flex-row sm:items-center sm:px-1">
          <CardTitle className="flex items-center gap-2 text-xl font-bold md:text-2xl">
            <span>{isOrders ? t("pages.ordersTitle") : t("pages.alertsTitle")}</span>
            {!isOrders && alertsCount > 0 && (
              <span className="text-muted-foreground text-lg font-bold md:text-xl">
                ({alertsCount})
              </span>
            )}
          </CardTitle>
          <Button
            size="sm"
            className="self-start rounded-full shadow-md transition-all hover:shadow-lg sm:self-center"
            aria-pressed={isOrders}
            onClick={handleToggle}
          >
            {isOrders ? t("actions.backToAlerts") : t("actions.ordersToPlace")}
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {isOrders ? (
            <OrdersView />
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[640px] md:min-w-0">
                <AlertsToggle />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
