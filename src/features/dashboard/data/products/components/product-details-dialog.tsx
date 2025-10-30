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
import {
  Package,
  DollarSign,
  TrendingUp,
  BarChart3,
  Edit,
  Trash2,
  ShoppingCart,
  Tag,
  Calendar,
  ChefHat,
  Layers,
} from "lucide-react";
import type { Product } from "@/types/entities";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils/formatting";
import { MOCK_RECIPES } from "@/mocks";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useState } from "react";

interface ProductDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ProductDetailsDialog({
  open,
  onOpenChange,
  product,
  onEdit,
  onDelete,
}: ProductDetailsDialogProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // Calculate profit margins
  const calculateMargins = () => {
    if (!product.retailPrice || !product.costPrice) {
      return { retailMargin: 0, wholesaleMargin: 0 };
    }
    const retailMargin = ((product.retailPrice - product.costPrice) / product.retailPrice) * 100;
    const wholesaleMargin = product.wholesalePrice
      ? ((product.wholesalePrice - product.costPrice) / product.wholesalePrice) * 100
      : 0;
    return { retailMargin, wholesaleMargin };
  };

  // Calculate stock value
  const calculateStockValue = () => {
    if (!product.currentStock) return 0;
    return (product.currentStock || 0) * (product.costPrice || 0);
  };

  // Calculate potential revenue
  const calculatePotentialRevenue = () => {
    if (!product.currentStock || !product.retailPrice) return 0;
    return (product.currentStock || 0) * (product.retailPrice || 0);
  };

  // Get stock status
  const getStockStatus = () => {
    if (!product.currentStock && product.currentStock !== 0) return "Unknown";
    const { currentStock, minStock, maxStock } = product;
    if (currentStock === 0) return "Out of Stock";
    if (minStock && currentStock < minStock * 0.5) return "Critical";
    if (minStock && currentStock <= minStock) return "Low Stock";
    if (maxStock && currentStock >= maxStock) return "Overstocked";
    return "In Stock";
  };

  // Get stock status color
  const getStockStatusColor = () => {
    const status = getStockStatus();
    switch (status) {
      case "Out of Stock":
      case "Critical":
        return "destructive";
      case "Low Stock":
        return "default";
      case "Overstocked":
        return "default";
      case "In Stock":
        return "default";
      default:
        return "secondary";
    }
  };

  const { retailMargin, wholesaleMargin } = calculateMargins();
  const stockValue = calculateStockValue();
  const potentialRevenue = calculatePotentialRevenue();
  const stockStatus = getStockStatus();
  const recipe = product.recipeId ? MOCK_RECIPES.find((r) => r.id === product.recipeId) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl">{product.name}</DialogTitle>
              <DialogDescription>
                {product.description || "Product details and information"}
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              {onEdit && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              )}
              {onDelete && (
                <ConfirmationDialog
                  open={showDeleteConfirm}
                  onOpenChange={setShowDeleteConfirm}
                  title="Delete Product"
                  description={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
                  confirmText="Delete Product"
                  onConfirm={onDelete}
                  variant="destructive"
                />
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid gap-4 sm:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stock</CardTitle>
                <Package className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(product.currentStock || 0)}</div>
                <p className="text-muted-foreground text-xs">{product.unit}</p>
                <Badge variant={getStockStatusColor() as any} className="mt-2 text-xs">
                  {stockStatus}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Retail Price</CardTitle>
                <DollarSign className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(product.retailPrice || 0)}</div>
                <p className="text-muted-foreground text-xs">per {product.unit}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
                <TrendingUp className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${
                    retailMargin >= 50
                      ? "text-green-600"
                      : retailMargin >= 30
                        ? "text-blue-600"
                        : "text-orange-600"
                  }`}
                >
                  {retailMargin.toFixed(1)}%
                </div>
                <p className="text-muted-foreground text-xs">on retail sales</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
                <BarChart3 className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(stockValue)}</div>
                <p className="text-muted-foreground text-xs">at cost price</p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Basic Information */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Tag className="h-5 w-5" />
              Basic Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <label className="text-muted-foreground text-sm font-medium">SKU</label>
                  <p className="text-sm">{product.sku || "N/A"}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">Category</label>
                  <p className="text-sm">
                    {product.category ? (
                      <Badge variant="secondary">{product.category}</Badge>
                    ) : (
                      "N/A"
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">Unit</label>
                  <p className="text-sm">{product.unit || "N/A"}</p>
                </div>
              </div>
              <div className="space-y-3">
                {product.imageUrl && (
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">Image</label>
                    <p className="text-sm">{product.imageUrl}</p>
                  </div>
                )}
                {recipe && (
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      Linked Recipe
                    </label>
                    <p className="flex items-center gap-2 text-sm">
                      <ChefHat className="h-4 w-4" />
                      {recipe.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Stock Information */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Package className="h-5 w-5" />
              Stock Information
            </h3>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-muted-foreground text-sm font-medium">Current Stock</label>
                  <p className="text-lg font-semibold">
                    {formatNumber(product.currentStock || 0)} {product.unit}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">Minimum Stock</label>
                  <p className="text-lg font-semibold">
                    {product.minStock !== undefined
                      ? `${formatNumber(product.minStock)} ${product.unit}`
                      : "Not set"}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">Maximum Stock</label>
                  <p className="text-lg font-semibold">
                    {product.maxStock !== undefined
                      ? `${formatNumber(product.maxStock)} ${product.unit}`
                      : "Not set"}
                  </p>
                </div>
              </div>

              {/* Stock Level Progress Bar */}
              {product.minStock !== undefined && product.maxStock !== undefined && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Stock Level</span>
                    <span className="font-medium">
                      {(((product.currentStock || 0) / product.maxStock) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="bg-muted h-2 overflow-hidden rounded-full">
                    <div
                      className={`h-full transition-all ${
                        stockStatus === "Critical" || stockStatus === "Out of Stock"
                          ? "bg-destructive"
                          : stockStatus === "Low Stock"
                            ? "bg-orange-500"
                            : stockStatus === "Overstocked"
                              ? "bg-blue-500"
                              : "bg-primary"
                      }`}
                      style={{
                        width: `${Math.min(100, ((product.currentStock || 0) / product.maxStock) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Stock Alerts */}
              {(stockStatus === "Critical" ||
                stockStatus === "Low Stock" ||
                stockStatus === "Overstocked") && (
                <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
                  <CardContent className="pt-4">
                    <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                      {stockStatus === "Critical" &&
                        "⚠️ Critical stock level! Immediate restocking required."}
                      {stockStatus === "Low Stock" &&
                        "⚠️ Stock is running low. Consider restocking soon."}
                      {stockStatus === "Overstocked" &&
                        "ℹ️ Stock level exceeds maximum. Consider promotions or adjusting production."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <Separator />

          {/* Pricing & Financial Analysis */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <DollarSign className="h-5 w-5" />
              Pricing & Financial Analysis
            </h3>
            <div className="space-y-4">
              {/* Pricing Breakdown */}
              <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Cost Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold">{formatCurrency(product.costPrice || 0)}</p>
                    <p className="text-muted-foreground text-xs">per {product.unit}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Wholesale Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold">
                      {product.wholesalePrice ? formatCurrency(product.wholesalePrice) : "N/A"}
                    </p>
                    {product.wholesalePrice && (
                      <>
                        <p className="text-muted-foreground text-xs">per {product.unit}</p>
                        <p className="mt-1 text-xs font-medium text-blue-600">
                          {wholesaleMargin.toFixed(1)}% margin
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Retail Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold">{formatCurrency(product.retailPrice || 0)}</p>
                    <p className="text-muted-foreground text-xs">per {product.unit}</p>
                    <p className="mt-1 text-xs font-medium text-green-600">
                      {retailMargin.toFixed(1)}% margin
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Financial Summary */}
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Financial Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Stock Value (at cost):</span>
                    <span className="font-semibold">{formatCurrency(stockValue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Potential Revenue (retail):
                    </span>
                    <span className="font-semibold">{formatCurrency(potentialRevenue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Potential Profit:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(potentialRevenue - stockValue)}
                    </span>
                  </div>
                  {product.retailPrice && product.costPrice && (
                    <div className="flex items-center justify-between border-t pt-2">
                      <span className="text-muted-foreground text-sm">Profit per unit:</span>
                      <span className="font-semibold">
                        {formatCurrency((product.retailPrice || 0) - (product.costPrice || 0))}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Layers className="h-5 w-5" />
                  Product Variants
                </h3>
                <div className="space-y-3">
                  {product.variants.map((variant, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{variant.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid gap-3 text-sm sm:grid-cols-2">
                          <div>
                            <span className="text-muted-foreground">SKU:</span>{" "}
                            <span className="font-medium">{variant.sku || "N/A"}</span>
                          </div>
                          {variant.priceAdjustment !== undefined && (
                            <div>
                              <span className="text-muted-foreground">Price Adjustment:</span>{" "}
                              <span className="font-medium">
                                {variant.priceAdjustment >= 0 ? "+" : ""}
                                {formatCurrency(variant.priceAdjustment)}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Metadata */}
          <Separator />
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Created: {formatDate(product.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Updated: {formatDate(product.updatedAt)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
