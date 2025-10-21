"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PaymentSummaryProps {
  plan?: "starter" | "pro" | "enterprise";
}

export function PaymentSummary({ plan = "starter" }: PaymentSummaryProps) {
  const { t } = useI18n();

  const planDetails = {
    starter: {
      title: t("pricing.plans.starter.title"),
      price: "€29",
      period: t("pricing.plans.starter.billing"),
      features: [
        t("pricing.plans.starter.f1"),
        t("pricing.plans.starter.f2"),
        t("pricing.plans.starter.f3"),
      ]
    },
    pro: {
      title: t("pricing.plans.pro.title"),
      price: "€79",
      period: t("pricing.plans.pro.billing"),
      features: [
        t("pricing.plans.pro.f1"),
        t("pricing.plans.pro.f2"),
        t("pricing.plans.pro.f3"),
        t("pricing.plans.pro.f4"),
      ]
    },
    enterprise: {
      title: t("pricing.plans.enterprise.title"),
      price: t("pricing.plans.enterprise.price"),
      period: t("pricing.plans.enterprise.billing"),
      features: [
        t("pricing.plans.enterprise.f1"),
        t("pricing.plans.enterprise.f2"),
        t("pricing.plans.enterprise.f3"),
      ]
    }
  };

  const selectedPlan = planDetails[plan];

  return (
    <Card className="rounded-xl sm:rounded-2xl border-2">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl">{t("payments.summary.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Plan Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="font-semibold text-base sm:text-lg">{selectedPlan.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{selectedPlan.period}</p>
          </div>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 w-fit">
            {t("payments.summary.selected")}
          </Badge>
        </div>

        <Separator />

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-600">{t("payments.summary.subtotal")}</span>
            <span className="font-semibold text-sm sm:text-base">{selectedPlan.price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-600">{t("payments.summary.tax")}</span>
            <span className="font-semibold text-sm sm:text-base">€0.00</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center text-base sm:text-lg font-bold">
            <span>{t("payments.summary.total")}</span>
            <span>{selectedPlan.price}</span>
          </div>
        </div>

        <Separator />

        {/* Features */}
        <div className="space-y-3">
          <h4 className="font-semibold text-xs sm:text-sm">{t("payments.summary.included")}</h4>
          <ul className="space-y-2">
            {selectedPlan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Billing Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p className="text-xs">{t("payments.summary.billingInfo1")}</p>
          <p className="text-xs">{t("payments.summary.billingInfo2")}</p>
        </div>
      </CardContent>
    </Card>
  );
}
