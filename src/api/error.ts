import axios from 'axios'

export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const data = error?.response?.data

    // Log full server response so devs can inspect in the browser console
    if (data) console.error('[API Error Response]', data)

    // Django REST Framework can return errors in many shapes:
    //   { detail: '...' }  |  { message: '...' }  |  { email: ['...'], password: ['...'] }
    if (data) {
      if (typeof data === 'string') throw new Error(data)
      if (typeof data.detail === 'string') throw new Error(data.detail)
      if (typeof data.message === 'string') throw new Error(data.message)
      // Field-level errors — grab the first one
      const firstField = Object.values(data).find(
        (v) => typeof v === 'string' || Array.isArray(v),
      )
      if (Array.isArray(firstField) && firstField.length > 0)
        throw new Error(String(firstField[0]))
      if (typeof firstField === 'string') throw new Error(firstField)
    }

    throw new Error(error?.message || 'Something went wrong')
  }

  throw new Error('Unexpected error occurred')
}
