"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/components/lang/i18n-provider";

interface CurrentWorkflowProps {
  inStock: number;
  processing: number;
  delivered: number;
}

export default function CurrentWorkflow({ inStock, processing, delivered }: CurrentWorkflowProps) {
  const { t } = useI18n();
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t("pages.trackingStatus")}</CardTitle>
        <CardDescription className="text-xs">{t("chart.currentWorkflow")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-emerald-700 dark:text-emerald-400">{t("pages.inStock")}</span>
            <span className="text-emerald-700 dark:text-emerald-400">{inStock}%</span>
          </div>
          <Progress value={inStock} className="h-2 [&>div]:bg-emerald-500" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-amber-700 dark:text-amber-400">{t("pages.processing")}</span>
            <span className="text-amber-700 dark:text-amber-400">{processing}%</span>
          </div>
          <Progress value={processing} className="h-2 [&>div]:bg-amber-500" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-blue-700 dark:text-blue-400">{t("pages.delivered")}</span>
            <span className="text-blue-700 dark:text-blue-400">{delivered}%</span>
          </div>
          <Progress value={delivered} className="h-2 [&>div]:bg-blue-500" />
        </div>
      </CardContent>
    </Card>
  );
}
