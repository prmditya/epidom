"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { SafeImage } from "@/components/lang/safe-image";

export function DashboardSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 lg:gap-4 rounded-2xl overflow-hidden bg-white">
          {/* Image Section - 70% width on desktop, full width on mobile/tablet */}
          <div className="md:col-span-1 lg:col-span-7 order-1 md:order-1">
            <div className="relative aspect-video md:aspect-[4/3] lg:aspect-[4/3] w-full overflow-hidden rounded-lg">
              <SafeImage
                src="/placeholder-dashboard.png"
                alt="Management dashboard"
                fill
                className="object-cover"
                placeholderText="Dashboard Interface"
                priority={true}
                quality={85}
              />
            </div>
          </div>

          {/* Text Section - 30% width on desktop, full width on mobile/tablet */}
          <div className="md:col-span-1 lg:col-span-3 bg-white flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 order-2 md:order-2">
            <div className="space-y-3 sm:space-y-4 md:space-y-6 text-left w-full">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed" style={{ color: 'var(--color-brand-primary)', fontWeight: '300' }}>
                {t("services.dashboardDesc1")}
              </p>
              
              <p className="text-base sm:text-lg md:text-xl leading-relaxed" style={{ color: 'var(--color-brand-primary)', fontWeight: '300' }}>
                {t("services.dashboardDesc2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
