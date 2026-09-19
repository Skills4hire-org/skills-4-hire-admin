import { useState, type ChangeEvent, type FormEvent } from 'react'
import FormInput from '../form-fields/FormInput'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Check, ImageIcon, Plus } from 'lucide-react'
import FormSubmitButton from '../buttons/FormSubmitButton'
import { Button } from '../ui/button'
import { useAddServices } from '@/hooks/useUsers'
import { toast } from 'sonner'
import { uploadToCloudinary } from '@/utils/cloudinary'

export default function ServiceForm({
  setIsOpen,
}: {
  setIsOpen: (value: boolean) => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<{
    name: string
    amount: string
    photo: File[] | null
  }>({
    name: '',
    amount: '',
    photo: null,
  })
  const checkForm = !formData.name || !formData.amount || !formData.photo

  const { mutate: addService, isPending } = useAddServices()

  const handleInputChange = (field: string, value: string) => {
    if (field === 'amount') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({ ...prev, [field]: newValue }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const selectedFiles = e.target.files || []
    const files: File[] = Array.from(selectedFiles)
    let acceptedImageFiles: File[] = []
    if (files.length === 0) return
    files.forEach((newFile) => {
      const fileType = newFile.type.startsWith('image/')
      if (!fileType) {
        toast.warning(`${newFile.name} file type is not acceptable`)
      }
      const isOverSize = newFile.size > MAX_SIZE_MB

      if (isOverSize) {
        toast.warning(
          `${newFile.name}'s size exceeds maximum upload size (2MB)`,
        )
        return
      }
      acceptedImageFiles.push(newFile)
    })
    setFormData({ ...formData, photo: acceptedImageFiles })
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const uploadedUrls = await uploadToCloudinary(formData.photo)
      console.log(uploadedUrls)

      if (uploadedUrls) {
        const data = {
          name: formData.name,
          namex: 'fuftfyu',
          charge: Number(formData.amount),
          years_of_experience: 0,
          attachments: [
            {
              image_url: uploadedUrls[0].url,
              image_public_id: uploadedUrls[0].public_id,
            },
          ],
        }

        addService(data, {
          onSuccess: () => {
            setIsOpen(false)
            toast.success('You have added a new service.')
          },
          onError: (error) => {
            toast.error(error.message)
          },
        })
      }
    } catch (error: any) {
      setIsLoading(false)
      toast.error('Failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
      <FormInput
        name="name"
        type="text"
        label="Name"
        value={formData?.name}
        placeholder="Name of the service"
        required
        handleInputChange={handleInputChange}
        className="pb-12 min-h-18 md:min-h-20 h-max text-sm md:text-base"
      />
      <FormInput
        type="text"
        name="amount"
        label="Amount"
        required
        value={formData.amount}
        handleInputChange={handleInputChange}
        placeholder="0000"
        labelSize="text-xs md:text-sm"
      />
      <Label
        htmlFor="photo"
        className="flex items-center gap-1 hover:text-gray-700 cursor-pointer pt-2"
      >
        <Input
          id="photo"
          name="photo"
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => handleImageChange(e)}
          className="hidden"
        />
        <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
        <span className="text-xs md:text-sm">Image</span>
        <span className="text-white font-medium p-0.5 bg-green-600 rounded-full ml-0.5 md:ml-1">
          {formData.photo ? (
            <Check strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
          ) : (
            <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
          )}
        </span>
      </Label>

      <div className="ml-auto w-max flex items-center gap-2">
        <Button
          variant="destructive"
          className="w-20"
          onClick={() => setIsOpen(false)}
          type="button"
        >
          Close
        </Button>
        <FormSubmitButton
          texting="adding"
          text="add"
          submitting={isPending || isLoading}
          disabled={checkForm}
          className="capitalize w-20"
        />
      </div>
    </form>
  )
}
