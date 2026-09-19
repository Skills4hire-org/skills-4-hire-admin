import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLogo from '@/components/global/AuthLogo'
import Container from '@/components/global/Container'
import { User, Wrench } from 'lucide-react'

export default function OnboardingRole() {
  const navigate = useNavigate()

  const [role, setRole] = useState('')

  const handleContinue = async () => {
    navigate(`/onboarding/${role}/upload`)

  }

  return (
    <Container className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm text-center">
        <AuthLogo />

        <h1 className="text-2xl font-bold">Choose Your Role</h1>

        <div className="space-y-4 mt-8">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`w-full border-2 cursor-pointer hover:bg-gray-100 rounded-md p-4 flex gap-3 ${
              role === 'customer' ? 'border-primary bg-gray-100' : ''
            }`}
          >
            <User />
            <div>
              <p className="font-semibold">Customer</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRole('professional')}
            className={`w-full border-2 cursor-pointer hover:bg-gray-100 rounded-md p-4 flex gap-3 ${
              role === 'professional' ? 'border-primary bg-gray-100' : ''
            }`}
          >
            <Wrench />
            <div>
              <p className="font-semibold">Skilled Professional</p>
            </div>
          </button>
        </div>

        <button
          onClick={handleContinue}
          disabled={!role}
          className="w-full mt-8 bg-primary cursor-pointer hover:bg-primary/90 text-white py-3 font-medium rounded-md"
        >
          Continue
        </button>
      </div>
    </Container>
  )
}
