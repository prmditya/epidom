"use client";

import { useI18n } from "@/components/lang/i18n-provider";

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12">
        {/* Left Column - Text Content */}
        <div className="space-y-6 sm:space-y-8 lg:col-span-8">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            style={{ color: "#444444" }}
          >
            {t("services.heroTitleLine1")} {t("services.heroTitleLine2")}
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl"
            style={{ color: "#444444" }}
          >
            {t("services.heroDesc")}
          </p>
        </div>

        {/* Right Column - Feature Block */}
        <div className="flex justify-center lg:col-span-4">
          <div className="w-full sm:w-fit">
            <div
              className="rounded-2xl p-6 sm:p-8 text-white text-left"
              style={{ backgroundColor: "#444444" }}
            >
              <div className="space-y-6 sm:space-y-8">
                <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
                  {t("services.featureBlock.management")}
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
                  {t("services.featureBlock.tracking")}
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
                  {t("services.featureBlock.data")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
