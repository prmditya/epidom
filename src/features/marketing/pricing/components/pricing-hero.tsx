"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import Image from "next/image";
import { useState } from "react";

function LogoWithSkeleton() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="mb-6 sm:mb-8">
      <div className="relative mx-auto h-8 w-[120px] flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 animate-pulse rounded bg-gray-200" />
        )}
        <Image
          src="/images/logo-black.png"
          alt="EPIDOM"
          width={120}
          height={32}
          className="relative h-8 w-auto"
          style={{
            width: "auto",
            height: "auto",
            filter:
              "invert(27%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(96%) contrast(80%)",
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.3s ease-in-out",
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}

export function PricingHero() {
  const { t } = useI18n();

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo */}
          <LogoWithSkeleton />

          {/* Title */}
          <h1
            className="mb-4 text-3xl leading-tight font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ color: "var(--color-brand-primary)" }}
          >
            {t("pricing.heroTitle")}
          </h1>

          {/* Description */}
          <p
            className="mx-auto max-w-4xl text-lg leading-relaxed sm:text-xl md:text-2xl"
            style={{ color: "var(--color-brand-primary)" }}
          >
            {t("pricing.heroDescription")}
          </p>
        </div>
      </div>
    </section>
  );
}
