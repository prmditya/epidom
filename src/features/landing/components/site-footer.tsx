"use client";

import { memo } from "react";
import Link from "next/link";
import { useI18n } from "@/components/lang/i18n-provider";

export const SiteFooter = memo(function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer
      role="contentinfo"
      className="border-t border-border/20"
      style={{ backgroundColor: "#444444", color: "white" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 py-8 sm:py-12 md:grid-cols-2 lg:grid-cols-3 md:py-16">
          {/* Left: tagline */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-pretty text-lg sm:text-xl font-bold leading-snug tracking-tight">
              {t("footer.tagline")}
            </h3>
            <p className="text-sm sm:text-base opacity-75">
              {t("footer.rights")}
            </p>
          </div>

          {/* Middle: address */}
          <div className="space-y-3 lg:col-span-1">
            <h4 className="text-pretty text-base sm:text-lg font-semibold">
              {t("footer.addressHeading")}
            </h4>
            <p className="text-sm sm:text-base opacity-80">
              {t("footer.addressLines")[0]}
              <br />
              {t("footer.addressLines")[1]}
              <br />
              {t("footer.addressLines")[2]}
            </p>
          </div>

          {/* Right: contact */}
          <div className="space-y-3 lg:col-span-1">
            <h4 className="text-pretty text-base sm:text-lg font-semibold">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  href="mailto:info@epidom.com"
                  className="underline underline-offset-4 hover:opacity-80 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-background/70 transition-opacity"
                >
                  info@epidom.com
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:evanco@gmail.com"
                  className="underline underline-offset-4 hover:opacity-80 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-background/70 transition-opacity"
                >
                  evanco@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default SiteFooter;
