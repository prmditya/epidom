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
import { PackagePlus } from "lucide-react";

interface RestockDialogProps {
  product?: { name: string; currentStock: number; unit: string };
}

export default function RestockDialog({ product }: RestockDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    supplier: "",
    quantity: "",
    deliveryDate: "",
    priority: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Restock Order Created",
      description: `Order for ${formData.quantity} ${product?.unit || "units"} of ${product?.name || "product"} has been placed.`,
    });

    setFormData({
      supplier: "",
      quantity: "",
      deliveryDate: "",
      priority: "",
      notes: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <PackagePlus className="h-4 w-4" />
          Restock
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Restock Order</DialogTitle>
          <DialogDescription>
            {product ? `Order more ${product.name}` : "Place a restock order"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {product && (
              <div className="grid gap-2">
                <Label>Product</Label>
                <div className="bg-muted rounded-md border px-3 py-2 text-sm">
                  {product.name}
                  <span className="text-muted-foreground ml-2">
                    (Current: {product.currentStock} {product.unit})
                  </span>
                </div>
              </div>
            )}

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

            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity to Order *</Label>
              <Input
                id="quantity"
                type="number"
                placeholder={`Enter quantity in ${product?.unit || "units"}`}
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="deliveryDate">Requested Delivery Date *</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
                required
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Special instructions or notes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Place Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
