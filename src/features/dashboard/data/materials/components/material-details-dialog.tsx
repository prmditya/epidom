"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  DollarSign,
  MapPin,
  Barcode,
  Calendar,
  AlertTriangle,
  Edit,
  Trash2,
} from "lucide-react";
import { Material } from "@/types/entities";
import {
  formatCurrency,
  formatDateTime,
  getStockStatus,
  getStockStatusColor,
  calculateStockPercentage,
} from "@/lib/utils/formatting";
import { MOCK_SUPPLIERS } from "@/mocks";
import { useState } from "react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

interface MaterialDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: Material | null;
  onEdit?: (material: Material) => void;
  onDelete?: (materialId: string) => void;
}

export default function MaterialDetailsDialog({
  open,
  onOpenChange,
  material,
  onEdit,
  onDelete,
}: MaterialDetailsDialogProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!material) return null;

  const supplier = MOCK_SUPPLIERS.find((s) => s.id === material.supplierId);
  const stockStatus = getStockStatus(material.currentStock, material.minStock, material.maxStock);
  const stockPercentage = calculateStockPercentage(material.currentStock, material.maxStock);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(material.id);
      setShowDeleteConfirm(false);
      onOpenChange(false);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(material);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px] [&>button]:hidden">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-xl">{material.name}</DialogTitle>
                <DialogDescription className="mt-1">
                  {material.sku && `SKU: ${material.sku}`}
                </DialogDescription>
              </div>
              <Badge className={getStockStatusColor(stockStatus)}>{stockStatus}</Badge>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Stock Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Package className="h-4 w-4" />
                  Stock Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Stock</span>
                    <span className="font-medium">
                      {material.currentStock} {material.unit}
                    </span>
                  </div>
                  <Progress value={stockPercentage} className="h-2" />
                  <div className="text-muted-foreground flex justify-between text-xs">
                    <span>
                      Min: {material.minStock} {material.unit}
                    </span>
                    <span>
                      Max: {material.maxStock} {material.unit}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-xs">Category</p>
                    <p className="text-sm font-medium capitalize">
                      {material.category.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Unit</p>
                    <p className="text-sm font-medium">{material.unit}</p>
                  </div>
                </div>

                {material.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="text-muted-foreground mt-0.5 h-4 w-4" />
                    <div className="flex-1">
                      <p className="text-muted-foreground text-xs">Storage Location</p>
                      <p className="text-sm">{material.location}</p>
                    </div>
                  </div>
                )}

                {material.barcode && (
                  <div className="flex items-start gap-2">
                    <Barcode className="text-muted-foreground mt-0.5 h-4 w-4" />
                    <div className="flex-1">
                      <p className="text-muted-foreground text-xs">Barcode</p>
                      <p className="font-mono text-sm">{material.barcode}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <DollarSign className="h-4 w-4" />
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Cost per Unit</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(material.costPerUnit)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Total Value in Stock</span>
                  <span className="text-sm font-bold">
                    {formatCurrency(material.currentStock * material.costPerUnit)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Minimum Stock Value</span>
                  <span className="text-sm">
                    {formatCurrency(material.minStock * material.costPerUnit)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Maximum Stock Value</span>
                  <span className="text-sm">
                    {formatCurrency(material.maxStock * material.costPerUnit)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Supplier Information */}
            {supplier && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Supplier Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">{supplier.name}</p>
                    <p className="text-muted-foreground text-xs">{supplier.contactPerson}</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="text-sm">{supplier.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p className="text-sm">{supplier.phone}</p>
                    </div>
                  </div>
                  {supplier.deliverySchedule && (
                    <div>
                      <span className="text-muted-foreground text-xs">Delivery Schedule:</span>
                      <p className="text-sm">{supplier.deliverySchedule}</p>
                    </div>
                  )}
                  {supplier.onTimeDeliveryRate !== undefined && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">On-time Delivery Rate:</span>
                      <Badge variant="outline">{supplier.onTimeDeliveryRate}%</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Description */}
            {material.description && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{material.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Stock Alerts */}
            {stockStatus !== "ok" && (
              <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <div>
                      <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                        Stock Alert: {stockStatus}
                      </p>
                      <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
                        {stockStatus === "low"
                          ? `Stock is below the minimum threshold of ${material.minStock} ${material.unit}. Consider reordering soon.`
                          : stockStatus === "critical"
                            ? `Stock is critically low! Immediate action required.`
                            : `Stock exceeds maximum capacity of ${material.maxStock} ${material.unit}. Consider adjusting storage or reducing orders.`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <Separator />
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>Created: {formatDateTime(material.createdAt)}</span>
              </div>
              <span>Last updated: {formatDateTime(material.updatedAt)}</span>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {onDelete && (
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
            {onEdit && (
              <Button onClick={handleEdit} className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Material
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={handleDelete}
        title="Delete Material"
        description={`Are you sure you want to delete "${material.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
}
