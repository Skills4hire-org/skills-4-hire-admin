import { getReviews } from '@/api/reviews'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useReviews = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['reviews'],
    queryFn: ({ pageParam }) => getReviews(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}
