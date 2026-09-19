import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const getFavourites = async () => {
  try {
    const response = await api.get(`/api/v1/favourite/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const addFavourite = async (provider_id: string) => {
  try {
    const response = await api.post(`/api/v1/favourite/`, {
      provider_id,
    })
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const deleteFavourite = async ({
  provider_id,
  favourite_id,
}: {
  provider_id: string
  favourite_id: string
}) => {
  try {
    const response = await api.patch(`/api/v1/favourite/${favourite_id}`, {
      provider_id,
    })

    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
