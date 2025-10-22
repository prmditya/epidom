"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { SafeImage } from "@/components/lang/safe-image";

export function DashboardPreviewSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-8 sm:py-12 min-h-screen flex items-center overflow-visible relative z-10">
      <div className="services-narrow-container">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 sm:gap-8 lg:gap-8 items-center">
          {/* Left Column - Dashboard Image (70%) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
              <SafeImage
                src="/images/dashboard-tab.png"
                alt="Dashboard interface preview"
                fill
                className="object-cover"
                placeholderText="Dashboard Interface"
                priority={true}
                quality={90}
              />
            </div>
          </div>

          {/* Right Column - Text Content (30%) */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="space-y-10 text-left">
              {/* Subtitle */}
              <h2 
                className="text-subtitle"
                style={{ color: "var(--color-brand-primary)" }}
              >
                {t("services.dashboard.subtitle")}
              </h2>
              
              {/* Description */}
              <p 
                className="text-description"
                style={{ color: "#444444" }}
              >
                {t("services.dashboard.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
