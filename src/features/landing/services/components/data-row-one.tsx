"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import Image from "next/image";

export function DataRowOne() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-4 overflow-visible relative z-10">
      <div className="services-narrow-container">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 sm:gap-8 lg:gap-8 items-start lg:items-center">
          {/* Left Column (60%) - 2 Large Mockups */}
          <div className="lg:col-span-6 space-y-4">
            {/* Mockup 1 - Large */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/data-manage.png"
                alt="Data management interface 1"
                fill
                className="object-cover"
                quality={85}
              />
            </div>
            
            {/* Mockup 2 - Large */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
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
          <div className="lg:col-span-4 space-y-10">
            {/* Title */}
            <h2 
              className="text-section-title"
              style={{ color: "var(--color-brand-primary)" }}
            >
              {t("services.data.title")}
            </h2>
            
            {/* Description 1 */}
            <p 
              className="text-description mb-10"
              style={{ color: "#444444" }}
            >
              {t("services.data.description1")}
            </p>
            
            {/* Description 2 */}
            <p 
              className="text-description"
              style={{ color: "#444444" }}
            >
              {t("services.data.description2")}
            </p>
            
            {/* Small Mockup 1 */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/data-product.png"
                alt="Data management small interface 1"
                fill
                className="object-cover"
                quality={80}
              />
            </div>
            
            {/* Small Mockup 2 */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
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
