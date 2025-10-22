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
    <div className="space-y-4 sm:space-y-6 h-full">
      {/* Billing Information */}
      <Card className="rounded-xl sm:rounded-2xl border-2">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
            {t("payments.billing.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">{t("payments.billing.firstName")}</Label>
              <Input 
                id="firstName" 
                placeholder={t("payments.billing.firstNamePlaceholder")}
                className="h-10 sm:h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">{t("payments.billing.lastName")}</Label>
              <Input 
                id="lastName" 
                placeholder={t("payments.billing.lastNamePlaceholder")}
                className="h-10 sm:h-11"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">{t("payments.billing.email")}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                id="email" 
                type="email" 
                placeholder={t("payments.billing.emailPlaceholder")}
                className="pl-10 h-10 sm:h-11"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium">{t("payments.billing.company")}</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                id="company" 
                placeholder={t("payments.billing.companyPlaceholder")}
                className="pl-10 h-10 sm:h-11"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card className="rounded-xl sm:rounded-2xl border-2">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
            {t("payments.payment.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-sm font-medium">{t("payments.payment.cardNumber")}</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                id="cardNumber" 
                placeholder="1234 5678 9012 3456"
                className="pl-10 h-10 sm:h-11"
                required
              />
            </div>
          </div>
          
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="expiryMonth" className="text-sm font-medium">{t("payments.payment.expiryMonth")}</Label>
              <Input 
                id="expiryMonth" 
                placeholder="MM"
                maxLength={2}
                className="h-10 sm:h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryYear" className="text-sm font-medium">{t("payments.payment.expiryYear")}</Label>
              <Input 
                id="expiryYear" 
                placeholder="YY"
                maxLength={2}
                className="h-10 sm:h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-sm font-medium">{t("payments.payment.cvv")}</Label>
              <Input 
                id="cvv" 
                placeholder="123"
                maxLength={3}
                className="h-10 sm:h-11"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="rounded-xl sm:rounded-2xl border-2 bg-gray-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
            {t("payments.terms.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0"
                required
              />
              <Label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {t("payments.terms.text")}{" "}
                <a href="/terms" target="_blank" className="text-primary hover:underline font-medium break-words">
                  {t("payments.terms.link")}
                </a>
              </Label>
            </div>
            
            <div className="flex items-start gap-2 sm:gap-3">
              <input 
                type="checkbox" 
                id="billing" 
                className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0"
                required
              />
              <Label htmlFor="billing" className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {t("payments.terms.billing")}
              </Label>
            </div>
            
            <div className="flex items-start gap-2 sm:gap-3">
              <input 
                type="checkbox" 
                id="refund" 
                className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0"
                required
              />
              <Label htmlFor="refund" className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {t("payments.terms.refund")}{" "}
                <a href="/refund-policy" target="_blank" className="text-primary hover:underline font-medium break-words">
                  {t("payments.terms.refundLink")}
                </a>
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button 
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full h-11 sm:h-12 text-base sm:text-lg font-semibold rounded-lg transition-colors duration-200 hover:bg-gray-700 mb-6 sm:mb-8"
        style={{ backgroundColor: '#444444', color: 'white' }}
      >
        {isSubmitting ? t("payments.processing") : t("payments.completePayment")}
      </Button>
    </div>
  );
}
