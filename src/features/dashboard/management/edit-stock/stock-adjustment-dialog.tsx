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
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/components/lang/i18n-provider";
import { MOCK_MATERIALS, MOCK_PRODUCTS } from "@/mocks";
import { Loader2, Plus } from "lucide-react";

// Adjustment types (IN = increase stock, OUT = decrease stock)
enum AdjustmentType {
  IN = "ADJUSTMENT_IN",
  OUT = "ADJUSTMENT_OUT",
}

// Zod validation schema
const stockAdjustmentSchema = z.object({
  itemType: z.enum(["material", "product"]),
  itemId: z.string().min(1, "Please select an item"),
  adjustmentType: z.nativeEnum(AdjustmentType, {
    required_error: "Please select an adjustment type",
  }),
  quantity: z.coerce
    .number()
    .positive("Quantity must be positive")
    .min(0.01, "Quantity must be at least 0.01"),
  reason: z.string().min(1, "Please provide a reason"),
  notes: z.string().optional(),
  referenceId: z.string().optional(),
});

type StockAdjustmentFormData = z.infer<typeof stockAdjustmentSchema>;

interface StockAdjustmentDialogProps {
  itemId?: string;
  itemType?: "material" | "product";
  trigger?: React.ReactNode;
}

export function StockAdjustmentDialog({
  itemId,
  itemType = "material",
  trigger,
}: StockAdjustmentDialogProps) {
  const { t } = useI18n();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StockAdjustmentFormData>({
    resolver: zodResolver(stockAdjustmentSchema),
    defaultValues: {
      itemType: itemType,
      itemId: itemId || "",
      adjustmentType: AdjustmentType.IN,
      quantity: 0,
      reason: "",
      notes: "",
      referenceId: "",
    },
  });

  const watchItemType = form.watch("itemType");
  const watchAdjustmentType = form.watch("adjustmentType");
  const watchItemId = form.watch("itemId");

  // Get available items based on type
  const availableItems =
    watchItemType === "material" ? MOCK_MATERIALS : MOCK_PRODUCTS;

  // Get selected item details
  const selectedItem = availableItems.find((item) => item.id === watchItemId);

  // Predefined reasons based on adjustment type
  const getPredefinedReasons = (type: AdjustmentType): string[] => {
    switch (type) {
      case AdjustmentType.IN:
        return [
          t("management.editStock.reasons.countCorrection"),
          t("management.editStock.reasons.foundItems"),
          t("management.editStock.reasons.systemError"),
          t("management.editStock.reasons.returned"),
        ];
      case AdjustmentType.OUT:
        return [
          t("management.editStock.reasons.countCorrection"),
          t("management.editStock.reasons.damaged"),
          t("management.editStock.reasons.expired"),
          t("management.editStock.reasons.stolen"),
          t("management.editStock.reasons.systemError"),
        ];
      default:
        return [];
    }
  };

  const onSubmit = async (data: StockAdjustmentFormData) => {
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch("/api/stock/adjustments", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     ...data,
      //     timestamp: new Date().toISOString(),
      //   }),
      // });
      // if (!response.ok) throw new Error("Failed to record adjustment");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: t("management.editStock.toasts.adjustmentRecorded.title"),
        description: t("management.editStock.toasts.adjustmentRecorded.description"),
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("common.error"),
        description: t("management.editStock.toasts.adjustmentFailed.description"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            {t("management.editStock.adjustStock")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("management.editStock.adjustmentDialog.title")}</DialogTitle>
          <DialogDescription>
            {t("management.editStock.adjustmentDialog.description")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Item Type Selection (if not pre-selected) */}
            {!itemId && (
              <FormField
                control={form.control}
                name="itemType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("management.editStock.itemType")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("management.editStock.selectItemType")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="material">
                          {t("management.editStock.material")}
                        </SelectItem>
                        <SelectItem value="product">
                          {t("management.editStock.product")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Item Selection */}
            <FormField
              control={form.control}
              name="itemId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {watchItemType === "material"
                      ? t("management.editStock.selectMaterial")
                      : t("management.editStock.selectProduct")}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!!itemId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            watchItemType === "material"
                              ? t("management.editStock.selectMaterial")
                              : t("management.editStock.selectProduct")
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableItems.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}{" "}
                          {selectedItem && (
                            <span className="text-muted-foreground text-xs">
                              ({t("management.editStock.current")}: {item.currentStock}{" "}
                              {item.unit})
                            </span>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {selectedItem && (
                      <span>
                        {t("management.editStock.currentStock")}: {selectedItem.currentStock}{" "}
                        {selectedItem.unit}
                      </span>
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Adjustment Type */}
            <FormField
              control={form.control}
              name="adjustmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("management.editStock.adjustmentType")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={AdjustmentType.IN}>
                        {t("management.editStock.increaseStock")} (+)
                      </SelectItem>
                      <SelectItem value={AdjustmentType.OUT}>
                        {t("management.editStock.decreaseStock")} (-)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {field.value === AdjustmentType.IN
                      ? t("management.editStock.increaseDescription")
                      : t("management.editStock.decreaseDescription")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("management.editStock.quantity")}{" "}
                    {selectedItem && `(${selectedItem.unit})`}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reason */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("management.editStock.reason")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("management.editStock.selectReason")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getPredefinedReasons(watchAdjustmentType).map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                      <SelectItem value="other">{t("common.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reference ID (Optional) */}
            <FormField
              control={form.control}
              name="referenceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("management.editStock.referenceId")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("management.editStock.referenceIdPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("management.editStock.referenceIdDescription")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes (Optional) */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("management.editStock.notes")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("management.editStock.notesPlaceholder")}
                      className="resize-none"
                      rows={3}
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
                {t("common.cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("management.editStock.recordAdjustment")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
