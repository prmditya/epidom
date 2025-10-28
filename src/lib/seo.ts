import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    locale?: string;
    type?: string;
  };
  twitter?: {
    card?: "summary" | "summary_large_image" | "app" | "player";
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      "max-video-preview"?: number;
      "max-image-preview"?: "none" | "standard" | "large";
      "max-snippet"?: number;
    };
  };
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
  other?: Record<string, string>;
}

const defaultSEO: SEOConfig = {
  title: "EPIDOM - Food Inventory Management Solution",
  description:
    "Revolutionary food inventory management system for restaurants, cafes, and food service businesses. Track stock, reduce waste, and optimize your kitchen operations with EPIDOM.",
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
  ],
  openGraph: {
    title: "EPIDOM - Food Inventory Management Solution",
    description:
      "Revolutionary food inventory management system for restaurants, cafes, and food service businesses.",
    url: "https://epidom.com",
    siteName: "EPIDOM",
    images: [
      {
        url: "https://epidom.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EPIDOM - Food Inventory Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@epidom",
    creator: "@epidom",
    title: "EPIDOM - Food Inventory Management Solution",
    description:
      "Revolutionary food inventory management system for restaurants and food service businesses.",
    images: ["https://epidom.com/images/twitter-card.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function generateMetadata(config: Partial<SEOConfig> = {}): Metadata {
  const seo = { ...defaultSEO, ...config };

  return {
    title: {
      default: seo.title,
      template: `%s | ${seo.title}`,
    },
    description: seo.description,
    keywords: seo.keywords?.join(", "),
    authors: [{ name: "EPIDOM Team" }],
    creator: "EPIDOM",
    publisher: "EPIDOM",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://epidom.com"),
    alternates: {
      canonical: seo.canonical || seo.alternates?.canonical,
      languages: seo.alternates?.languages,
    },
    robots: seo.robots,
    openGraph: {
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
      url: seo.openGraph?.url,
      siteName: seo.openGraph?.siteName || "EPIDOM",
      images: seo.openGraph?.images,
      locale: seo.openGraph?.locale || "en_US",
      type: (seo.openGraph?.type || "website") as
        | "website"
        | "article"
        | "book"
        | "profile"
        | "music.song"
        | "music.album"
        | "music.playlist"
        | "music.radio_station"
        | "video.movie"
        | "video.episode"
        | "video.tv_show"
        | "video.other",
    },
    twitter: {
      card: seo.twitter?.card || "summary_large_image",
      site: seo.twitter?.site,
      creator: seo.twitter?.creator,
      title: seo.twitter?.title || seo.title,
      description: seo.twitter?.description || seo.description,
      images: seo.twitter?.images,
    },
    other: {
      ...seo.other,
      "application-name": "EPIDOM",
      "apple-mobile-web-app-title": "EPIDOM",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#444444",
      "theme-color": "#444444",
    },
  };
}

// Structured Data for JSON-LD
export function generateStructuredData(
  type: "website" | "organization" | "product" | "service",
  data?: any
) {
  const baseUrl = "https://epidom.com";

  const structuredData = {
    "@context": "https://schema.org",
    "@type":
      type === "website"
        ? "WebSite"
        : type === "organization"
          ? "Organization"
          : type === "product"
            ? "SoftwareApplication"
            : "Service",
    name: "EPIDOM",
    description:
      "Revolutionary food inventory management system for restaurants, cafes, and food service businesses.",
    url: baseUrl,
    logo: `${baseUrl}/images/logo-black.png`,
    image: `${baseUrl}/images/og-image.jpg`,
    sameAs: [
      "https://twitter.com/epidom",
      "https://linkedin.com/company/epidom",
      "https://github.com/epidom",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-EPIDOM",
      contactType: "customer service",
      email: "mrcaoevan@gmail.com",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressLocality: "San Francisco",
      addressRegion: "CA",
    },
    foundingDate: "2024",
    ...data,
  };

  return structuredData;
}
