"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { SafeImage } from "@/components/lang/safe-image";

export function ManagementSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white">
      <div className="py-8 sm:py-12">
        {/* Title di luar box */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8" style={{ color: '#444444' }}>
          {t("services.managementTitle")}
        </h2>
        
        {/* Box dengan dua bagian */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0 rounded-2xl overflow-hidden bg-white">
          {/* Kiri 40% - Text dan gambar kecil */}
          <div className="md:col-span-1 lg:col-span-2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-between min-h-0 order-2 md:order-1">
            {/* Text paragraf */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6 flex-1 min-w-0 overflow-hidden">
              <p className="text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed" style={{ color: '#444444', fontWeight: '300' }}>
                {t("services.managementDesc1")}
              </p>
              <p className="text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed" style={{ color: '#444444', fontWeight: '300' }}>
                {t("services.managementDesc2")}
              </p>
            </div>
            
            {/* Gambar kecil di bawah text */}
            <div className="relative w-48 sm:w-56 md:w-64 h-36 sm:h-40 md:h-48 mt-4 sm:mt-6 md:mt-8 rounded-lg overflow-hidden flex-shrink-0 mx-auto">
              <SafeImage
                src="/placeholder-production.png"
                alt="Production interface"
                fill
                className="object-cover"
                placeholderText="Production Interface"
              />
            </div>
          </div>

          {/* Kanan 60% - Gambar besar */}
          <div className="md:col-span-1 lg:col-span-3 order-1 md:order-2">
            <div className="relative aspect-video md:aspect-[4/3] lg:aspect-[4/3] w-full rounded-lg overflow-hidden">
              <SafeImage
                src="/placeholder-management.png"
                alt="Management interface"
                    fill
                    className="object-cover"
                placeholderText="Management Interface"
                quality={80}
              />
            </div>
          </div>
        </div>
        
        {/* 3 Gambar dengan layout khusus */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 rounded-2xl overflow-hidden bg-white mt-6 sm:mt-8 md:mt-12">
          {/* Kiri 70% - Gambar full */}
          <div className="md:col-span-1 lg:col-span-7 order-1">
            <div className="relative aspect-video md:aspect-[4/3] lg:aspect-[4/3] w-full rounded-lg overflow-hidden">
              <SafeImage
                src="/placeholder-management.png"
                alt="Management interface"
                fill
                className="object-cover"
                placeholderText="Management Interface"
                quality={80}
              />
            </div>
          </div>

          {/* Kanan 30% - Dibagi dua */}
          <div className="md:col-span-1 lg:col-span-3 flex flex-col gap-3 md:gap-4 h-full order-2">
            {/* Atas 50% - Medium Image */}
            <div className="relative aspect-video md:aspect-[2/1] lg:h-1/2 rounded-lg overflow-hidden">
                <SafeImage
                  src="/placeholder-history.png"
                  alt="History interface"
                  fill
                  className="object-cover"
                  placeholderText="History Interface"
                />
            </div>
            
            {/* Bawah 50% - Small Image */}
            <div className="relative aspect-video md:aspect-[2/1] lg:h-1/2 rounded-lg overflow-hidden">
                <SafeImage
                  src="/placeholder-data.png"
                  alt="Data interface"
                  fill
                  className="object-cover"
                  placeholderText="Data Interface"
                />
            </div>
          </div>
        </div>
        </div>
      </section>
  );
}