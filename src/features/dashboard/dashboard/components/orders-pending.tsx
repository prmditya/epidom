"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/components/lang/i18n-provider";
import { useRouter } from "next/navigation";

interface OrdersPendingProps {
  totalOpenOrders: number;
}

export default function OrdersPending({ totalOpenOrders }: OrdersPendingProps) {
  const { t } = useI18n();
  const router = useRouter();

  const handleClick = () => {
    router.push("/management?tab=delivery&status=pending");
  };

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
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
