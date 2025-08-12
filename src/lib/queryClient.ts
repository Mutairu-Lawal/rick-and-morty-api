import { QueryClient } from '@tanstack/react-query';

// shared QueryClient instance (can be imported from server or client modules)
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      refetchOnWindowFocus: false,
    },
  },
});
