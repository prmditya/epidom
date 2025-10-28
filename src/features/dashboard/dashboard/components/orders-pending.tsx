"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/components/lang/i18n-provider";

interface OrdersPendingProps {
  totalOpenOrders: number;
}

export default function OrdersPending({ totalOpenOrders }: OrdersPendingProps) {
  const { t } = useI18n();
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t("pages.ordersPending")}</CardTitle>
        <CardDescription className="text-xs">{t("chart.openOrders")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="from-primary to-primary/60 bg-gradient-to-br bg-clip-text text-4xl font-bold text-transparent">
          {totalOpenOrders}
        </div>
        <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          {t("chart.plusToday")}
        </p>
      </CardContent>
    </Card>
  );
}
