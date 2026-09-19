import { useRef, useState, type FormEvent } from 'react'
import FormSubmitButton from '../buttons/FormSubmitButton'
import FormInput from '../form-fields/FormInput'
import FormTextArea from '../form-fields/FormTextArea'
import FormSelect from '../form-fields/FormSelect'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Check, ImageIcon, Paperclip, Plus } from 'lucide-react'
import { services, timeFrameOptions } from '@/assets/data'
import { useValidateSchema } from '@/hooks/useValidateSchema'
import { toast } from 'sonner'
import { createOfferSchema } from '@/utils/schemas'
import type { CreatePost, OfferFormType, Post } from '@/types/post.types'

export default function OfferForm({
  offer,
  onSubmit,
  isSubmitting,
  setIsSubmitting,
}: {
  offer?: Post
  onSubmit: (data: CreatePost) => void
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
}) {
  const [formData, setFormData] = useState<OfferFormType>({
    title: offer?.post_title ?? '',
    post: offer?.post_content ?? '',
    budget: offer?.amount ?? '',
    timeFrame: offer?.duration?.toString() ?? undefined,
    service: offer?.tags?.[0]?.name ?? undefined,
    photo: [],
    attachment: [],
    city: offer?.city ?? '',
    state: offer?.state ?? '',
  })

  const handleInputChange = (field: string, value: string) => {
    if (field === 'budget') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({ ...prev, [field]: newValue }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }
  const fileRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (field: string, file: any) => {
    const selectedFiles = file || []
    const files: File[] = Array.from(selectedFiles)
    const acceptedImageFiles: File[] = []
    if (files.length === 0) return

    files.forEach((newFile) => {
      const isImage = newFile.type.startsWith('image/')
      const isDocument = newFile.type.endsWith('document')
      const isPdf = newFile.type.endsWith('pdf')

      if (field == 'photo' && !isImage && fileRef.current) {
        fileRef.current.value = ''
        return toast.warning('File type is not acceptable.')
      }
      if (field == 'attachment' && (!isDocument || !isPdf) && fileRef.current) {
        fileRef.current.value = ''
        return toast.warning('File type is not acceptable.')
      }
      acceptedImageFiles.push(newFile)
    })
    setFormData({ ...formData, [field]: acceptedImageFiles })
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validatedData = useValidateSchema(createOfferSchema, formData)
    if (!validatedData) {
      return
    }

    const allFiles = [...formData.attachment, ...formData.photo]

    setIsSubmitting(true)
    try {
      if (allFiles.length !== 0) {
        /* async function to upload files */
      }
      const allData: CreatePost = {
        city: validatedData.city,
        state: validatedData.state,
        post_title: validatedData.title,
        post_content: validatedData.post,
        post_type: 'JOB',
        amount: validatedData.budget,
        duration: validatedData.timeFrame,
        tags: [validatedData.service],
        /* attachment: {
          attachment_type: 'VIDEO' | 'PHOTO' | 'FILE'
          attachmentURL: string
      }[] */
      }
      onSubmit(allData)
    } catch (error: any) {
      setIsSubmitting(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      <FormInput
        name="title"
        placeholder="What job do you want to get done?"
        label="Title"
        required
        value={formData.title}
        type="text"
        handleInputChange={handleInputChange}
        className="h-9 text-sm md:text-base"
        labelSize="text-xs md:text-sm"
        maxLength={50}
      />
      <FormTextArea
        name="post"
        placeholder="Briefly describe the job"
        label="Description"
        value={formData.post}
        handleInputChange={handleInputChange}
        className="text-sm md:text-base p-2 py-2 md:py-4 h-66 min-h-[48px]"
        rows={3}
        required
      />

      <div className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-2 gap-4 md:gap-10">
          <FormInput
            name="budget"
            placeholder="Enter an amount"
            label="Budget Amount (₦)"
            required
            value={formData.budget}
            type="text"
            handleInputChange={handleInputChange}
            className="border-0 border-b h-9 text-sm md:text-base"
            labelSize="text-xs md:text-sm"
          />
          <FormSelect
            name="timeFrame"
            label="Time Frame"
            value={formData.timeFrame}
            handleInputChange={handleInputChange}
            selectItems={timeFrameOptions}
            placeholder="Select"
            className="border-0 border-b h-9 [&_svg]:block pl-3 text-sm md:text-base"
            labelSize="text-xs md:text-sm"
            required
          />
        </div>
        <div className="grid">
          <FormSelect
            name="service"
            label="Type of Service"
            value={formData.service}
            handleInputChange={handleInputChange}
            selectItems={services}
            placeholder="Select"
            className="border-0 border-b h-9 [&_svg]:block pl-3 text-sm md:text-base"
            labelSize="text-xs md:text-sm"
            required
          />
        </div>
        <div className="space-y-2">
          <span className="text-xs md:text-sm block font-medium">Location</span>
          <div className="grid grid-cols-2 gap-4 md:gap-10">
            <FormInput
              name="city"
              placeholder="Enter city"
              required
              value={formData.city}
              type="text"
              handleInputChange={handleInputChange}
              className="border-0 border-b h-9 text-sm md:text-base"
            />
            <FormInput
              name="state"
              placeholder="Enter state"
              required
              value={formData.state}
              type="text"
              handleInputChange={handleInputChange}
              className="border-0 border-b h-9 text-sm md:text-base"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-4 md:gap-6 text-sm text-muted-foreground justify-start ml-0 mt-6 md:mt-8">
        <Label
          htmlFor="photo"
          className="flex items-center gap-1 hover:text-gray-700 cursor-pointer"
        >
          <Input
            id="photo"
            name="photo"
            type="file"
            multiple
            ref={fileRef}
            accept="image/png, image/jpeg"
            onChange={(e) => handleFileChange('photo', e.target.files)}
            className="hidden"
          />
          <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xs md:text-sm">Photo</span>
          <span className="text-white font-medium p-0.5 bg-green-600 rounded-full ml-0.5 md:ml-1">
            {formData.photo.length !== 0 ? (
              <Check strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
            ) : (
              <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
            )}
          </span>
        </Label>

        <Label
          htmlFor="attachment"
          className="flex items-center gap-1 hover:text-gray-700 cursor-pointer"
        >
          <Input
            id="attachment"
            name="attachment"
            type="file"
            multiple
            ref={fileRef}
            accept=".pdf, .doc, .docx"
            onChange={(e) => handleFileChange('attachment', e.target.files)}
            className="hidden"
          />
          <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xs md:text-sm">Attachment</span>
          <span className="text-white font-medium p-0.5 bg-green-600 rounded-full ml-0.5 md:ml-1">
            {formData.attachment.length !== 0 ? (
              <Check strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
            ) : (
              <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
            )}
          </span>
        </Label>
      </div>
      <div className="border-t pt-2 md:pt-4 flex justify-end">
        <FormSubmitButton
          size="sm"
          submitting={isSubmitting}
          text="Post offer"
          texting="Posting"
          className="px-4 md:px-8 text-sm md:text-base"
        />
      </div>
    </form>
  )
}
