"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { SafeImage } from "@/features/landing/services/components/safe-image";

export function DataSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white">
      <div className="py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Title di luar box */}
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center lg:text-right"
          style={{ fontWeight: "900" }}
        >
          {t("services.dataTitle")}
        </h2>

        {/* Box dengan dua bagian - DIBALIK dari ManagementSection */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-0 rounded-2xl overflow-hidden bg-white">
          {/* Kiri 70% - Gambar besar (sebelumnya kanan) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video lg:aspect-[7/4] w-full">
              <SafeImage
                src="/placeholder-data.png"
                alt="Data interface"
                fill
                className="object-cover"
                placeholderText="Data Interface"
              />
            </div>
          </div>

          {/* Kanan 30% - Text dan gambar kecil (sebelumnya kiri) */}
          <div className="lg:col-span-3 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
            {/* Text paragraf */}
            <div className="space-y-4 sm:space-y-6">
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.dataDesc1")}
              </p>
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.dataDesc2")}
              </p>
            </div>

            {/* Gambar kecil di bawah text */}
            <div className="relative aspect-video w-full mt-6 sm:mt-8 rounded-xl overflow-hidden">
              <SafeImage
                src="/placeholder-alert.png"
                alt="Alert interface"
                fill
                className="object-cover"
                placeholderText="Alert Interface"
              />
            </div>
          </div>
        </div>

        {/* 3 Gambar dengan layout khusus */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-2 rounded-2xl overflow-hidden bg-white mt-8 sm:mt-12">
          {/* Kiri 70% - Gambar full */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video lg:aspect-[7/4] w-full rounded-lg overflow-hidden">
              <SafeImage
                src="/placeholder-data.png"
                alt="Data interface"
                fill
                className="object-cover"
                placeholderText="Data Interface"
              />
            </div>
          </div>

          {/* Kanan 30% - Dibagi dua */}
          <div className="lg:col-span-3 grid grid-rows-2 gap-2">
            {/* Atas 50% */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <SafeImage
                src="/placeholder-alert.png"
                alt="Alert interface"
                fill
                className="object-cover"
                placeholderText="Alert Interface"
              />
            </div>

            {/* Bawah 50% */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <SafeImage
                src="/placeholder-tracking.png"
                alt="Tracking interface"
                fill
                className="object-cover"
                placeholderText="Tracking Interface"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
