import { HeroSection } from "@/features/landing/services/components/hero-section";
import { DashboardPreviewSection } from "@/features/landing/services/components/dashboard-preview-section";
import { ManagementRowOne } from "@/features/landing/services/components/management-row-one";
import { ManagementRowTwo } from "@/features/landing/services/components/management-row-two";
import { TrackingPreviewSection } from "@/features/landing/services/components/tracking-preview-section";
import { DataRowOne } from "@/features/landing/services/components/data-row-one";
import { DataRowTwo } from "@/features/landing/services/components/data-row-two";
import { AlertsPreviewSection } from "@/features/landing/services/components/alerts-preview-section";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white pt-24 sm:pt-32" style={{ color: 'var(--color-brand-primary)' }}>
      <div className="animate-slide-up">
        <HeroSection />
      </div>
      <div className="animate-slide-up-delayed">
        <DashboardPreviewSection />
      </div>
      <div className="animate-slide-up-delayed-2 mb-8 sm:mb-12">
        <ManagementRowOne />
        <ManagementRowTwo />
      </div>
      <div className="animate-slide-up-delayed-3 mb-8 sm:mb-12">
        <TrackingPreviewSection />
      </div>
      <DataRowOne />
      <DataRowTwo />
      <div className="animate-slide-up-delayed-3">
        <AlertsPreviewSection />
      </div>
    </main>
  );
}
