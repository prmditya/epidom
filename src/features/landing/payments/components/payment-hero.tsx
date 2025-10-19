"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PaymentHeroProps {
  plan: "starter" | "pro" | "enterprise";
}

export function PaymentHero({ plan }: PaymentHeroProps) {
  const { t } = useI18n();

  const getHeroContent = () => {
    if (plan === "enterprise") {
      return {
        title: t("payments.enterprise.hero.title"),
        subtitle: t("payments.enterprise.hero.subtitle")
      };
    }
    return {
      title: t("payments.hero.title"),
      subtitle: t("payments.hero.subtitle")
    };
  };

  const { title, subtitle } = getHeroContent();

  return (
    <section className="pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Button 
            asChild 
            variant="ghost" 
            className="mb-6 text-gray-600 hover:text-gray-900"
          >
            <Link href="/pricing" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("payments.backToPricing")}
            </Link>
          </Button>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
