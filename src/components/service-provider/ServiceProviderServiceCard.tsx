import type { Provider } from '@/types/user.types'
import { currencyFormatter } from '@/utils/format'
import { MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProfileImage from '../global/ProfileImage'
import AddToFavoriteButton from '../buttons/AddToFavoriteButton'

export default function ServiceProviderServiceCard({
  skills,
  profile,
  min_charge,
  provider_id,
  avg_rating,
  headline,
  providerIDs,
  favouriteID,
}: Provider) {
  const isFavourite = providerIDs?.includes(provider_id)
  return (
    <div className="relative">
      <div className="relative w-full overflow-visible rounded-2xl">
        <img
          src={skills[0].skill.image}
          alt={profile.display_name}
          className="w-[99%] md:w-[98.5%] mx-auto rounded-2xl object-cover h-40 sm:h-60 md:h-72 lg:h-80"
        />
        <span className="absolute top-3 right-7 bg-white/90 p-2 rounded-full shadow-sm z-30">
          <AddToFavoriteButton
            id={provider_id}
            isFavourite={isFavourite}
            name={profile?.display_name}
            favouriteID={favouriteID}
          />
        </span>

        <span className="absolute -bottom-4 sm:-bottom-5 md:-bottom-6 right-6 bg-primary text-white text-xs sm:text-sm font-semibold px-3 py-2 sm:px-4 sm:py-3.5 rounded-full shadow-lg z-30 ">
          From {currencyFormatter(min_charge)}
        </span>
      </div>

      <div className="mt-5 flex flex-col md:flex-row items-start md:items-center md:justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-3">
          <Link to={`/customer/professionals/${provider_id}`}>
            <ProfileImage
              avatar={profile.avatar.avatar}
              is_active={profile.avatar.is_active}
            />
          </Link>

          <div>
            <Link
              to={`/customer/professionals/${provider_id}`}
              className="no-underline hover:no-underline"
            >
              <p className="text-sm sm:text-base font-medium text-gray-800 flex items-center gap-2">
                {profile.display_name}
              </p>
            </Link>

            <div className="flex items-center mt-0.5 gap-2">
              <div className="flex items-center">
                {[...Array(avg_rating)].map((_, index) => (
                  <Star
                    key={index}
                    className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <span className="flex items-center gap-1 text-xs text-green-600">
                <MapPin className="w-3.5 h-3.5" />
                {profile.city}, {profile.state}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 md:text-right mt-1">
          <p className="text-xs sm:text-sm text-gray-600">{headline}</p>
        </div>
      </div>
    </div>
  )
}
