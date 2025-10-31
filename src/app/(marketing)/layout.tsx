import type { Metadata } from "next";
import { SiteHeader } from "@/features/marketing/shared/components/site-header";
import { SiteFooter } from "@/features/marketing/shared/components/site-footer";
import { Suspense } from "react";
import { I18nProvider } from "@/components/lang/i18n-provider";
import { CookieConsentBar } from "@/features/marketing/shared/components/cookie-consent-bar";
import { ErrorBoundary } from "@/components/error-boundary";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Epidom",
  description: "Epidom - Your comprehensive inventory management solution",
  generator: "Next.js",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${lato.variable} font-lato`}>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <I18nProvider>
            <SiteHeader />
            <main className="min-h-screen">{children}</main>
            <SiteFooter />
            <CookieConsentBar />
          </I18nProvider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
