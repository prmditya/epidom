"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/lang/i18n-provider";
import AddMaterialDialog from "../../data/materials/components/add-material-dialog";
import AddOrderDialog from "./add-order-dialog";
import AddRecipeDialog from "./add-recipe-dialog";
import UpdateStockDialog from "./update-stock-dialog";
import { Package, ClipboardList, ChefHat, TrendingUp, FileText, AlertCircle } from "lucide-react";

export default function QuickActions() {
  const { t } = useI18n();

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription className="text-xs">Common operations and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AddMaterialDialog />
          <AddOrderDialog />
          <AddRecipeDialog />
          <UpdateStockDialog />

          <Button size="sm" variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>

          <Button size="sm" variant="outline" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            View Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
