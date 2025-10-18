"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WaitlistDialog } from "@/features/landing/components/waitlist-dialog";
import { useI18n } from "@/components/lang/i18n-provider";

export function PricingCta() {
  const { t } = useI18n();

  return (
    <section className="pb-10 sm:pb-12">
      <div className="rounded-2xl border-2 p-6 sm:p-8 md:p-12 text-center bg-muted/30">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          {t("pricing.finalCta.title")}
        </h3>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          {t("pricing.finalCta.desc")}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
          <WaitlistDialog />
          <Button asChild variant="secondary" className="rounded-lg">
            <Link href="/payments">{t("pricing.finalCta.goPayments")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
