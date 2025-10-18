"use client";

import { useI18n } from "@/components/lang/i18n-provider-ilmi";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-background pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Text Content */}
            <div className="space-y-6 sm:space-y-8">
              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ color: "#444444" }}
              >
                {t("contact.title")}
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {t("contact.subtitle")}
              </p>

              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8">
                <div className="text-foreground">
                  <p className="text-base sm:text-lg md:text-xl">
                    {t("contact.info.address.line1")}
                    <br />
                    {t("contact.info.address.line2")}
                  </p>
                </div>

                <div className="text-foreground">
                  <p className="text-base sm:text-lg md:text-xl">
                    {t("contact.info.phone.number")}
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href={`mailto:${t("contact.info.email.address")}`}
                    className="text-base sm:text-lg md:text-xl text-foreground hover:text-muted-foreground transition-colors block"
                  >
                    {t("contact.info.email.address")}
                  </a>
                  <a
                    href="mailto:evancao@gmail.com"
                    className="text-base sm:text-lg md:text-xl text-foreground hover:text-muted-foreground transition-colors block"
                  >
                    evancao@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Map Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full h-80 sm:h-96 lg:h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-gray-500 text-sm sm:text-base"
                    style={{ fontWeight: "300" }}
                  >
                    {t("contact.map.placeholder")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
