"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import Image from "next/image";

export function PricingHero() {
  const { t } = useI18n();

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-6 sm:mb-8">
            <Image
              src="/images/logo-black.png"
              alt="EPIDOM"
              width={120}
              height={32}
              className="h-8 w-auto mx-auto"
              style={{ 
                width: "auto", 
                height: "auto",
                filter: "invert(27%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(96%) contrast(80%)"
              }}
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 sm:mb-6" style={{ color: 'var(--color-brand-primary)' }}>
            {t("pricing.heroTitle")}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--color-brand-primary)' }}>
            {t("pricing.heroDescription")}
          </p>
        </div>
      </div>
    </section>
  );
}