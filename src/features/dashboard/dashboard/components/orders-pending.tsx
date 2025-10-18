"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useI18n } from "@/components/lang/i18n-provider";

interface OrdersPendingProps {
  totalOpenOrders: number;
}

export default function OrdersPending({ totalOpenOrders }: OrdersPendingProps) {
  const { t } = useI18n();
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t("pages.ordersPending")}</CardTitle>
        <CardDescription className="text-xs">
          {t("chart.openOrders")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
          {totalOpenOrders}
        </div>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">
          {t("chart.plusToday")}
        </p>
      </CardContent>
    </Card>
  );
}
