import { Star } from 'lucide-react'
import { Badge } from '../ui/badge'
import { currencyFormatter } from '@/utils/format'
import { Link } from 'react-router-dom'
import AddToFavoriteButton from '../buttons/AddToFavoriteButton'
import type { Provider } from '@/types/user.types'

export default function ServiceProviderCard({
  provider_id,
  profile,
  professional_title,
  avg_rating,
  total_reviews,
  providerIDs,
  favouriteID,
  min_charge,
  headline,
}: Provider) {
  const isFavourite = providerIDs?.includes(provider_id)
  return (
    <div className="rounded-r-md flex bg-white shadow-md">
      <Link to={`/customer/professionals/${provider_id}`}>
        <figure className="rounded-tr-4xl h-full ">
          <img
            src={profile?.avatar?.avatar}
            alt={profile?.display_name}
            className="max-w-24 md:max-w-42 h-full object-cover rounded-tr-4xl"
            loading="lazy"
          />
        </figure>
      </Link>
      <div className="flex flex-1 flex-row gap-2 items-center justify-between p-2 md:p-4">
        <div className="space-y-1 md:gap-2">
          <div className="flex items-center gap-1 md:gap-2">
            <Link to={`/customer/professionals/${provider_id}`}>
              <h3 className="font-semibold text-sm md:text-lg">
                {profile?.display_name}
              </h3>
            </Link>

            {profile?.avatar?.is_active && (
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-600" />
            )}
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Badge className="capitalize rounded-full font-normal py-0 px-2 md:py-1 md:px-4 text-xs md:text-sm">
              {professional_title}
            </Badge>
          </div>
          <div className="space-y-1">
            <Link to={`/customer/professionals/${provider_id}`}>
              <p className="font-medium text-xs md:text-sm line-clamp-3">
                {headline}
              </p>
            </Link>
          </div>
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
          <AddToFavoriteButton
            id={provider_id}
            isFavourite={isFavourite}
            name={profile?.display_name}
            favouriteID={favouriteID}
          />
          <div className="capitalize text-xs md:text-sm text-muted-foreground">
            from
            <span className="font-medium text-foreground ml-1">
              {currencyFormatter(min_charge)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
