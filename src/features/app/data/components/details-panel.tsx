"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/components/lang/i18n-provider";

type Item = { id: string; name: string; note?: string };

interface DetailsPanelProps {
  item?: Item;
}

export function DetailsPanel({ item }: DetailsPanelProps) {
  const { t } = useI18n();
  return (
    <Card className="lg:sticky lg:top-[5rem] shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">
          {item?.name ?? t("pages.ingredient")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-transparent">
          <div
            className="size-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0"
            aria-hidden
          >
            <span className="text-lg font-bold text-primary">
              {item?.name?.[0] ?? "?"}
            </span>
          </div>
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase">
              {t("pages.productSheet")}
            </div>
            <div className="text-sm font-medium mt-1">
              {t("data.productDesignation")}: {item?.name ?? "—"}
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-gradient-to-br from-card to-muted/20 p-4 space-y-2">
          <div className="text-sm font-bold text-foreground">
            {t("pages.supplier")}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{t("data.supplierName")}:</span>{" "}
            {item?.note ?? "Example Supplier"}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{t("data.supplierEmail")}:</span>{" "}
            supplier@example.com
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{t("data.supplierPhone")}:</span> +33
            01 23 45 67 89
          </div>
        </div>
        <div className="rounded-lg border bg-gradient-to-br from-card to-muted/20 p-4 space-y-2">
          <div className="text-sm font-bold text-foreground">
            {t("pages.stockSheet")}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{t("pages.inStock")}:</span> 120.0 Kg
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{t("pages.avgPrice")}:</span> €3.60
          </div>
        </div>
        <div className="text-sm font-semibold text-muted-foreground">
          {t("pages.history")}
        </div>
      </CardContent>
    </Card>
  );
}
