import { useState, type FormEvent } from 'react'
import FormTextArea from '../form-fields/FormTextArea'
import FormSubmitButton from '../buttons/FormSubmitButton'
import { Button } from '../ui/button'
import { useUpdateMyProfile } from '@/hooks/useUsers'
import { toast } from 'sonner'

export default function AboutForm({
  setIsOpen,
  about,
}: {
  setIsOpen: (value: boolean) => void
  about: string
}) {
  const [formData, setFormData] = useState({
    about,
  })
  const { mutate: updateProfile, isPending } = useUpdateMyProfile()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      overview: formData.about,
    }

    updateProfile(data, {
      onSuccess: () => {
        setIsOpen(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
      <FormTextArea
        name="about"
        value={formData.about}
        rows={6}
        required
        handleInputChange={handleInputChange}
        className="min-h-32 md:min-h-40 h-max text-sm md:text-base"
      />
      <div className="ml-auto w-max flex items-center gap-2">
        <Button
          variant="destructive"
          className=""
          onClick={() => setIsOpen(false)}
          type="button"
        >
          Close
        </Button>
        <FormSubmitButton
          texting="updating"
          text="update"
          submitting={isPending}
          disabled={!formData.about}
          className="capitalize w-20"
        />
      </div>
    </form>
  )
}
