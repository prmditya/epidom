"use client";

import { useState } from "react";
import { Bell, Mail, Smartphone, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/components/lang/i18n-provider";
import { useToast } from "@/hooks/use-toast";

interface NotificationPreferences {
  email: {
    alerts: boolean;
    orders: boolean;
    production: boolean;
  };
  push: {
    alerts: boolean;
    orders: boolean;
    production: boolean;
  };
  inApp: {
    alerts: boolean;
    orders: boolean;
    production: boolean;
  };
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  email: {
    alerts: true,
    orders: true,
    production: false,
  },
  push: {
    alerts: true,
    orders: false,
    production: false,
  },
  inApp: {
    alerts: true,
    orders: true,
    production: true,
  },
};

export function NotificationPreferencesCard() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (
    channel: keyof NotificationPreferences,
    category: keyof NotificationPreferences[keyof NotificationPreferences]
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [category]: !prev[channel][category],
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Replace with actual API call using TanStack Query
      // await fetch("/api/user/notification-preferences", {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(preferences),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast({
        title: t("profile.toasts.preferencesUpdated.title"),
        description: t("profile.toasts.preferencesUpdated.description"),
      });
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast({
        title: "Error",
        description: "Failed to save notification preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <CardTitle>{t("profile.notifications.title")}</CardTitle>
        </div>
        <CardDescription>
          {t("profile.notifications.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">{t("profile.notifications.email")}</h3>
          </div>
          <div className="space-y-3 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-alerts" className="text-base">
                  {t("profile.notifications.categories.alerts")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("profile.notifications.categories.alertsDesc")}
                </p>
              </div>
              <Switch
                id="email-alerts"
                checked={preferences.email.alerts}
                onCheckedChange={() => handleToggle("email", "alerts")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-orders" className="text-base">
                  {t("profile.notifications.categories.orders")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("profile.notifications.categories.ordersDesc")}
                </p>
              </div>
              <Switch
                id="email-orders"
                checked={preferences.email.orders}
                onCheckedChange={() => handleToggle("email", "orders")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-production" className="text-base">
                  {t("profile.notifications.categories.production")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("profile.notifications.categories.productionDesc")}
                </p>
              </div>
              <Switch
                id="email-production"
                checked={preferences.email.production}
                onCheckedChange={() => handleToggle("email", "production")}
              />
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Push Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">{t("profile.notifications.push")}</h3>
          </div>
          <div className="space-y-3 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-alerts" className="text-base">
                  {t("profile.notifications.categories.alerts")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("profile.notifications.categories.alertsDesc")}
                </p>
              </div>
              <Switch
                id="push-alerts"
                checked={preferences.push.alerts}
                onCheckedChange={() => handleToggle("push", "alerts")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-orders" className="text-base">
                  {t("profile.notifications.categories.orders")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("profile.notifications.categories.ordersDesc")}
                </p>
              </div>
              <Switch
                id="push-orders"
                checked={preferences.push.orders}
                onCheckedChange={() => handleToggle("push", "orders")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-production" className="text-base">
                  {t("profile.notifications.categories.production")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("profile.notifications.categories.productionDesc")}
                </p>
              </div>
              <Switch
                id="push-production"
                checked={preferences.push.production}
                onCheckedChange={() => handleToggle("push", "production")}
              />
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* In-App Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">{t("profile.notifications.inApp")}</h3>
          </div>
          <div className="space-y-3 pl-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="inapp-alerts" className="text-base">
                  {t("profile.notifications.categories.alerts")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("profile.notifications.categories.alertsDesc")}
                </p>
              </div>
              <Switch
                id="inapp-alerts"
                checked={preferences.inApp.alerts}
                onCheckedChange={() => handleToggle("inApp", "alerts")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="inapp-orders" className="text-base">
                  {t("profile.notifications.categories.orders")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("profile.notifications.categories.ordersDesc")}
                </p>
              </div>
              <Switch
                id="inapp-orders"
                checked={preferences.inApp.orders}
                onCheckedChange={() => handleToggle("inApp", "orders")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="inapp-production" className="text-base">
                  {t("profile.notifications.categories.production")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("profile.notifications.categories.productionDesc")}
                </p>
              </div>
              <Switch
                id="inapp-production"
                checked={preferences.inApp.production}
                onCheckedChange={() => handleToggle("inApp", "production")}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
            {isSaving ? "Saving..." : t("profile.actions.save")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
