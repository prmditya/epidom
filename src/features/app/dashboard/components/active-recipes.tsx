"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useI18n } from "@/components/lang/i18n-provider";

interface ActiveRecipesProps {
  totalActiveRecipes: number;
}

export default function ActiveRecipes({
  totalActiveRecipes,
}: ActiveRecipesProps) {
  const { t } = useI18n();

  return (
    <Card className="hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t("pages.activeRecipes")}</CardTitle>
        <CardDescription className="text-xs">
          {t("chart.recipesUsedWeek")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
          {totalActiveRecipes}
        </div>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">
          {t("chart.upFromLastWeek")}
        </p>
      </CardContent>
    </Card>
  );
}
