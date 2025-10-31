"use client";

import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, Loader2 } from "lucide-react";
import { MOCK_MATERIALS, MOCK_PRODUCTS } from "@/mocks";
import { MovementType } from "@/types/entities";

// Zod validation schema
const stockUpdateSchema = z.object({
  itemId: z.string({ required_error: "Please select an item" }),
  itemType: z.enum(["material", "product"], { required_error: "Item type is required" }),
  movementType: z.nativeEnum(MovementType, { required_error: "Please select a movement type" }),
  quantity: z.coerce.number().positive("Quantity must be greater than 0"),
  reason: z.string().min(2, "Please provide a reason for this adjustment"),
  notes: z.string().optional(),
  reference: z.string().optional(),
});

type StockUpdateFormValues = z.infer<typeof stockUpdateSchema>;

export default function UpdateStockDialog() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<StockUpdateFormValues>({
    resolver: zodResolver(stockUpdateSchema),
    defaultValues: {
      itemId: "",
      itemType: "material",
      movementType: undefined,
      quantity: 0,
      reason: "",
      notes: "",
      reference: "",
    },
  });

  const itemType = form.watch("itemType");

  const onSubmit = async (data: StockUpdateFormValues) => {
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Replace with actual API call
    // const response = await fetch("/api/stock-movements", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });

    console.log("Stock update data to submit:", data);

    const item =
      data.itemType === "material"
        ? MOCK_MATERIALS.find((m) => m.id === data.itemId)
        : MOCK_PRODUCTS.find((p) => p.id === data.itemId);

    const actionText = [
      MovementType.IN,
      MovementType.PRODUCTION,
      MovementType.RETURN,
    ].includes(data.movementType)
      ? "increased"
      : "decreased";

    setIsSubmitting(false);
    toast({
      title: "Stock Updated Successfully",
      description: `Stock for ${item?.name || "item"} has been ${actionText} by ${data.quantity} ${item && "unit" in item ? item.unit : "units"}.`,
    });

    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          <TrendingUp className="h-4 w-4" />
          Update Stock
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Stock Level</DialogTitle>
          <DialogDescription>
            Adjust inventory levels for materials or products. All fields marked with * are
            required.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Item Type Selection */}
            <FormField
              control={form.control}
              name="itemType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select item type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="material">Material</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Item Selection */}
            <FormField
              control={form.control}
              name="itemId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{itemType === "material" ? "Material" : "Product"} *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {itemType === "material"
                        ? MOCK_MATERIALS.map((material) => (
                            <SelectItem key={material.id} value={material.id}>
                              {material.name} ({material.currentStock} {material.unit} in stock)
                            </SelectItem>
                          ))
                        : MOCK_PRODUCTS.map((product) => (
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

            {/* Movement Type & Quantity */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="movementType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Movement Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={MovementType.IN}>Purchase/Receipt (Incoming)</SelectItem>
                        <SelectItem value={MovementType.PRODUCTION}>
                          Production (Manufacturing)
                        </SelectItem>
                        <SelectItem value={MovementType.OUT}>Sale/Shipment (Outgoing)</SelectItem>
                        <SelectItem value={MovementType.WASTE}>
                          Waste/Spoilage (Loss)
                        </SelectItem>
                        <SelectItem value={MovementType.RETURN}>Return to Supplier</SelectItem>
                        <SelectItem value={MovementType.ADJUSTMENT}>
                          Stock Adjustment (Count Correction)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0.01" placeholder="50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Reason */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="New delivery received">New Delivery Received</SelectItem>
                      <SelectItem value="Used in production">Used in Production</SelectItem>
                      <SelectItem value="Damaged goods">Damaged Goods</SelectItem>
                      <SelectItem value="Expired items">Expired Items</SelectItem>
                      <SelectItem value="Stock count adjustment">Stock Count Adjustment</SelectItem>
                      <SelectItem value="Returned to supplier">Returned to Supplier</SelectItem>
                      <SelectItem value="Customer return">Customer Return</SelectItem>
                      <SelectItem value="Theft or loss">Theft or Loss</SelectItem>
                      <SelectItem value="Other">Other (see notes)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Why is this stock movement being made?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reference Number */}
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., PO-1234, INV-5678" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional - Purchase order, invoice, or batch number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information about this stock movement..."
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Updating..." : "Update Stock"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
