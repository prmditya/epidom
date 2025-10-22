"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import Image from "next/image";

export function DashboardPreviewSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-4 sm:py-12 sm:min-h-screen flex items-center overflow-visible relative z-10">
      <div className="services-narrow-container">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 sm:gap-8 lg:gap-8 items-center">
          {/* Left Column - Dashboard Image (70%) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/dashboard.png"
                alt="Dashboard interface preview"
                fill
                className="object-cover"
                priority={true}
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </div>

          {/* Right Column - Text Content (30%) */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="space-y-4 sm:space-y-10 text-left">
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
