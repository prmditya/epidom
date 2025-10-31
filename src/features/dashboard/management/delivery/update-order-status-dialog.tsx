"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  TrendingUp,
  Clock,
  Package,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Bell,
  ArrowRight,
} from "lucide-react";
import { useI18n } from "@/components/lang/i18n-provider";
import type { Order } from "@/types/entities";
import { OrderStatus } from "@/types/entities";

// Cancellation reasons
const CANCELLATION_REASONS = [
  "Customer Request",
  "Product Unavailable",
  "Payment Failed",
  "Delivery Issues",
  "Duplicate Order",
  "Other",
];

// Unified schema with optional fields and conditional validation
const updateStatusSchema = z
  .object({
    newStatus: z.nativeEnum(OrderStatus),
    notes: z.string().optional(),
    customerNotification: z.boolean().optional(),
    // PROCESSING fields
    estimatedCompletionTime: z.string().optional(),
    // IN_STOCK (READY) fields
    readyTimestamp: z.string().optional(),
    // DELIVERED fields
    deliveryConfirmation: z.string().optional(),
    recipientName: z.string().optional(),
    signatureUrl: z.string().optional(),
    // CANCELLED fields
    cancellationReason: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validate required fields based on status
    if (data.newStatus === OrderStatus.IN_STOCK) {
      if (!data.readyTimestamp) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Ready timestamp is required",
          path: ["readyTimestamp"],
        });
      }
    }

    if (data.newStatus === OrderStatus.DELIVERED) {
      if (!data.deliveryConfirmation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Delivery confirmation is required",
          path: ["deliveryConfirmation"],
        });
      }
      if (!data.recipientName || data.recipientName.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Recipient name must be at least 2 characters",
          path: ["recipientName"],
        });
      }
      if (data.signatureUrl && data.signatureUrl.length > 0) {
        try {
          new URL(data.signatureUrl);
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Must be a valid URL",
            path: ["signatureUrl"],
          });
        }
      }
    }

    if (data.newStatus === OrderStatus.CANCELLED) {
      if (!data.cancellationReason) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cancellation reason is required",
          path: ["cancellationReason"],
        });
      }
    }
  });

type UpdateStatusFormValues = z.infer<typeof updateStatusSchema>;

interface UpdateOrderStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order?: Order | null;
}

