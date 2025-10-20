"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { Check } from "lucide-react";

export function FeatureComparison() {
  const { t } = useI18n();

  return (
    <section className="pb-12 sm:pb-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 sm:mb-8 text-center">
          {t("pricing.compare.title")}
        </h2>
        <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/60">
            <tr className="text-left">
              <th className="p-3 sm:p-4 font-semibold">
                {t("pricing.compare.headers.feature")}
              </th>
              <th className="p-3 sm:p-4 font-semibold text-center">
                {t("pricing.compare.headers.starter")}
              </th>
              <th className="p-3 sm:p-4 font-semibold text-center border-l-2" style={{ borderLeftColor: '#444444' }}>
                {t("pricing.compare.headers.pro")}
              </th>
              <th className="p-3 sm:p-4 font-semibold text-center">
                {t("pricing.compare.headers.enterprise")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-muted/30">
              <td className="p-3 sm:p-4">
                {t("pricing.compare.rows.pointOfSale.name")}
              </td>
              <td className="p-3 sm:p-4 text-center">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto" />
              </td>
              <td className="p-3 sm:p-4 text-center border-l-2" style={{ borderLeftColor: '#444444' }}>
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto" />
              </td>
              <td className="p-3 sm:p-4 text-center">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto" />
              </td>
            </tr>
            <tr className="border-t hover:bg-muted/30">
              <td className="p-3 sm:p-4">
                {t("pricing.compare.rows.multiSite.name")}
              </td>
              <td className="p-3 sm:p-4 text-center">—</td>
              <td className="p-3 sm:p-4 text-center border-l-2" style={{ borderLeftColor: '#444444' }}>
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto" />
              </td>
              <td className="p-3 sm:p-4 text-center">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto" />
              </td>
            </tr>
            <tr className="border-t hover:bg-muted/30">
              <td className="p-3 sm:p-4">
                {t("pricing.compare.rows.supplierManagement.name")}
              </td>
              <td className="p-3 sm:p-4 text-center">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto" />
              </td>
              <td className="p-3 sm:p-4 text-center border-l-2" style={{ borderLeftColor: '#444444' }}>
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto" />
              </td>
              <td className="p-3 sm:p-4 text-center">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto" />
              </td>
            </tr>
            <tr className="border-t hover:bg-muted/30">
              <td className="p-3 sm:p-4">
                {t("pricing.compare.rows.reports.name")}
              </td>
              <td className="p-3 sm:p-4 text-center">—</td>
              <td className="p-3 sm:p-4 text-center border-l-2" style={{ borderLeftColor: '#444444' }}>
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto" />
              </td>
              <td className="p-3 sm:p-4 text-center">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto" />
              </td>
            </tr>
            <tr className="border-t hover:bg-muted/30">
              <td className="p-3 sm:p-4">
                {t("pricing.compare.rows.support.name")}
              </td>
              <td className="p-3 sm:p-4 text-center">
                {t("pricing.compare.rows.support.starter")}
              </td>
              <td className="p-3 sm:p-4 text-center border-l-2" style={{ borderLeftColor: '#444444' }}>
                {t("pricing.compare.rows.support.pro")}
              </td>
              <td className="p-3 sm:p-4 text-center">
                {t("pricing.compare.rows.support.enterprise")}
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </section>
  );
}
