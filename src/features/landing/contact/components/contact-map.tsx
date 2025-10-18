"use client";

import { useI18n } from "@/components/lang/i18n-provider";

export function ContactMap() {
  const { t } = useI18n();

  return (
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
  );
}
