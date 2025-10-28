"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import Image from "next/image";

export function AlertsPreviewSection() {
  const { t } = useI18n();

  return (
    <section className="relative z-10 flex items-center overflow-visible bg-white py-6 sm:min-h-screen sm:py-12">
      <div className="services-narrow-container">
        <div className="grid grid-cols-1 items-start gap-4 sm:gap-8 lg:grid-cols-10 lg:items-center lg:gap-8">
          {/* Left Column (40%) - Title + Description + Small Mockup */}
          <div className="space-y-3 sm:space-y-10 lg:col-span-4">
            {/* Title */}
            <h2 className="text-section-title" style={{ color: "var(--color-brand-primary)" }}>
              {t("services.alerts.title")}
            </h2>

            {/* Description */}
            <p className="text-description" style={{ color: "#444444" }}>
              {t("services.alerts.description")}
            </p>

            {/* Small Mockup */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/alert-1.png"
                alt="Alerts interface small preview"
                fill
                className="object-cover"
                quality={85}
              />
            </div>
          </div>

          {/* Right Column (60%) - Large Mockup */}
          <div className="lg:col-span-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-2xl">
              <Image
                src="/images/alert-2.png"
                alt="Alerts interface large preview"
                fill
                className="object-cover"
                priority={true}
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
