import { PaymentHero } from "@/features/landing/payments/components/payment-hero";
import { PaymentForm } from "@/features/landing/payments/components/payment-form";
import { PaymentSummary } from "@/features/landing/payments/components/payment-summary";
import { PaymentSecurity } from "@/features/landing/payments/components/payment-security";
import { ContactSalesForm } from "@/features/landing/payments/components/contact-sales-form";

interface PaymentsPageProps {
  searchParams: Promise<{
    plan?: string;
  }>;
}

export default async function PaymentsPage({ searchParams }: PaymentsPageProps) {
  const resolvedSearchParams = await searchParams;
  const plan = resolvedSearchParams.plan as "starter" | "pro" | "enterprise" | undefined;
  const isValidPlan = plan && ["starter", "pro", "enterprise"].includes(plan);
  
  // If no valid plan is selected, default to starter
  const selectedPlan = isValidPlan ? plan : "starter";

  return (
    <main className="min-h-screen bg-white pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24" style={{ color: 'var(--color-brand-primary)' }}>
      <div className="animate-slide-up">
        <PaymentHero plan={selectedPlan} />
      </div>
      <div className="animate-slide-up-delayed">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {selectedPlan === "enterprise" ? (
            // Enterprise plan - show contact sales form
            <div className="max-w-4xl mx-auto">
              <ContactSalesForm />
            </div>
          ) : (
            // Starter and Pro plans - show payment form
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
              {/* Left Section - Payment Form */}
              <div className="lg:col-span-2">
                <PaymentForm plan={selectedPlan} />
              </div>
              
              {/* Right Section - Summary & Security */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <PaymentSummary plan={selectedPlan} />
                  <PaymentSecurity />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
