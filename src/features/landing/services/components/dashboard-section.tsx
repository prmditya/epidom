"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { SafeImage } from "@/features/landing/services/components/safe-image";

export function DashboardSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white">
      <div className="py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden bg-white">
          {/* Image Section - 80% width */}
          <div className="lg:col-span-4">
            <div className="relative aspect-video lg:aspect-[4/3] w-full overflow-hidden">
              <SafeImage
                src="/placeholder-dashboard.png"
                alt="Management dashboard"
                fill
                className="object-cover"
                placeholderText="Dashboard Interface"
              />
            </div>
          </div>

          {/* Text Section - 20% width, vertically centered */}
          <div className="lg:col-span-1 bg-white flex items-center justify-center p-6 sm:p-8 lg:p-12">
            <div className="space-y-4 sm:space-y-6 text-left">
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.dashboardDesc1")}
              </p>

              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.dashboardDesc2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
