import type { Endorse } from '@/types/endorse.types'
import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'

export const endorse = async (data: Endorse) => {
  try {
    const response = await api.post('/api/v1/posts/', data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
