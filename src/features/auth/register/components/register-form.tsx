"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/components/lang/i18n-provider";

interface FieldErrors {
  [key: string]: string;
}

export function RegisterForm() {
  const router = useRouter();
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setFieldErrors({});

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;
    const businessName = formData.get("businessName") as string;
    const address = formData.get("address") as string;

    // Client-side validation for password confirmation
    if (password !== confirm) {
      setFieldErrors({ confirm: t("messages.passwordsDoNotMatch") });
      setError("Please fix the errors below");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          businessName,
          address,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Success - redirect to login
        router.push("/login?registered=true");
      } else {
        // Handle validation errors with field-level details
        if (result.error?.code === "VALIDATION_ERROR" && result.error?.details) {
          const errors: FieldErrors = {};
          if (Array.isArray(result.error.details)) {
            result.error.details.forEach((detail: { field: string; message: string }) => {
              errors[detail.field] = detail.message;
            });
          }
          setFieldErrors(errors);
          setError(result.error.message || "Please fix the errors below");
        } else if (result.error?.code === "EMAIL_ALREADY_EXISTS" || response.status === 409) {
          setError(t("messages.userAlreadyExists"));
        } else {
          setError(result.error?.message || t("messages.registrationFailed"));
        }
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError(t("messages.registrationFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-lg border-2 shadow-xl">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
          {t("auth.createAccount")}
        </CardTitle>
        <CardDescription className="text-base">{t("auth.manageYourInventory")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="space-y-6">
          {error && (
            <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-md border p-3 text-sm">
              {error}
            </div>
          )}

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
                  disabled={loading}
                  className={fieldErrors.name ? "border-destructive" : ""}
                />
                {fieldErrors.name && (
                  <p className="text-destructive text-sm">{fieldErrors.name}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@bakery.com"
                  required
                  disabled={loading}
                  className={fieldErrors.email ? "border-destructive" : ""}
                />
                {fieldErrors.email && (
                  <p className="text-destructive text-sm">{fieldErrors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  disabled={loading}
                  className={fieldErrors.password ? "border-destructive" : ""}
                />
                {fieldErrors.password && (
                  <p className="text-destructive text-sm">{fieldErrors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">{t("auth.confirmPassword")}</Label>
                <Input
                  id="confirm"
                  name="confirm"
                  type="password"
                  required
                  disabled={loading}
                  className={fieldErrors.confirm ? "border-destructive" : ""}
                />
                {fieldErrors.confirm && (
                  <p className="text-destructive text-sm">{fieldErrors.confirm}</p>
                )}
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h3 className="font-medium">{t("auth.businessInfo")}</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">{t("auth.businessName")}</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  placeholder="Epidom Bakery"
                  disabled={loading}
                  className={fieldErrors.businessName ? "border-destructive" : ""}
                />
                {fieldErrors.businessName && (
                  <p className="text-destructive text-sm">{fieldErrors.businessName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{t("auth.address")}</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main St, Paris"
                  disabled={loading}
                  className={fieldErrors.address ? "border-destructive" : ""}
                />
                {fieldErrors.address && (
                  <p className="text-destructive text-sm">{fieldErrors.address}</p>
                )}
              </div>
            </div>
          </section>

          <Button
            type="submit"
            disabled={loading}
            className="w-full shadow-md transition-all hover:shadow-lg"
          >
            {loading ? "Creating account..." : t("auth.registerButton")}
          </Button>
        </form>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          {t("auth.alreadyHaveAccount")}{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
          >
            {t("auth.loginButton")}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
