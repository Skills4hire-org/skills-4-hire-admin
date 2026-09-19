import { dateFormatter, timeFormatter } from '@/utils/format'
import ProfileImage from '../global/ProfileImage'
import Ratings from '../global/Ratings'
import { Link } from 'react-router-dom'
import type { Booking } from '@/types/bookings.type'

export default function CustomerBookingCard({
  provider,
  descriptions,
  created_at,
}: Booking) {
  return (
    <div className="space-y-2 md:space-y-4 max-w-xl mx-auto ">
      <div className="flex items-center justify-between gap-8 border-y px-2">
        <div className="flex flex-col gap-1">
          <h3 className="capitalize font-medium ">
            {provider?.professional_title}
          </h3>
          <div className="text-muted-foreground text-base">
            Date:{' '}
            <span className="text-foreground text-sm">
              {dateFormatter(created_at)}
            </span>
          </div>
          <div className="text-muted-foreground text-base">
            Time:{' '}
            <span className="text-foreground text-sm">
              {timeFormatter(created_at)}
            </span>
          </div>
        </div>
        <Link to={`/customer/professionals/${provider?.provider_id}`}>
          <figure className="w-24 h-24 md:w-30 md:h-30">
            <img
              src={provider?.profile?.avatar?.avatar}
              alt={provider?.profile?.display_name}
              className="aspect-square object-cover h-full w-full"
              loading="lazy"
            />
          </figure>
        </Link>
      </div>
      <div>
        <h3 className="font-medium text-sm md:text-base">
          Booking Description
        </h3>
        <p className="text-xs text-muted-foreground">{descriptions}</p>
      </div>
      <div>
        <h3 className="font-medium text-sm md:text-base mb-1">
          About Service provider
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <Link to={`/customer/professionals/${provider?.provider_id}`}>
            <ProfileImage noStatus avatar={provider?.profile?.avatar?.avatar} />
          </Link>

          <div className="flex flex-col gap-1.5">
            <Link to={`/customer/professionals/${provider?.provider_id}`}>
              <h4 className="text-xs">{provider?.profile?.display_name}</h4>
            </Link>

            <Ratings rating={provider?.avg_rating} />
          </div>
        </div>
      </div>
    </div>
  )
}
