import { useState, type FormEvent } from 'react'
import FormInput from '../form-fields/FormInput'
import { RefreshCw, X } from 'lucide-react'
import FormTextArea from '../form-fields/FormTextArea'

interface NegotiateOfferFormProps {
  setIsNegotiateOpen: (value: boolean) => void
  job_post_id?: string
  conversation_id?: string
}

export default function NegotiateOfferForm({
  setIsNegotiateOpen,
}: NegotiateOfferFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    reason: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleInputChange = (field: string, value: string) => {
    if (field === 'amount') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({ ...prev, [field]: newValue }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-900">Negotiate Offer</h2>

      <p className="text-sm text-gray-600">
        Enter your proposed amount and reason for negotiation.
      </p>
      <FormInput
        name="amount"
        placeholder="Enter amount"
        label="Proposed Amount"
        required
        value={formData.amount}
        type="text"
        handleInputChange={handleInputChange}
        className="h-9 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
        labelSize="text-xs md:text-sm"
      />
      <FormTextArea
        name="reason"
        placeholder="Explain why you're negotiating..."
        label="Reason (Optional)"
        value={formData.reason}
        handleInputChange={handleInputChange}
        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm md:text-base resize-none "
        rows={3}
      />

      <div className="flex gap-2 pt-2">
        <button
          onClick={() => setIsNegotiateOpen(false)}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 cursor-pointer"
        >
          <X size={16} /> Cancel
        </button>

        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-yellow-400 text-white text-sm hover:opacity-90 cursor-pointer"
        >
          <RefreshCw size={16} />
          {isSubmitting ? 'Please wait...' : 'Submit'}
        </button>
      </div>
    </form>
  )
}
