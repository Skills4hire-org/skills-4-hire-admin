import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const getReviews = async (pageParam?: string) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get(`/api/v1/reviews/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
