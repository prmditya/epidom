"use client";

import { useState } from "react";
import { useI18n } from "@/components/lang/i18n-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export function CreateStoreButton() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to create store
    console.log("Creating store:", { storeName, city });
    
    // Reset form and close dialog
    setStoreName("");
    setCity("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          {t("stores.createStore")}
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-4 sm:mx-0 sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold">
              {t("stores.createStore")}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              {t("stores.createFirst")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:gap-6 py-4 sm:py-6">
            <div className="grid gap-2">
              <Label htmlFor="storeName" className="text-sm sm:text-base font-medium">
                {t("stores.storeName")}
              </Label>
              <Input
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Boutique boulangerie n°1"
                required
                className="h-10 sm:h-11 text-sm sm:text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city" className="text-sm sm:text-base font-medium">
                {t("stores.city")}
              </Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Paris"
                required
                className="h-10 sm:h-11 text-sm sm:text-base"
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              {t("actions.cancel")}
            </Button>
            <Button
              type="submit"
              className="bg-neutral-900 hover:bg-neutral-800 text-white w-full sm:w-auto text-sm sm:text-base"
            >
              {t("actions.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
