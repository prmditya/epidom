import { PricingHero } from "@/features/landing/pricing/components/pricing-hero";
import { PricingCards } from "@/features/landing/pricing/components/pricing-cards";
import { FeatureComparison } from "@/features/landing/pricing/components/feature-comparison";
import { PricingFaq } from "@/features/landing/pricing/components/pricing-faq";
import { PricingCta } from "@/features/landing/pricing/components/pricing-cta";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PricingHero />
        <PricingCards />
        <FeatureComparison />
        <PricingFaq />
        <PricingCta />
      </div>
    </main>
  );
}
