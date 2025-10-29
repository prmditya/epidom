"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarDays,
  User,
  MapPin,
  Phone,
  Mail,
  Clock,
  DollarSign,
  CreditCard,
  Package,
} from "lucide-react";
import { Order, OrderStatus, PaymentStatus } from "@/types/entities";
import { formatDateTime, formatCurrency, formatStatus } from "@/lib/utils/formatting";
import { MOCK_PRODUCTS } from "@/mocks";

interface ViewOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

export default function ViewOrderDialog({ open, onOpenChange, order }: ViewOrderDialogProps) {
  if (!order) return null;

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PROCESSING:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      case OrderStatus.IN_STOCK:
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case OrderStatus.PENDING:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case OrderStatus.DELIVERED:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case OrderStatus.CANCELLED:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case PaymentStatus.PARTIAL:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case PaymentStatus.PENDING:
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case PaymentStatus.OVERDUE:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[900px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">Order {order.orderNumber}</DialogTitle>
              <DialogDescription className="mt-1">Order ID: {order.id}</DialogDescription>
            </div>
            <div className="flex gap-2">
              <Badge className={getStatusColor(order.status)}>{formatStatus(order.status)}</Badge>
              <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                {formatStatus(order.paymentStatus)}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="flex items-start gap-3">
                <User className="text-muted-foreground mt-0.5 h-4 w-4" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{order.customerName}</p>
                </div>
              </div>
              {order.customerEmail && (
                <div className="flex items-start gap-3">
                  <Mail className="text-muted-foreground mt-0.5 h-4 w-4" />
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm">{order.customerEmail}</p>
                  </div>
                </div>
              )}
              {order.customerPhone && (
                <div className="flex items-start gap-3">
                  <Phone className="text-muted-foreground mt-0.5 h-4 w-4" />
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm">{order.customerPhone}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-muted-foreground mt-0.5 h-4 w-4" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Delivery Address</p>
                  <p className="text-muted-foreground text-sm">
                    {order.deliveryAddress}, {order.deliveryCity}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays className="text-muted-foreground mt-0.5 h-4 w-4" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Delivery Date</p>
                  <p className="text-muted-foreground text-sm">
                    {formatDateTime(order.deliveryDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-muted-foreground mt-0.5 h-4 w-4" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Production Due Date</p>
                  <p className="text-muted-foreground text-sm">{formatDateTime(order.dueDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Discount</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items?.map((item) => {
                    const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {product?.name || "Unknown Product"}
                        </TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.unitPrice)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.discount > 0 ? `-${formatCurrency(item.discount)}` : "-"}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(item.total)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-4 w-4" />
                Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(order.discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span className="font-medium">{formatCurrency(order.tax)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-lg font-bold">{formatCurrency(order.total)}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <CreditCard className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">Payment Status:</span>
                <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                  {formatStatus(order.paymentStatus)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.statusHistory.map((history) => (
                    <div key={history.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="bg-primary h-2 w-2 rounded-full" />
                        <div className="bg-border h-full w-px" />
                      </div>
                      <div className="flex-1 pb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {formatStatus(history.status)}
                          </Badge>
                          <span className="text-muted-foreground text-xs">
                            {formatDateTime(history.createdAt)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm">{history.notes}</p>
                        <p className="text-muted-foreground text-xs">by {history.userName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Notes */}
          {order.notes && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{order.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Separator />
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Package className="h-3 w-3" />
              <span>Created: {formatDateTime(order.createdAt)}</span>
            </div>
            <span>Last updated: {formatDateTime(order.updatedAt)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
