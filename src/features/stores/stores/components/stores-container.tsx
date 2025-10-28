"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { StoreCard } from "./store-card";
import { CreateStoreButton } from "./create-store-button";
import { MOCK_STORES } from "@/mocks";

export function StoresContainer() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
      {/* Title */}
      <h1 className="mb-6 text-3xl font-bold text-neutral-900 sm:mb-8 sm:text-4xl lg:text-5xl">
        {t("stores.title")}
      </h1>

      {/* Create Store Button */}
      <div className="mb-8 sm:mb-12">
        <CreateStoreButton />
      </div>

      {/* Stores Grid */}
      {MOCK_STORES.length === 0 ? (
        <div className="py-16 text-center sm:py-20">
          <p className="mb-2 text-base text-neutral-600 sm:text-lg">{t("stores.noStores")}</p>
          <p className="text-sm text-neutral-500 sm:text-base">{t("stores.createFirst")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {MOCK_STORES.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </div>
  );
}
