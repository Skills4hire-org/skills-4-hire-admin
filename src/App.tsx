import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AdminLayout from './components/layouts/AdminLayout'
import ProtectedRoute from './components/routes/ProtectedRoute'
import PublicRoute from './components/routes/PublicRoute'
import UserManagement from './pages/admin/UserManagement'
import AdminServices from './pages/admin/AdminServices'
import SupportDisputes from './pages/admin/SupportDisputes'
import Transactions from './pages/admin/Transactions'
import Finance from './pages/admin/Finance'
import ContentModeration from './pages/admin/ContentModeration'
import Analytics from './pages/admin/Analytics'
import Overview from './pages/admin/Overview'
import Jobs from './pages/admin/Jobs'
import ProviderDetails from './pages/admin/ProviderDetails'
import SignIn from './pages/Signin'
import ForgotPassword from './pages/ForgotPassword'
import ResetPasswordConfirm from './pages/ResetPasswordConfirm'

const router = createBrowserRouter([
  // Root redirect
  {
    path: '/',
    element: <Navigate to="/admin" replace />,
  },

  // Public Authentication Routes (Guarded: redirect to /admin if already logged in)
  {
    element: <PublicRoute />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'password/reset-confirm',
        element: <ResetPasswordConfirm />,
      },
    ],
  },

  // Protected Admin Routes (Guarded: redirect to /sign-in if not authenticated)
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: 'user-management',
            element: <UserManagement />,
          },
          {
            path: 'services',
            element: <AdminServices />,
          },
          {
            path: 'jobs',
            element: <Jobs />,
          },
          {
            path: 'support',
            element: <SupportDisputes />,
          },
          {
            path: 'transactions',
            element: <Transactions />,
          },
          {
            path: 'financial',
            element: <Finance />,
          },
          {
            path: 'content-moderation',
            element: <ContentModeration />,
          },
          {
            path: 'analytics',
            element: <Analytics />,
          },
          {
            path: 'providers/:id',
            element: <ProviderDetails />,
          },
        ],
      },
    ],
  },

  // Fallback Wildcard Catch-All Route
  {
    path: '*',
    element: <Navigate to="/admin" replace />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
