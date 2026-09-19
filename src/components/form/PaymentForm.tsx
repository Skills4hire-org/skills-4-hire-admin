import type { BookingInfo } from '@/utils/types'
import { useDispatch, useSelector } from 'react-redux'
import FormInput from '../form-fields/FormInput'
import { handleBookingInfo, handleSteps } from '@/features/booking/bookingSlice'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import FormTextArea from '../form-fields/FormTextArea'
import PaymentDrawer from '../service-provider-booking/PaymentDrawer'
import type { FormEvent } from 'react'
import type { Profile } from '@/types/user.types'

export default function PaymentForm({
  serviceProvider,
}: {
  serviceProvider: Profile | undefined
}) {
  const { info }: { info: BookingInfo } = useSelector(
    (state: any) => state.bookingState,
  )

  const serviceProviderInfo = {
    name: info.serviceProviderName,
    occupation: info.serviceProviderOccupation,
    paymentAmount: info.paymentAmount,
  }

  const dispatch = useDispatch()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (info.paymentAmount === '' && e.key === '0') {
      e.preventDefault()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === 'paymentAmount') {
      const newValue = value.replace(/[^0-9]/g, '')
      dispatch(
        handleBookingInfo({
          info: {
            [field]: newValue,
          },
        }),
      )
    } else {
      dispatch(
        handleBookingInfo({
          info: {
            [field]: value,
          },
        }),
      )
    }
  }

  const handleStep = (step: number) => {
    dispatch(handleSteps({ step }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      handleBookingInfo({
        info: {
          serviceProviderName: serviceProvider?.user?.profile?.display_name,
          serviceProviderOccupation: serviceProvider?.professional_title,
        },
      }),
    )
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative w-full">
        <Label
          htmlFor="paymentAmount"
          className=" absolute font-normal  left-3 top-2 text-sm md:text-base"
        >
          Input Concluded Amount
        </Label>
        {/* input type */}
        <FormInput
          type="text"
          name="paymentAmount"
          required
          value={info.paymentAmount}
          handleInputChange={handleInputChange}
          placeholder="0000"
          className="rounded-md text-sm md:text-base pt-8 md:pt-10 bg-gray-200 min-h-18 md:h-20 pl-7"
          handleKeyDown={handleKeyDown}
        />
        <span className="absolute top-9 md:top-11 left-3 text-lg md:text-xl ">
          ₦
        </span>
      </div>
      <div className="relative">
        <Label
          htmlFor="paymentRemark"
          className=" absolute font-normal  left-3 top-2 text-sm md:text-base"
        >
          Remark
        </Label>
        <FormTextArea
          name="paymentRemark"
          value={info.paymentRemark}
          rows={4}
          handleInputChange={handleInputChange}
          placeholder="What's this for? (optional)"
          className="rounded-md text-sm md:text-base pt-8 md:pt-10 bg-gray-200"
        />
      </div>
      <div className="text-center space-x-6 md:space-x-10 mt-10 md:mb-8 relative">
        <Button
          type="button"
          size="lg"
          className="rounded-full px-8 text-base md:text-lg"
          onClick={() => handleStep(2)}
        >
          Previous
        </Button>
        <PaymentDrawer {...serviceProviderInfo} />
      </div>
    </form>
  )
}
