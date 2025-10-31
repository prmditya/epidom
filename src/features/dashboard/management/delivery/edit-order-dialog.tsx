"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Edit,
  Plus,
  Trash2,
  User,
  MapPin,
  Phone,
  Mail,
  Package,
  Calendar,
  DollarSign,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/lang/i18n-provider";
import type { Order } from "@/types/entities";
import { OrderStatus, PaymentStatus } from "@/types/entities";
import { MOCK_PRODUCTS, MOCK_SUPPLIERS } from "@/mocks";
import { formatCurrency } from "@/lib/utils/formatting";

// Validation schema for order items
const orderItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  productName: z.string().optional(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Unit price must be positive"),
  subtotal: z.number().min(0),
});

// Main order edit schema
const editOrderSchema = z.object({
  // Order Information
  orderNumber: z.string().min(1, "Order number is required"),
  status: z.nativeEnum(OrderStatus),
  paymentStatus: z.nativeEnum(PaymentStatus),
  orderDate: z.date({
    required_error: "Order date is required",
  }),
  deliveryDate: z.date().optional(),

  // Customer Information
  customerName: z.string().min(2, "Customer name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  customerPhone: z.string().min(1, "Phone number is required"),

  // Delivery Address
  deliveryAddress: z.string().min(5, "Delivery address is required"),
  deliveryCity: z.string().min(2, "City is required"),
  deliveryPostalCode: z.string().min(3, "Postal code is required"),
  deliveryCountry: z.string().min(2, "Country is required"),

  // Order Items
  items: z.array(orderItemSchema).min(1, "At least one item is required"),

  // Additional Information
  supplierId: z.string().optional(),
  paymentMethod: z.string().optional(),
  notes: z.string().optional(),
});

type EditOrderFormValues = z.infer<typeof editOrderSchema>;

interface EditOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  trigger?: React.ReactNode;
}

