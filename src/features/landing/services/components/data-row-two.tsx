"use client";

import { SafeImage } from "@/components/lang/safe-image";

export function DataRowTwo() {
  return (
    <section className="bg-white py-4 overflow-visible relative z-10">
      <div className="services-narrow-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-start lg:items-center">
          {/* Left Column (25%) - 2 Small Mockups */}
          <div className="lg:col-span-3 space-y-4">
            {/* Small Mockup 1 */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
              <SafeImage
                src="/images/data-tab.png"
                alt="Data management small interface 1"
                fill
                className="object-cover"
                placeholderText="Data Management Small 1"
                quality={80}
              />
            </div>
            
            {/* Small Mockup 2 */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
              <SafeImage
                src="/images/data-tab.png"
                alt="Data management small interface 2"
                fill
                className="object-cover"
                placeholderText="Data Management Small 2"
                quality={80}
              />
            </div>
          </div>

          {/* Right Column (75%) - 1 Large Mockup */}
          <div className="lg:col-span-9">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
              <SafeImage
                src="/images/data-tab.png"
                alt="Data management large interface"
                fill
                className="object-cover"
                placeholderText="Data Management Large Interface"
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
