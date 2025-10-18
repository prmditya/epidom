import { HeroSection } from "@/features/landing/services/components/hero-section";
import { DashboardSection } from "@/features/landing/services/components/dashboard-section";
import { ManagementSection } from "@/features/landing/services/components/management-section";
import { TrackingSection } from "@/features/landing/services/components/tracking-section";
import { DataSection } from "@/features/landing/services/components/data-section";
import { AlertsSection } from "@/features/landing/services/components/alerts-section";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-foreground pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <DashboardSection />
        <ManagementSection />
        <TrackingSection />
        <DataSection />
        <AlertsSection />
      </div>
    </main>
  );
}
