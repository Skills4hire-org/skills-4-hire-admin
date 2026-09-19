import { dateFormatter, timeFormatter } from '@/utils/format'
import ProfileImage from '../global/ProfileImage'
import type { Booking } from '@/types/bookings.type'

export default function ServiceProviderBookingCard({
  customer,
  provider,
  created_at,
  descriptions,
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
        <figure>
          <img
            src={provider?.profile?.avatar?.avatar}
            alt={provider?.profile?.display_name}
            className="aspect-square object-cover h-full max-w-24 md:max-w-42"
            loading="lazy"
          />
        </figure>
      </div>
      <div>
        <h3 className="font-medium text-sm md:text-base">
          Booking Description
        </h3>
        <p className="text-xs text-muted-foreground">{descriptions}</p>
      </div>
      <div>
        <h3 className="font-medium text-sm md:text-base mb-1">
          About Customer
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <ProfileImage noStatus avatar={customer?.profile?.avatar?.avatar} />
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs">{customer?.profile?.display_name}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
