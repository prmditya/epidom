"use client";

import { useState } from "react";
import { useI18n } from "@/components/lang/i18n-provider";
import { logger } from "@/lib/logger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, User, Mail, Building } from "lucide-react";

interface PaymentFormProps {
  plan: "starter" | "pro";
}

export function PaymentForm({ plan }: PaymentFormProps) {
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Handle success here
      logger.info('Payment processed successfully');
    } catch (error) {
      logger.error('Payment processing error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Billing Information */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl font-semibold">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            {t("payments.billing.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">{t("payments.billing.firstName")}</Label>
              <Input 
                id="firstName" 
                placeholder={t("payments.billing.firstNamePlaceholder")}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">{t("payments.billing.lastName")}</Label>
              <Input 
                id="lastName" 
                placeholder={t("payments.billing.lastNamePlaceholder")}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">{t("payments.billing.email")}</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                id="email" 
                type="email" 
                placeholder={t("payments.billing.emailPlaceholder")}
                className="pl-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium text-gray-700">{t("payments.billing.company")}</Label>
            <div className="relative">
              <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                id="company" 
                placeholder={t("payments.billing.companyPlaceholder")}
                className="pl-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl font-semibold">
            <div className="p-2 bg-green-50 rounded-lg">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            {t("payments.payment.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">{t("payments.payment.cardNumber")}</Label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                id="cardNumber" 
                placeholder="1234 5678 9012 3456"
                className="pl-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="grid gap-6 grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="expiryMonth" className="text-sm font-medium text-gray-700">{t("payments.payment.expiryMonth")}</Label>
              <Input 
                id="expiryMonth" 
                placeholder="MM"
                maxLength={2}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-center"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryYear" className="text-sm font-medium text-gray-700">{t("payments.payment.expiryYear")}</Label>
              <Input 
                id="expiryYear" 
                placeholder="YY"
                maxLength={2}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-center"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-sm font-medium text-gray-700">{t("payments.payment.cvv")}</Label>
              <Input 
                id="cvv" 
                placeholder="123"
                maxLength={3}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-center"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="border border-gray-200 bg-gray-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <input 
              type="checkbox" 
              id="terms" 
              className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
              {t("payments.terms.text")}{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                {t("payments.terms.link")}
              </a>
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button 
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {t("payments.processing")}
          </div>
        ) : (
          t("payments.completePayment")
        )}
      </Button>
    </div>
  );
}
