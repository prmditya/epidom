"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/components/lang/i18n-provider";
import { formatDateTime, formatDate } from "@/lib/utils/formatting";
import { MovementType, type StockMovement } from "@/types/entities";
import {
  Package,
  Calendar,
  User,
  FileText,
  Hash,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface MovementDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movement: StockMovement | null;
}

// Helper function to get movement type color
function getMovementTypeColor(type: MovementType): string {
  switch (type) {
    case MovementType.IN:
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case MovementType.OUT:
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case MovementType.ADJUSTMENT:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case MovementType.PRODUCTION:
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case MovementType.WASTE:
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case MovementType.RETURN:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
}

export function MovementDetailsDialog({
  open,
  onOpenChange,
  movement,
}: MovementDetailsDialogProps) {
  const { t } = useI18n();

  if (!movement) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("tracking.dialogs.viewMovement.title")}</DialogTitle>
          <DialogDescription>
            {t("tracking.dialogs.viewMovement.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Quick Info Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("tracking.type")}
                    </p>
                    <Badge
                      variant="outline"
                      className={`mt-2 ${getMovementTypeColor(movement.type)}`}
                    >
                      {t(`tracking.movements.${movement.type.toLowerCase()}`)}
                    </Badge>
                  </div>
                  {movement.type === MovementType.IN ? (
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  ) : (
                    <TrendingDown className="h-8 w-8 text-red-600" />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("tracking.quantity")}
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {movement.type === MovementType.IN ? "+" : "-"}
                      {movement.quantity}
                    </p>
                    <p className="text-xs text-muted-foreground">{movement.unit}</p>
                  </div>
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("tracking.dateTime")}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      {formatDate(movement.createdAt)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(movement.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Item Information */}
          <div>
            <h3 className="text-sm font-semibold mb-3">
              {movement.materialId ? t("tracking.material") : t("tracking.product")}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">ID</p>
                <p className="text-sm font-medium">
                  {movement.materialId || movement.productId || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("tracking.type")}
                </p>
                <p className="text-sm font-medium">
                  {movement.materialId
                    ? t("tracking.materialType")
                    : t("tracking.productType")}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Movement Details */}
          <div>
            <h3 className="text-sm font-semibold mb-3">
              {t("tracking.dialogs.viewMovement.title")}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("tracking.reason")}
                </p>
                <p className="text-sm font-medium">{movement.reason}</p>
              </div>

              {movement.notes && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("tracking.notes")}
                  </p>
                  <p className="text-sm">{movement.notes}</p>
                </div>
              )}

              {movement.referenceId && (
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    {t("tracking.reference")}
                  </p>
                  <p className="text-sm font-mono">{movement.referenceId}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* User & Timestamp */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Metadata</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {t("tracking.user")}
                </p>
                <p className="text-sm font-medium">{movement.userName}</p>
                <p className="text-xs text-muted-foreground">
                  User ID: {movement.userId}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Created
                </p>
                <p className="text-sm font-medium">
                  {formatDateTime(movement.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Store Information */}
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <FileText className="h-3 w-3" />
              Movement ID: {movement.id}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Store ID: {movement.storeId}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
