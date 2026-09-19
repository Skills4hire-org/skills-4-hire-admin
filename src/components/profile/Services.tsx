import { Link } from 'react-router-dom'
import Container from '../global/Container'
import EmptyTab from '../service-provider/EmptyTab'
import ServiceProviderServicesCard from '../service-provider/ServiceProviderServicesCard'
import ServicesDialog from './ServicesDialog'
import { ArrowRight } from 'lucide-react'
import type { Service } from '@/types/user.types'

interface ServicesProp {
  services: Service[] | undefined
}

export default function Services({
  services,
  profession,
}: ServicesProp & { profession?: string }) {
  const formatProfession = profession
    ?.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase()
  return (
    <div className={`relative ${services?.length !== 0 && 'pb-14'}`}>
      <Container className=" pt-2 pb-4 md:py-4">
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-lg md:text-xl ">Services</h2>
          </div>
          <>
            {services?.length === 0 ? (
              <EmptyTab label="service added" />
            ) : (
              <ul className="grid grid-cols-1 gap-4">
                {services?.map((service) => (
                  <ServiceProviderServicesCard
                    check={false}
                    key={service.service_id}
                    {...service}
                    isDeleteable={true}
                  />
                ))}
              </ul>
            )}
          </>

          <div className="w-max mx-auto">
            <ServicesDialog
              text={
                services?.length == 0 ? 'Add a service' : 'Add more services'
              }
            />
          </div>
        </div>
        {services?.length !== 0 && (
          <Link
            to={`${formatProfession}/services`}
            className="border-t border-b-8 py-2  text-base md:text-lg mt-2 font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2 hover:bg-gray-300"
          >
            Show all services
            <ArrowRight strokeWidth={3} className="w-4 h-4" />
          </Link>
        )}
      </Container>
    </div>
  )
}
