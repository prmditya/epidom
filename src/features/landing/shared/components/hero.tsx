"use client";

import Image from "next/image";
import { WaitlistDialog } from "./waitlist-dialog";
import { useI18n } from "@/components/lang/i18n-provider";
import React from "react";

export const Hero = React.memo(function Hero() {
  const { t } = useI18n();

  return (
    <section className="flex min-h-screen items-center py-6 md:py-8 lg:py-10">
      <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-5 lg:gap-10">
        <div className="border-border overflow-hidden rounded-xl border shadow-sm lg:col-span-3">
          <Image
            src="/images/pantry-shelf.jpg"
            alt="Pantry shelves with jars and baskets"
            width={1600}
            height={1066}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-center space-y-4 lg:col-span-2">
          <div>
            <h1
              className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ color: "var(--color-brand-primary)" }}
            >
              {t("hero.title")}
            </h1>
            <p
              className="mt-3 text-lg leading-snug font-semibold text-balance sm:mt-4 sm:text-xl md:text-2xl"
              style={{ color: "var(--color-brand-primary)" }}
            >
              {t("hero.subtitle")}
            </p>
          </div>
          <div className="mt-4 sm:mt-6">
            <WaitlistDialog variant="home" />
          </div>
          <div className="text-muted-foreground mt-6 space-y-3 text-sm leading-relaxed sm:mt-8 sm:text-base">
            <p>{t("hero.p1")}</p>
            <p>{t("hero.p2")}</p>
            <p>{t("hero.p3")}</p>
          </div>
        </div>
      </div>
    </section>
  );
});
