"use client";

import Image from "next/image";
import { WaitlistDialog } from "./waitlist-dialog";
import { useI18n } from "@/components/lang/i18n-provider-ilmi";
import React from "react";

export const Hero = React.memo(function Hero() {
  const { t } = useI18n();

  return (
    <section className="py-6 md:py-8 lg:py-10 min-h-screen flex items-center">
      <div className="grid gap-6 md:gap-8 lg:gap-10 grid-cols-1 lg:grid-cols-5 w-full">
        <div className="lg:col-span-3 overflow-hidden rounded-xl border border-border shadow-sm">
          <Image
            src="/images/pantry-shelf.jpg"
            alt="Pantry shelves with jars and baskets"
            width={1600}
            height={1066}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="lg:col-span-2 flex flex-col justify-center space-y-4">
          <div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              style={{ color: "#444444" }}
            >
              {t("hero.title")}
            </h1>
            <p
              className="mt-3 sm:mt-4 text-balance text-lg sm:text-xl md:text-2xl font-semibold leading-snug"
              style={{ color: "#444444" }}
            >
              {t("hero.subtitle")}
            </p>
          </div>
          <div className="mt-4 sm:mt-6">
            <WaitlistDialog variant="home" />
          </div>
          <div className="mt-6 sm:mt-8 space-y-3 leading-relaxed text-muted-foreground text-sm sm:text-base">
            <p>{t("hero.p1")}</p>
            <p>{t("hero.p2")}</p>
            <p>{t("hero.p3")}</p>
          </div>
        </div>
      </div>
    </section>
  );
});
