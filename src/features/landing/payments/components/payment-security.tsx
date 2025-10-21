"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, CreditCard, CheckCircle } from "lucide-react";

export function PaymentSecurity() {
  const { t } = useI18n();

  const securityFeatures = [
    {
      icon: Shield,
      title: t("payments.security.ssl.title"),
      description: t("payments.security.ssl.description")
    },
    {
      icon: Lock,
      title: t("payments.security.encryption.title"),
      description: t("payments.security.encryption.description")
    },
    {
      icon: CreditCard,
      title: t("payments.security.pci.title"),
      description: t("payments.security.pci.description")
    },
    {
      icon: CheckCircle,
      title: t("payments.security.guarantee.title"),
      description: t("payments.security.guarantee.description")
    }
  ];

  return (
    <Card className="rounded-xl sm:rounded-2xl border-2 bg-gray-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
          {t("payments.security.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-start gap-2 sm:gap-3">
            <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-xs sm:text-sm">{feature.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
        
        <div className="pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            {t("payments.security.footer")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
