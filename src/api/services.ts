import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const getAllServices = async ({
  category,
  pageParam,
}: {
  category?: string
  pageParam?: string
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get(
      `/api/v1/services/?category_name_icontains=${category && category}`,
    )
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
