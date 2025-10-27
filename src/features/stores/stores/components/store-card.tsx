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
    <Link href={`/dashboard?storeId=${store.id}`} className="block group">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
        {/* Store Image */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-neutral-200">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Store Info */}
        <CardContent className="p-4 sm:p-5 md:p-6 bg-white">
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 sm:mb-3 group-hover:text-neutral-700 transition-colors break-words">
            {store.name}
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 flex items-center gap-2">
            <span className="font-medium">{t("stores.city")} :</span>
            <span className="break-words">{store.city}</span>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
