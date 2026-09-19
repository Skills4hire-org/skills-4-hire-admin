import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const getReferrals = async () => {
  try {
    const response = await api.get(`/api/v1/referrals/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const withdrawReferralBonus = async (data: { amount: number }) => {
  try {
    const response = await api.post(
      `/api/v1/referrals-withdraw/?local_bank=False`,
      data,
    )
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
