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

interface AddProductDialogProps {
  trigger?: React.ReactNode;
}

export default function AddProductDialog({ trigger }: AddProductDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    recipe: "",
    price: "",
    unit: "",
    shelfLife: "",
    storageTemp: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Product Added Successfully",
      description: `${formData.name} has been added to your product catalog.`,
    });

    setFormData({
      name: "",
      category: "",
      recipe: "",
      price: "",
      unit: "",
      shelfLife: "",
      storageTemp: "",
      description: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Create a new product in your catalog.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Baguette, Croissant"
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
                    <SelectItem value="bread">Bread</SelectItem>
                    <SelectItem value="pastry">Pastry</SelectItem>
                    <SelectItem value="cake">Cake</SelectItem>
                    <SelectItem value="cookie">Cookie</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="recipe">Recipe *</Label>
                <Select
                  value={formData.recipe}
                  onValueChange={(value) => setFormData({ ...formData, recipe: value })}
                  required
                >
                  <SelectTrigger id="recipe">
                    <SelectValue placeholder="Select recipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rec1">Baguette Tradition</SelectItem>
                    <SelectItem value="rec2">Croissant Classic</SelectItem>
                    <SelectItem value="rec3">Sourdough</SelectItem>
                    <SelectItem value="rec4">Brioche</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="4.50"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
                    <SelectItem value="piece">Per Piece</SelectItem>
                    <SelectItem value="kg">Per Kilogram</SelectItem>
                    <SelectItem value="dozen">Per Dozen</SelectItem>
                    <SelectItem value="box">Per Box</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="shelfLife">Shelf Life (days) *</Label>
                <Input
                  id="shelfLife"
                  type="number"
                  placeholder="3"
                  value={formData.shelfLife}
                  onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="storageTemp">Storage Temp (°C) *</Label>
                <Input
                  id="storageTemp"
                  type="number"
                  placeholder="20"
                  value={formData.storageTemp}
                  onChange={(e) => setFormData({ ...formData, storageTemp: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Product description, ingredients, allergens..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


