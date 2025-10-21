"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { SafeImage } from "@/components/lang/safe-image";

export function ManagementSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 sm:mb-8" style={{ color: 'var(--color-brand-primary)' }}>
          {t("services.managementTitle")}
        </h2>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 lg:gap-4 rounded-2xl overflow-hidden bg-white">
          {/* Text Section - 40% width on desktop, full width on mobile/tablet */}
          <div className="lg:col-span-4 bg-white flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-4 md:space-y-6 text-left w-full">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed" style={{ color: '#444444', fontWeight: '300' }}>
                {t("services.managementDesc1")}
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed" style={{ color: '#444444', fontWeight: '300' }}>
                {t("services.managementDesc2")}
              </p>
            </div>
          </div>

          {/* Image Section - 60% width on desktop, full width on mobile/tablet */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full p-4 sm:p-6 md:p-8 lg:p-12">
              {/* Large Image */}
              <div className="relative aspect-video sm:aspect-[4/3] col-span-1 sm:col-span-2 lg:col-span-1 h-full overflow-hidden rounded-lg">
                <SafeImage
                  src="/placeholder-management-large.png"
                  alt="Management large view"
                  fill
                  className="object-cover"
                  placeholderText="Management Large Image"
                  priority={true}
                  quality={85}
                />
              </div>

              {/* Two smaller images */}
              <div className="flex flex-col gap-4 col-span-1 sm:col-span-2 lg:col-span-1">
                <div className="relative aspect-video sm:aspect-[4/3] h-1/2 overflow-hidden rounded-lg">
                  <SafeImage
                    src="/placeholder-management-small-1.png"
                    alt="Management small view 1"
                    fill
                    className="object-cover"
                    placeholderText="Management Small Image 1"
                    quality={85}
                  />
                </div>
                <div className="relative aspect-video sm:aspect-[4/3] h-1/2 overflow-hidden rounded-lg">
                  <SafeImage
                    src="/placeholder-management-small-2.png"
                    alt="Management small view 2"
                    fill
                    className="object-cover"
                    placeholderText="Management Small Image 2"
                    quality={85}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}