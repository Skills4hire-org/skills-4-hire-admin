import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const selectRole = async (role: string) => {
  try {
    const response = await api.post('/api/v1/onboard/', {
      service_to_perform: role,
    })
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
export const uploadAvatar = async (data: {
  avatar: string
  avatar_public_id: string
  description: string
}) => {
  try {
    const response = await api.post('/api/v1/avatar/', data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
export const completeOnboard = async (data: any) => {
  try {
    const response = await api.patch('/api/v1/profile-onboard/complete/', data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
