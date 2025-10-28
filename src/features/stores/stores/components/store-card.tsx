"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/lang/i18n-provider";
import { Card, CardContent } from "@/components/ui/card";

interface StoreCardProps {
  store: {
    id: string;
    name: string;
    city: string;
    image: string;
  };
}

export function StoreCard({ store }: StoreCardProps) {
  const { t } = useI18n();

  return (
    <Link href={`/dashboard?storeId=${store.id}`} className="group block">
      <Card className="h-full overflow-hidden border-0 shadow-lg transition-shadow duration-300 hover:shadow-xl">
        {/* Store Image */}
        <div className="relative h-48 overflow-hidden bg-neutral-200 sm:h-56 md:h-64">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Store Info */}
        <CardContent className="bg-white p-4 sm:p-5 md:p-6">
          <h3 className="mb-2 text-lg font-bold break-words text-neutral-900 transition-colors group-hover:text-neutral-700 sm:mb-3 sm:text-xl">
            {store.name}
          </h3>
          <p className="flex items-center gap-2 text-sm text-neutral-600 sm:text-base">
            <span className="font-medium">{t("stores.city")} :</span>
            <span className="break-words">{store.city}</span>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
