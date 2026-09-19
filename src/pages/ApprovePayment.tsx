import TitleOnlyDesktopHeader from '@/components/header/TitleOnlyDesktopHeader'
import Container from '@/components/global/Container'
import { useLocation } from 'react-router-dom'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { useSelector } from 'react-redux'
import type { UserData } from '@/types/user.types'
import PendingPaymentForm from '@/components/form/PendingPaymentForm'

export default function ApprovePayment() {
  const { user_data }: { user_data: UserData | null } = useSelector(
    (state: any) => state.userState,
  )
  const location = useLocation()
  const data: { name: string; amount: number; provider_id: string } =
    location.state

  return (
    <div className="space-y-2 md:space-y-4">
      <Container className="bg-white">
        <div className="md:hidden">
          <HeaderWithBackNavigation title="Payment" />
        </div>
        <TitleOnlyDesktopHeader title="Payment" />
      </Container>
      <Container>
        <div className="w-full max-w-4xl mx-auto md:mx-0 space-y-4 md:space-y-6">
          <div className="space-y-1 pb-2 md:pb-4 border-b border-gray-300">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Pending
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed md:w-full">
              Payment for the service will remain pending until the service
              provider has successfully completed the agreed-upon task.
            </p>
          </div>
          <PendingPaymentForm
            from={user_data?.profile?.display_name}
            to={data?.name}
            amount={data?.amount}
            provider_id={data?.provider_id}
          />
        </div>
      </Container>
    </div>
  )
}
