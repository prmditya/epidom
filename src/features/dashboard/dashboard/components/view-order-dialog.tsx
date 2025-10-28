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
import { CalendarDays, User, MapPin, Package, Clock } from "lucide-react";

interface OrderDetails {
  id: string;
  name: string;
  date: string;
  status: string;
  customer?: string;
  address?: string;
  quantity?: number;
  priority?: string;
  notes?: string;
}

interface ViewOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderDetails | null;
}

export default function ViewOrderDialog({ open, onOpenChange, order }: ViewOrderDialogProps) {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      case "in stock":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "delivered":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{order.name}</DialogTitle>
              <DialogDescription className="mt-1">Order ID: {order.id}</DialogDescription>
            </div>
            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <Separator />

          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <CalendarDays className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Delivery Date</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
            </div>

            {order.customer && (
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Customer</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
              </div>
            )}

            {order.address && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Delivery Address</p>
                  <p className="text-sm text-muted-foreground">{order.address}</p>
                </div>
              </div>
            )}

            {order.quantity && (
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Quantity</p>
                  <p className="text-sm text-muted-foreground">{order.quantity} pieces</p>
                </div>
              </div>
            )}

            {order.priority && (
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">Priority:</p>
                  <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
                </div>
              </div>
            )}
          </div>

          {order.notes && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-2">Additional Notes</p>
                <p className="text-sm text-muted-foreground">{order.notes}</p>
              </div>
            </>
          )}

          <Separator />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Created: {order.date}</span>
            <span>Last updated: {order.date}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

