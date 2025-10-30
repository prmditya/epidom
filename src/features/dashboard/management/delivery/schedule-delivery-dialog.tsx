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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Truck, Calendar as CalendarIcon, Package, Bell } from "lucide-react";
import { useI18n } from "@/components/lang/i18n-provider";
import type { Order } from "@/types/entities";
import { formatCurrency, formatDate } from "@/lib/utils/formatting";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Delivery method types
enum DeliveryMethod {
  STANDARD = "standard",
  EXPRESS = "express",
  SAME_DAY = "same_day",
  PICKUP = "pickup",
}

// Courier options
const COURIERS = ["Own Fleet", "FedEx", "UPS", "DHL", "Local Delivery Service", "Customer Pickup"];

// Zod validation schema
const scheduleDeliverySchema = z
  .object({
    deliveryDateTime: z.string().min(1, "Delivery date and time is required"),
    deliveryMethod: z.nativeEnum(DeliveryMethod),
    courier: z.string().optional(),
    trackingNumber: z.string().optional(),
    driverName: z.string().optional(),
    driverPhone: z.string().optional(),
    vehicleNumber: z.string().optional(),
    deliveryInstructions: z.string().optional(),
    customerNotification: z.boolean(),
    estimatedCost: z.coerce.number().min(0, "Cost must be positive").optional(),
  })
  .refine(
    (data) => {
      // Validate date is in the future
      const deliveryDate = new Date(data.deliveryDateTime);
      return deliveryDate > new Date();
    },
    {
      message: "Delivery date must be in the future",
      path: ["deliveryDateTime"],
    }
  )
  .refine(
    (data) => {
      // Require courier for non-pickup deliveries
      if (data.deliveryMethod !== DeliveryMethod.PICKUP && !data.courier) {
        return false;
      }
      return true;
    },
    {
      message: "Please select a courier for delivery",
      path: ["courier"],
    }
  );

type ScheduleDeliveryFormValues = z.infer<typeof scheduleDeliverySchema>;

interface ScheduleDeliveryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order?: Order | null;
}

