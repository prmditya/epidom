"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditBusinessInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  business?: {
    id: string;
    name: string;
    address?: string | null;
    city?: string | null;
    country?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
  } | null;
  userId: string;
  onUpdate: () => void;
}

export function EditBusinessInfoDialog({
  open,
  onOpenChange,
  business,
  userId,
  onUpdate,
}: EditBusinessInfoDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user/business", {
        method: business ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          website: formData.get("website"),
          address: formData.get("address"),
          city: formData.get("city"),
          country: formData.get("country"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update business information");
      }

      onUpdate();
      onOpenChange(false);
    } catch (err) {
      setError("Failed to update business information. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {business ? "Edit Business Information" : "Add Business Information"}
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-md border p-3 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">
              Business Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              defaultValue={business?.name || ""}
              required
              disabled={loading}
              placeholder="Epidom Bakery"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Business Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={business?.email || ""}
                disabled={loading}
                placeholder="contact@business.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Business Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={business?.phone || ""}
                disabled={loading}
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              type="url"
              defaultValue={business?.website || ""}
              disabled={loading}
              placeholder="https://www.yourbusiness.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              defaultValue={business?.address || ""}
              disabled={loading}
              placeholder="123 Main Street"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                defaultValue={business?.city || ""}
                disabled={loading}
                placeholder="Paris"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                defaultValue={business?.country || ""}
                disabled={loading}
                placeholder="France"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Saving..." : business ? "Save Changes" : "Create Business"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
