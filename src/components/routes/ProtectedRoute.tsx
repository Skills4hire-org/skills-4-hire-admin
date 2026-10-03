import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAuthenticated } from '@/utils/auth'

/**
 * ProtectedRoute guard: Ensures only authenticated administrators with a valid,
 * non-expired token can access protected child routes.
 *
 * If unauthenticated, redirects to `/sign-in` with the current location saved in state.
 */
export default function ProtectedRoute() {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  return <Outlet />
}
