import { PricingHero } from "@/features/landing/pricing/components/pricing-hero";
import { PricingCards } from "@/features/landing/pricing/components/pricing-cards";
import { FeatureComparison } from "@/features/landing/pricing/components/feature-comparison";
import { PricingFaq } from "@/features/landing/pricing/components/pricing-faq";
import { PricingCta } from "@/features/landing/pricing/components/pricing-cta";

export default function PricingPage() {
  return (
    <main
      className="min-h-screen bg-white pt-24 sm:pt-32"
      style={{ color: "var(--color-brand-primary)" }}
    >
      <div className="animate-slide-up">
        <PricingHero />
      </div>
      <div className="animate-slide-up-delayed">
        <PricingCards />
      </div>
      <div className="animate-slide-up-delayed-2">
        <FeatureComparison />
      </div>
      <div className="animate-slide-up-delayed-3">
        <PricingFaq />
      </div>
      <div className="animate-slide-up-delayed-3">
        <PricingCta />
      </div>
    </main>
  );
}
