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
    <main
      className="min-h-screen bg-white pt-16 pb-8 sm:pt-20 sm:pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24"
      style={{ color: "var(--color-brand-primary)" }}
    >
      <div className="animate-slide-up">
        <PaymentHero plan={selectedPlan} />
      </div>
      <div className="animate-slide-up-delayed">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
          {selectedPlan === "enterprise" ? (
            // Enterprise plan - show contact sales form
            <div className="mx-auto max-w-4xl">
              <ContactSalesForm />
            </div>
          ) : (
            // Starter and Pro plans - show payment form
            <div
              className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-1 lg:grid-cols-3 lg:grid-rows-1 lg:gap-8"
              style={{ gridTemplateRows: "1fr" }}
            >
              <div className="order-2 lg:order-1 lg:col-span-2">
                <PaymentForm plan={selectedPlan} />
              </div>
              <div className="order-1 lg:order-2 lg:col-span-1">
                <div className="h-full space-y-4 lg:sticky lg:top-8 lg:space-y-6">
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
