"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { Check } from "lucide-react";

export function FeatureComparison() {
  const { t } = useI18n();

  return (
    <section className="pb-12 sm:pb-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight sm:mb-8 sm:text-3xl md:text-4xl">
          {t("pricing.compare.title")}
        </h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60">
              <tr className="text-left">
                <th className="p-3 font-semibold sm:p-4">{t("pricing.compare.headers.feature")}</th>
                <th className="p-3 text-center font-semibold sm:p-4">
                  {t("pricing.compare.headers.starter")}
                </th>
                <th
                  className="border-l-2 p-3 text-center font-semibold sm:p-4"
                  style={{ borderLeftColor: "#444444" }}
                >
                  {t("pricing.compare.headers.pro")}
                </th>
                <th className="p-3 text-center font-semibold sm:p-4">
                  {t("pricing.compare.headers.enterprise")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-muted/30 border-t">
                <td className="p-3 sm:p-4">{t("pricing.compare.rows.pointOfSale.name")}</td>
                <td className="p-3 text-center sm:p-4">
                  <Check className="text-primary mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                </td>
                <td
                  className="border-l-2 p-3 text-center sm:p-4"
                  style={{ borderLeftColor: "#444444" }}
                >
                  <Check className="text-primary mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                </td>
                <td className="p-3 text-center sm:p-4">
                  <Check className="text-primary mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                </td>
              </tr>
              <tr className="hover:bg-muted/30 border-t">
                <td className="p-3 sm:p-4">{t("pricing.compare.rows.multiSite.name")}</td>
                <td className="p-3 text-center sm:p-4">—</td>
                <td
                  className="border-l-2 p-3 text-center sm:p-4"
                  style={{ borderLeftColor: "#444444" }}
                >
                  <Check className="text-primary mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                </td>
                <td className="p-3 text-center sm:p-4">
                  <Check className="text-primary mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                </td>
              </tr>
              <tr className="hover:bg-muted/30 border-t">
                <td className="p-3 sm:p-4">{t("pricing.compare.rows.supplierManagement.name")}</td>
                <td className="p-3 text-center sm:p-4">
                  <Check className="text-primary mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                </td>
                <td
                  className="border-l-2 p-3 text-center sm:p-4"
                  style={{ borderLeftColor: "#444444" }}
                >
                  <Check className="text-primary mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                </td>
                <td className="p-3 text-center sm:p-4">
                  <Check className="text-primary mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                </td>
              </tr>
              <tr className="hover:bg-muted/30 border-t">
                <td className="p-3 sm:p-4">{t("pricing.compare.rows.reports.name")}</td>
                <td className="p-3 text-center sm:p-4">—</td>
                <td
                  className="border-l-2 p-3 text-center sm:p-4"
                  style={{ borderLeftColor: "#444444" }}
                >
                  <Check className="text-primary mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                </td>
                <td className="p-3 text-center sm:p-4">
                  <Check className="text-primary mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                </td>
              </tr>
              <tr className="hover:bg-muted/30 border-t">
                <td className="p-3 sm:p-4">{t("pricing.compare.rows.support.name")}</td>
                <td className="p-3 text-center sm:p-4">
                  {t("pricing.compare.rows.support.starter")}
                </td>
                <td
                  className="border-l-2 p-3 text-center sm:p-4"
                  style={{ borderLeftColor: "#444444" }}
                >
                  {t("pricing.compare.rows.support.pro")}
                </td>
                <td className="p-3 text-center sm:p-4">
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
