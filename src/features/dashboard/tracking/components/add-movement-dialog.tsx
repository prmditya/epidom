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
import { MovementType } from "@/types/entities";
import { MOCK_MATERIALS, MOCK_PRODUCTS } from "@/mocks";
import { Loader2, Plus } from "lucide-react";

// Zod validation schema
const addMovementSchema = z.object({
  itemType: z.enum(["material", "product"]),
  itemId: z.string().min(1, "Please select an item"),
  type: z.nativeEnum(MovementType, {
    required_error: "Please select a movement type",
  }),
  quantity: z.coerce
    .number()
    .positive("Quantity must be positive")
    .min(0.01, "Quantity must be at least 0.01"),
  reason: z.string().min(1, "Please provide a reason"),
  notes: z.string().optional(),
  referenceId: z.string().optional(),
});

type AddMovementFormData = z.infer<typeof addMovementSchema>;

export function AddMovementDialog() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddMovementFormData>({
    resolver: zodResolver(addMovementSchema),
    defaultValues: {
      itemType: "material",
      itemId: "",
      type: MovementType.IN,
      quantity: 0,
      reason: "",
      notes: "",
      referenceId: "",
    },
  });

  const watchItemType = form.watch("itemType");
  const watchType = form.watch("type");

  // Get available items based on type
  const availableItems =
    watchItemType === "material" ? MOCK_MATERIALS : MOCK_PRODUCTS;

  // Predefined reasons based on movement type
  const getPredefinedReasons = (type: MovementType): string[] => {
    switch (type) {
      case MovementType.IN:
        return [
          t("tracking.reasons.purchase"),
          t("tracking.reasons.return"),
          t("tracking.reasons.transfer"),
        ];
      case MovementType.OUT:
        return [
          t("tracking.reasons.sale"),
          t("tracking.reasons.production"),
          t("tracking.reasons.transfer"),
        ];
      case MovementType.WASTE:
        return [
          t("tracking.reasons.damage"),
          t("tracking.reasons.expired"),
          t("tracking.reasons.theft"),
        ];
      case MovementType.ADJUSTMENT:
        return [t("tracking.reasons.count"), t("tracking.reasons.other")];
      case MovementType.PRODUCTION:
        return [t("tracking.reasons.production")];
      case MovementType.RETURN:
        return [t("tracking.reasons.return")];
      default:
        return [t("tracking.reasons.other")];
    }
  };

  const onSubmit = async (data: AddMovementFormData) => {
    setIsSubmitting(true);

    try {
      // TODO: Replace with TanStack Query useMutation hook
      // Example implementation:
      // const mutation = useMutation({
      //   mutationFn: (movementData) => createMovement(movementData),
      //   onSuccess: () => {
      //     queryClient.invalidateQueries({ queryKey: ['movements'] });
      //     queryClient.invalidateQueries({ queryKey: ['stock-levels'] });
      //     toast({
      //       title: t("tracking.toasts.movementAdded.title"),
      //       description: t("tracking.toasts.movementAdded.desc"),
      //     });
      //     form.reset();
      //     setOpen(false);
      //   },
      //   onError: (error) => {
      //     toast({
      //       title: "Error",
      //       description: error.message,
      //       variant: "destructive",
      //     });
      //   },
      // });
      //
      // Then call: mutation.mutate({
      //   materialId: data.itemType === "material" ? data.itemId : null,
      //   productId: data.itemType === "product" ? data.itemId : null,
      //   type: data.type,
      //   quantity: data.quantity,
      //   reason: data.reason,
      //   notes: data.notes,
      //   referenceId: data.referenceId,
      // });

      // Simulate API call (remove when using TanStack Query)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: t("tracking.toasts.movementAdded.title"),
        description: t("tracking.toasts.movementAdded.desc"),
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record movement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          {t("tracking.addMovement")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("tracking.dialogs.addMovement.title")}</DialogTitle>
          <DialogDescription>
            {t("tracking.dialogs.addMovement.description")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Item Type Selection */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="itemType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("tracking.itemType")}</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("itemId", ""); // Reset item selection
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="material">
                          {t("tracking.materialType")}
                        </SelectItem>
                        <SelectItem value="product">
                          {t("tracking.productType")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="itemId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {watchItemType === "material"
                        ? t("tracking.selectMaterial")
                        : t("tracking.selectProduct")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("tracking.selectItem")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableItems.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Movement Type and Quantity */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("tracking.movementType")}</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("reason", ""); // Reset reason when type changes
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(MovementType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {t(`tracking.movements.${type.toLowerCase()}`)}
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
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("tracking.quantity")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder={t("tracking.enterQuantity")}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {/* Show unit from selected item */}
                      {form.watch("itemId") &&
                        (() => {
                          const selectedItem = availableItems.find(
                            (item) => item.id === form.watch("itemId")
                          );
                          return selectedItem ? `Unit: ${selectedItem.unit}` : "";
                        })()}
                    </FormDescription>
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
                  <FormLabel>{t("tracking.reason")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("tracking.selectReason")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getPredefinedReasons(watchType).map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">
                        {t("tracking.reasons.other")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes (optional) */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("tracking.additionalNotes")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("tracking.additionalNotes")}
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Optional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reference ID (optional) */}
            <FormField
              control={form.control}
              name="referenceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("tracking.referenceNumber")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="PO-12345, BATCH-001, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Order ID, Batch ID, or other reference
                  </FormDescription>
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
                {t("actions.cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("tracking.recordMovement")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
