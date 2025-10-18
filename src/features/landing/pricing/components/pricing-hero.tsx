"use client";

import Image from "next/image";
import { useI18n } from "@/components/lang/i18n-provider";

export function PricingHero() {
  const { t } = useI18n();

  return (
    <section className="py-12 sm:py-16">
      <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
        <Image
          src="/images/logo-black.png"
          alt="EPIDOM"
          width={120}
          height={32}
          className="h-8 w-auto"
          priority
        />
        <div className="space-y-4 sm:space-y-6">
          <h1
            className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ color: "#444444" }}
          >
            {t("pricing.heroTitle")}
          </h1>
          <p
            className="text-pretty max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl leading-relaxed"
            style={{ color: "#444444" }}
          >
            {t("pricing.heroDesc")}
          </p>
        </div>
      </div>
    </section>
  );
}
