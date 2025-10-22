"use client";

import Image from "next/image";

export function ManagementRowTwo() {
  return (
    <section className="bg-white py-4 flex items-center overflow-visible relative z-10">
      <div className="services-narrow-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-start lg:items-center">
          {/* Left Column (25%) - Two Small Mockups */}
          <div className="lg:col-span-3 space-y-4">
            {/* Top Small Mockup - Delivery Management */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/management-delivery.png"
                alt="Delivery management interface"
                fill
                className="object-cover"
                quality={85}
              />
            </div>
            
            {/* Bottom Small Mockup - Recipe Production */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/management-reciptprod.png"
                alt="Recipe production interface"
                fill
                className="object-cover"
                quality={85}
              />
            </div>
          </div>

          {/* Right Column (75%) - Large Mockup */}
          <div className="lg:col-span-9">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
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
        </div>
      </div>
    </section>
  );
}
