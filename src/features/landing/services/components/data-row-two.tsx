"use client";

import Image from "next/image";

export function DataRowTwo() {
  return (
    <section className="relative z-10 overflow-visible bg-white py-6 sm:py-4">
      <div className="services-narrow-container">
        <div className="grid grid-cols-1 items-start gap-4 sm:gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Left Column (25%) - 2 Small Mockups */}
          <div className="space-y-3 lg:col-span-3">
            {/* Small Mockup 1 */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/data-supplier.png"
                alt="Supplier data interface"
                fill
                className="object-cover"
                quality={80}
              />
            </div>

            {/* Small Mockup 2 */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
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
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-2xl">
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
