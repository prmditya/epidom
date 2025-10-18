import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { I18nProvider } from "@/components/lang/i18n-provider";
import PageShell from "@/features/dashboard/components/page-shell";

export const metadata: Metadata = {
  title: "Epidom - Admin Dashboard",
  description: "an open source ERP for small food manufacturers",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <I18nProvider>
            <PageShell>{children}</PageShell>
          </I18nProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
