import { useEndorse } from '@/hooks/useEndorse'
import { useValidateSchema } from '@/hooks/useValidateSchema'
import { endorseFormSchema } from '@/utils/schemas'
import { useState, type FormEvent } from 'react'
import FormTextArea from '../form-fields/FormTextArea'
import FormSubmitButton from '../buttons/FormSubmitButton'

export default function EndorseForm({
  provider_pk,
}: {
  provider_pk: string | undefined
}) {
  const [formData, setFormData] = useState({
    reason: '',
  })
  const { mutate: endorse, isPending } = useEndorse()
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validatedData = useValidateSchema(endorseFormSchema, formData)
    if (!validatedData) {
      return
    }
    endorse({ ...validatedData, provider_pk })
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormTextArea
        name="reason"
        label="Recommendation"
        handleInputChange={handleInputChange}
        value={formData.reason}
        rows={3}
        required
      />
      <div className="ml-auto w-max">
        <FormSubmitButton
          text="Send"
          texting="Sending"
          submitting={isPending}
          className="w-20 md:w-30"
        />
      </div>
    </form>
  )
}
