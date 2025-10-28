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
          className="w-full rounded-full bg-neutral-900 px-6 py-5 text-sm font-medium text-white shadow-lg transition-all hover:bg-neutral-800 hover:shadow-xl sm:w-auto sm:px-8 sm:py-6 sm:text-base"
        >
          <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          {t("stores.createStore")}
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-4 max-h-[90vh] overflow-y-auto sm:mx-0 sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold sm:text-2xl">
              {t("stores.createStore")}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              {t("stores.createFirst")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 sm:gap-6 sm:py-6">
            <div className="grid gap-2">
              <Label htmlFor="storeName" className="text-sm font-medium sm:text-base">
                {t("stores.storeName")}
              </Label>
              <Input
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Boutique boulangerie n°1"
                required
                className="h-10 text-sm sm:h-11 sm:text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city" className="text-sm font-medium sm:text-base">
                {t("stores.city")}
              </Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Paris"
                required
                className="h-10 text-sm sm:h-11 sm:text-base"
              />
            </div>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full text-sm sm:w-auto sm:text-base"
            >
              {t("actions.cancel")}
            </Button>
            <Button
              type="submit"
              className="w-full bg-neutral-900 text-sm text-white hover:bg-neutral-800 sm:w-auto sm:text-base"
            >
              {t("actions.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
