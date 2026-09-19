import { getReferrals, withdrawReferralBonus } from '@/api/referrals'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useReferrals = () => {
  const getAllReferrals = async () => {
    const referrals = await getReferrals()
    return referrals
  }
  const queryData = useQuery({
    queryKey: ['referrals'],
    queryFn: getAllReferrals,
  })
  return queryData
}

export const useWithdrawReferralBonus = () => {
  const withdrawReferralBonusAction = async (data: { amount: number }) => {
    try {
      await withdrawReferralBonus(data)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const withdrawReferralBonusFunction = useMutation({
    mutationFn: withdrawReferralBonusAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] })
    },
  })

  return withdrawReferralBonusFunction
}
