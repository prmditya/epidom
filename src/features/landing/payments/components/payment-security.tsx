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
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold">
          <div className="p-2 bg-green-50 rounded-lg">
            <Shield className="h-5 w-5 text-green-600" />
          </div>
          {t("payments.security.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-5">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-900 mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              {t("payments.security.footer")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
