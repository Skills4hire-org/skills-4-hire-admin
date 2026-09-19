import Container from '@/components/global/Container'
import MobileWithAvatarAndDesktopHeader from '@/components/header/MobileWithAvatarAndDesktopHeader'
import BookingAddress from '@/components/service-provider-booking/BookingAddress'
import BookingDateTime from '@/components/service-provider-booking/BookingDateTime'
import BookingPayment from '@/components/service-provider-booking/BookingPayment'
import ServiceProviderBookingProgressIndicator from '@/components/service-provider-booking/ServiceProviderBookingProgressIndicator'
import type { Profile } from '@/types/user.types'
import { useSelector } from 'react-redux'

export default function ServiceProviderBooking() {
  const serviceProvider = undefined
  const { step }: { step: number } = useSelector(
    (state: any) => state.bookingState,
  )

  const bookingComponents: Record<
    number,
    React.ComponentType<{ serviceProvider: Profile | undefined }>
  > = {
    1: BookingDateTime,
    2: BookingAddress,
    3: BookingPayment,
  }
  const Component = bookingComponents[step]

  return (
    <div>
      <Container className="bg-white">
        <MobileWithAvatarAndDesktopHeader title="Booking" />
      </Container>
      <div className="md:max-w-lg lg:max-w-2xl mx-auto relative">
        <div className="pt-2 md:pt-6">
          <ServiceProviderBookingProgressIndicator />
        </div>

        <div className="pt-10 md:pt-14 space-y-4 md:space-y-6">
          <Component serviceProvider={serviceProvider} />
        </div>
      </div>
    </div>
  )
}
