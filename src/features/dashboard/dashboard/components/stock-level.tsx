"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/components/lang/i18n-provider";
import { Progress } from "@/components/ui/progress";

interface StockLevelProps {
  stockUtilization: number;
}

export default function StockLevel({ stockUtilization }: StockLevelProps) {
  const { t } = useI18n();
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t("pages.stockLevel")}</CardTitle>
        <CardDescription className="text-xs">{t("pages.stockUtil")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Progress
            value={stockUtilization}
            aria-label={`${t("chart.stockUtilization")} ${stockUtilization}%`}
            className="h-2"
          />
          <p className="text-muted-foreground text-sm font-medium">
            {stockUtilization}% {t("chart.percentUsed")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
