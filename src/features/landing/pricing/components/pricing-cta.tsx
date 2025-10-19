"use client";

import { Button } from "@/components/ui/button";
import { WaitlistDialog } from "@/features/landing/components/waitlist-dialog";
import { useI18n } from "@/components/lang/i18n-provider";

export function PricingCta() {
  const { t } = useI18n();

  const handleViewPlansClick = () => {
    // Track click for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_plans_click', {
        event_category: 'engagement',
        event_label: 'pricing_cta',
        value: 1
      });
    }

    // Smooth scroll to pricing cards section
    const pricingCardsElement = document.querySelector('[data-section="pricing-cards"]');
    if (pricingCardsElement) {
      // Calculate offset based on screen size for better visibility
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 100 : 150; // More offset on desktop, less on mobile
      
      // Get element position and add offset for better visibility
      const elementPosition = pricingCardsElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="pb-10 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-2 p-6 sm:p-8 md:p-12 text-center bg-muted/30">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          {t("pricing.finalCta.title")}
        </h3>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          {t("pricing.finalCta.desc")}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
          <WaitlistDialog />
          <Button 
            variant="secondary" 
            className="rounded-lg transition-colors duration-200 hover:bg-gray-200 hover:shadow-md" 
            style={{ color: "#444444" }}
            onClick={handleViewPlansClick}
          >
            {t("pricing.finalCta.goPayments")}
          </Button>
        </div>
        </div>
      </div>
    </section>
  );
}
