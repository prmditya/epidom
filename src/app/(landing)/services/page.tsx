import { HeroSection } from "@/features/landing/services/components/hero-section";
import { DashboardSection } from "@/features/landing/services/components/dashboard-section";
import { ManagementSection } from "@/features/landing/services/components/management-section";
import { TrackingSection } from "@/features/landing/services/components/tracking-section";
import { DataSection } from "@/features/landing/services/components/data-section";
import { AlertsSection } from "@/features/landing/services/components/alerts-section";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white pt-24 sm:pt-32" style={{ color: 'var(--color-brand-primary)' }}>
      <div className="animate-slide-up">
        <HeroSection />
      </div>
      <div className="animate-slide-up-delayed">
        <DashboardSection />
      </div>
      <div className="animate-slide-up-delayed-2">
        <ManagementSection />
      </div>
      <div className="animate-slide-up-delayed-3">
        <TrackingSection />
      </div>
      <div className="animate-slide-up-delayed-3">
        <DataSection />
      </div>
      <div className="animate-slide-up-delayed-3">
        <AlertsSection />
      </div>
    </main>
  );
}
