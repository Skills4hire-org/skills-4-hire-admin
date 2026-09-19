import { currencyFormatter } from '@/utils/format'
import { Star } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '../ui/button'

export default function PendingPaymentForm({
  from,
  to,
  amount,
  provider_id,
}: {
  from: string | null | undefined
  to: string
  amount: number
  provider_id: string
}) {
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
    provider_id,
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full text-sm text-gray-800 space-y-2 md:space-y-4"
    >
      <div className="flex items-center  border-b border-gray-300 pb-2 gap-2">
        <span className="font-medium text-gray-700">From:</span>
        <span> {from} </span>
      </div>
      <div className="flex items-center  border-b border-gray-300 pb-2 gap-2">
        <span className="font-medium text-gray-700">To:</span>
        <span className="text-base"> {to} </span>
      </div>
      <div className="flex items-center border-b border-gray-300 pb-2 gap-2">
        <span className="font-medium text-gray-700">Amount:</span>
        <span className="text-base">{currencyFormatter(amount)} </span>
      </div>

      <div className="flex items-start border-b border-gray-300 pb-2 gap-2">
        <span className="font-medium text-gray-700">Comment:</span>
        <textarea
          name="comment"
          id="comment"
          value={formData.review}
          onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          className="flex-1 resize-none focus:outline-0"
          required
        />
      </div>
      <div className="flex items-center border-b border-gray-300 pb-2 gap-2">
        <span className="font-medium text-gray-700">Rating:</span>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setFormData({ ...formData, rating: star })}
              className="focus:outline-none cursor-pointer"
            >
              <Star
                className={`w-6 h-6 ${
                  formData.rating >= star
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8 md:mt-10 mb-10">
        <Button
          size="lg"
          type="submit"
          className="px-10 py-4 rounded-xl text-base font-semibold"
        >
          Approve
        </Button>
      </div>
    </form>
  )
}
