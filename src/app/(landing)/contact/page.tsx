import { ContactInfo } from "@/features/landing/contact/components/contact-info";
import { ContactMap } from "@/features/landing/contact/components/contact-map";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-24 sm:pt-32" style={{ color: '#444444' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="animate-slide-up">
              <ContactInfo />
            </div>
            <div className="animate-slide-up-delayed">
              <ContactMap />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
