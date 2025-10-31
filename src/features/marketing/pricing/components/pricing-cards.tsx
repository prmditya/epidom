"use client";

import { memo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/components/lang/i18n-provider";
import { Check } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";

export const PricingCards = memo(function PricingCards() {
  const { t } = useI18n();

  return (
    <section className="pb-20 sm:pb-24 md:pb-28" data-section="pricing-cards">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-3">
          {/* Starter Plan */}
          <Card className="flex flex-col rounded-2xl border-2">
            <CardHeader className="pb-4">
              <CardTitle
                className="text-2xl font-bold"
                style={{ color: "var(--color-brand-primary)" }}
              >
                {t("pricing.plans.starter.title")}
              </CardTitle>
              <CardDescription className="text-sm">
                {t("pricing.plans.starter.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div>
                <div className="text-4xl font-bold" style={{ color: "var(--color-brand-primary)" }}>
                  €29
                </div>
                <p className="text-sm" style={{ color: "var(--color-brand-primary)" }}>
                  {t("pricing.plans.starter.billing")}
                </p>
              </div>
              <Button asChild className="w-full rounded-lg bg-transparent" variant="outline">
                <Link href="/payments?plan=starter">{t("pricing.plans.starter.select")}</Link>
              </Button>
              <Separator />
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{t("pricing.plans.starter.f1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{t("pricing.plans.starter.f2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{t("pricing.plans.starter.f3")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Pro Plan - Highlighted */}
          <Card className="border-primary md:ring-primary relative flex scale-105 flex-col rounded-2xl border-2 shadow-lg md:scale-100 md:ring-2">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
              <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold">
                {t("pricing.plans.pro.recommended")}
              </span>
            </div>
            <CardHeader className="pt-8 pb-4">
              <CardTitle
                className="text-2xl font-bold"
                style={{ color: "var(--color-brand-primary)" }}
              >
                {t("pricing.plans.pro.title")}
              </CardTitle>
              <CardDescription className="text-sm">
                {t("pricing.plans.pro.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div>
                <div className="text-4xl font-bold" style={{ color: "var(--color-brand-primary)" }}>
                  €79
                </div>
                <p className="text-sm" style={{ color: "var(--color-brand-primary)" }}>
                  {t("pricing.plans.pro.billing")}
                </p>
              </div>
              <Button asChild className="w-full rounded-lg">
                <Link href="/payments?plan=pro">{t("pricing.plans.pro.select")}</Link>
              </Button>
              <Separator />
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{t("pricing.plans.pro.f1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{t("pricing.plans.pro.f2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{t("pricing.plans.pro.f3")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{t("pricing.plans.pro.f4")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="flex flex-col rounded-2xl border-2">
            <CardHeader className="pb-4">
              <CardTitle
                className="text-2xl font-bold"
                style={{ color: "var(--color-brand-primary)" }}
              >
                {t("pricing.plans.enterprise.title")}
              </CardTitle>
              <CardDescription className="text-sm">
                {t("pricing.plans.enterprise.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div>
                <div className="text-3xl font-bold" style={{ color: "var(--color-brand-primary)" }}>
                  {t("pricing.plans.enterprise.price")}
                </div>
                <p className="text-sm" style={{ color: "var(--color-brand-primary)" }}>
                  {t("pricing.plans.enterprise.billing")}
                </p>
              </div>
              <Button asChild className="w-full rounded-lg bg-transparent" variant="outline">
                <Link href="/payments?plan=enterprise">{t("pricing.plans.enterprise.select")}</Link>
              </Button>
              <Separator />
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{t("pricing.plans.enterprise.f1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{t("pricing.plans.enterprise.f2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{t("pricing.plans.enterprise.f3")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Mobile/Tablet Carousel Layout */}
        <div className="pt-8 pb-16 lg:hidden">
          <Carousel
            showArrows={true}
            showDots={true}
            defaultCenterIndex={1}
            className="mx-auto min-h-[600px] max-w-sm"
          >
            {/* Starter Plan */}
            <Card className="mt-6 flex flex-col rounded-2xl border-2">
              <CardHeader className="pb-4">
                <CardTitle
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-brand-primary)" }}
                >
                  {t("pricing.plans.starter.title")}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t("pricing.plans.starter.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div>
                  <div
                    className="text-4xl font-bold"
                    style={{ color: "var(--color-brand-primary)" }}
                  >
                    €29
                  </div>
                  <p className="text-sm" style={{ color: "var(--color-brand-primary)" }}>
                    {t("pricing.plans.starter.billing")}
                  </p>
                </div>
                <Button asChild className="w-full rounded-lg bg-transparent" variant="outline">
                  <Link href="/payments?plan=starter">{t("pricing.plans.starter.select")}</Link>
                </Button>
                <Separator />
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{t("pricing.plans.starter.f1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{t("pricing.plans.starter.f2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{t("pricing.plans.starter.f3")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pro Plan - Highlighted (Centered by default) */}
            <Card className="border-primary relative mt-6 flex scale-105 flex-col rounded-2xl border-2 shadow-lg">
              <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 transform">
                <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold shadow-lg">
                  {t("pricing.plans.pro.recommended")}
                </span>
              </div>
              <CardHeader className="pt-8 pb-4">
                <CardTitle
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-brand-primary)" }}
                >
                  {t("pricing.plans.pro.title")}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t("pricing.plans.pro.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div>
                  <div
                    className="text-4xl font-bold"
                    style={{ color: "var(--color-brand-primary)" }}
                  >
                    €79
                  </div>
                  <p className="text-sm" style={{ color: "var(--color-brand-primary)" }}>
                    {t("pricing.plans.pro.billing")}
                  </p>
                </div>
                <Button asChild className="w-full rounded-lg">
                  <Link href="/payments?plan=pro">{t("pricing.plans.pro.select")}</Link>
                </Button>
                <Separator />
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{t("pricing.plans.pro.f1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{t("pricing.plans.pro.f2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{t("pricing.plans.pro.f3")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{t("pricing.plans.pro.f4")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="mt-6 flex flex-col rounded-2xl border-2">
              <CardHeader className="pb-4">
                <CardTitle
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-brand-primary)" }}
                >
                  {t("pricing.plans.enterprise.title")}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t("pricing.plans.enterprise.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div>
                  <div
                    className="text-3xl font-bold"
                    style={{ color: "var(--color-brand-primary)" }}
                  >
                    {t("pricing.plans.enterprise.price")}
                  </div>
                  <p className="text-sm" style={{ color: "var(--color-brand-primary)" }}>
                    {t("pricing.plans.enterprise.billing")}
                  </p>
                </div>
                <Button asChild className="w-full rounded-lg bg-transparent" variant="outline">
                  <Link href="/payments?plan=enterprise">
                    {t("pricing.plans.enterprise.select")}
                  </Link>
                </Button>
                <Separator />
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{t("pricing.plans.enterprise.f1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{t("pricing.plans.enterprise.f2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{t("pricing.plans.enterprise.f3")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Carousel>
        </div>
      </div>
    </section>
  );
});
