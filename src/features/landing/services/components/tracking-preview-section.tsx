"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import Image from "next/image";

export function TrackingPreviewSection() {
  const { t } = useI18n();

  return (
    <section className="relative z-10 flex items-center overflow-visible bg-white py-6 sm:min-h-screen sm:py-12">
      <div className="services-narrow-container">
        {/* Title - Centered */}
        <h2
          className="text-section-title mb-6 text-center sm:mb-8 lg:mb-12"
          style={{ color: "var(--color-brand-primary)" }}
        >
          {t("services.tracking.title")}
        </h2>

        {/* Large Mockup - Almost full width */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-2xl">
          <Image
            src="/images/tracking.png"
            alt="Active stock tracking interface"
            fill
            className="object-cover"
            priority={true}
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}
