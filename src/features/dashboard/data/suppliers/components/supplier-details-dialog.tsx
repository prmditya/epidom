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
  Store,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  TrendingUp,
  Star,
  Edit,
  Trash2,
  Clock,
  FileText,
  Truck,
} from "lucide-react";
import type { Supplier } from "@/types/entities";
import { formatDate } from "@/lib/utils/formatting";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useState } from "react";
import { useI18n } from "@/components/lang/i18n-provider";

interface SupplierDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier: Supplier;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function SupplierDetailsDialog({
  open,
  onOpenChange,
  supplier,
  onEdit,
  onDelete,
}: SupplierDetailsDialogProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { t } = useI18n();
  // Helper to get rating badge color
  const getRatingColor = (rating?: number) => {
    if (!rating) return "secondary";
    if (rating >= 4.5) return "default";
    if (rating >= 4.0) return "default";
    if (rating >= 3.0) return "default";
    return "destructive";
  };

  // Helper to get delivery rate color
  const getDeliveryRateColor = (rate?: number) => {
    if (!rate) return "text-muted-foreground";
    if (rate >= 95) return "text-green-600";
    if (rate >= 85) return "text-blue-600";
    return "text-orange-600";
  };

  // Mock order history data (in production, fetch from API)
  const mockOrderHistory = [
    { date: new Date("2024-10-15"), amount: 1250.0, status: "Delivered" },
    { date: new Date("2024-10-08"), amount: 850.5, status: "Delivered" },
    { date: new Date("2024-09-29"), amount: 2100.0, status: "Delivered" },
    { date: new Date("2024-09-22"), amount: 950.75, status: "Delivered" },
    { date: new Date("2024-09-15"), amount: 1580.0, status: "Delayed" },
  ];

  const totalOrders = mockOrderHistory.length;
  const totalSpent = mockOrderHistory.reduce((sum, order) => sum + order.amount, 0);
  const avgOrderValue = totalSpent / totalOrders;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl [&>button]:hidden">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl">{supplier.name}</DialogTitle>
              <DialogDescription>
                Supplier details, performance metrics, and order history
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              {onEdit && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  {t("actions.edit") || "Edit"}
                </Button>
              )}
              {onDelete && (
                <ConfirmationDialog
                  open={deleteDialogOpen}
                  onOpenChange={setDeleteDialogOpen}
                  title="Delete Supplier"
                  description={`Are you sure you want to delete "${supplier.name}"? This action cannot be undone.`}
                  confirmText="Delete Supplier"
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
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
                <Star className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {supplier.rating ? supplier.rating.toFixed(1) : "N/A"}
                </div>
                <p className="text-muted-foreground text-xs">out of 5.0</p>
                {supplier.rating && (
                  <Badge variant={getRatingColor(supplier.rating) as any} className="mt-2 text-xs">
                    {supplier.rating >= 4.5
                      ? "Excellent"
                      : supplier.rating >= 4.0
                        ? "Good"
                        : supplier.rating >= 3.0
                          ? "Average"
                          : "Poor"}
                  </Badge>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
                <TrendingUp className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${getDeliveryRateColor(supplier.onTimeDeliveryRate)}`}
                >
                  {supplier.onTimeDeliveryRate || 0}%
                </div>
                <p className="text-muted-foreground text-xs">delivery rate</p>
                {supplier.onTimeDeliveryRate !== undefined && (
                  <div className="bg-muted mt-2 h-1.5 overflow-hidden rounded-full">
                    <div
                      className={`h-full transition-all ${
                        supplier.onTimeDeliveryRate >= 95
                          ? "bg-green-500"
                          : supplier.onTimeDeliveryRate >= 85
                            ? "bg-blue-500"
                            : "bg-orange-500"
                      }`}
                      style={{ width: `${supplier.onTimeDeliveryRate}%` }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <FileText className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-muted-foreground text-xs">orders placed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <DollarSign className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                <p className="text-muted-foreground text-xs">lifetime value</p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Store className="h-5 w-5" />
              Contact Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                {supplier.contactPerson && (
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">
                      Contact Person
                    </label>
                    <p className="text-sm">{supplier.contactPerson}</p>
                  </div>
                )}
                {supplier.email && (
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">Email</label>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="text-muted-foreground h-4 w-4" />
                      <a href={`mailto:${supplier.email}`} className="hover:underline">
                        {supplier.email}
                      </a>
                    </div>
                  </div>
                )}
                {supplier.phone && (
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">Phone</label>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="text-muted-foreground h-4 w-4" />
                      <a href={`tel:${supplier.phone}`} className="hover:underline">
                        {supplier.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {(supplier.address || supplier.city || supplier.country) && (
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">Address</label>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                      <div>
                        {supplier.address && <p>{supplier.address}</p>}
                        {(supplier.city || supplier.country) && (
                          <p>{[supplier.city, supplier.country].filter(Boolean).join(", ")}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Business Terms */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <DollarSign className="h-5 w-5" />
              Business Terms
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-muted-foreground text-sm font-medium">Payment Terms</label>
                <p className="text-sm">
                  {supplier.paymentTerms ? (
                    <Badge variant="secondary">{supplier.paymentTerms}</Badge>
                  ) : (
                    "Not specified"
                  )}
                </p>
              </div>
              {supplier.deliverySchedule && (
                <div>
                  <label className="text-muted-foreground text-sm font-medium">
                    Delivery Schedule
                  </label>
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="text-muted-foreground h-4 w-4" />
                    <span>{supplier.deliverySchedule}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Performance Metrics */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <TrendingUp className="h-5 w-5" />
              Performance Metrics
            </h3>
            <div className="space-y-4">
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="text-muted-foreground text-sm font-medium">
                        Average Order Value
                      </label>
                      <p className="text-xl font-semibold">${avgOrderValue.toFixed(2)}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground text-sm font-medium">
                        Quality Rating
                      </label>
                      <p className="text-xl font-semibold">
                        {supplier.rating ? `${supplier.rating.toFixed(1)}/5.0` : "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-muted-foreground text-sm font-medium">
                        Reliability Score
                      </label>
                      <p
                        className={`text-xl font-semibold ${getDeliveryRateColor(supplier.onTimeDeliveryRate)}`}
                      >
                        {supplier.onTimeDeliveryRate || 0}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Order History */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <FileText className="h-5 w-5" />
              Recent Order History
            </h3>
            <div className="space-y-2">
              {mockOrderHistory.map((order, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-muted-foreground h-4 w-4" />
                      <div>
                        <p className="text-sm font-medium">{formatDate(order.date)}</p>
                        <p className="text-muted-foreground text-xs">{order.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">${order.amount.toFixed(2)}</p>
                      <Badge
                        variant={order.status === "Delivered" ? "default" : "secondary"}
                        className="mt-1 text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {mockOrderHistory.length === 0 && (
              <Card>
                <CardContent className="flex min-h-[200px] items-center justify-center p-8 text-center">
                  <div>
                    <FileText className="text-muted-foreground/50 mx-auto mb-2 h-8 w-8" />
                    <p className="text-muted-foreground text-sm">No order history available</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Notes */}
          {supplier.notes && (
            <>
              <Separator />
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <FileText className="h-5 w-5" />
                  Notes
                </h3>
                <Card className="bg-muted/50">
                  <CardContent className="pt-4">
                    <p className="text-muted-foreground text-sm">{supplier.notes}</p>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Metadata */}
          <Separator />
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Created: {formatDate(supplier.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Updated: {formatDate(supplier.updatedAt)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
