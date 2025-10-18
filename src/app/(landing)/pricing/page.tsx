"use client";

import Image from "next/image";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WaitlistDialog } from "@/features/landing/components/waitlist-dialog";
import { useI18n } from "@/components/lang/i18n-provider-ilmi";
import { Check } from "lucide-react";

export default function PricingPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-background pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-12 sm:py-16">
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
            <Image
              src="/images/logo-black.png"
              alt="EPIDOM"
              width={120}
              height={32}
              className="h-8 w-auto"
              priority
            />
            <div className="space-y-4 sm:space-y-6">
              <h1
                className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                style={{ color: "#444444" }}
              >
                {t("pricing.heroTitle")}
              </h1>
              <p
                className="text-pretty max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl leading-relaxed"
                style={{ color: "#444444" }}
              >
                {t("pricing.heroDesc")}
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-12 sm:pb-16 md:pb-20">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {/* Starter Plan */}
            <Card className="rounded-2xl border-2 flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold">
                  {t("pricing.plans.starter.title")}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t("pricing.plans.starter.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div>
                  <div className="text-4xl font-bold">€29</div>
                  <p className="text-sm text-muted-foreground">
                    {t("pricing.plans.starter.billing")}
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full rounded-lg bg-transparent"
                  variant="outline"
                >
                  <Link href="/payments?plan=starter">
                    {t("pricing.plans.starter.select")}
                  </Link>
                </Button>
                <Separator />
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      {t("pricing.plans.starter.f1")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      {t("pricing.plans.starter.f2")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      {t("pricing.plans.starter.f3")}
                    </span>
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
                <CardTitle className="text-2xl font-bold">
                  {t("pricing.plans.pro.title")}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t("pricing.plans.pro.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div>
                  <div className="text-4xl font-bold">€79</div>
                  <p className="text-sm text-muted-foreground">
                    {t("pricing.plans.pro.billing")}
                  </p>
                </div>
                <Button asChild className="w-full rounded-lg">
                  <Link href="/payments?plan=pro">
                    {t("pricing.plans.pro.select")}
                  </Link>
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
                <CardTitle className="text-2xl font-bold">
                  {t("pricing.plans.enterprise.title")}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t("pricing.plans.enterprise.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div>
                  <div className="text-3xl font-bold">
                    {t("pricing.plans.enterprise.price")}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("pricing.plans.enterprise.billing")}
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full rounded-lg bg-transparent"
                  variant="outline"
                >
                  <Link href="/payments?plan=enterprise">
                    {t("pricing.plans.enterprise.select")}
                  </Link>
                </Button>
                <Separator />
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      {t("pricing.plans.enterprise.f1")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      {t("pricing.plans.enterprise.f2")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      {t("pricing.plans.enterprise.f3")}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="pb-12 sm:pb-16 md:pb-20">
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
                  <th className="p-3 sm:p-4 font-semibold text-center border-l-2 border-primary">
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
                  <td className="p-3 sm:p-4 text-center border-l-2 border-primary">
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
                  <td className="p-3 sm:p-4 text-center border-l-2 border-primary">
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
                  <td className="p-3 sm:p-4 text-center">—</td>
                  <td className="p-3 sm:p-4 text-center border-l-2 border-primary">
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
                  <td className="p-3 sm:p-4 text-center border-l-2 border-primary">
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
                  <td className="p-3 sm:p-4 text-center border-l-2 border-primary">
                    {t("pricing.compare.rows.support.pro")}
                  </td>
                  <td className="p-3 sm:p-4 text-center">
                    {t("pricing.compare.rows.support.enterprise")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-12 sm:pb-16 md:pb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 sm:mb-8 text-center">
            {t("pricing.faq.title")}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base font-semibold">
                {t("pricing.faq.q1")}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed">
                {t("pricing.faq.a1")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base font-semibold">
                {t("pricing.faq.q2")}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed">
                {t("pricing.faq.a2")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base font-semibold">
                {t("pricing.faq.q3")}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed">
                {t("pricing.faq.a3")}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Final CTA */}
        <section className="pb-10 sm:pb-12">
          <div className="rounded-2xl border-2 p-6 sm:p-8 md:p-12 text-center bg-muted/30">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              {t("pricing.finalCta.title")}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              {t("pricing.finalCta.desc")}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
              <WaitlistDialog />
              <Button asChild variant="secondary" className="rounded-lg">
                <Link href="/payments">{t("pricing.finalCta.goPayments")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
