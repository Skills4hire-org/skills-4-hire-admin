import { getBookings } from '@/api/bookings'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useBookings = ({ booking_status }: { booking_status: string }) => {
  const queryData = useInfiniteQuery({
    queryKey: ['bookings', booking_status],
    queryFn: ({ pageParam }) => getBookings({ pageParam, booking_status }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}
