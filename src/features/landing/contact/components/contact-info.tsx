"use client";

import { useI18n } from "@/components/lang/i18n-provider";

export function ContactInfo() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Title */}
      <h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        style={{ color: "#444444" }}
      >
        {t("contact.title")}
      </h1>

      {/* Description */}
      <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
        {t("contact.subtitle")}
      </p>

      {/* Contact Information */}
      <div className="space-y-6 sm:space-y-8">
        <div className="text-foreground">
          <p className="text-base sm:text-lg md:text-xl">
            {t("contact.info.address.line1")}
            <br />
            {t("contact.info.address.line2")}
          </p>
        </div>

        <div className="text-foreground">
          <p className="text-base sm:text-lg md:text-xl">
            {t("contact.info.phone.number")}
          </p>
        </div>

        <div className="space-y-3">
          <a
            href={`mailto:${t("contact.info.email.address")}`}
            className="text-base sm:text-lg md:text-xl text-foreground hover:text-muted-foreground transition-colors block"
          >
            {t("contact.info.email.address")}
          </a>
          <a
            href="mailto:evancao@gmail.com"
            className="text-base sm:text-lg md:text-xl text-foreground hover:text-muted-foreground transition-colors block"
          >
            evancao@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
