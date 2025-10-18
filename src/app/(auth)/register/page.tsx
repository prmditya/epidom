"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/components/lang/i18n-provider";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useI18n();

  async function onSubmit(formData: FormData) {
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const confirm = String(formData.get("confirm") || "");
    const businessName = String(formData.get("businessName") || "");
    const address = String(formData.get("address") || "");
    if (password !== confirm) {
      alert(t("messages.passwordsDoNotMatch"));
      return;
    }
    // For MVP, send them to login like spec states
    router.replace("/login");
  }

  return (
    <div className="grid min-h-dvh grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-8">
        <Card className="w-full max-w-lg shadow-xl border-2">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("auth.createAccount")}
            </CardTitle>
            <CardDescription className="text-base">
              {t("auth.manageYourInventory")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={onSubmit} className="space-y-6">
              <section className="space-y-4">
                <h3 className="font-medium">{t("auth.accountInfo")}</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="name">{t("auth.name")}</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Jane Baker"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">{t("auth.email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@bakery.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t("auth.password")}</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm">{t("auth.confirmPassword")}</Label>
                    <Input
                      id="confirm"
                      name="confirm"
                      type="password"
                      required
                    />
                  </div>
                </div>
              </section>

              <Separator />

              <section className="space-y-4">
                <h3 className="font-medium">{t("auth.businessInfo")}</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">
                      {t("auth.businessName")}
                    </Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      placeholder="Epidom Bakery"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">{t("auth.address")}</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main St, Paris"
                    />
                  </div>
                </div>
              </section>

              <Button
                type="submit"
                className="w-full shadow-md hover:shadow-lg transition-all"
              >
                {t("auth.register")}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {t("auth.alreadyHaveAccount")}{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 underline underline-offset-4 font-semibold transition-colors"
              >
                {t("auth.login")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="relative hidden md:block">
        <Image
          alt="Bakery production"
          src="/images/matierepremiere.png"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
