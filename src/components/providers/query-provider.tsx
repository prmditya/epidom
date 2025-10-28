"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

/**
 * Query Provider
 *
 * Provides TanStack Query (React Query) context for data fetching,
 * caching, and state management.
 *
 * Features:
 * - Automatic caching and background refetching
 * - Request deduplication
 * - Optimistic updates
 * - DevTools for debugging (development only)
 */

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Create QueryClient inside component to ensure it's only created once
  // and maintains state across renders
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Time before data is considered stale
            staleTime: 60 * 1000, // 1 minute

            // Time before inactive queries are garbage collected
            gcTime: 5 * 60 * 1000, // 5 minutes (renamed from cacheTime)

            // Retry failed requests
            retry: 1,

            // Refetch on window focus (useful for keeping data fresh)
            refetchOnWindowFocus: false,

            // Refetch on reconnect
            refetchOnReconnect: true,
          },
          mutations: {
            // Retry failed mutations once
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show DevTools in development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
