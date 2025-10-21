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
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold">
          <div className="p-2 bg-purple-50 rounded-lg">
            <div className="w-5 h-5 bg-purple-600 rounded"></div>
          </div>
          {t("payments.summary.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Plan Selection */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{selectedPlan.title}</h3>
            <p className="text-sm text-gray-600">{selectedPlan.period}</p>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            {t("payments.summary.selected")}
          </Badge>
        </div>

        <Separator className="bg-gray-200" />

        {/* Pricing */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t("payments.summary.subtotal")}</span>
            <span className="font-semibold text-gray-900">{selectedPlan.price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t("payments.summary.tax")}</span>
            <span className="font-semibold text-gray-900">€0.00</span>
          </div>
          <Separator className="bg-gray-200" />
          <div className="flex justify-between items-center text-xl font-bold text-gray-900">
            <span>{t("payments.summary.total")}</span>
            <span className="text-2xl">{selectedPlan.price}</span>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Features */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-gray-900">{t("payments.summary.included")}</h4>
          <ul className="space-y-3">
            {selectedPlan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="bg-gray-200" />

        {/* Billing Info */}
        <div className="bg-blue-50 rounded-lg p-4 space-y-2">
          <p className="text-xs text-blue-800 font-medium">{t("payments.summary.billingInfo1")}</p>
          <p className="text-xs text-blue-700">{t("payments.summary.billingInfo2")}</p>
        </div>
      </CardContent>
    </Card>
  );
}
