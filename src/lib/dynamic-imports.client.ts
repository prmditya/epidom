"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";
import React from "react";

// Lazy load heavy components
export const LazyCountdownComponent = dynamic(
  () =>
    import("@/features/landing/shared/components/countdown").then((mod) => ({
      default: mod.CountdownComponent,
    })),
  {
    loading: () =>
      React.createElement(
        "div",
        {
          className: "flex items-center justify-center min-h-screen",
        },
        React.createElement("div", {
          className: "animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900",
        })
      ),
    ssr: false,
  }
);

export const LazyHero = dynamic(
  () =>
    import("@/features/landing/shared/components/hero").then((mod) => ({
      default: mod.Hero,
    })),
  {
    loading: () =>
      React.createElement(
        "div",
        {
          className: "flex items-center justify-center min-h-screen",
        },
        React.createElement(
          "div",
          {
            className: "animate-pulse",
          },
          React.createElement("div", {
            className: "h-8 bg-gray-200 rounded w-3/4 mb-4",
          }),
          React.createElement("div", {
            className: "h-4 bg-gray-200 rounded w-1/2",
          })
        )
      ),
    ssr: false,
  }
);

export const DynamicWaitlistDialog = dynamic(
  () =>
    import("@/features/landing/shared/components/waitlist-dialog").then((mod) => ({
      default: mod.WaitlistDialog,
    })),
  { ssr: false, loading: () => null }
);

export const LazyWaitlistDialog = dynamic(
  () =>
    import("@/features/landing/shared/components/waitlist-dialog").then((mod) => ({
      default: mod.WaitlistDialog,
    })),
  {
    loading: () =>
      React.createElement(
        "div",
        {
          className: "animate-pulse",
        },
        React.createElement("div", {
          className: "h-10 bg-gray-200 rounded w-32",
        })
      ),
    ssr: false,
  }
);

// Lazy load heavy UI components
// Note: Chart and Carousel components are not available in this project

// Lazy load pages
export const LazyPricingPage = dynamic(() => import("@/app/(landing)/pricing/page"), {
  loading: () =>
    React.createElement(
      "div",
      {
        className: "min-h-screen flex items-center justify-center",
      },
      React.createElement("div", {
        className: "animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900",
      })
    ),
});

export const LazyServicesPage = dynamic(() => import("@/app/(landing)/services/page"), {
  loading: () =>
    React.createElement(
      "div",
      {
        className: "min-h-screen flex items-center justify-center",
      },
      React.createElement("div", {
        className: "animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900",
      })
    ),
});

// Utility function for conditional dynamic imports
export function createLazyComponent<T = {}>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  fallback?: ComponentType
) {
  return dynamic(importFn, {
    loading: fallback ? () => React.createElement(fallback) : undefined,
    ssr: false,
  });
}
