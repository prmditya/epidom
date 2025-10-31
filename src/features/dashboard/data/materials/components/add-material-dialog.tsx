"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/components/lang/i18n-provider";

interface AddMaterialDialogProps {
  trigger?: React.ReactNode;
}

export default function AddMaterialDialog({ trigger }: AddMaterialDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    supplier: "",
    cost: "",
    minStock: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate API call
    toast({
      title: t("data.materials.toasts.added.title") || "Material Added Successfully",
      description: t("data.materials.toasts.added.description")?.replace("{name}", formData.name) || `${formData.name} has been added to your inventory.`,
    });

    // Reset form
    setFormData({
      name: "",
      category: "",
      quantity: "",
      unit: "",
      supplier: "",
      cost: "",
      minStock: "",
      notes: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            {t("common.actions.add") || "Add Material"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>{t("data.materials.addTitle") || "Add New Material"}</DialogTitle>
          <DialogDescription>
            {t("data.materials.addDescription") ||
              "Add a new material to your inventory. Fill in all required fields."}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("data.materials.form.name") || "Material Name"} *</Label>
              <Input
                id="name"
                placeholder={t("data.materials.form.namePlaceholder") || "e.g., Flour, Sugar, Butter"}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">{t("data.materials.form.category") || "Category"} *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder={t("data.materials.form.selectCategory") || "Select category"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="raw">{t("data.materials.categories.raw") || "Raw Materials"}</SelectItem>
                    <SelectItem value="packaging">{t("data.materials.categories.packaging") || "Packaging"}</SelectItem>
                    <SelectItem value="dairy">{t("data.materials.categories.dairy") || "Dairy Products"}</SelectItem>
                    <SelectItem value="grains">{t("data.materials.categories.grains") || "Grains & Flour"}</SelectItem>
                    <SelectItem value="spices">{t("data.materials.categories.spices") || "Spices & Seasonings"}</SelectItem>
                    <SelectItem value="other">{t("data.materials.categories.other") || "Other"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="supplier">{t("data.materials.form.supplier") || "Supplier"} *</Label>
                <Select
                  value={formData.supplier}
                  onValueChange={(value) => setFormData({ ...formData, supplier: value })}
                  required
                >
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder={t("data.materials.form.selectSupplier") || "Select supplier"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier1">ABC Supplies Inc.</SelectItem>
                    <SelectItem value="supplier2">Global Food Distributors</SelectItem>
                    <SelectItem value="supplier3">Fresh Ingredients Co.</SelectItem>
                    <SelectItem value="supplier4">Premium Materials Ltd.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">{t("data.materials.form.quantity") || "Quantity"} *</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="100"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="unit">{t("data.materials.form.unit") || "Unit"} *</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) => setFormData({ ...formData, unit: value })}
                  required
                >
                  <SelectTrigger id="unit">
                    <SelectValue placeholder={t("data.materials.form.selectUnit") || "Unit"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">{t("data.materials.units.kg") || "Kilograms (kg)"}</SelectItem>
                    <SelectItem value="g">{t("data.materials.units.g") || "Grams (g)"}</SelectItem>
                    <SelectItem value="l">{t("data.materials.units.l") || "Liters (L)"}</SelectItem>
                    <SelectItem value="ml">{t("data.materials.units.ml") || "Milliliters (mL)"}</SelectItem>
                    <SelectItem value="pcs">{t("data.materials.units.pcs") || "Pieces"}</SelectItem>
                    <SelectItem value="box">{t("data.materials.units.box") || "Box"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="minStock">{t("data.materials.form.minStock") || "Min. Stock"} *</Label>
                <Input
                  id="minStock"
                  type="number"
                  placeholder="20"
                  value={formData.minStock}
                  onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cost">{t("data.materials.form.cost") || "Cost per Unit ($)"} *</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                placeholder={t("data.materials.form.costPlaceholder") || "25.00"}
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">{t("data.materials.form.notes") || "Notes (Optional)"}</Label>
              <Textarea
                id="notes"
                placeholder={t("data.materials.form.notesPlaceholder") || "Additional information about this material..."}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t("actions.cancel") || "Cancel"}
            </Button>
            <Button type="submit">{t("common.actions.add") || "Add Material"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
