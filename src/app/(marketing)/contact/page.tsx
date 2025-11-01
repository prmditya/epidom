import { ContactInfo } from "@/features/marketing/contact/components/contact-info";
import { ContactMap } from "@/features/marketing/contact/components/contact-map";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata = genMeta({
  title: "Contact Us - EPIDOM",
  description:
    "Get in touch with EPIDOM. Whether you're a potential client, interested in our food inventory management services, or have questions, we're here to help.",
  keywords: [
    "contact EPIDOM",
    "food inventory management support",
    "restaurant software contact",
    "customer support",
    "EPIDOM help",
  ],
  openGraph: {
    title: "Contact Us - EPIDOM",
    description: "Get in touch with EPIDOM for questions about our food inventory management solution.",
    url: "https://epidom.com/contact",
  },
});

export default function ContactPage() {
  return (
    <main
      className="min-h-screen bg-white pt-24 sm:pt-32"
      style={{ color: "var(--color-brand-primary)" }}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-12">
          <div className="animate-slide-up">
            <ContactInfo />
          </div>
          <div className="animate-slide-up-delayed">
            <ContactMap />
          </div>
        </div>
      </div>
    </main>
  );
}
