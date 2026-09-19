import { useState } from 'react'
import { Button } from '@/components/ui/button'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import Container from '@/components/global/Container'
import SearchBar from '@/components/global/SearchBar'
import { CopyIcon, Info, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { useReferrals, useWithdrawReferralBonus } from '@/hooks/useReferrals'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import type { ReferralDetails } from '@/types/referrals.types'
import { currencyFormatter } from '@/utils/format'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip'
import ShareButtons from '@/components/referrals/ShareButtons'
import ReferralCard from '@/components/referrals/ReferralCard'

export default function Referral() {
  const { data, isLoading, isError, refetch } = useReferrals()
  const referralsDetails: ReferralDetails = data?.details
  const [searchQuery, setSearchQuery] = useState('')
  const [search, setSearch] = useState('')
  const referralLink = referralsDetails?.referral_link

  const handleSearch = () => {
    setSearch(searchQuery)
  }
  const filteredReferrals = referralsDetails?.referrals?.filter((referral) =>
    referral.referred.profile.display_name.includes(search),
  )
  const handleCopy = (text: string, value: string) => {
    navigator.clipboard.writeText(value)
    toast.success(text)
  }
  const checkReferralStatus = referralsDetails?.referrals?.filter(
    (referral) => referral.status === 'converted',
  )

  const handleReferralsFetchingError = () => {
    refetch()
  }

  const { mutate: withdraw, isPending } = useWithdrawReferralBonus()

  const handleReferralEarning = () => {
    withdraw(
      { amount: referralsDetails?.balance },
      {
        onSuccess: () => {
          toast.success('Withdrawal successful')
        },
      },
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderWithBackNavigation title="Referrals" />
      <Container className="text-center max-w-lg mx-auto">
        {isLoading ? (
          <div className="h-24">
            <Loading />
          </div>
        ) : (
          <>
            {isError ? (
              <div className="h-24">
                <Error
                  text="An error occured"
                  buttonFunc={handleReferralsFetchingError}
                />
              </div>
            ) : (
              <>
                <p className="text-2xl font-semibold text-gray-900">
                  + {currencyFormatter(referralsDetails?.balance)}{' '}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {referralsDetails?.total_referrals} invitee,{' '}
                  {currencyFormatter(1000)} per invite
                </p>
                <div className="flex flex-col items-center gap-4">
                  <div>
                    <Button
                      className="bg-gray-400 text-black font-medium hover:bg-gray-500 px-5 py-1 rounded-lg"
                      disabled={checkReferralStatus?.length < 3 || isPending}
                      onClick={handleReferralEarning}
                    >
                      Withdraw
                    </Button>
                  </div>

                  <div className="w-full max-w-[90%] sm:max-w-sm mx-auto">
                    <div className="bg-gray-400 rounded-lg px-4 py-3 flex items-center justify-between">
                      <span className="font-semibold text-gray-900">
                        {referralsDetails?.code}
                      </span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() =>
                              handleCopy(
                                'Referral code copied',
                                referralsDetails?.code,
                              )
                            }
                            className="text-gray-900 font-semibold hover:text-gray-500 cursor-pointer"
                          >
                            <CopyIcon />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          align="center"
                          className="bg-black text-white text-xs px-2 py-1 rounded shadow-md"
                        >
                          Copy
                          <TooltipArrow className="fill-black" />
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="w-full max-w-[90%] sm:max-w-sm flex items-center justify-center gap-2 sm:gap-3 mt-2 mx-auto">
                    <ShareButtons referralLink={referralLink} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2.5 sm:p-3 bg-gray-400 rounded-lg hover:bg-gray-500 transition cursor-pointer">
                          <MoreHorizontal className="w-5 h-5 text-gray-900" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 ">
                        <DropdownMenuItem
                          onClick={() =>
                            handleCopy(
                              'Referral link copied',
                              referralsDetails?.referral_link,
                            )
                          }
                          className="cursor-pointer"
                        >
                          Copy Referral Link
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-start justify-center gap-2 text-xs text-gray-700 mt-2 px-4">
                    <Info className="w-4 h-4 shrink-0 mt-[2px]" />
                    <p className="max-w-sm">
                      Note: Your referrals must have 3 hires before you can
                      withdraw.
                    </p>
                  </div>
                </div>
                <div className="flex-grow flex justify-center px-4 mt-8 pb-8">
                  <div
                    className="bg-gray-400 rounded-t-lg w-full max-w-md flex flex-col"
                    style={{ minHeight: '65vh' }}
                  >
                    <div className="px-6 pt-6 pb-4">
                      <h2 className="text-lg font-semibold text-gray-900 text-left">
                        Referrals
                      </h2>

                      <div className="mt-4 max-w-xs mx-auto">
                        <SearchBar
                          placeholder="Search by name"
                          maxWidth="w-full"
                          value={searchQuery}
                          setSearchQuery={setSearchQuery}
                          onSubmit={handleSearch}
                        />
                      </div>
                    </div>

                    <div className="px-4 flex-1 overflow-auto">
                      <div className="divide-y divide-gray-500">
                        {filteredReferrals?.map((referral) => (
                          <ReferralCard
                            key={referral.referral_id}
                            {...referral}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Container>
    </div>
  )
}
