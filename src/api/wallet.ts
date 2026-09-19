import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const getWalletBalance = async () => {
  try {
    const response = await api.get(`/api/v1/wallet/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
