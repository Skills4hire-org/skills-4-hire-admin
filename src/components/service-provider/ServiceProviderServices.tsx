import ServiceProviderServicesCard from './ServiceProviderServicesCard'
import EmptyTab from './EmptyTab'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Service } from '@/types/user.types'

export default function ServiceProviderServices({
  services,
  user_id,
  profession,
}: {
  services?: Service[]
  user_id?: string
  profession?: string
}) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg md:text-xl ">Services</h2>
      <ul className="">
        <div className="grid grid-cols-1 gap-4 pb-10 md:pb-12">
          {services?.map((service, index) => (
            <ServiceProviderServicesCard
              key={index}
              {...service}
              check={true}
              isDeleteable={false}
            />
          ))}
          <Link
            to={`/customer/professionals/${user_id}/${profession}/services`}
            className="border-t py-2  text-base md:text-lg mt-2 font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2 hover:bg-gray-300"
          >
            Show all services
            <ArrowRight strokeWidth={3} className="w-4 h-4" />
          </Link>
          {services?.length === 0 && <EmptyTab label="services added" />}
        </div>
      </ul>
    </div>
  )
}
