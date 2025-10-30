"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/components/lang/i18n-provider";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

interface StockLevelProps {
  stockUtilization: number;
}

export default function StockLevel({ stockUtilization }: StockLevelProps) {
  const { t } = useI18n();
  const router = useRouter();

  const handleClick = () => {
    router.push("/tracking?filter=low-stock");
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