export default function UpdateOrderStatusDialog({
  open,
  onOpenChange,
  order,
}: UpdateOrderStatusDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useI18n();

  const form = useForm<UpdateStatusFormValues>({
    resolver: zodResolver(updateStatusSchema),
    defaultValues: {
      newStatus: OrderStatus.PENDING,
      notes: "",
      customerNotification: true,
      estimatedCompletionTime: "",
      readyTimestamp: "",
      deliveryConfirmation: "",
      recipientName: "",
      signatureUrl: "",
      cancellationReason: "",
    },
  });

  // Reset form when order changes
  useEffect(() => {
    if (order && open) {
      // Set next logical status
      const nextStatus = getNextStatus(order.status);
      form.reset({
        newStatus: nextStatus,
        notes: "",
        customerNotification: true,
        estimatedCompletionTime: "",
        readyTimestamp: "",
        deliveryConfirmation: "",
        recipientName: "",
        signatureUrl: "",
        cancellationReason: "",
      });
    }
  }, [order, open, form]);

  // Get next logical status in workflow
  const getNextStatus = (currentStatus: OrderStatus): OrderStatus => {
    switch (currentStatus) {
      case OrderStatus.PENDING:
        return OrderStatus.PROCESSING;
      case OrderStatus.PROCESSING:
        return OrderStatus.IN_STOCK;
      case OrderStatus.IN_STOCK:
        return OrderStatus.DELIVERED;
      default:
        return currentStatus;
    }
  };

  // Get available status options based on current status
  const getAvailableStatuses = (currentStatus: OrderStatus): OrderStatus[] => {
    switch (currentStatus) {
      case OrderStatus.PENDING:
        return [OrderStatus.PROCESSING, OrderStatus.CANCELLED];
      case OrderStatus.PROCESSING:
        return [OrderStatus.IN_STOCK, OrderStatus.CANCELLED];
      case OrderStatus.IN_STOCK:
        return [OrderStatus.DELIVERED, OrderStatus.CANCELLED];
      case OrderStatus.DELIVERED:
        return []; // Can't change from delivered
      case OrderStatus.CANCELLED:
        return []; // Can't change from cancelled
      default:
        return [];
    }
  };

  // Get status icon
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
        return AlertTriangle;
    }
  };

  // Get status color
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200";
      case OrderStatus.PROCESSING:
        return "text-amber-600 bg-amber-100 dark:bg-amber-900 dark:text-amber-200";
      case OrderStatus.IN_STOCK:
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200";
      case OrderStatus.DELIVERED:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200";
      case OrderStatus.CANCELLED:
        return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const onSubmit = async (data: UpdateStatusFormValues) => {
    setIsSubmitting(true);

    try {
      // TODO: API call to update order status
      // const response = await fetch(`/api/orders/${order?.id}/status`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      //
      // if (!response.ok) throw new Error("Failed to update status");

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Status Updated",
        description: `Order ${order?.orderNumber} has been updated to ${data.newStatus}.`,
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Watch selected status for conditional fields
  const selectedStatus = form.watch("newStatus");

  if (!order) return null;

  const CurrentStatusIcon = getStatusIcon(order.status);
  const NewStatusIcon = getStatusIcon(selectedStatus);
  const availableStatuses = getAvailableStatuses(order.status);

  // Check if order can be updated
  if (availableStatuses.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>Order {order.orderNumber}</DialogDescription>
          </DialogHeader>
          <div className="py-8 text-center">
            <AlertTriangle className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground text-sm">
              This order's status cannot be changed.
              <br />
              Current status: <strong>{order.status}</strong>
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Update Order Status
          </DialogTitle>
          <DialogDescription>
            Update status for Order {order.orderNumber} - {order.customerName}
          </DialogDescription>
        </DialogHeader>

        {/* Status Transition Preview */}
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(order.status)}>
                <CurrentStatusIcon className="mr-1 h-3 w-3" />
                {order.status}
              </Badge>
              <span className="text-muted-foreground text-xs">Current</span>
            </div>
            <ArrowRight className="text-muted-foreground h-5 w-5" />
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(selectedStatus)}>
                <NewStatusIcon className="mr-1 h-3 w-3" />
                {selectedStatus}
              </Badge>
              <span className="text-muted-foreground text-xs">New</span>
            </div>
          </CardContent>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* New Status Selection */}
            <FormField
              control={form.control}
              name="newStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Status *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select new status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditional Fields Based on Status */}

            {/* PROCESSING: Estimated Completion Time */}
            {selectedStatus === OrderStatus.PROCESSING && (
              <FormField
                control={form.control}
                name="estimatedCompletionTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Completion Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormDescription>When will this order be ready for delivery?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* IN_STOCK (READY): Ready Timestamp */}
            {selectedStatus === OrderStatus.IN_STOCK && (
              <FormField
                control={form.control}
                name="readyTimestamp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ready Timestamp *</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormDescription>When was the order completed and ready?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* DELIVERED: Delivery Details */}
            {selectedStatus === OrderStatus.DELIVERED && (
              <>
                <FormField
                  control={form.control}
                  name="deliveryConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Confirmation Code *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., DEL-123456" {...field} />
                      </FormControl>
                      <FormDescription>
                        Confirmation code or proof of delivery reference
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of person who received the order" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="signatureUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Signature URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com/signatures/12345"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        URL to digital signature or delivery proof image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* CANCELLED: Cancellation Reason */}
            {selectedStatus === OrderStatus.CANCELLED && (
              <FormField
                control={form.control}
                name="cancellationReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cancellation Reason *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CANCELLATION_REASONS.map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>This will be recorded in the order history</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Notes (always available) */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional information about this status change..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Customer Notification Toggle */}
            <FormField
              control={form.control}
              name="customerNotification"
              render={({ field }) => (
                <FormItem className="bg-muted/30 flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Notify Customer
                    </FormLabel>
                    <FormDescription>
                      Send status update notification to customer email
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Status
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
