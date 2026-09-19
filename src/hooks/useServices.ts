import { getAllServices } from '@/api/services'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useAllServices = ({ category }: { category?: string }) => {
  const queryData = useInfiniteQuery({
    queryKey: ['services', category],
    queryFn: ({ pageParam }) => getAllServices({ pageParam, category }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}
