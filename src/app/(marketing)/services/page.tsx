import { HeroSection } from "@/features/marketing/services/components/hero-section";
import { DashboardPreviewSection } from "@/features/marketing/services/components/dashboard-preview-section";
import { ManagementRowOne } from "@/features/marketing/services/components/management-row-one";
import { ManagementRowTwo } from "@/features/marketing/services/components/management-row-two";
import { TrackingPreviewSection } from "@/features/marketing/services/components/tracking-preview-section";
import { DataRowOne } from "@/features/marketing/services/components/data-row-one";
import { DataRowTwo } from "@/features/marketing/services/components/data-row-two";
import { AlertsPreviewSection } from "@/features/marketing/services/components/alerts-preview-section";

export default function ServicesPage() {
  return (
    <main
      className="min-h-screen bg-white pt-24 sm:pt-32"
      style={{ color: "var(--color-brand-primary)" }}
    >
      <div className="animate-slide-up px-6 sm:px-0">
        <HeroSection />
      </div>
      <div className="animate-slide-up-delayed px-6 sm:px-0">
        <DashboardPreviewSection />
      </div>
      <div className="animate-slide-up-delayed-2 mb-8 px-6 sm:mb-12 sm:px-0">
        <ManagementRowOne />
        <ManagementRowTwo />
      </div>
      <div className="animate-slide-up-delayed-3 mb-8 px-6 sm:mb-12 sm:px-0">
        <TrackingPreviewSection />
      </div>
      <div className="mb-8 px-6 sm:mb-12 sm:px-0">
        <DataRowOne />
      </div>
      <div className="mb-8 px-6 sm:mb-12 sm:px-0">
        <DataRowTwo />
      </div>
      <div className="animate-slide-up-delayed-3 px-6 sm:px-0">
        <AlertsPreviewSection />
      </div>
    </main>
  );
}
