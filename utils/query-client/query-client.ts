import { QueryClient } from "@tanstack/react-query";

const DEFAULT_STALE_TIME = 5 * 60 * 1000;
const DEFAULT_RETRY_COUNT = 3;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      staleTime: DEFAULT_STALE_TIME,
    },
    mutations: {
      throwOnError: true,
      retry: 1,
    },
  },
});
