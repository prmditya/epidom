"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function PricingFaq() {
  const { t } = useI18n();

  return (
    <section className="pb-12 sm:pb-16 md:pb-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 sm:mb-8 text-center">
        {t("pricing.faq.title")}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-base font-semibold">
            {t("pricing.faq.q1")}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed">
            {t("pricing.faq.a1")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-base font-semibold">
            {t("pricing.faq.q2")}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed">
            {t("pricing.faq.a2")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-base font-semibold">
            {t("pricing.faq.q3")}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed">
            {t("pricing.faq.a3")}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
