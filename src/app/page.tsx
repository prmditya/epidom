"use client";

import { useRequireAuth } from "@/components/epidom/auth-provider";

function AuthGate({ children }: { children: React.ReactNode }) {
  useRequireAuth("/login")
  return <>{children}</>
}

export default function Home() {
  return (
    <AuthGate>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <p>Loading...</p>
      </div>
    </AuthGate>
  );
}
