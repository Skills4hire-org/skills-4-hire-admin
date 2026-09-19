import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry unauthorized errors
        if (error?.response?.status === 401) return false

        // Retry other errors up to 2 times
        return failureCount < 2
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 401) return false
        return failureCount < 1
      },
    },
  },
})
