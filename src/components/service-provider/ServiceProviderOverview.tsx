import Container from '../global/Container'
import { currencyFormatter } from '@/utils/format'
import { FileText, MapPin, Minus, Star } from 'lucide-react'
import defaultImage from '../../assets/images/profile.jpg'
import HeaderWithBackNavigation from '../header/HeaderWithBackNavigation'
import { Link } from 'react-router-dom'
import EndorseDialog from '../endorse/EndorseDialog'
import type { Profile } from '@/types/user.types'

export default function ServiceProviderOverview({
  profile,
}: {
  profile: Profile | undefined
}) {
  return (
    <div>
      <HeaderWithBackNavigation title="Profile" />
      <div
        className={` w-full bg-cover bg-center h-[20vh] md:h-[25vh] -mt-2 md:-mt-6`}
        style={{
          backgroundImage: `url(${profile?.user?.profile?.cover_photo?.image_url})`,
        }}
      />
      <Container className="border-b-8 relative">
        <figure className=" -mt-13 md:-mt-18.5  mb-1 md:mb-2 w-max rounded-full border-4 border-background">
          <img
            src={profile?.user?.profile?.avatar?.avatar ?? defaultImage}
            alt={profile?.user?.profile?.display_name}
            className="aspect-square object-cover w-24 md:w-34 rounded-full"
          />
        </figure>

        <EndorseDialog
          provider_pk={profile?.user?.user_id}
          name={profile?.user?.profile?.display_name}
        />

        <div className=" pb-3 md:pb-4 text-start">
          <div className="space-y-0.5">
            <div className="flex items-center gap-4 ">
              <h1 className="font-semibold text-lg md:text-xl">
                {profile?.user?.profile?.display_name}
              </h1>
              <span className="text-base md:text-lg capitalize text-primary font-medium block">
                {profile?.professional_title}
              </span>
            </div>
            <p className=" text-base md:text-lg">{profile?.headline}</p>
            <Link
              to="endorsers"
              className="text-primary font-semibold text-sm md:text-base -mt-0.5 block capitalize"
            >
              {profile?.endorsement_count} endoser
              {profile && profile?.endorsement_count > 1 && 's'}
            </Link>
            <p className="flex items-center justify-start gap-1  text-sm md:text-base ">
              From
              <span className="flex items-center gap-0.5">
                <span>{currencyFormatter(Number(profile?.min_charge))}</span>
                <Minus className="w-4 h-4" />
                <span>{currencyFormatter(Number(profile?.min_charge))}</span>
              </span>
            </p>
            <p className="flex items-center gap-2 text-sm md:text-base  ">
              <MapPin className="w-4 h-4" />
              <span>
                {profile?.user?.profile?.location},{' '}
                {profile?.user?.profile?.city}, {profile?.user?.profile?.state}
                {profile?.user?.profile?.country}
              </span>
            </p>
            {!profile?.avg_rating || !profile?.completed_bookings || (
              <div className="text-xs md:text-sm flex items-center justify-start gap-4 mt-1">
                {!profile?.avg_rating || (
                  <span className="flex items-center text-xs gap-1">
                    <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 text-yellow-500" />
                    {profile?.avg_rating} ({profile?.total_reviews}{' '}
                    {profile && profile?.total_reviews > 1
                      ? 'comments'
                      : 'comment'}
                    )
                  </span>
                )}

                {!profile?.completed_bookings || (
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4 md:w-5 md:h-5" />{' '}
                    {profile?.completed_bookings}{' '}
                    {profile?.completed_bookings &&
                    profile?.completed_bookings > 1
                      ? 'tasks'
                      : 'task'}
                    {}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
