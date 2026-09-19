import { currencyFormatter } from '@/utils/format'
import { ChevronRight, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import WalletActions from './WalletActions'
import { useWallet } from '@/hooks/useWallet'
import type { WallerBalance } from '@/types/wallet.types'
import { Skeleton } from '../ui/skeleton'

export default function WalletBalance() {
  const { data, isLoading, isError } = useWallet()
  const wallet: WallerBalance = data

  return (
    <div className="text-white  bg-primary rounded-md md:rounded-lg py-4 md:py-6 md:px-4 px-2 space-y-6">
      <div className="  flex items-start justify-between">
        <div>
          <div className="text-base md:text-lg">
            <span className="text-white/80 block">Available Balance</span>
            <div className="block font-medium h-6 md:h-7">
              {isLoading ? (
                <Skeleton className="w-16 h-6 md:h-7 rounded-sm" />
              ) : isError ? (
                '---'
              ) : (
                currencyFormatter(Number(wallet?.available_balance))
              )}
            </div>
          </div>

          <div className="text-xs md:text-sm flex items-center gap-0.5 mt-1 text-white/80">
            <Lock className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="flex gap-1 items-center">
              <span>Locked:</span>

              <span>
                {isLoading ? (
                  <Skeleton className="w-10 h-3 md:h-4 rounded-sm" />
                ) : isError ? (
                  '---'
                ) : (
                  currencyFormatter(Number(wallet?.overall_locked_balance))
                )}
              </span>
            </span>
          </div>
        </div>

        <Link
          to="transaction-history"
          className="text-xs md:text-sm hover:text-white py-1 flex items-center gap-0.5 text-white/80"
        >
          Transaction History
          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5" />
        </Link>
      </div>
      <WalletActions />
    </div>
  )
}
