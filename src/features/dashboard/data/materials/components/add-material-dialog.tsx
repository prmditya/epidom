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

interface AddMaterialDialogProps {
  trigger?: React.ReactNode;
}

export default function AddMaterialDialog({ trigger }: AddMaterialDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
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
      title: "Material Added Successfully",
      description: `${formData.name} has been added to your inventory.`,
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
            Add Material
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Add New Material</DialogTitle>
          <DialogDescription>
            Add a new material to your inventory. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Material Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Flour, Sugar, Butter"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="raw">Raw Materials</SelectItem>
                    <SelectItem value="packaging">Packaging</SelectItem>
                    <SelectItem value="dairy">Dairy Products</SelectItem>
                    <SelectItem value="grains">Grains & Flour</SelectItem>
                    <SelectItem value="spices">Spices & Seasonings</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="supplier">Supplier *</Label>
                <Select
                  value={formData.supplier}
                  onValueChange={(value) => setFormData({ ...formData, supplier: value })}
                  required
                >
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Select supplier" />
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
                <Label htmlFor="quantity">Quantity *</Label>
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
                <Label htmlFor="unit">Unit *</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) => setFormData({ ...formData, unit: value })}
                  required
                >
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="g">Grams (g)</SelectItem>
                    <SelectItem value="l">Liters (L)</SelectItem>
                    <SelectItem value="ml">Milliliters (mL)</SelectItem>
                    <SelectItem value="pcs">Pieces</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="minStock">Min. Stock *</Label>
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
              <Label htmlFor="cost">Cost per Unit ($) *</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                placeholder="25.00"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Additional information about this material..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Material</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
