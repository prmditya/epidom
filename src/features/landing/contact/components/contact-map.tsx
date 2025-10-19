"use client";

import { useI18n } from "@/components/lang/i18n-provider";

export function ContactMap() {
  const { t } = useI18n();

  return (
    <div className="pt-4 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-full h-80 sm:h-96 lg:h-[496px] bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl mb-4" style={{ color: "#444444" }}>
                🗺️
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: "#444444" }}>
                Interactive Map
              </h3>
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
  );
}
