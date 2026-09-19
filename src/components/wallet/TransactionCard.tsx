import { currencyFormatter } from '@/utils/format'
import { useSelector } from 'react-redux'
import type { UserType } from '@/utils/types'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

interface TransactionCardProp {
  status: string
  name: string
  service: string
  amount: number
}

export default function TransactionCard({
  status,
  name,
  service,
  amount,
}: TransactionCardProp) {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const customerTextByStatus: Record<string, string> = {
    sent: 'payment sent to',
    received: 'payment received from',
    pending: 'payment pending to',
    canceled: 'payment to',
  }
  const serviceProviderTextByStatus: Record<string, string> = {
    sent: 'payment sent to',
    received: 'payment received from',
    pending: 'pending payment from',
    canceled: 'payment to',
  }
  const textByStatus =
    userType === 'customer' ? customerTextByStatus : serviceProviderTextByStatus
  const navigate = useNavigate()
  const handleApprove = () => {
    navigate('/customer/wallet/approve', {
      state: { name, amount },
    })
  }
  return (
    <div className="bg-white shadow-sm rounded-md p-2 flex items-center justify-between gap-6 max-w-5xl mx-auto w-full">
      <div className="capitalize space-y-0.5">
        <p className="text-sm md:text-base">
          {textByStatus[status]} {name}{' '}
          {status === 'canceled' && 'canceled'}{' '}
        </p>
        <p className="text-xs md:text-sm">{service}</p>
      </div>
      <div className="flex flex-col gap-1  items-center justify-between">
        <span className="block text-base md:text-lg font-medium">
          {currencyFormatter(amount)}
        </span>

        {status === 'pending' && userType == 'customer' && (
          <Button onClick={handleApprove} size="sm">
            Approve
          </Button>
        )}
      </div>
    </div>
  )
}
