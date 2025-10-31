import type { Metadata } from "next";
import { I18nProvider } from "@/components/lang/i18n-provider";
import { SiteHeader } from "@/features/landing/shared/components/site-header";

export const metadata: Metadata = {
  title: "Your Stores - EPIDOM",
  description: "Manage your stores",
};

export default function StoresLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <div className="flex min-h-screen flex-col bg-neutral-50">
        <SiteHeader variant="authenticated" showNav={false} />
        <main className="flex-1 pt-23 sm:pt-32">{children}</main>
      </div>
    </I18nProvider>
  );
}
