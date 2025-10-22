"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function ManagementRowOne() {
  const { t } = useI18n();
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  });

  return (
    <section ref={ref} className="bg-white py-6 sm:py-4 flex items-center overflow-visible relative z-10">
      <div className="services-narrow-container">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 sm:gap-8 lg:gap-8 items-start lg:items-center">
          {/* Left Column (40%) - Text + Small Mockup */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-10">
            {/* Title */}
            <h2 
              className="text-section-title"
              style={{ color: "var(--color-brand-primary)" }}
            >
              {t("services.management.title")}
            </h2>
            
            {/* Subtitle */}
            <h3 
              className="text-subtitle"
              style={{ color: "var(--color-brand-primary)" }}
            >
              {t("services.management.subtitle")}
            </h3>
            
            {/* Description */}
            <p 
              className="text-description"
              style={{ color: "#444444" }}
            >
              {t("services.management.description")}
            </p>
            
            {/* Small Mockup */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              {hasIntersected && (
                <Image
                  src="/images/management-history.png"
                  alt="Production history interface"
                  fill
                  className="object-cover"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 30vw"
                  loading="lazy"
                />
              )}
            </div>
          </div>

          {/* Right Column (60%) - Large Mockup */}
          <div className="lg:col-span-6 flex items-center">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
              {hasIntersected && (
                <Image
                  src="/images/management-editstock.png"
                  alt="Edit stock interface"
                  fill
                  className="object-cover"
                  priority={false}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 45vw"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
