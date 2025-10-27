"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { StoreCard } from "./store-card";
import { CreateStoreButton } from "./create-store-button";

// Mock data - will be replaced with real data from API
const mockStores = [
  {
    id: "1",
    name: "Boutique boulangerie n°1",
    city: "Bali",
    image: "/images/pantry-shelf.jpg",
  },
  {
    id: "2",
    name: "test",
    city: "paris",
    image: "/images/pantry-shelf.jpg",
  },
  {
    id: "3",
    name: "Mur Mur",
    city: "Canggu",
    image: "/images/pantry-shelf.jpg",
  },
];

export function StoresContainer() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 sm:mb-8">
        {t("stores.title")}
      </h1>

      {/* Create Store Button */}
      <div className="mb-8 sm:mb-12">
        <CreateStoreButton />
      </div>

      {/* Stores Grid */}
      {mockStores.length === 0 ? (
        <div className="text-center py-16 sm:py-20">
          <p className="text-neutral-600 text-base sm:text-lg mb-2">{t("stores.noStores")}</p>
          <p className="text-neutral-500 text-sm sm:text-base">{t("stores.createFirst")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {mockStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </div>
  );
}
