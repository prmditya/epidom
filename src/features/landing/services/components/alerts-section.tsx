"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { SafeImage } from "@/features/landing/services/components/safe-image";

export function AlertsSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white">
      <div className="py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Title di luar box */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          {t("services.alertsTitle")}
        </h2>

        {/* Box dengan dua bagian - SAMA seperti ManagementSection */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden bg-white">
          {/* Kiri 40% - Text dan gambar kecil */}
          <div className="lg:col-span-2 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
            {/* Text paragraf */}
            <div className="space-y-4 sm:space-y-6">
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.alertsDesc1")}
              </p>
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.alertsDesc2")}
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

          {/* Kanan 60% - Gambar besar */}
          <div className="lg:col-span-3">
            <div className="relative aspect-video lg:aspect-[3/2] w-full">
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
      </div>
    </section>
  );
}
