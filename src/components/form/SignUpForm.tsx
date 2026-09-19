import { useState } from 'react'
import type { FormEvent } from 'react'
import { register } from '@/api/auth'
import { useValidateSchema } from '@/hooks/useValidateSchema'
import { registerSchema } from '@/utils/schemas'
import FormInput from '@/components/form-fields/FormInput'

import { toast } from 'sonner'

interface SignUpFormProps {
  onSuccess?: (email: string) => void
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
    referral_code: '',
    countryCode: '+234',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (name: string, value: string) => {
    if (name === 'phone') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev: any) => ({ ...prev, [name]: newValue }))
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validatedData = useValidateSchema(registerSchema, formData)
    if (!validatedData) return

    const payload = {
      ...validatedData,
      phone: `${formData.countryCode} ${validatedData.phone}`,
      referral_code: formData.referral_code || undefined,
    }
    setLoading(true)

    try {
      await register(payload)
      toast.success('Account created successfully')
      onSuccess?.(payload.email)
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6 text-left">
      <FormInput
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        handleInputChange={handleChange}
        type="text"
        required
      />

      <FormInput
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        handleInputChange={handleChange}
        type="text"
        required
      />

      <div className="relative flex items-center gap-1">
        <FormInput
          name="countryCode"
          value={formData.countryCode}
          handleInputChange={handleChange}
          type="text"
          required
          className="w-19 disabled:opacity-100"
          disabled
        />
        <div className="flex-1">
          <FormInput
            name="phone"
            value={formData.phone}
            handleInputChange={handleChange}
            type="tel"
            maxLength={10}
            required
            className=" "
            placeholder="Phone Number"
          />
        </div>
      </div>

      <FormInput
        name="email"
        placeholder="Email Address"
        value={formData.email}
        handleInputChange={handleChange}
        type="email"
        required
      />

      <FormInput
        name="password"
        placeholder="Password"
        value={formData.password}
        handleInputChange={handleChange}
        type="password"
        required
      />

      <FormInput
        name="confirm_password"
        placeholder="Confirm Password"
        value={formData.confirm_password}
        handleInputChange={handleChange}
        type="password"
        required
      />

      <FormInput
        name="referral_code"
        placeholder="Referral Code (Optional)"
        value={formData.referral_code}
        handleInputChange={handleChange}
        type="text"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-60"
      >
        {loading ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  )
}
