import { Bell } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import ProfileImage from '../global/ProfileImage'
import RecentNotification from '../global/RecentNotification'
import SearchBar from '../global/SearchBar'
import Logo from '../global/Logo2'
import { Link, useNavigate } from 'react-router-dom'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useMyProfile } from '@/hooks/useUsers'
import type { Profile } from '@/types/user.types'

export default function MobileHomeHeader() {
  const { data } = useMyProfile()
  const user: Profile | undefined = data
  const avatar = user?.user?.profile?.avatar?.avatar
  const {
    userType,
  }: {
    userType: UserType
  } = useSelector((state: any) => state.userState)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchQuery = () => {
    navigate(`/${userType}/search?query=${searchQuery}`)
  }

  const searchPlaceholder =
    userType == 'customer' ? 'Search for plumbers, electricians...' : 'Search'
  const is_active = navigator.onLine
  return (
    <header className="md:hidden w-full pb-2">
      <div className="flex items-center justify-between pt-3 pb-4">
        <Logo size="h-[30px] w-auto" />
        <div className="flex items-center justify-center">
          {userType === 'customer' ? (
            <SidebarTrigger className="mr-1.5">
              <div>
                <ProfileImage
                  size="size-10"
                  is_active={is_active}
                  avatar={avatar}
                />
              </div>
            </SidebarTrigger>
          ) : (
            <Link to="/professional/profile">
              <div className="-my-2">
                <ProfileImage
                  size="size-10"
                  is_active={is_active}
                  avatar={avatar}
                />
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 sm:gap-16">
        <div className="flex-1">
          <SearchBar
            placeholder={searchPlaceholder}
            maxWidth="w-full"
            value={searchQuery}
            onSubmit={handleSearchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <Link to="/customer/notification">
          <RecentNotification icon={Bell} newAlert />
        </Link>
      </div>
    </header>
  )
}
