import type { UserData } from '@/types/user.types'
import { useSelector } from 'react-redux'

export default function DesktopServicesOverviewHeader() {
  const { user_data }: { user_data: UserData } = useSelector(
    (state: any) => state.userState,
  )
  return (
    <header className="hidden md:block text-center py-4">
      <h1 className="text-2xl font-semibold">
        Hi, {user_data?.first_name}
        <span className="text-primary">{user_data?.last_name}</span>
      </h1>
      <p className="text-base">Welcome back!</p>
    </header>
  )
}
