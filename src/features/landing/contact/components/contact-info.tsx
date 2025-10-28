"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { MapPin, Phone, Mail } from "lucide-react";

export function ContactInfo() {
  const { t } = useI18n();

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1
          className="mb-6 text-3xl leading-tight font-bold tracking-tight sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ color: "#444444" }}
        >
          {t("contact.title")}
        </h1>

        {/* Description */}
        <p
          className="mb-6 text-lg leading-relaxed sm:mb-8 sm:text-xl md:text-2xl"
          style={{ color: "#444444" }}
        >
          {t("contact.subtitle")}
        </p>

        {/* Contact Information */}
        <div className="space-y-4 sm:space-y-5">
          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0">
              <MapPin className="h-5 w-5" style={{ color: "#444444" }} />
            </div>
            <div>
              <h3 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wider uppercase">
                Address
              </h3>
              <div className="space-y-0.5">
                <p className="text-sm sm:text-base md:text-lg" style={{ color: "#444444" }}>
                  {t("contact.info.address.line1")}
                </p>
                <p className="text-sm sm:text-base md:text-lg" style={{ color: "#444444" }}>
                  {t("contact.info.address.line2")}
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0">
              <Phone className="h-5 w-5" style={{ color: "#444444" }} />
            </div>
            <div>
              <h3 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wider uppercase">
                Phone
              </h3>
              <a
                href={`tel:${t("contact.info.phone.number").replace(/[^\d+]/g, "")}`}
                className="block text-sm transition-opacity hover:opacity-70 sm:text-base md:text-lg"
                style={{ color: "var(--color-brand-primary)" }}
              >
                {t("contact.info.phone.number")}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0">
              <Mail className="h-5 w-5" style={{ color: "#444444" }} />
            </div>
            <div>
              <h3 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wider uppercase">
                Email
              </h3>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <a
                  href={`mailto:${t("contact.info.email.address")}`}
                  className="text-sm transition-opacity hover:opacity-70 sm:text-base md:text-lg"
                  style={{ color: "var(--color-brand-primary)" }}
                >
                  {t("contact.info.email.address")}
                </a>
                <a
                  href="mailto:info@epidom.com"
                  className="text-sm transition-opacity hover:opacity-70 sm:text-base md:text-lg"
                  style={{ color: "var(--color-brand-primary)" }}
                >
                  info@epidom.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
