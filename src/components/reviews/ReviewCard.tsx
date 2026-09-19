import { dateFormatter } from '@/utils/format'
import ProfileImage from '../global/ProfileImage'
import Ratings from '../global/Ratings'
import type { Review } from '@/types/reviews.types'
import type { UserType } from '@/types/user.types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function ReviewCard({
  reviewed_by,
  review,
  created_at,
  provider_profile,
}: Review) {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const name =
    userType == 'customer'
      ? provider_profile?.profile?.display_name
      : reviewed_by?.profile?.display_name
  const role =
    userType == 'customer' ? provider_profile?.professional_title : undefined
  const avatar =
    userType == 'customer'
      ? provider_profile?.profile?.avatar?.avatar
      : reviewed_by?.profile?.avatar?.avatar
  return (
    <div className="bg-white rounded-md px-2 py-4 shadow ">
      <div className="flex items-center gap-2">
        {userType == 'customer' ? (
          <Link to={`/customer/professionals/${provider_profile?.provider_id}`}>
            <ProfileImage noStatus avatar={avatar} />
          </Link>
        ) : (
          <ProfileImage noStatus avatar={avatar} />
        )}

        <div className="flex flex-1 justify-between gap-6 items-center">
          <div>
            {userType == 'customer' ? (
              <Link
                to={`/customer/professionals/${provider_profile?.provider_id}`}
              >
                <h4 className="font-medium text-sm">{name}</h4>
              </Link>
            ) : (
              <h4 className="font-medium text-sm">{name}</h4>
            )}

            {role && (
              <span className="inline-block text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full mt-0.5">
                {role}
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-xs text-gray-500">{dateFormatter(created_at)}</p>
            <Ratings rating={3} />
          </div>
        </div>
      </div>
      <p className="text-sm mt-2 text-gray-600 break-all">{review}</p>
    </div>
  )
}