export default function EditOrderDialog({
  open,
  onOpenChange,
  order,
  trigger,
}: EditOrderDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useI18n();

  const form = useForm<EditOrderFormValues>({
    resolver: zodResolver(editOrderSchema),
    defaultValues: {
      orderNumber: "",
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
      orderDate: undefined,
      deliveryDate: undefined,
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      deliveryAddress: "",
      deliveryCity: "",
      deliveryPostalCode: "",
      deliveryCountry: "",
      items: [],
      supplierId: "",
      paymentMethod: "",
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  // Reset form when order changes
  useEffect(() => {
    if (order && open) {
      // Calculate items from order
      const orderItems =
        order.items?.map((item) => ({
          productId: item.productId,
          productName: MOCK_PRODUCTS.find((p) => p.id === item.productId)?.name || "",
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.quantity * item.unitPrice,
        })) || [];

      form.reset({
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus || PaymentStatus.PENDING,
        orderDate: order.orderDate ? new Date(order.orderDate) : undefined,
        deliveryDate: order.deliveryDate ? new Date(order.deliveryDate) : undefined,
        customerName: order.customerName,
        customerEmail: order.customerEmail || "",
        customerPhone: order.customerPhone || "",
        deliveryAddress: order.deliveryAddress || "",
        deliveryCity: order.deliveryCity || "",
        deliveryPostalCode: order.deliveryPostalCode || "",
        deliveryCountry: order.deliveryCountry || "Indonesia",
        items: orderItems,
        supplierId: order.supplierId || "",
        paymentMethod: order.paymentMethod || "",
        notes: order.notes || "",
      });
    }
  }, [order, open, form]);

  // Calculate total amount
  const watchedItems = form.watch("items");
  const totalAmount = watchedItems?.reduce((sum, item) => sum + (item.subtotal || 0), 0) || 0;

  // Handle product selection change
  const handleProductChange = (index: number, productId: string) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      form.setValue(`items.${index}.productId`, productId);
      form.setValue(`items.${index}.productName`, product.name);
      form.setValue(`items.${index}.unitPrice`, product.retailPrice);

      // Recalculate subtotal
      const quantity = form.getValues(`items.${index}.quantity`) || 1;
      form.setValue(`items.${index}.subtotal`, quantity * product.retailPrice);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (index: number, quantity: number) => {
    const unitPrice = form.getValues(`items.${index}.unitPrice`) || 0;
    form.setValue(`items.${index}.quantity`, quantity);
    form.setValue(`items.${index}.subtotal`, quantity * unitPrice);
  };

  // Add new item
  const addItem = () => {
    append({
      productId: "",
      productName: "",
      quantity: 1,
      unitPrice: 0,
      subtotal: 0,
    });
  };

  const onSubmit = async (data: EditOrderFormValues) => {
    setIsSubmitting(true);

    try {
      // TODO: API call to update order
      // const response = await fetch(`/api/orders/${order?.id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      //
      // if (!response.ok) throw new Error("Failed to update order");

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Updating order with data:", data);

      toast({
        title: "Order Updated",
        description: `Order ${data.orderNumber} has been updated successfully.`,
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[900px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Order
          </DialogTitle>
          <DialogDescription>Update order details for {order.orderNumber}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Order Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Package className="h-4 w-4" />
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="orderNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Number *</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormDescription>Order number cannot be changed</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="orderDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Order Date *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deliveryDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Delivery Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: Date) => date < new Date("1900-01-01")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplierId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select supplier" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {MOCK_SUPPLIERS.map((supplier) => (
                              <SelectItem key={supplier.id} value={supplier.id}>
                                {supplier.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Status *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(OrderStatus).map((status) => (
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

                  <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Status *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(PaymentStatus).map((status) => (
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

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                            <SelectItem value="credit_card">Credit Card</SelectItem>
                            <SelectItem value="check">Check</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Name *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                            <Input className="pl-9" placeholder="John Doe" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                            <Input className="pl-9" placeholder="+62 812 3456 7890" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                            <Input
                              type="email"
                              className="pl-9"
                              placeholder="customer@example.com"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-4 w-4" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="123 Main Street, Apartment 4B" rows={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="deliveryCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input placeholder="Jakarta" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deliveryPostalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code *</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deliveryCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country *</FormLabel>
                        <FormControl>
                          <Input placeholder="Indonesia" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Package className="h-4 w-4" />
                  Order Items ({fields.length})
                </CardTitle>
                <Button type="button" size="sm" variant="outline" onClick={addItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.length === 0 ? (
                  <div className="text-muted-foreground py-8 text-center">
                    <Package className="mx-auto mb-3 h-12 w-12 opacity-20" />
                    <p className="text-sm">No items added yet. Click "Add Item" to start.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <Card key={field.id} className="border-muted">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="grid flex-1 grid-cols-4 gap-4">
                              <FormField
                                control={form.control}
                                name={`items.${index}.productId`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Product *</FormLabel>
                                    <Select
                                      onValueChange={(value) => handleProductChange(index, value)}
                                      value={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select product" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {MOCK_PRODUCTS.map((product) => (
                                          <SelectItem key={product.id} value={product.id}>
                                            {product.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`items.${index}.quantity`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Quantity *</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        min="1"
                                        {...field}
                                        onChange={(e) =>
                                          handleQuantityChange(index, parseInt(e.target.value) || 0)
                                        }
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`items.${index}.unitPrice`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Unit Price</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <DollarSign className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                                        <Input
                                          type="number"
                                          step="0.01"
                                          className="pl-9"
                                          {...field}
                                          onChange={(e) =>
                                            field.onChange(parseFloat(e.target.value) || 0)
                                          }
                                        />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`items.${index}.subtotal`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Subtotal</FormLabel>
                                    <FormControl>
                                      <Input
                                        value={formatCurrency(field.value)}
                                        disabled
                                        className="bg-muted"
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-destructive bg-destructive/10 hover:bg-destructive my-auto hover:text-white"
                              onClick={() => remove(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {fields.length > 0 && (
                  <>
                    <Separator />
                    <div className="bg-muted/50 flex items-center justify-between rounded-lg p-4">
                      <span className="text-base font-semibold">Total Amount:</span>
                      <span className="text-primary text-xl font-bold">
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Add any special instructions or notes for this order..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

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
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
