"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { MapPin, Phone, Mail } from "lucide-react";

export function ContactInfo() {
  const { t } = useI18n();

  return (
    <div className="py-8 pb-4 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 sm:mb-8"
          style={{ color: "#444444" }}
        >
          {t("contact.title")}
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-6 sm:mb-8" style={{ color: '#444444' }}>
          {t("contact.subtitle")}
        </p>

        {/* Contact Information */}
        <div className="space-y-4 sm:space-y-5">
        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <MapPin className="w-5 h-5" style={{ color: '#444444' }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Address
            </h3>
            <div className="space-y-0.5">
              <p className="text-sm sm:text-base md:text-lg" style={{ color: '#444444' }}>
                {t("contact.info.address.line1")}
              </p>
              <p className="text-sm sm:text-base md:text-lg" style={{ color: '#444444' }}>
                {t("contact.info.address.line2")}
              </p>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <Phone className="w-5 h-5" style={{ color: '#444444' }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Phone
            </h3>
            <a
              href={`tel:${t("contact.info.phone.number").replace(/[^\d+]/g, '')}`}
              className="text-sm sm:text-base md:text-lg hover:opacity-70 transition-opacity block"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              {t("contact.info.phone.number")}
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <Mail className="w-5 h-5" style={{ color: '#444444' }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Email
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <a
                href={`mailto:${t("contact.info.email.address")}`}
                className="text-sm sm:text-base md:text-lg hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-brand-primary)' }}
              >
                {t("contact.info.email.address")}
              </a>
              <a
                href="mailto:info@epidom.com"
                className="text-sm sm:text-base md:text-lg hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-brand-primary)' }}
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
