import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'
import type { Gallery, ProviderParams, Service } from '@/types/user.types'

export const getMyProfile = async () => {
  try {
    const response = await api.get('/api/v1/profile/me')
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
export const updateMyProfile = async (data: any) => {
  try {
    const response = await api.patch('/api/v1/profile/me', data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getUserProfile = async (id: string | undefined) => {
  try {
    const response = await api.get(`/api/v1/profile/${id}`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getProviders = async ({
  search,
  profession,
  min_charge,
  ratings,
  pageParam,
}: ProviderParams) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get(
      `/api/v1/profile_search/?q=${search && search}&professional_title_icontains=${profession && profession}&min_charge_gte=${min_charge && min_charge}&reviews_ratings_gte=${ratings && ratings}`,
    )
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getProviderDetails = async (id: string | undefined) => {
  try {
    const response = await api.get(`/api/v1/profile_search/${id}/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getMyServices = async (pageParam: string | undefined) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get('/api/v1/services/')
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
export const getUserServices = async ({
  pageParam,
  id,
}: {
  pageParam: string | undefined
  id: string | undefined
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get(`/api/v1/services/${id}/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
export const addServices = async (data: Service) => {
  try {
    const response = await api.post('/api/v1/services/', data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
export const deleteService = async (id?: string) => {
  try {
    const response = await api.delete(`/api/v1/services/${id}/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const addToGallery = async (data: Gallery[]) => {
  try {
    const response = await api.post('/api/v1/images/', data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
export const deleteFromGallery = async (image_id?: string) => {
  try {
    const response = await api.delete(`/api/v1/images/${image_id}`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getMyGallery = async (pageParam?: string) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get(`/api/v1/images/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
export const getUserGallery = async ({
  pageParam,
  id,
}: {
  pageParam?: string
  id?: string
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get(`/api/v1/images/user/${id}/images/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const updateCoverPhoto = async (data: {
  image_url: string
  public_url: string
}) => {
  try {
    const response = await api.patch(`/api/v1/profile/cover-photo/`, data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
export const updateProfileImage = async (data: {
  avatar: string
  avatar_public_id: string
  description: string
}) => {
  try {
    const response = await api.post(`/api/v1/profile/avatar/`, data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
export const deleteCoverPhoto = async () => {
  try {
    const response = await api.delete(`/api/v1/profile/cover-photo/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
export const deleteProfileImage = async () => {
  try {
    const response = await api.delete(`/api/v1/profile/avatar/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
