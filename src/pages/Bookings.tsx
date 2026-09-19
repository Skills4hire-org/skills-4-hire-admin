import { bookingsTabsList } from '@/assets/data'
import Container from '@/components/global/Container'
import MobileBookingsHeader from '@/components/header/MobileBookingsHeader'
import { Tabs } from '@/components/ui/tabs'
import TabHead from '@/components/global/TabHead'
import TitleOnlyDesktopHeader from '@/components/header/TitleOnlyDesktopHeader'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import CustomerBookingsTabContent from '@/components/bookings/CustomerBookingsTabContent'
import ServiceProviderBookingsTabContent from '@/components/bookings/ServiceProviderBookingsTabContent'
import { useState } from 'react'
import { useBookings } from '@/hooks/useBookings'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export default function Bookings() {
  const [bookingStatus, setBookingStatus] = useState('In_progress')
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useBookings({ booking_status: bookingStatus })
  const bookings = data?.pages.flatMap((page) => page.results) ?? []

  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const BookingsTabContent =
    userType == 'customer'
      ? CustomerBookingsTabContent
      : ServiceProviderBookingsTabContent

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })
  const handleBookingsFetchingError = async () => {
    if (!data) {
      refetch()
    } else {
      fetchNextPage()
    }
  }

  return (
    <div className="space-y-2 md:space-y-6">
      <Container className="bg-white">
        <MobileBookingsHeader />
        <TitleOnlyDesktopHeader title="Bookings" />
      </Container>
      <Container>
        <Tabs defaultValue="In_progress" className="w-full">
          <TabHead tabList={bookingsTabsList} setStatus={setBookingStatus} />
          {isLoading ? (
            <div className="h-24">
              <Loading />
            </div>
          ) : (
            <>
              {isError && !data ? (
                <div className="py-6">
                  <Error
                    text={`Failed to load ${bookingStatus == 'In_progress' ? 'ongoing' : bookingStatus}  bookings`}
                    buttonFunc={handleBookingsFetchingError}
                    buttonText="Retry"
                  />
                </div>
              ) : (
                <>
                  <BookingsTabContent bookings={bookings} />
                  <div ref={loadMoreRef} />

                  {isFetchingNextPage && (
                    <div className="py-4 text-center">
                      <Loading />
                    </div>
                  )}
                  {hasNextPage && (
                    <button
                      className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
                      onClick={() => fetchNextPage()}
                    >
                      Load more
                    </button>
                  )}
                  {isFetchNextPageError && (
                    <Error
                      text="Failed to load more reviews"
                      buttonFunc={fetchNextPage}
                      buttonText="Retry"
                    />
                  )}
                </>
              )}
            </>
          )}
        </Tabs>
      </Container>
    </div>
  )
}
