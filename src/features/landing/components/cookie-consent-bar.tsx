"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/lang/i18n-provider";
import { Button } from "@/components/ui/button";

export function CookieConsentBar() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-foreground font-medium mb-2">
              {t("cookie.title")}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("cookie.description")}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="whitespace-nowrap bg-transparent"
            >
              {t("cookie.reject")}
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="whitespace-nowrap"
            >
              {t("cookie.accept")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
