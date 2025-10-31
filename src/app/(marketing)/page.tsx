import { LazyCountdownComponent } from "@/lib/dynamic-imports.client";
import { generateMetadata } from "@/lib/seo";
import { ProductStructuredData } from "@/components/seo/structured-data";

export const metadata = generateMetadata({
  title: "EPIDOM - Food Inventory Management Solution | Coming Soon",
  description:
    "Revolutionary food inventory management system launching November 12, 2025. Join our waitlist to be the first to experience the future of restaurant inventory management.",
  keywords: [
    "food inventory management",
    "restaurant management",
    "kitchen inventory",
    "food waste reduction",
    "stock management",
    "inventory tracking",
    "restaurant software",
    "food service management",
    "EPIDOM",
    "coming soon",
    "waitlist",
  ],
  openGraph: {
    title: "EPIDOM - Food Inventory Management Solution | Coming Soon",
    description:
      "Revolutionary food inventory management system launching November 12, 2025. Join our waitlist now!",
    url: "https://epidom.com",
    images: [
      {
        url: "https://epidom.com/images/og-countdown.jpg",
        width: 1200,
        height: 630,
        alt: "EPIDOM Coming Soon - Food Inventory Management",
      },
    ],
  },
  twitter: {
    title: "EPIDOM - Food Inventory Management Solution | Coming Soon",
    description:
      "Revolutionary food inventory management system launching November 12, 2025. Join our waitlist now!",
    images: ["https://epidom.com/images/twitter-countdown.jpg"],
  },
});

export default function HomePage() {
  return (
    <main>
      <ProductStructuredData />
      {/* Countdown section - temporary until launch */}
      <LazyCountdownComponent />

      {/* Hero section - commented out until launch */}
      {/* <LazyHero /> */}
    </main>
  );
}
