"use client";

import { useI18n } from "@/components/lang/i18n-provider-ilmi";
import { SafeImage } from "@/features/landing/services/components/safe-image";

export default function ServicesPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-white text-foreground pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <DashboardSection />
        <ManagementSection />
        <TrackingSection />
        <DataSection />
        <AlertsSection />
      </div>
    </main>
  );
}

function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12">
        {/* Left Column - Text Content */}
        <div className="space-y-6 sm:space-y-8 lg:col-span-8">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            style={{ color: "#444444" }}
          >
            {t("services.heroTitleLine1")} {t("services.heroTitleLine2")}
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl"
            style={{ color: "#444444" }}
          >
            {t("services.heroDesc")}
          </p>
        </div>

        {/* Right Column - Feature Block */}
        <div className="flex justify-center lg:col-span-4">
          <div className="w-full sm:w-fit">
            <div
              className="rounded-2xl p-6 sm:p-8 text-white text-left"
              style={{ backgroundColor: "#444444" }}
            >
              <div className="space-y-6 sm:space-y-8">
                <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
                  {t("services.featureBlock.management")}
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
                  {t("services.featureBlock.tracking")}
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
                  {t("services.featureBlock.data")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white">
      <div className="py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden bg-white">
          {/* Image Section - 80% width */}
          <div className="lg:col-span-4">
            <div className="relative aspect-video lg:aspect-[4/3] w-full overflow-hidden">
              <SafeImage
                src="/placeholder-dashboard.png"
                alt="Management dashboard"
                fill
                className="object-cover"
                placeholderText="Dashboard Interface"
              />
            </div>
          </div>

          {/* Text Section - 20% width, vertically centered */}
          <div className="lg:col-span-1 bg-white flex items-center justify-center p-6 sm:p-8 lg:p-12">
            <div className="space-y-4 sm:space-y-6 text-left">
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.dashboardDesc1")}
              </p>

              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.dashboardDesc2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManagementSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white">
      <div className="py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Title di luar box */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          {t("services.managementTitle")}
        </h2>

        {/* Box dengan dua bagian */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden bg-white">
          {/* Kiri 40% - Text dan gambar kecil */}
          <div className="lg:col-span-2 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
            {/* Text paragraf */}
            <div className="space-y-4 sm:space-y-6">
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.managementDesc1")}
              </p>
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.managementDesc2")}
              </p>
            </div>

            {/* Gambar kecil di bawah text */}
            <div className="relative aspect-video w-full mt-6 sm:mt-8 rounded-xl overflow-hidden">
              <SafeImage
                src="/placeholder-production.png"
                alt="Production interface"
                fill
                className="object-cover"
                placeholderText="Production Interface"
              />
            </div>
          </div>

          {/* Kanan 60% - Gambar besar */}
          <div className="lg:col-span-3">
            <div className="relative aspect-video lg:aspect-[3/2] w-full">
              <SafeImage
                src="/placeholder-management.png"
                alt="Management interface"
                fill
                className="object-cover"
                placeholderText="Management Interface"
              />
            </div>
          </div>
        </div>

        {/* 3 Gambar dengan layout khusus */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-2 rounded-2xl overflow-hidden bg-white mt-8 sm:mt-12">
          {/* Kiri 70% - Gambar full */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video lg:aspect-[7/4] w-full rounded-lg overflow-hidden">
              <SafeImage
                src="/placeholder-management.png"
                alt="Management interface"
                fill
                className="object-cover"
                placeholderText="Management Interface"
              />
            </div>
          </div>

          {/* Kanan 30% - Dibagi dua */}
          <div className="lg:col-span-3 grid grid-rows-2 gap-2">
            {/* Atas 50% */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <SafeImage
                src="/placeholder-history.png"
                alt="History interface"
                fill
                className="object-cover"
                placeholderText="History Interface"
              />
            </div>

            {/* Bawah 50% */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <SafeImage
                src="/placeholder-data.png"
                alt="Data interface"
                fill
                className="object-cover"
                placeholderText="Data Interface"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrackingSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white">
      <div className="py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center"
          style={{ fontWeight: "900" }}
        >
          {t("services.trackingTitle")}
        </h2>

        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-white">
          <div className="relative aspect-video lg:aspect-[16/9] w-full">
            <SafeImage
              src="/placeholder-tracking.png"
              alt="Tracking interface"
              fill
              className="object-cover"
              placeholderText="Tracking Interface"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function DataSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white">
      <div className="py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Title di luar box */}
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center lg:text-right"
          style={{ fontWeight: "900" }}
        >
          {t("services.dataTitle")}
        </h2>

        {/* Box dengan dua bagian - DIBALIK dari ManagementSection */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-0 rounded-2xl overflow-hidden bg-white">
          {/* Kiri 70% - Gambar besar (sebelumnya kanan) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video lg:aspect-[7/4] w-full">
              <SafeImage
                src="/placeholder-data.png"
                alt="Data interface"
                fill
                className="object-cover"
                placeholderText="Data Interface"
              />
            </div>
          </div>

          {/* Kanan 30% - Text dan gambar kecil (sebelumnya kiri) */}
          <div className="lg:col-span-3 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
            {/* Text paragraf */}
            <div className="space-y-4 sm:space-y-6">
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.dataDesc1")}
              </p>
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.dataDesc2")}
              </p>
            </div>

            {/* Gambar kecil di bawah text */}
            <div className="relative aspect-video w-full mt-6 sm:mt-8 rounded-xl overflow-hidden">
              <SafeImage
                src="/placeholder-alert.png"
                alt="Alert interface"
                fill
                className="object-cover"
                placeholderText="Alert Interface"
              />
            </div>
          </div>
        </div>

        {/* 3 Gambar dengan layout khusus */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-2 rounded-2xl overflow-hidden bg-white mt-8 sm:mt-12">
          {/* Kiri 70% - Gambar full */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video lg:aspect-[7/4] w-full rounded-lg overflow-hidden">
              <SafeImage
                src="/placeholder-data.png"
                alt="Data interface"
                fill
                className="object-cover"
                placeholderText="Data Interface"
              />
            </div>
          </div>

          {/* Kanan 30% - Dibagi dua */}
          <div className="lg:col-span-3 grid grid-rows-2 gap-2">
            {/* Atas 50% */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <SafeImage
                src="/placeholder-alert.png"
                alt="Alert interface"
                fill
                className="object-cover"
                placeholderText="Alert Interface"
              />
            </div>

            {/* Bawah 50% */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <SafeImage
                src="/placeholder-tracking.png"
                alt="Tracking interface"
                fill
                className="object-cover"
                placeholderText="Tracking Interface"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AlertsSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white">
      <div className="py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Title di luar box */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          {t("services.alertsTitle")}
        </h2>

        {/* Box dengan dua bagian - SAMA seperti ManagementSection */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden bg-white">
          {/* Kiri 40% - Text dan gambar kecil */}
          <div className="lg:col-span-2 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
            {/* Text paragraf */}
            <div className="space-y-4 sm:space-y-6">
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.alertsDesc1")}
              </p>
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: "#444444", fontWeight: "300" }}
              >
                {t("services.alertsDesc2")}
              </p>
            </div>

            {/* Gambar kecil di bawah text */}
            <div className="relative aspect-video w-full mt-6 sm:mt-8 rounded-xl overflow-hidden">
              <SafeImage
                src="/placeholder-alert.png"
                alt="Alert interface"
                fill
                className="object-cover"
                placeholderText="Alert Interface"
              />
            </div>
          </div>

          {/* Kanan 60% - Gambar besar */}
          <div className="lg:col-span-3">
            <div className="relative aspect-video lg:aspect-[3/2] w-full">
              <SafeImage
                src="/placeholder-alert.png"
                alt="Alert interface"
                fill
                className="object-cover"
                placeholderText="Alert Interface"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
