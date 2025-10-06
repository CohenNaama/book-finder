/**
 * React Query client configuration.
 *
 * Initializes and exports a shared QueryClient instance with default
 * caching, retry, and refetch behavior for the entire app.
 *
 * Used throughout the app to manage asynchronous data and caching.
 */

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    }
  }
});
