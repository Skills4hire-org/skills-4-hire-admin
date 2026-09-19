import { Star } from 'lucide-react'
import { Badge } from '../ui/badge'
import { currencyFormatter } from '@/utils/format'
import { Link } from 'react-router-dom'
import type { Profile } from '@/types/user.types'

export default function ServiceProviderBookingCard({
  provider_id,
  user,
  professional_title,
  headline,
  min_charge,
  avg_rating,
  total_reviews,
}: Profile) {
  return (
    <div className="rounded-r-md flex bg-white shadow-md">
      <Link to={`/customer/professionals/${provider_id}`}>
        <figure className="rounded-tr-4xl h-full ">
          <img
            src={user?.profile?.avatar?.avatar}
            alt={professional_title}
            className="max-w-24 md:max-w-42 h-full object-cover rounded-tr-4xl"
            loading="lazy"
          />
        </figure>
      </Link>
      <div className="flex flex-1 flex-row gap-2 items-center justify-between p-2 md:p-4">
        <div className="space-y-1 md:gap-2">
          <div className="flex items-center gap-1 md:gap-2">
            <h3 className="font-semibold text-sm md:text-lg">
              {user?.profile?.display_name}
            </h3>
            {
              /* online && ( */
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-600" />
              /* ) */
            }
          </div>
          <Badge className="capitalize rounded-full font-normal py-0 px-2 md:py-1 md:px-4 text-xs md:text-sm">
            {professional_title}
          </Badge>

          <p className="font-medium text-xs md:text-sm line-clamp-2">
            {headline}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-2 items-center h-full">
          <div className="flex items-center gap-1 font-medium sm:mt-1">
            <div className="flex items-center gap-0.5">
              <Star className="w-4 md:w-6 md:h-6 h-4 fill-yellow-600 text-yellow-600" />
              <span className="text-xs md:text-sm">{avg_rating}</span>
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              ({total_reviews})
            </span>
          </div>
          <div className="capitalize text-xs md:text-sm text-muted-foreground">
            from
            <span className="font-medium text-foreground ml-1">
              {currencyFormatter(Number(min_charge))}
            </span>
          </div>
          <div />
        </div>
      </div>
    </div>
  )
}
