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
          className="appearance-none h-10 rounded-full bg-white text-gray-900 px-6 pr-8 text-sm font-semibold focus:outline-none cursor-pointer hover:bg-gray-50 transition-colors min-w-[60px]"
          aria-label={t("common.language.label")}
          value={locale}
          onChange={(e) => setLocale(e.target.value as any)}
        >
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="id">ID</option>
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-900 pointer-events-none" />
      </div>
    </div>
  );
}

export default LanguageSwitcher;
