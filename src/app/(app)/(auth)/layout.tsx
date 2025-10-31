import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { I18nProvider } from "@/components/lang/i18n-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { SessionProvider } from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "Epidom - Login",
  description: "an open source ERP for small food manufacturers",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <SessionProvider>
            <I18nProvider>{children}</I18nProvider>
          </SessionProvider>
        </Suspense>
      </ErrorBoundary>
      <Analytics />
    </div>
  );
}
