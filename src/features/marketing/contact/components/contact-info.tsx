"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { MapPin, Phone, Mail, LucideIcon } from "lucide-react";

interface ContactItemProps {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}

function ContactItem({ icon: Icon, label, children }: ContactItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 flex-shrink-0">
        <Icon className="h-5 w-5" style={{ color: "#444444" }} />
      </div>
      <div>
        <h3 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wider uppercase">
          {label}
        </h3>
        {children}
      </div>
    </div>
  );
}

export function ContactInfo() {
  const { t } = useI18n();

  return (
    <div className="py-8 sm:py-12">
      <div>
        <h1
          className="mb-6 text-3xl leading-tight font-bold tracking-tight sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ color: "#444444" }}
        >
          {t("contact.title")}
        </h1>

        <p
          className="mb-6 text-lg leading-relaxed sm:mb-8 sm:text-xl md:text-2xl"
          style={{ color: "#444444" }}
        >
          {t("contact.subtitle")}
        </p>

        <div className="space-y-4 sm:space-y-5">
          <ContactItem icon={MapPin} label={t("contact.labels.address")}>
              <div className="space-y-0.5">
                <p className="text-sm sm:text-base md:text-lg" style={{ color: "#444444" }}>
                  {t("contact.info.address.line1")}
                </p>
                <p className="text-sm sm:text-base md:text-lg" style={{ color: "#444444" }}>
                  {t("contact.info.address.line2")}
                </p>
              </div>
          </ContactItem>

          <ContactItem icon={Phone} label={t("contact.labels.phone")}>
              <a
                href={`tel:${t("contact.info.phone.number").replace(/[^\d+]/g, "")}`}
                className="block text-sm transition-opacity hover:opacity-70 sm:text-base md:text-lg"
                style={{ color: "var(--color-brand-primary)" }}
              >
                {t("contact.info.phone.number")}
              </a>
          </ContactItem>

          <ContactItem icon={Mail} label={t("contact.labels.email")}>
                <a
                  href={`mailto:${t("contact.info.email.address")}`}
                  className="text-sm transition-opacity hover:opacity-70 sm:text-base md:text-lg"
                  style={{ color: "var(--color-brand-primary)" }}
                >
                  {t("contact.info.email.address")}
                </a>
          </ContactItem>
        </div>
      </div>
    </div>
  );
}
