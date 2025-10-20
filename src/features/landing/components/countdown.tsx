"use client";

import { memo } from "react";
import Countdown from "react-countdown";
import { useI18n } from "@/components/lang/i18n-provider";
import { WaitlistDialog } from "@/features/landing/components/waitlist-dialog";
import { Mail, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const CountdownComponent = memo(function CountdownComponent() {
  const { t } = useI18n();
  const [isClient, setIsClient] = useState(false);
  const targetDate = new Date("2025-11-12T00:00:00");

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="min-h-screen bg-white pt-12 sm:pt-16 flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Content wrapper - ultra compact design */}
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 py-4 sm:py-6 animate-slide-up">
          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--color-brand-primary)' }}>
            {t("countdown.title")}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            {t("countdown.subtitle")}
          </p>

          {/* Countdown timer */}
          <div className="my-6 sm:my-8">
            {isClient ? (
              <Countdown
                date={targetDate}
                renderer={({ days, hours, minutes, seconds }) => (
                  <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 scale-90 sm:scale-100 md:scale-110">
                    <FlipUnit value={days} label={t("countdown.days")} />
                    <FlipUnit value={hours} label={t("countdown.hours")} />
                    <FlipUnit value={minutes} label={t("countdown.minutes")} />
                    <FlipUnit value={seconds} label={t("countdown.seconds")} />
                  </div>
                )}
              />
            ) : (
              <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 scale-90 sm:scale-100 md:scale-110">
                <FlipUnit value={0} label={t("countdown.days")} />
                <FlipUnit value={0} label={t("countdown.hours")} />
                <FlipUnit value={0} label={t("countdown.minutes")} />
                <FlipUnit value={0} label={t("countdown.seconds")} />
              </div>
            )}
          </div>

          {/* Target date */}
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("countdown.targetDate")}
          </p>

          {/* Contact information - ultra compact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" style={{ color: 'var(--color-brand-primary)' }} />
              <a
                className="underline hover:no-underline transition-all duration-200 font-medium"
                href="mailto:mrcaoevan@gmail.com"
                style={{ color: 'var(--color-brand-primary)' }}
              >
                {t("countdown.email")}
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" style={{ color: 'var(--color-brand-primary)' }} />
              <a
                className="underline hover:no-underline transition-all duration-200 font-medium"
                href="http://wa.me/33781732386"
                style={{ color: 'var(--color-brand-primary)' }}
              >
                {t("countdown.whatsapp")}
              </a>
            </div>
          </div>

          {/* Waitlist CTA - ultra compact */}
          <div className="mt-4 sm:mt-5">
            <p className="text-sm sm:text-base text-muted-foreground mb-3">
              {t("countdown.waitlistText")}
            </p>
            <div className="inline-block">
              <WaitlistDialog variant="home" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
});

// Flip-board style unit with EPIDOM branding - responsive version
function FlipUnit({ value, label }: { value: number; label: string }) {
  // Format to always show 2 digits (e.g., 02, 05)
  const displayValue = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {displayValue.split("").map((digit, i) => (
          <div
            key={i}
            className="relative mx-1 w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14 lg:w-14 lg:h-16 bg-white border-2 rounded-md shadow-md flex items-center justify-center text-sm sm:text-base md:text-lg lg:text-xl font-bold transition-all duration-300 hover:shadow-lg"
            style={{ 
              borderColor: '#444444',
              color: '#444444'
            }}
          >
            {digit}
            {/* Divider line */}
            <div 
              className="absolute top-1/2 left-0 w-full border-t"
              style={{ borderColor: '#e5e7eb' }}
            />
          </div>
        ))}
      </div>
      <span 
        className="mt-2 text-sm sm:text-xs font-semibold tracking-wider uppercase"
        style={{ color: 'var(--color-brand-primary)' }}
      >
        {label}
      </span>
    </div>
  );
}
