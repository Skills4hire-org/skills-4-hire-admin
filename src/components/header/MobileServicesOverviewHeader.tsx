import ProfileImage from '../global/ProfileImage'
import { Bell, Headphones } from 'lucide-react'
import RecentNotification from '../global/RecentNotification'
import { SidebarTrigger } from '../ui/sidebar'
import { Link } from 'react-router-dom'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import type { UserData } from '@/types/user.types'

export default function MobileServicesOverviewHeader() {
  const {
    userType,
    avatar,
    user_data,
  }: {
    userType: UserType
    user_data: UserData
    avatar: string
  } = useSelector((state: any) => state.userState)
  const is_active = navigator.onLine
  return (
    <header className="flex items-center md:hidden justify-between gap-2 py-1">
      <div className="flex items-center gap-2">
        {userType == 'customer' ? (
          <SidebarTrigger className="ml-1.5">
            <ProfileImage
              size="size-10"
              is_active={is_active}
              avatar={avatar}
            />
          </SidebarTrigger>
        ) : (
          <Link className="block -my-2" to="/professional/profile">
            <ProfileImage
              size="size-10"
              is_active={is_active}
              avatar={avatar}
            />
          </Link>
        )}
        <div>
          <h1 className="font-semibold">
            Hi, {user_data?.first_name}{' '}
            <span className="text-primary">{user_data?.last_name}</span>
          </h1>
          <p className="text-xs">{user_data?.profile.city}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/customer/support">
          <Headphones className="w-5 h-5" />
        </Link>
        <Link to="/customer/notification">
          <RecentNotification icon={Bell} />
        </Link>
      </div>
    </header>
  )
}
