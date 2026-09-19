import Container from '../global/Container'
import ProfileImage from '../global/ProfileImage'
import SectionHeading from './SectionHeading'
import { Badge } from '../ui/badge'
import PaymentForm from '../form/PaymentForm'
import type { Profile } from '@/types/user.types'

export default function BookingPayment({
  serviceProvider,
}: {
  serviceProvider: Profile | undefined
}) {
  return (
    <>
      <SectionHeading title="Payment" />
      <Container className="">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-3">
            <ProfileImage noStatus />
            <div className="flex flex-col items-center justify-center gap-0.5">
              <h3 className="text-sm">
                {serviceProvider?.user?.profile?.customer_id}
              </h3>
              <Badge className="capitalize bg-gray-300 text-foreground px-2 pb-1 ">
                {serviceProvider?.professional_title}
              </Badge>
            </div>
          </div>
          <PaymentForm serviceProvider={serviceProvider} />
        </div>
      </Container>
    </>
  )
}
