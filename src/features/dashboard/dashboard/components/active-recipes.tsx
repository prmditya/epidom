"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useI18n } from "@/components/lang/i18n-provider";

interface ActiveRecipesProps {
  totalActiveRecipes: number;
}

export default function ActiveRecipes({ totalActiveRecipes }: ActiveRecipesProps) {
  const { t } = useI18n();

  return (
    <Card className="transition-shadow hover:shadow-lg sm:col-span-2 lg:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t("pages.activeRecipes")}</CardTitle>
        <CardDescription className="text-xs">{t("chart.recipesUsedWeek")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="from-primary to-primary/60 bg-gradient-to-br bg-clip-text text-4xl font-bold text-transparent">
          {totalActiveRecipes}
        </div>
        <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          {t("chart.upFromLastWeek")}
        </p>
      </CardContent>
    </Card>
  );
}
