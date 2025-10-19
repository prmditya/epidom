"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { SafeImage } from "@/components/lang/safe-image";

export function TrackingSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 sm:mb-8" style={{ color: 'var(--color-brand-primary)' }}>
          {t("services.trackingTitle")}
        </h2>
        
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-white">
          <div className="relative aspect-video md:aspect-[4/3] lg:aspect-[4/3] w-full rounded-lg overflow-hidden">
            <SafeImage
              src="/placeholder-tracking.png"
              alt="Tracking interface"
              fill
              className="object-cover"
              placeholderText="Tracking Interface"
              quality={85}
            />
          </div>
        </div>
      </div>
    </section>
  );
}