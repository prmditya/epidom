"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import Image from "next/image";

export function DataRowOne() {
  const { t } = useI18n();

  return (
    <section className="relative z-10 overflow-visible bg-white py-6 sm:py-4">
      <div className="services-narrow-container">
        <div className="grid grid-cols-1 items-start gap-4 sm:gap-8 lg:grid-cols-10 lg:items-center lg:gap-8">
          {/* Left Column (60%) - 2 Large Mockups */}
          <div className="order-2 space-y-3 lg:order-1 lg:col-span-6">
            {/* Mockup 1 - Large */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/data-manage.png"
                alt="Data management interface 1"
                fill
                className="object-cover"
                quality={85}
              />
            </div>

            {/* Mockup 2 - Large */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/data-material.png"
                alt="Data management interface 2"
                fill
                className="object-cover"
                quality={85}
              />
            </div>
          </div>

          {/* Right Column (40%) - Title + Description + 2 Small Mockups */}
          <div className="order-1 space-y-3 sm:space-y-10 lg:order-2 lg:col-span-4">
            {/* Title */}
            <h2 className="text-section-title" style={{ color: "var(--color-brand-primary)" }}>
              {t("services.data.title")}
            </h2>

            {/* Description 1 */}
            <p className="text-description mb-5 sm:mb-10" style={{ color: "#444444" }}>
              {t("services.data.description1")}
            </p>

            {/* Description 2 */}
            <p className="text-description" style={{ color: "#444444" }}>
              {t("services.data.description2")}
            </p>

            {/* Small Mockup 1 */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/data-product.png"
                alt="Data management small interface 1"
                fill
                className="object-cover"
                quality={80}
              />
            </div>

            {/* Small Mockup 2 */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/data-recipe.png"
                alt="Data management small interface 2"
                fill
                className="object-cover"
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
