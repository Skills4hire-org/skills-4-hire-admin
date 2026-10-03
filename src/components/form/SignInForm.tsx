import { adminLogin } from '@/api/auth'
import { useValidateSchema } from '@/hooks/useValidateSchema'
import { loginSchema } from '@/utils/schemas'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormInput from '../form-fields/FormInput'
import { toast } from 'sonner'
import { setAuthToken } from '@/utils/auth'

const ADMIN_EMAIL = 'testadmin@gmail.com'
const ADMIN_PASSWORD = 'word 3030'

interface SignInFormProps {
  initialEmail?: string
  initialPassword?: string
}

export default function SignInForm({ initialEmail, initialPassword }: SignInFormProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    email: initialEmail || ADMIN_EMAIL,
    password: initialPassword || ADMIN_PASSWORD,
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validatedData = useValidateSchema(loginSchema, formData)
    if (!validatedData) return

    setLoading(true)

    try {
      const authData = await adminLogin(validatedData)

      // API response shape: { success, message, data: { access, refresh } }
      const token = authData?.data?.access || authData?.access

      if (!token) {
        throw new Error('Admin login did not return an access token')
      }

      setAuthToken(token)
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin'
      navigate(from, { replace: true })
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-3 text-left">
      <FormInput
        name="email"
        type="email"
        placeholder="Email address"
        value={formData.email}
        handleInputChange={handleChange}
        required
      />

      <FormInput
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        handleInputChange={handleChange}
        required
      />
      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-60 cursor-pointer"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
