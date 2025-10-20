import type React from "react";

import { Sidebar } from "@/features/dashboard/components/sidebar";
import { Topbar } from "@/features/dashboard/components/topbar";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full page-transition-container">
      <Topbar />
      <div className="mx-auto grid max-w-[1600px] items-start gap-4 mt-14 p-3 md:grid-cols-[280px_1fr] md:gap-6 md:p-6 lg:px-8">
        {/* Sidebar column (desktop only) */}
        <div className="hidden md:flex md:sticky md:top-[4.5rem]">
          <Sidebar mode="desktop" />
        </div>
        {/* Content column */}
        <main className="min-w-0 w-full rounded-xl border bg-card/80 backdrop-blur-md p-4 sm:p-6 shadow-lg page-content md:top-[4.5rem] ">
          {children}
        </main>
      </div>
    </div>
  );
}
