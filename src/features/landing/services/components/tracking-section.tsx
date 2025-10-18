"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { SafeImage } from "@/components/lang/safe-image";

export function TrackingSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white">
      <div className="py-6 sm:py-8">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center" style={{ color: '#444444' }}>
          {t("services.trackingTitle")}
        </h2>
        
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-white">
          <div className="relative aspect-[16/9] md:aspect-[3/2] lg:aspect-[2/1] w-full rounded-lg overflow-hidden">
            <SafeImage
              src="/placeholder-tracking.png"
              alt="Tracking interface"
              fill
              className="object-cover"
                placeholderText="Tracking Interface"
                quality={80}
              />
          </div>
        </div>
      </div>
    </section>
  );
}