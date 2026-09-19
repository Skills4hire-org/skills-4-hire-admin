import { Bell, MessageSquareMore } from 'lucide-react'
import RecentNotification from '../global/RecentNotification'
import ProfileImage from '../global/ProfileImage'
import SearchBar from '../global/SearchBar'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import type { Profile } from '@/types/user.types'
import { useMyProfile } from '@/hooks/useUsers'

export default function DesktopHomeHeader() {
  const { data } = useMyProfile()

  const user: Profile | undefined = data
  const avatar = user?.user?.profile?.avatar?.avatar
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )

  const is_active = navigator.onLine
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchQuery = () => {
    navigate(`/${userType}/search?query=${searchQuery}`)
  }
  const searchPlaceholder =
    userType == 'customer' ? 'Search for plumbers, electricians...' : 'Search'

  return (
    <header className="hidden md:block py-4">
      <div className="flex items-center justify-between gap-8">
        <div className="flex-1 items-center max-w-4xl rounded-lg">
          <SearchBar
            placeholder={searchPlaceholder}
            maxWidth="max-w-md"
            value={searchQuery}
            onSubmit={handleSearchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="flex items-center gap-4">
          <Link to={`/${userType}/notification`}>
            <RecentNotification icon={Bell} newAlert />
          </Link>
          <RecentNotification icon={MessageSquareMore} newAlert />

          <Link to={`/${userType}/profile`} className="flex items-center gap-2">
            <ProfileImage
              size="size-10"
              is_active={is_active}
              avatar={avatar}
            />
            <h1 className="text-sm font-semibold capitalize">
              {user?.user?.first_name} {user?.user?.last_name}
            </h1>
          </Link>
        </div>
      </div>
    </header>
  )
}
