import { store } from '@/store'
import { logoutUser } from '@/features/user/userSlice'
import { isTokenExpired } from './helpers'

export const AUTH_TOKEN_KEYS = [
  'admin_token',
  'accessToken',
  'token',
  'access',
] as const

/**
 * Retrieves the first valid, unexpired authentication token found in localStorage.
 * Automatically clears any expired tokens it discovers.
 */
export const getAuthToken = (): string | null => {
  for (const key of AUTH_TOKEN_KEYS) {
    const token = localStorage.getItem(key)
    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem(key)
      } else {
        return token
      }
    }
  }

  return null
}

/**
 * Determines whether the user has a valid, active session.
 */
export const isAuthenticated = (): boolean => {
  return Boolean(getAuthToken())
}

/**
 * Stores the admin authentication access token in localStorage.
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem('admin_token', token)
}

/**
 * Clears all admin authentication tokens and session data,
 * resetting Redux user state as well.
 */
export const clearAuthTokens = (): void => {
  AUTH_TOKEN_KEYS.forEach((key) => {
    localStorage.removeItem(key)
  })
  sessionStorage.removeItem('user')
  try {
    store.dispatch(logoutUser())
  } catch {
    // Ignore store dispatch errors if called outside of active React context
  }
}
