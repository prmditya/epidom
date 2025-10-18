"use client";

import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useI18n } from "@/components/lang/i18n-provider";

export default function ProfilePage() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  // Mock user data - replace with real auth later
  const user = {
    name: "Demo User",
    email: "demo@epidom.com",
    businessName: "Epidom Bakery",
    address: "123 Main St, Paris",
  };

  return (
    <div className="w-full space-y-6">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 px-0 bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-xl">
        <Avatar className="size-16 sm:size-20 ring-4 ring-primary/10">
          <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1 flex-1">
          <CardTitle className="text-2xl font-bold">
            {user?.name ?? "User"}
          </CardTitle>
          <CardDescription className="text-base">{user?.email}</CardDescription>
        </div>
        <div className="sm:ml-auto">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="shadow-md hover:shadow-lg transition-all">
                {t("actions.editProfile")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("profile.updateProfile")}</DialogTitle>
              </DialogHeader>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(t("messages.profileUpdated"));
                  setOpen(false);
                }}
              >
                <div className="grid gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">{t("auth.name")}</Label>
                    <Input id="name" defaultValue={user?.name} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">{t("auth.email")}</Label>
                    <Input id="email" defaultValue={user?.email} />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  {t("actions.save")}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 px-0">
        <div className="rounded-xl border p-5 bg-gradient-to-br from-card to-muted/20 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            {t("profile.businessName")}
          </p>
          <p className="font-semibold text-lg">{user?.businessName ?? "—"}</p>
        </div>
        <div className="rounded-xl border p-5 bg-gradient-to-br from-card to-muted/20 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            {t("profile.address")}
          </p>
          <p className="font-semibold text-lg">{user?.address ?? "—"}</p>
        </div>
      </CardContent>
    </div>
  );
}
