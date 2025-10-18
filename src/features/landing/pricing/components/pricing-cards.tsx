"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/components/lang/i18n-provider";
import { Check } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";

export function PricingCards() {
  const { t } = useI18n();

  return (
    <section className="pb-20 sm:pb-24 md:pb-28">
      {/* Desktop Layout */}
      <div className="hidden lg:grid gap-6 lg:grid-cols-3">
        {/* Starter Plan */}
        <Card className="rounded-2xl border-2 flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold" style={{ color: '#444444' }}>{t("pricing.plans.starter.title")}</CardTitle>
            <CardDescription className="text-sm">{t("pricing.plans.starter.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div>
              <div className="text-4xl font-bold" style={{ color: '#444444' }}>€29</div>
              <p className="text-sm" style={{ color: '#444444' }}>{t("pricing.plans.starter.billing")}</p>
            </div>
            <Button asChild className="w-full rounded-lg bg-transparent" variant="outline">
              <Link href="/payments?plan=starter">{t("pricing.plans.starter.select")}</Link>
            </Button>
            <Separator />
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{t("pricing.plans.starter.f1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{t("pricing.plans.starter.f2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{t("pricing.plans.starter.f3")}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Pro Plan - Highlighted */}
        <Card className="rounded-2xl border-2 border-primary shadow-lg scale-105 md:scale-100 md:ring-2 md:ring-primary flex flex-col relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
              {t("pricing.plans.pro.recommended")}
            </span>
          </div>
          <CardHeader className="pb-4 pt-8">
            <CardTitle className="text-2xl font-bold" style={{ color: '#444444' }}>{t("pricing.plans.pro.title")}</CardTitle>
            <CardDescription className="text-sm">{t("pricing.plans.pro.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div>
              <div className="text-4xl font-bold" style={{ color: '#444444' }}>€79</div>
              <p className="text-sm" style={{ color: '#444444' }}>{t("pricing.plans.pro.billing")}</p>
            </div>
            <Button asChild className="w-full rounded-lg">
              <Link href="/payments?plan=pro">{t("pricing.plans.pro.select")}</Link>
            </Button>
            <Separator />
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{t("pricing.plans.pro.f1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{t("pricing.plans.pro.f2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{t("pricing.plans.pro.f3")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{t("pricing.plans.pro.f4")}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Enterprise Plan */}
        <Card className="rounded-2xl border-2 flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold" style={{ color: '#444444' }}>{t("pricing.plans.enterprise.title")}</CardTitle>
            <CardDescription className="text-sm">{t("pricing.plans.enterprise.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div>
              <div className="text-3xl font-bold" style={{ color: '#444444' }}>{t("pricing.plans.enterprise.price")}</div>
              <p className="text-sm" style={{ color: '#444444' }}>{t("pricing.plans.enterprise.billing")}</p>
            </div>
            <Button asChild className="w-full rounded-lg bg-transparent" variant="outline">
              <Link href="/payments?plan=enterprise">{t("pricing.plans.enterprise.select")}</Link>
            </Button>
            <Separator />
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{t("pricing.plans.enterprise.f1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{t("pricing.plans.enterprise.f2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{t("pricing.plans.enterprise.f3")}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Mobile/Tablet Carousel Layout */}
      <div className="lg:hidden pt-8 pb-16">
        <Carousel showArrows={true} showDots={true} defaultCenterIndex={1} className="max-w-sm mx-auto min-h-[600px]">
          {/* Starter Plan */}
          <Card className="rounded-2xl border-2 flex flex-col mt-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold" style={{ color: '#444444' }}>{t("pricing.plans.starter.title")}</CardTitle>
              <CardDescription className="text-sm">{t("pricing.plans.starter.description")}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div>
                <div className="text-4xl font-bold" style={{ color: '#444444' }}>€29</div>
                <p className="text-sm" style={{ color: '#444444' }}>{t("pricing.plans.starter.billing")}</p>
              </div>
              <Button asChild className="w-full rounded-lg bg-transparent" variant="outline">
                <Link href="/payments?plan=starter">{t("pricing.plans.starter.select")}</Link>
              </Button>
              <Separator />
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t("pricing.plans.starter.f1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t("pricing.plans.starter.f2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t("pricing.plans.starter.f3")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Pro Plan - Highlighted (Centered by default) */}
          <Card className="rounded-2xl border-2 border-primary shadow-lg scale-105 flex flex-col relative mt-6">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                {t("pricing.plans.pro.recommended")}
              </span>
            </div>
            <CardHeader className="pb-4 pt-8">
              <CardTitle className="text-2xl font-bold" style={{ color: '#444444' }}>{t("pricing.plans.pro.title")}</CardTitle>
              <CardDescription className="text-sm">{t("pricing.plans.pro.description")}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div>
                <div className="text-4xl font-bold" style={{ color: '#444444' }}>€79</div>
                <p className="text-sm" style={{ color: '#444444' }}>{t("pricing.plans.pro.billing")}</p>
              </div>
              <Button asChild className="w-full rounded-lg">
                <Link href="/payments?plan=pro">{t("pricing.plans.pro.select")}</Link>
              </Button>
              <Separator />
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t("pricing.plans.pro.f1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t("pricing.plans.pro.f2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t("pricing.plans.pro.f3")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t("pricing.plans.pro.f4")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="rounded-2xl border-2 flex flex-col mt-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold" style={{ color: '#444444' }}>{t("pricing.plans.enterprise.title")}</CardTitle>
              <CardDescription className="text-sm">{t("pricing.plans.enterprise.description")}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div>
                <div className="text-3xl font-bold" style={{ color: '#444444' }}>{t("pricing.plans.enterprise.price")}</div>
                <p className="text-sm" style={{ color: '#444444' }}>{t("pricing.plans.enterprise.billing")}</p>
              </div>
              <Button asChild className="w-full rounded-lg bg-transparent" variant="outline">
                <Link href="/payments?plan=enterprise">{t("pricing.plans.enterprise.select")}</Link>
              </Button>
              <Separator />
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t("pricing.plans.enterprise.f1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t("pricing.plans.enterprise.f2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t("pricing.plans.enterprise.f3")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Carousel>
      </div>
    </section>
  );
}
