import { ContactInfo } from "@/features/landing/contact/components/contact-info";
import { ContactMap } from "@/features/landing/contact/components/contact-map";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ContactInfo />
            <ContactMap />
          </div>
        </div>
      </div>
    </main>
  );
}
