import type { Profile } from '@/types/user.types'
import Container from '../global/Container'
import { AlertCircle, FileText, MapPin, Minus, Star } from 'lucide-react'
import { currencyFormatter } from '@/utils/format'
import OverviewDialog from './OverviewDialog'
import ProfileImageDialog from './ProfileImageDialog'

export default function Overview({
  professional,
}: {
  professional: Profile | undefined
}) {
  return (
    <Container className="border-b-8 relative">
      <div className="relative">
        <ProfileImageDialog professional={professional} />
        <OverviewDialog professional={professional} />
      </div>

      <div className=" pb-3 md:pb-4 text-start">
        <div className="space-y-0.5">
          <div className="flex items-center gap-4 ">
            <div className="flex items-center gap-4">
              <h1 className="font-semibold text-lg md:text-xl">
                {professional?.user?.profile?.display_name}
              </h1>
              <span className="text-base md:text-lg capitalize text-primary font-medium block">
                {professional?.professional_title
                  .replace(/([A-Z])/g, ' $1')
                  .trim()}
              </span>
            </div>
          </div>
          <p className=" text-base md:text-lg">{professional?.headline}</p>
          <span className="text-primary font-semibold text-sm md:text-base -mt-0.5 block capitalize">
            {professional?.endorsement_count} endoser
            {professional && professional?.endorsement_count > 1 && 's'}
          </span>
          {professional?.max_charge == '0.00' ? (
            <p className="text-sm md:text-base text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
              No charge range set yet
            </p>
          ) : (
            <p className="flex items-center justify-start gap-1  text-sm md:text-base ">
              From
              <span className="flex items-center gap-0.5">
                <span>
                  {currencyFormatter(Number(professional?.min_charge))}
                </span>
                <Minus className="w-4 h-4" />
                <span>
                  {currencyFormatter(Number(professional?.max_charge))}
                </span>{' '}
              </span>
            </p>
          )}

          <p className="flex items-center gap-2 text-sm md:text-base  ">
            <MapPin className="w-4 h-4" />
            {professional?.user?.profile?.location},{' '}
            {professional?.user?.profile?.city},{' '}
            {professional?.user?.profile?.state}
            {professional?.user?.profile?.country}
          </p>
          <div className="text-xs md:text-sm flex items-center justify-start gap-4 mt-1 ">
            <span className="flex items-center text-xs gap-1">
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 text-yellow-500" />
              {professional?.avg_rating} ({professional?.total_reviews}{' '}
              {professional?.total_reviews && professional?.total_reviews > 1
                ? 'comments'
                : 'comment'}
              )
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4 md:w-5 md:h-5" />{' '}
              {professional?.completed_bookings}{' '}
              {professional?.completed_bookings &&
              professional?.completed_bookings > 1
                ? 'tasks'
                : 'task'}
            </span>
          </div>
        </div>
      </div>
    </Container>
  )
}
