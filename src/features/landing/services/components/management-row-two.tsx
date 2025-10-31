"use client";

import Image from "next/image";

export function ManagementRowTwo() {
  return (
    <section className="relative z-10 flex items-center overflow-visible bg-white py-6 sm:py-4">
      <div className="services-narrow-container">
        <div className="grid grid-cols-1 items-start gap-4 sm:gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Left Column (75%) - Large Mockup */}
          <div className="order-2 lg:order-1 lg:col-span-9">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-2xl">
              <Image
                src="/images/management-history.png"
                alt="Production history interface"
                fill
                className="object-cover"
                priority={true}
                quality={90}
              />
            </div>
          </div>

          {/* Right Column (25%) - Two Small Mockups */}
          <div className="order-1 space-y-3 lg:order-2 lg:col-span-3">
            {/* Top Small Mockup - Delivery Management */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/management-delivery.png"
                alt="Delivery management interface"
                fill
                className="object-cover"
                quality={85}
              />
            </div>

            {/* Bottom Small Mockup - Recipe Production */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/management-reciptprod.png"
                alt="Recipe production interface"
                fill
                className="object-cover"
                quality={85}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