export default function ScheduleDeliveryDialog({
  open,
  onOpenChange,
  order,
}: ScheduleDeliveryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useI18n();

  const form = useForm<ScheduleDeliveryFormValues>({
    resolver: zodResolver(scheduleDeliverySchema),
    defaultValues: {
      deliveryDateTime: "",
      deliveryMethod: DeliveryMethod.STANDARD,
      courier: "",
      trackingNumber: "",
      driverName: "",
      driverPhone: "",
      vehicleNumber: "",
      deliveryInstructions: "",
      customerNotification: true,
      estimatedCost: 0,
    },
  });

  // Pre-fill form when order changes
  useEffect(() => {
    if (order && open) {
      // Set delivery date to the order's delivery date if available
      const deliveryDate = order.deliveryDate
        ? new Date(order.deliveryDate).toISOString().slice(0, 16)
        : "";

      form.reset({
        deliveryDateTime: deliveryDate,
        deliveryMethod: DeliveryMethod.STANDARD,
        courier: "",
        trackingNumber: "",
        driverName: "",
        driverPhone: "",
        vehicleNumber: "",
        deliveryInstructions: order.notes || "",
        customerNotification: true,
        estimatedCost: 0,
      });
    }
  }, [order, open, form]);

  const onSubmit = async (data: ScheduleDeliveryFormValues) => {
    setIsSubmitting(true);

    try {
      // TODO: API call to schedule delivery
      // const response = await fetch(`/api/orders/${order?.id}/schedule-delivery`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      //
      // if (!response.ok) throw new Error("Failed to schedule delivery");

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Delivery Scheduled",
        description: `Delivery for order ${order?.orderNumber} has been scheduled for ${formatDate(
          new Date(data.deliveryDateTime)
        )}.`,
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule delivery. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Watch delivery method for conditional fields
  const deliveryMethod = form.watch("deliveryMethod");

  // Get delivery cost estimate based on method
  const getEstimatedCost = (method: DeliveryMethod, total: number) => {
    switch (method) {
      case DeliveryMethod.STANDARD:
        return total * 0.05; // 5% of order total
      case DeliveryMethod.EXPRESS:
        return total * 0.1; // 10% of order total
      case DeliveryMethod.SAME_DAY:
        return total * 0.15; // 15% of order total
      case DeliveryMethod.PICKUP:
        return 0;
      default:
        return 0;
    }
  };

  // Auto-calculate estimated cost when method changes
  useEffect(() => {
    if (order) {
      const estimatedCost = getEstimatedCost(deliveryMethod, order.total);
      form.setValue("estimatedCost", estimatedCost);
    }
  }, [deliveryMethod, order, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Schedule Delivery
          </DialogTitle>
          <DialogDescription>
            Schedule delivery for{" "}
            {order ? (
              <span className="font-medium">
                Order {order.orderNumber} - {order.customerName}
              </span>
            ) : (
              "this order"
            )}
          </DialogDescription>
        </DialogHeader>

        {order && (
          <div className="bg-muted/50 rounded-lg border p-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Delivery Address</p>
                <p className="text-muted-foreground text-xs">{order.deliveryAddress}</p>
                <p className="text-muted-foreground text-xs">{order.deliveryCity}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{formatCurrency(order.total)}</p>
                <p className="text-muted-foreground text-xs">Order Total</p>
              </div>
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Delivery Date & Time */}
            <FormField
              control={form.control}
              name="deliveryDateTime"
              render={({ field }) => {
                const dateValue = field.value ? new Date(field.value) : undefined;
                const timeValue = field.value ? field.value.slice(11, 16) : "";

                return (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Delivery Date & Time *
                    </FormLabel>
                    <div className="flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !dateValue && "text-muted-foreground"
                              )}
                            >
                              {dateValue ? format(dateValue, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={dateValue}
                            onSelect={(date) => {
                              if (date) {
                                const dateStr = format(date, "yyyy-MM-dd");
                                const time = timeValue || "00:00";
                                field.onChange(`${dateStr}T${time}`);
                              }
                            }}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <Input
                        type="time"
                        value={timeValue}
                        onChange={(e) => {
                          const time = e.target.value;
                          if (dateValue) {
                            const dateStr = format(dateValue, "yyyy-MM-dd");
                            field.onChange(`${dateStr}T${time}`);
                          }
                        }}
                        className="w-[120px]"
                      />
                    </div>
                    <FormDescription>Select the date and time for delivery</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Delivery Method */}
            <FormField
              control={form.control}
              name="deliveryMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Delivery Method *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={DeliveryMethod.STANDARD}>
                        <div className="flex items-center justify-between gap-4">
                          <span>Standard Delivery</span>
                          <Badge variant="secondary" className="text-xs">
                            5% fee
                          </Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value={DeliveryMethod.EXPRESS}>
                        <div className="flex items-center justify-between gap-4">
                          <span>Express Delivery</span>
                          <Badge variant="default" className="text-xs">
                            10% fee
                          </Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value={DeliveryMethod.SAME_DAY}>
                        <div className="flex items-center justify-between gap-4">
                          <span>Same-Day Delivery</span>
                          <Badge variant="destructive" className="text-xs">
                            15% fee
                          </Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value={DeliveryMethod.PICKUP}>
                        <div className="flex items-center justify-between gap-4">
                          <span>Customer Pickup</span>
                          <Badge variant="outline" className="text-xs">
                            Free
                          </Badge>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estimated Cost */}
            <FormField
              control={form.control}
              name="estimatedCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Delivery Cost</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>Automatically calculated based on method</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Courier (required for non-pickup) */}
            {deliveryMethod !== DeliveryMethod.PICKUP && (
              <FormField
                control={form.control}
                name="courier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Courier / Shipping Company *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select courier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COURIERS.map((courier) => (
                          <SelectItem key={courier} value={courier}>
                            {courier}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Driver & Vehicle Info (for own fleet) */}
            {form.watch("courier") === "Own Fleet" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="driverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="driverPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+33 1 23 45 67 89" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehicleNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Number</FormLabel>
                      <FormControl>
                        <Input placeholder="VAN-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Tracking Number */}
            <FormField
              control={form.control}
              name="trackingNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tracking Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="TRACK123456789" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tracking number will be shared with the customer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Delivery Instructions */}
            <FormField
              control={form.control}
              name="deliveryInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Special delivery instructions (e.g., call before delivery, back entrance, etc.)"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Customer Notification */}
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
                      Send delivery schedule notification to customer email
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
                Schedule Delivery
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
