"use client";
import type React from "react";

import { Sidebar } from "@/features/dashboard/components/sidebar";
import { Topbar } from "@/features/dashboard/components/topbar";

/**
 * PageShell Component
 *
 * Provides the layout structure for dashboard pages.
 * Includes Topbar, Sidebar, and main content area.
 *
 * Note: SessionProvider is now in root layout (app/layout.tsx)
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition-container w-full">
      <Topbar />
      <div className="mx-auto mt-14 grid max-w-[1600px] items-start gap-4 p-3 md:grid-cols-[280px_1fr] md:gap-6 md:p-6 lg:px-8">
        {/* Sidebar column (desktop only) */}
        <div className="hidden h-full md:sticky md:top-[4.5rem] md:flex">
          <Sidebar mode="desktop" />
        </div>
        {/* Content */}
        <main className="bg-card/80 page-content w-full min-w-0 rounded-xl border p-4 shadow-lg backdrop-blur-md sm:p-6 md:top-[4.5rem]">
          {children}
        </main>
      </div>
    </div>
  );
}
