"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { SafeImage } from "@/components/lang/safe-image";

export function TrackingPreviewSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-8 sm:py-12 min-h-screen flex items-center overflow-visible relative z-10">
      <div className="services-narrow-container">
        {/* Title - Centered */}
        <h2 
          className="text-section-title text-center mb-6 sm:mb-8 lg:mb-12"
          style={{ color: "var(--color-brand-primary)" }}
        >
          {t("services.tracking.title")}
        </h2>
        
        {/* Large Mockup - Almost full width */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
          <SafeImage
            src="/images/tracking-tab.png"
            alt="Active stock tracking interface"
            fill
            className="object-cover"
            placeholderText="Active Stock Tracking Interface"
            priority={true}
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}
