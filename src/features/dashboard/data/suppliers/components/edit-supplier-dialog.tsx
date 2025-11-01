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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { PaymentTerms } from "@/types/entities";
import type { Supplier } from "@/types/entities";
import { useI18n } from "@/components/lang/i18n-provider";

// Zod validation schema
const supplierSchema = z.object({
  name: z.string().min(2, "Supplier name must be at least 2 characters"),
  contactPerson: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  paymentTerms: z.nativeEnum(PaymentTerms).optional(),
  deliverySchedule: z.string().optional(),
  rating: z.coerce.number().min(0).max(5).optional().or(z.literal(0)),
  notes: z.string().optional(),
  onTimeDeliveryRate: z.coerce.number().min(0).max(100).optional().or(z.literal(0)),
});

type SupplierFormValues = z.infer<typeof supplierSchema>;

interface EditSupplierDialogProps {
  supplier: Supplier;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditSupplierDialog({
  supplier,
  open,
  onOpenChange,
}: EditSupplierDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useI18n();

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      paymentTerms: undefined,
      deliverySchedule: "",
      rating: 0,
      notes: "",
      onTimeDeliveryRate: 0,
    },
  });

  // Update form when supplier changes
  useEffect(() => {
    if (supplier) {
      form.reset({
        name: supplier.name || "",
        contactPerson: supplier.contactPerson || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
        address: supplier.address || "",
        city: supplier.city || "",
        country: supplier.country || "",
        paymentTerms: supplier.paymentTerms || undefined,
        deliverySchedule: supplier.deliverySchedule || "",
        rating: supplier.rating || 0,
        notes: supplier.notes || "",
        onTimeDeliveryRate: supplier.onTimeDeliveryRate || 0,
      });
    }
  }, [supplier, form]);

  const onSubmit = async (data: SupplierFormValues) => {
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Replace with actual API call
    // const response = await fetch(`/api/suppliers/${supplier.id}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });

    console.log("Supplier data to update:", { id: supplier.id, ...data });

    setIsSubmitting(false);
    toast({
      title: t("data.suppliers.toasts.updated.title"),
      description: t("data.suppliers.toasts.updated.description").replace(
        "{name}",
        data.name
      ),
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("data.suppliers.editTitle") || "Edit Supplier"}</DialogTitle>
          <DialogDescription>
            Update supplier information. Changes will be saved to your contacts.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Basic Information</h3>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Name *</FormLabel>
                    <FormControl>
                      <Input placeholder={t("data.suppliers.form.namePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder={t("data.suppliers.form.contactPersonPlaceholder")} {...field} />
                    </FormControl>
                    <FormDescription>Primary contact name</FormDescription>
                    <FormMessage />
                  </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("data.suppliers.form.emailPlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Business email</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder={t("data.suppliers.form.phonePlaceholder")} {...field} />
                    </FormControl>
                    <FormDescription>Business phone number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Address</h3>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder={t("data.suppliers.form.addressPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder={t("data.suppliers.form.cityPlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder={t("data.suppliers.form.countryPlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Business Terms */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Business Terms</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Terms</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("data.suppliers.form.selectPaymentTerms")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={PaymentTerms.COD}>Cash on Delivery</SelectItem>
                          <SelectItem value={PaymentTerms.NET15}>Net 15 Days</SelectItem>
                          <SelectItem value={PaymentTerms.NET30}>Net 30 Days</SelectItem>
                          <SelectItem value={PaymentTerms.NET60}>Net 60 Days</SelectItem>
                          <SelectItem value={PaymentTerms.NET90}>Net 90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Payment deadline</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliverySchedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Schedule</FormLabel>
                      <FormControl>
                        <Input placeholder={t("data.suppliers.form.deliverySchedulePlaceholder")} {...field} />
                      </FormControl>
                      <FormDescription>Regular delivery days</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Performance Metrics</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quality Rating</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          placeholder={t("data.suppliers.form.ratingPlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Rating out of 5.0</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="onTimeDeliveryRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>On-Time Delivery Rate</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          max="100"
                          placeholder={t("data.suppliers.form.onTimeDeliveryRatePlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Percentage (0-100)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Additional Notes</h3>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("data.suppliers.form.notesPlaceholder")}
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Special requirements, preferences, or important details
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                {t("actions.cancel") || "Cancel"}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("data.suppliers.update") || "Update Supplier"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
