"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  TrendingUp,
  Barcode,
  Calendar,
  Edit,
  Trash2,
  ChefHat,
  AlertTriangle,
  Box,
  Tag,
  ShoppingCart,
} from "lucide-react";
import type { Product } from "@/types/entities";
import {
  formatCurrency,
  formatDate,
  getStockStatus,
  calculateStockPercentage,
} from "@/lib/utils/formatting";
import { MOCK_RECIPES } from "@/mocks";
import { useState } from "react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

interface ProductDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

export default function ProductDetailsDialog({
  open,
  onOpenChange,
  product,
  onEdit,
  onDelete,
}: ProductDetailsDialogProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const recipe = product.recipeId ? MOCK_RECIPES.find((r) => r.id === product.recipeId) : null;
  const stockStatus = getStockStatus(product.currentStock, product.minStock, product.maxStock);
  const stockPercentage = calculateStockPercentage(product.currentStock, product.maxStock);

  // Calculate profit margins
  const calculateMargins = () => {
    const costPerUnit = recipe ? recipe.costPerBatch / recipe.yieldQuantity : 0;

    const retailProfit = product.retailPrice - costPerUnit;
    const retailMargin = product.retailPrice > 0 ? (retailProfit / product.retailPrice) * 100 : 0;

    const wholesaleProfit = product.wholesalePrice ? product.wholesalePrice - costPerUnit : 0;
    const wholesaleMargin = product.wholesalePrice && product.wholesalePrice > 0
      ? (wholesaleProfit / product.wholesalePrice) * 100
      : 0;

    return {
      costPerUnit,
      retailProfit,
      retailMargin,
      wholesaleProfit,
      wholesaleMargin,
    };
  };

  const margins = calculateMargins();
  const totalValue = product.currentStock * product.retailPrice;

  const handleDelete = () => {
    if (onDelete) {
      onDelete(product.id);
      setDeleteDialogOpen(false);
      onOpenChange(false);
    }
  };

  const getStockStatusBadge = () => {
    switch (stockStatus) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "low":
        return <Badge variant="default">Low Stock</Badge>;
      case "excess":
        return <Badge variant="secondary">Overstocked</Badge>;
      default:
        return <Badge variant="outline">In Stock</Badge>;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                <DialogDescription className="mt-2">
                  {product.description || "No description provided"}
                </DialogDescription>
              </div>
              <div className="flex gap-2">
                {onEdit && (
                  <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="flex items-center gap-3 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Current Stock</p>
                    <p className="font-semibold">
                      {product.currentStock} {product.unit}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Retail Price</p>
                    <p className="font-semibold">{formatCurrency(product.retailPrice)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Stock Value</p>
                    <p className="font-semibold">{formatCurrency(totalValue)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Box className="h-5 w-5" />
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {product.sku && (
                    <div>
                      <p className="text-sm text-muted-foreground">SKU</p>
                      <p className="font-medium">{product.sku}</p>
                    </div>
                  )}
                  {product.category && (
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                  )}
                  {product.barcode && (
                    <div>
                      <p className="text-sm text-muted-foreground">Barcode</p>
                      <div className="flex items-center gap-2">
                        <Barcode className="h-4 w-4 text-muted-foreground" />
                        <p className="font-mono font-medium">{product.barcode}</p>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Unit</p>
                    <p className="font-medium">{product.unit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recipe Information */}
            {recipe && (
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ChefHat className="h-5 w-5" />
                    Linked Recipe
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold">{recipe.name}</p>
                    {recipe.description && (
                      <p className="text-sm text-muted-foreground">{recipe.description}</p>
                    )}
                  </div>
                  <Separator />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Yield</p>
                      <p className="font-medium">
                        {recipe.yieldQuantity} {recipe.yieldUnit}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Production Cost</p>
                      <p className="font-medium">{formatCurrency(recipe.costPerBatch)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Cost per Unit</p>
                      <p className="font-medium">
                        {formatCurrency(margins.costPerUnit)}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Ingredients: {recipe.ingredients.length} items
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pricing & Margins */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Tag className="h-5 w-5" />
                  Pricing & Profit Margins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Retail Pricing */}
                <div className="rounded-lg border bg-card p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-semibold">Retail</h4>
                    <Badge variant="default">Primary</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price per {product.unit}</span>
                      <span className="font-semibold">{formatCurrency(product.retailPrice)}</span>
                    </div>
                    {recipe && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cost per {product.unit}</span>
                          <span className="font-medium">{formatCurrency(margins.costPerUnit)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Profit per {product.unit}</span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(margins.retailProfit)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Margin</span>
                          <span className="font-semibold text-green-600">
                            {margins.retailMargin.toFixed(1)}%
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Wholesale Pricing */}
                {product.wholesalePrice && (
                  <div className="rounded-lg border bg-card p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-semibold">Wholesale</h4>
                      <Badge variant="secondary">Bulk</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price per {product.unit}</span>
                        <span className="font-semibold">
                          {formatCurrency(product.wholesalePrice)}
                        </span>
                      </div>
                      {recipe && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Cost per {product.unit}</span>
                            <span className="font-medium">
                              {formatCurrency(margins.costPerUnit)}
                            </span>
                          </div>
                          <Separator />
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Profit per {product.unit}</span>
                            <span className="font-semibold text-green-600">
                              {formatCurrency(margins.wholesaleProfit)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Margin</span>
                            <span className="font-semibold text-green-600">
                              {margins.wholesaleMargin.toFixed(1)}%
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Potential Revenue */}
                <div className="rounded-lg bg-muted p-4">
                  <h4 className="mb-2 font-semibold">Potential Revenue (Current Stock)</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Retail ({product.currentStock} {product.unit})</span>
                      <span className="font-semibold">
                        {formatCurrency(product.currentStock * product.retailPrice)}
                      </span>
                    </div>
                    {product.wholesalePrice && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Wholesale ({product.currentStock} {product.unit})</span>
                        <span className="font-semibold">
                          {formatCurrency(product.currentStock * product.wholesalePrice)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stock Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShoppingCart className="h-5 w-5" />
                  Stock Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Stock Status</span>
                  {getStockStatusBadge()}
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Level</span>
                    <span className="font-medium">
                      {product.currentStock} / {product.maxStock} {product.unit}
                    </span>
                  </div>
                  <Progress value={stockPercentage} className="h-2" />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Minimum Stock</p>
                    <p className="font-semibold">
                      {product.minStock} {product.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Current Stock</p>
                    <p className="font-semibold">
                      {product.currentStock} {product.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Maximum Stock</p>
                    <p className="font-semibold">
                      {product.maxStock} {product.unit}
                    </p>
                  </div>
                </div>

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
                              ? `Stock is below the minimum threshold of ${product.minStock} ${product.unit}. Consider producing more soon.`
                              : stockStatus === "critical"
                                ? `Stock is critically low! Immediate production required.`
                                : `Stock exceeds maximum capacity of ${product.maxStock} ${product.unit}. Consider adjusting production or increasing sales.`}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Metadata */}
            <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Created: {formatDate(product.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Updated: {formatDate(product.updatedAt)}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Product"
        description={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
}
