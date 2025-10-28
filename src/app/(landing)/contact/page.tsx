import { ContactInfo } from "@/features/landing/contact/components/contact-info";
import { ContactMap } from "@/features/landing/contact/components/contact-map";

export default function ContactPage() {
  return (
    <main
      className="min-h-screen bg-white pt-24 sm:pt-32"
      style={{ color: "var(--color-brand-primary)" }}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-12">
        <div className="animate-slide-up">
          <ContactInfo />
        </div>
        <div className="animate-slide-up-delayed">
          <ContactMap />
        </div>
      </div>
    </main>
  );
}
