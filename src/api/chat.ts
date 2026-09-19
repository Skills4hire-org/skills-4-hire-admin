import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'
import type { CreateConversation } from '@/types/chat.types'

export const createConversation = async (data: CreateConversation) => {
  try {
    const response = await api.post('/api/v1/conversation/', data)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const chatWithSupport = async () => {
  try {
    const response = await api.post('/api/v1/support/open/')
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getConversationList = async (pageParam?: string) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get(`/api/v1/conversation/`)
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const createMessage = async ({
  conversation_id,
  data,
}: {
  conversation_id: string
  data: {
    content: string
  }
}) => {
  try {
    const response = await api.post(
      `/api/v1/conversation/${conversation_id}/messages/`,
      data,
    )
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

export const getMessages = async ({
  pageParam,
  conversation_id,
}: {
  conversation_id?: string
  pageParam?: string
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get(
      `/api/v1/conversation/${conversation_id}/messages/`,
    )
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}
