import axios from 'axios'

interface ApiErrorResponse {
  success: string
  message: string
}

export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message =
      error?.response?.data?.message || error?.message || 'Something went wrong'
    throw new Error(message)
  }

  throw new Error('Unexpected error occurred')
}
