import type { UserType } from '@/utils/types'
import ProfileImage from '../global/ProfileImage'
import { SidebarTrigger } from '../ui/sidebar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function MobileBookingsHeader() {
  const {
    userType,
    avatar,
  }: {
    userType: UserType
    avatar: string
  } = useSelector((state: any) => state.userState)
  const is_active = navigator.onLine
  return (
    <header className="flex md:hidden justify-between gap-6 py-3">
      <h1 className="font-bold text-lg text-foreground">Bookings</h1>
      {userType == 'customer' ? (
        <SidebarTrigger size="lg">
          <ProfileImage size="size-10" avatar={avatar} />
        </SidebarTrigger>
      ) : (
        <Link className="block -my-2" to="/professional/profile">
          <ProfileImage size="size-10" is_active={is_active} avatar={avatar} />
        </Link>
      )}
    </header>
  )
}
