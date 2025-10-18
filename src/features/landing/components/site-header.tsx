"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { WaitlistDialog } from "@/features/landing/components/waitlist-dialog";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/lang/language-switcher";
import { useI18n } from "@/components/lang/i18n-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <header className="mobile-navbar" style={{ color: "white" }}>
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4"
      >
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="block transition-opacity hover:opacity-80"
            aria-label={t("common.nav.homepage")}
          >
            <Image
              src="/images/logo-white.png"
              alt="EPIDOM logo"
              width={120}
              height={32}
              className="h-7 sm:h-8 w-auto"
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-6 sm:gap-8 md:flex">
            <li>
              <Link
                href="/"
                aria-current="page"
                className="text-sm sm:text-base font-medium transition-colors hover:text-white/80"
              >
                {t("common.nav.home")}
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-sm sm:text-base font-medium transition-colors hover:text-white/80"
              >
                {t("common.nav.services")}
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-sm sm:text-base font-medium transition-colors hover:text-white/80"
              >
                {t("common.nav.pricing")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm sm:text-base font-medium transition-colors hover:text-white/80"
              >
                {t("common.nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <WaitlistDialog />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-white/20 transition-colors rounded-lg h-9 w-9"
                aria-label={t("common.nav.openMenu")}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-80 sm:w-96 p-0 flex flex-col"
            >
              <SheetTitle className="sr-only">
                {t("common.nav.navTitle")}
              </SheetTitle>

              {/* Header Section */}
              <div className="flex items-center justify-between p-6 border-b border-border/20">
                <Link
                  href="/"
                  aria-label={t("common.nav.homepage")}
                  className="flex items-center gap-3"
                >
                  <Image
                    src="/images/logo-black.png"
                    alt="EPIDOM logo"
                    width={120}
                    height={32}
                    className="h-8 w-auto"
                    style={{ width: "auto", height: "auto" }}
                  />
                  <span className="sr-only">{t("common.brand")}</span>
                </Link>
              </div>

              {/* Navigation Section */}
              <nav aria-label="Mobile" className="flex-1 px-6 py-6">
                <div className="space-y-1">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t("common.nav.menu")}
                  </div>

                  <ul className="space-y-1">
                    <li>
                      <SheetClose asChild>
                        <Link
                          href="/"
                          aria-current="page"
                          className="flex items-center h-12 px-3 py-2 text-base font-medium text-foreground hover:bg-muted/50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <svg
                            className="w-5 h-5 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                          {t("common.nav.home")}
                        </Link>
                      </SheetClose>
                    </li>
                    <li>
                      <SheetClose asChild>
                        <Link
                          href="/services"
                          className="flex items-center h-12 px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <svg
                            className="w-5 h-5 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                          {t("common.nav.services")}
                        </Link>
                      </SheetClose>
                    </li>
                    <li>
                      <SheetClose asChild>
                        <Link
                          href="/pricing"
                          className="flex items-center h-12 px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <svg
                            className="w-5 h-5 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                          {t("common.nav.pricing")}
                        </Link>
                      </SheetClose>
                    </li>
                    <li>
                      <SheetClose asChild>
                        <Link
                          href="/contact"
                          className="flex items-center h-12 px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <svg
                            className="w-5 h-5 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {t("common.nav.contact")}
                        </Link>
                      </SheetClose>
                    </li>
                  </ul>
                </div>
              </nav>

              {/* Footer Section */}
              <div className="border-t border-border/20 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <SheetClose asChild>
                      <div>
                        <WaitlistDialog variant="sidebar" />
                      </div>
                    </SheetClose>
                  </div>
                  <div className="flex-shrink-0">
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
