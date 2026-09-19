import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const getBookings = async ({
  pageParam,
  booking_status,
}: {
  pageParam: string | undefined
  booking_status: string
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get(
      `/api/v1/booking/?booking_status=${booking_status}`,
    )
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
