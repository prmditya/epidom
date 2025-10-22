"use client";

import { SafeImage } from "@/components/lang/safe-image";

export function ManagementRowTwo() {
  return (
    <section className="bg-white py-4 flex items-center overflow-visible relative z-10">
      <div className="services-narrow-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-start lg:items-center">
          {/* Left Column (25%) - Two Small Mockups */}
          <div className="lg:col-span-3 space-y-4">
            {/* Top Small Mockup - Historique de production */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
              <SafeImage
                src="/images/management-tab.png"
                alt="Historique de production interface"
                fill
                className="object-cover"
                placeholderText="Historique de production Interface"
                quality={85}
              />
            </div>
            
            {/* Bottom Small Mockup - Gérer les permissions */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
              <SafeImage
                src="/images/management-tab.png"
                alt="Gérer les permissions interface"
                fill
                className="object-cover"
                placeholderText="Gérer les permissions Interface"
                quality={85}
              />
            </div>
          </div>

          {/* Right Column (75%) - Large Mockup */}
          <div className="lg:col-span-9">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
              <SafeImage
                src="/images/management-tab.png"
                alt="Modifier les stocks interface"
                fill
                className="object-cover"
                placeholderText="Modifier les stocks Interface"
                priority={true}
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
