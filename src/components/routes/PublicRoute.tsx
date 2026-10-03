import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '@/utils/auth'

/**
 * PublicRoute guard: For public authentication pages (e.g., /sign-in, /forgot-password).
 * If an admin is already logged in with a valid session, redirects directly to `/admin`.
 */
export default function PublicRoute() {
  if (isAuthenticated()) {
    return <Navigate to="/admin" replace />
  }

  return <Outlet />
}
