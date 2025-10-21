"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, CreditCard, CheckCircle } from "lucide-react";

export function PaymentSecurity() {
  const { t } = useI18n();

  const securityFeatures = [
    {
      icon: Shield,
      title: "Stripe Security",
      description: "Powered by Stripe's industry-leading security"
    },
    {
      icon: CreditCard,
      title: "PCI DSS Compliant",
      description: "Your card data is never stored on our servers"
    },
    {
      icon: Lock,
      title: "256-bit SSL Encryption",
      description: "All transactions are encrypted end-to-end"
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
        
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            {t("payments.security.footer")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
