"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { SafeImage } from "@/components/lang/safe-image";

export function ManagementRowOne() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-4 flex items-center overflow-visible relative z-10">
      <div className="services-narrow-container">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 sm:gap-8 lg:gap-8 items-start lg:items-center">
          {/* Left Column (40%) - Text + Small Mockup */}
          <div className="lg:col-span-4 space-y-10">
            {/* Title */}
            <h2 
              className="text-section-title"
              style={{ color: "var(--color-brand-primary)" }}
            >
              {t("services.management.title")}
            </h2>
            
            {/* Subtitle */}
            <h3 
              className="text-subtitle"
              style={{ color: "var(--color-brand-primary)" }}
            >
              {t("services.management.subtitle")}
            </h3>
            
            {/* Description */}
            <p 
              className="text-description"
              style={{ color: "#444444" }}
            >
              {t("services.management.description")}
            </p>
            
            {/* Small Mockup */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
              <SafeImage
                src="/images/management-tab.png"
                alt="Management interface small preview"
                fill
                className="object-cover"
                placeholderText="Management Interface Small"
                quality={85}
              />
            </div>
          </div>

          {/* Right Column (60%) - Large Mockup */}
          <div className="lg:col-span-6 flex items-center">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
              <SafeImage
                src="/images/management-tab.png"
                alt="Management interface large preview"
                fill
                className="object-cover"
                placeholderText="Management Interface Large"
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
