"use client";

import type React from "react";

import { useRequireAuth } from "@/components/auth-provider";
import PageShell from "@/components/page-shell";
// import { I18nProvider } from "@/components/epidom/i18n-provider"

function AuthGate({ children }: { children: React.ReactNode }) {
  useRequireAuth("/login");
  return <>{children}</>;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <PageShell>{children}</PageShell>
    </AuthGate>
  );
}
