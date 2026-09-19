import type { Service } from '@/types/services.types'
import { Link } from 'react-router-dom'

export default function ServicesCard({ name, attachments }: Service) {
  const formatServiceName = name.replaceAll(' ', '-')
  return (
    <Link to={`/customer/services/available-services/${formatServiceName}`}>
      <figure className="relative rounded-xl">
        <img
          src={attachments[0]?.image_url}
          alt={name}
          className="rounded-xl object-cover aspect-square w-full"
          loading="lazy"
        />
        <figcaption>
          <span className="text-white capitalize text-[10px] sm:text-xs absolute bottom-4 font-medium left-1/2 -translate-x-1/2 py-1 px-2 bg-black/30 w-full text-center">
            {name}
          </span>
        </figcaption>
      </figure>
    </Link>
  )
}
