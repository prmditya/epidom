"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { SafeImage } from "@/features/landing/services/components/safe-image";

export function TrackingSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white">
      <div className="py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center"
          style={{ fontWeight: "900" }}
        >
          {t("services.trackingTitle")}
        </h2>

        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-white">
          <div className="relative aspect-video lg:aspect-[16/9] w-full">
            <SafeImage
              src="/placeholder-tracking.png"
              alt="Tracking interface"
              fill
              className="object-cover"
              placeholderText="Tracking Interface"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
