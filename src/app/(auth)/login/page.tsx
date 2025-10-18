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
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useI18n } from "@/components/lang/i18n-provider";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();

  async function onSubmit(formData: FormData) {
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    router.replace("/dashboard");
  }

  return (
    <div className="grid min-h-dvh grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-8">
        <Card className="w-full max-w-md shadow-xl border-2">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("auth.welcome")}
            </CardTitle>
            <CardDescription className="text-base">
              {t("auth.signInToContinue")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@bakery.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input type="password" id="password" name="password" required />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  className="text-sm text-primary underline underline-offset-4"
                  href="#"
                >
                  {t("auth.forgotPassword")}
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full shadow-md hover:shadow-lg transition-all"
              >
                {t("auth.login")}
              </Button>
            </form>
            <Separator className="my-6" />
            <p className="text-center text-sm text-muted-foreground">
              {t("auth.dontHaveAccount")}{" "}
              <Link
                href="/register"
                className="text-primary hover:text-primary/80 underline underline-offset-4 font-semibold transition-colors"
              >
                {t("auth.register")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="relative hidden md:block">
        <Image
          alt="Bakery illustration"
          src="/images/matierepremiere.png"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
