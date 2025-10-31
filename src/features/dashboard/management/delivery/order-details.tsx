"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useI18n } from "@/components/lang/i18n-provider";
import type { Order } from "@/types/entities";
import { OrderStatus, PaymentStatus } from "@/types/entities";
import { formatDate, formatDateTime, formatCurrency } from "@/lib/utils/formatting";
import { MOCK_PRODUCTS } from "@/mocks";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Package,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Edit,
  Truck,
  FileText,
  Printer,
  Ban,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface OrderDetailsProps {
  selectedOrder: Order | null;
  onEdit?: (order: Order) => void;
  onScheduleDelivery?: (order: Order) => void;
  onUpdateStatus?: (order: Order) => void;
  onPrintOrder?: (order: Order) => void;
  onCancelOrder?: (orderId: string) => void;
}

export function OrderDetails({
  selectedOrder,
  onEdit,
  onScheduleDelivery,
  onUpdateStatus,
  onPrintOrder,
  onCancelOrder,
}: OrderDetailsProps) {
  const { t } = useI18n();

  if (!selectedOrder) {
    return (
      <Card className="shadow-md transition-shadow hover:shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">{t("pages.orderDetails") || "Order Details"}</CardTitle>
        </CardHeader>
        <CardContent className="flex min-h-[400px] items-center justify-center">
          <p className="text-muted-foreground text-center text-sm">
            {t("messages.selectOrder") || "Select an order to view details"}
          </p>
        </CardContent>
      </Card>
    );
  }

  const order = selectedOrder;

  // Get status styling
  const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "secondary";
      case OrderStatus.PROCESSING:
        return "default";
      case OrderStatus.IN_STOCK:
        return "default";
      case OrderStatus.DELIVERED:
        return "default";
      case OrderStatus.CANCELLED:
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return Clock;
      case OrderStatus.PROCESSING:
        return Package;
      case OrderStatus.IN_STOCK:
        return CheckCircle2;
      case OrderStatus.DELIVERED:
        return CheckCircle2;
      case OrderStatus.CANCELLED:
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getPaymentVariant = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PENDING:
        return "secondary";
      case PaymentStatus.PARTIAL:
        return "default";
      case PaymentStatus.PAID:
        return "default";
      case PaymentStatus.REFUNDED:
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getPaymentIcon = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PENDING:
        return Clock;
      case PaymentStatus.PARTIAL:
        return CreditCard;
      case PaymentStatus.PAID:
        return CheckCircle2;
      case PaymentStatus.REFUNDED:
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const StatusIcon = getStatusIcon(order.status);
  const PaymentIcon = getPaymentIcon(order.paymentStatus);

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="border-b pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
            <p className="text-muted-foreground mt-1 text-xs">Order ID: {order.id}</p>
          </div>
          <div className="flex flex-col gap-1">
            <Badge variant={getStatusVariant(order.status)} className="gap-1">
              <StatusIcon className="h-3 w-3" />
              {order.status}
            </Badge>
            <Badge variant={getPaymentVariant(order.paymentStatus)} className="gap-1">
              <PaymentIcon className="h-3 w-3" />
              {order.paymentStatus}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4">
        {/* Customer Information */}
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <User className="h-4 w-4" />
            Customer
          </h3>
          <div className="bg-muted/30 space-y-1.5 rounded-lg p-3 text-sm">
            <p className="font-medium">{order.customerName}</p>
            {order.customerEmail && (
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <Mail className="h-3 w-3" />
                {order.customerEmail}
              </div>
            )}
            {order.customerPhone && (
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <Phone className="h-3 w-3" />
                {order.customerPhone}
              </div>
            )}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Truck className="h-4 w-4" />
            Delivery
          </h3>
          <div className="bg-muted/30 space-y-1.5 rounded-lg p-3 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="text-muted-foreground mt-0.5 h-3 w-3 shrink-0" />
              <div className="text-xs">
                <p className="font-medium">{order.deliveryAddress}</p>
                <p className="text-muted-foreground">{order.deliveryCity}</p>
              </div>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <Calendar className="h-3 w-3" />
              {formatDateTime(order.deliveryDate)}
            </div>
          </div>
        </div>

        <Separator />

        {/* Order Items */}
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Package className="h-4 w-4" />
            Items ({order.items.length})
          </h3>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Product</TableHead>
                  <TableHead className="text-right text-xs">Qty</TableHead>
                  <TableHead className="text-right text-xs">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => {
                  const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
                  return (
                    <TableRow key={index}>
                      <TableCell className="text-xs">
                        {product?.name || "Unknown Product"}
                      </TableCell>
                      <TableCell className="text-right text-xs">{item.quantity}</TableCell>
                      <TableCell className="text-right text-xs font-medium">
                        {formatCurrency(item.total)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <DollarSign className="h-4 w-4" />
            Financial Summary
          </h3>
          <div className="bg-muted/30 space-y-1.5 rounded-lg p-3 text-sm">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-red-600">-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-base">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        {order.statusHistory && order.statusHistory.length > 0 && (
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Clock className="h-4 w-4" />
              Timeline
            </h3>
            <div className="space-y-2">
              {order.statusHistory?.map((history, index) => {
                const HistoryIcon = getStatusIcon(history.status);
                const historyLength = order.statusHistory?.length || 0;
                return (
                  <div key={history.id} className="flex gap-2">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          index === historyLength - 1 ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <HistoryIcon className="text-primary-foreground h-3 w-3" />
                      </div>
                      {index < historyLength - 1 && <div className="bg-muted h-full w-0.5"></div>}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium">{history.status}</p>
                          <p className="text-muted-foreground text-xs">{history.notes}</p>
                          {history.userName && (
                            <p className="text-muted-foreground mt-0.5 text-xs">
                              by {history.userName}
                            </p>
                          )}
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {formatDate(history.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Notes */}
        {order.notes && (
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <FileText className="h-4 w-4" />
              Notes
            </h3>
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-muted-foreground text-xs">{order.notes}</p>
            </div>
          </div>
        )}

        <Separator />

        {/* Quick Actions */}
        <div className="flex flex-col gap-2">
          {onUpdateStatus &&
            order.status !== OrderStatus.DELIVERED &&
            order.status !== OrderStatus.CANCELLED && (
              <Button
                size="sm"
                onClick={() => onUpdateStatus(order)}
                className="w-full justify-start gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Update Status
              </Button>
            )}
          {onScheduleDelivery &&
            order.status !== OrderStatus.DELIVERED &&
            order.status !== OrderStatus.CANCELLED && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onScheduleDelivery(order)}
                className="w-full justify-start gap-2"
              >
                <Truck className="h-4 w-4" />
                Schedule Delivery
              </Button>
            )}
          {onEdit &&
            order.status !== OrderStatus.DELIVERED &&
            order.status !== OrderStatus.CANCELLED && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(order)}
                className="w-full justify-start gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Order
              </Button>
            )}
          {onPrintOrder && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onPrintOrder(order)}
              className="w-full justify-start gap-2"
            >
              <Printer className="h-4 w-4" />
              Print Order
            </Button>
          )}
          {onCancelOrder &&
            order.status !== OrderStatus.DELIVERED &&
            order.status !== OrderStatus.CANCELLED && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onCancelOrder(order.id)}
                className="w-full justify-start gap-2"
              >
                <Ban className="h-4 w-4" />
                Cancel Order
              </Button>
            )}
        </div>

        {/* Metadata */}
        <div className="text-muted-foreground space-y-1 text-xs">
          <p>Created: {formatDateTime(order.createdAt)}</p>
          <p>Updated: {formatDateTime(order.updatedAt)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
