"use client";

import Image from "next/image";

export function DataRowTwo() {
  return (
    <section className="bg-white py-6 sm:py-4 overflow-visible relative z-10">
      <div className="services-narrow-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-8 items-start">
          {/* Left Column (25%) - 2 Small Mockups */}
          <div className="lg:col-span-3 space-y-3">
            {/* Small Mockup 1 */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/data-supplier.png"
                alt="Supplier data interface"
                fill
                className="object-cover"
                quality={80}
              />
            </div>
            
            {/* Small Mockup 2 */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/data-material.png"
                alt="Material data interface"
                fill
                className="object-cover"
                quality={80}
              />
            </div>
          </div>

          {/* Right Column (75%) - 1 Large Mockup */}
          <div className="lg:col-span-9">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/data-manage.png"
                alt="Data management overview interface"
                fill
                className="object-cover"
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
