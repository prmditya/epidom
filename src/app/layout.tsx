import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Suspense } from "react";
import { I18nProvider } from "@/components/lang/i18n-provider";

export const metadata: Metadata = {
  title: "Epidom - Admin Dashboard",
  description: "an open source ERP for small food manufacturers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <I18nProvider>
            <AuthProvider>{children}</AuthProvider>
          </I18nProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
