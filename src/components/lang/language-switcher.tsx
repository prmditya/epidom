"use client";

import * as React from "react";
import { useI18n } from "@/components/lang/i18n-provider";
import { ChevronDown } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const labelId = React.useId();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={labelId} className="sr-only">
        {t("common.language.label")}
      </label>
      <div className="relative inline-block">
        <select
          id={labelId}
          className="h-10 min-w-[60px] cursor-pointer appearance-none rounded-full bg-white px-6 pr-8 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none"
          aria-label={t("common.language.label")}
          value={locale}
          onChange={(e) => setLocale(e.target.value as any)}
        >
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="id">ID</option>
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-gray-900" />
      </div>
    </div>
  );
}

export default LanguageSwitcher;
