import Container from '../global/Container'
import SectionHeading from './SectionHeading'
import ServiceProviderBookingCard from '../service-provider/ServiceProviderBookingCard'
import { useSelector } from 'react-redux'
import ServiceProviderServicesCard from '../service-provider/ServiceProviderServicesCard'
import { Plus, X } from 'lucide-react'
import BookingDateTimeForm from '../form/BookingDateTimeForm'
import { useState } from 'react'
import type { Profile, Service } from '@/types/user.types'

export default function BookingDateTime({
  serviceProvider,
}: {
  serviceProvider: Profile | undefined
}) {
  const [showAllServices, setShowAllServices] = useState(false)
  const { services }: { services: Service[] } = useSelector(
    (state: any) => state.bookingState,
  )
  const servicesIds = services.map((service) => service.service_id)

  return (
    <>
      <SectionHeading title="Items selected" />
      <Container>
        {serviceProvider && (
          <div className="grid grid-cols-1 mb-4">
            <ServiceProviderBookingCard {...serviceProvider} />
          </div>
        )}

        {services && (
          <div className={`space-y-4 ${services.length !== 0 && 'mb-4'}`}>
            {services.map((service) => (
              <ServiceProviderServicesCard
                key={service.service_id}
                {...service}
              />
            ))}
          </div>
        )}
        {showAllServices && (
          <div className={`space-y-4 ${!serviceProvider && 'mb-4'}`}>
            {!serviceProvider?.services ||
              serviceProvider?.services
                .filter((service) => !servicesIds.includes(service.service_id))
                ?.map((service) => (
                  <ServiceProviderServicesCard
                    key={service.service_id}
                    {...service}
                  />
                ))}
          </div>
        )}

        <div className="text-center">
          {showAllServices ? (
            <button
              className="rounded-full text-center bg-destructive text-white md:py-0.5 px-3.5"
              onClick={() => setShowAllServices(false)}
            >
              <X strokeWidth={3} className="w-5 h-5 md:w-6 md:h-6" />
              <span className="sr-only">hide services</span>
            </button>
          ) : (
            <button
              className="rounded-full text-center bg-primary text-white md:py-0.5 px-3.5 "
              onClick={() => setShowAllServices(true)}
            >
              <Plus strokeWidth={3} className="w-5 h-5 md:w-6 md:h-6" />
              <span className="sr-only">show all services</span>
            </button>
          )}
        </div>
      </Container>
      <SectionHeading title="Details" />
      <Container>
        <BookingDateTimeForm />
      </Container>
    </>
  )
}
