import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { resendOtp, verifyOtp } from '@/api/auth'

const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-gray-700"
  >
    <path d="M19 12H5" />
    <path d="M12 19L5 12 12 5" />
  </svg>
)

export default function Verification() {
  const [code, setCode] = useState(new Array(6).fill(''))
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    new Array(6).fill(null),
  )

  const navigate = useNavigate()
  const location = useLocation()

  //Get email from navigation OR fallback to localStorage
  const email =
    location.state?.email || localStorage.getItem('pendingVerificationEmail')

  useEffect(() => {
    if (!email) {
      toast.error('Session expired. Please sign up again.')
      navigate('/sign-up')
    }
  }, [email, navigate])

  if (!email) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value.replace(/\D/g, '')

    setCode((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleConfirm = async () => {
    const enteredCode = code.join('').trim()

    if (enteredCode.length !== 6) {
      toast.error('Enter complete 6-digit code')
      return
    }

    setLoading(true)

    try {
      const response = await verifyOtp({
        email,
        code: enteredCode,
      })

      // console.log("OTP RESPONSE (FULL):", {
      //   data: response,
      //   access: response?.access,
      //   refresh: response?.refresh,
      // });

      toast.success(
        response?.message || 'Verified. Please sign in to continue.',
      )
      navigate('/sign-in', { state: { email } })
      localStorage.removeItem('pendingVerificationEmail')
    } catch (error: any) {
      console.error('Verify OTP error:', error.response?.data || error.message)
      toast.error(
        error.response?.data?.message || 'Verification failed. Check code.',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    const payload = { email }

    setResendLoading(true)
    try {
      const response = await resendOtp(payload)
      toast.success(response?.message || 'OTP resent')
    } catch (error: any) {
      console.error('Resend OTP error:', error)
      toast.error(error?.message || 'Failed to resend')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-sm">
        <Link to="/sign-up" className="mb-6 block w-max">
          <BackArrowIcon />
        </Link>

        <h1 className="text-xl font-bold text-center mb-2">
          Verification Code
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Code sent to <span className="font-medium">{email}</span>
        </p>

        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el: HTMLInputElement | null): void => {
                inputRefs.current[index] = el
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 border text-center text-xl rounded"
            />
          ))}
        </div>

        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded"
        >
          {loading ? 'Verifying...' : 'Confirm'}
        </button>

        <p className="text-center mt-4 text-sm">
          Didn’t get the code?{' '}
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="text-primary py-1 px-2 rounded"
          >
            {resendLoading ? 'Resending...' : 'Resend'}
          </button>
        </p>
      </div>
    </div>
  )
}
