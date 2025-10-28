"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { useI18n } from "@/components/lang/i18n-provider";
import type { ApiErrorResponse } from "@/types/api";

interface EditPersonalInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: string;
    name?: string | null;
    email: string;
    phone?: string | null;
    locale: string;
    timezone: string;
    currency: string;
  };
  onUpdate: () => void;
}

interface FieldErrors {
  [key: string]: string;
}

export function EditPersonalInfoDialog({
  open,
  onOpenChange,
  user,
  onUpdate,
}: EditPersonalInfoDialogProps) {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          locale: formData.get("locale"),
          timezone: formData.get("timezone"),
          currency: formData.get("currency"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors with field-level details
        if (result.error?.code === "VALIDATION_ERROR" && result.error?.details) {
          const errors: FieldErrors = {};
          if (Array.isArray(result.error.details)) {
            result.error.details.forEach((detail: { field: string; message: string }) => {
              errors[detail.field] = detail.message;
            });
          }
          setFieldErrors(errors);
          setError(result.error.message || "Please fix the errors below");
        } else {
          setError(result.error?.message || "Failed to update profile. Please try again.");
        }
        return;
      }

      onUpdate();
      onOpenChange(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Personal Information</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-md border p-3 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">{t("auth.name")}</Label>
            <Input
              id="name"
              name="name"
              defaultValue={user.name || ""}
              disabled={loading}
              className={fieldErrors.name ? "border-destructive" : ""}
            />
            {fieldErrors.name && (
              <p className="text-destructive text-sm">{fieldErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              disabled
              className="bg-muted"
            />
            <p className="text-muted-foreground text-xs">Email cannot be changed</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={user.phone || ""}
              placeholder="+1 234 567 8900"
              disabled={loading}
              className={fieldErrors.phone ? "border-destructive" : ""}
            />
            {fieldErrors.phone && (
              <p className="text-destructive text-sm">{fieldErrors.phone}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="locale">Language</Label>
              <Select name="locale" defaultValue={user.locale} disabled={loading}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="id">Bahasa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select name="currency" defaultValue={user.currency} disabled={loading}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="IDR">IDR (Rp)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select name="timezone" defaultValue={user.timezone} disabled={loading}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                <SelectItem value="America/New_York">America/New York</SelectItem>
                <SelectItem value="Asia/Jakarta">Asia/Jakarta</SelectItem>
                <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
              </SelectContent>
            </Select>
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
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
