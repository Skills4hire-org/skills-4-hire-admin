import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { UserType } from '@/types/user.types'

export default function OnboardingGuard({ children }: any) {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )

  if (!userType) {
    return <Navigate to="/onboarding" replace />
  }
  return children
}
