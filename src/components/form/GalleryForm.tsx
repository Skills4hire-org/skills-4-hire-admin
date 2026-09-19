import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Input } from '../ui/input'
import { Check, ImageIcon, Plus, VideoIcon } from 'lucide-react'
import { Button } from '../ui/button'
import FormSubmitButton from '../buttons/FormSubmitButton'
import { Label } from '../ui/label'
import { toast } from 'sonner'
import { uploadToCloudinary } from '@/utils/cloudinary'
import { useAddToGallery } from '@/hooks/useUsers'

export default function GalleryForm({
  setIsOpen,
}: {
  setIsOpen: (value: boolean) => void
}) {
  const [formData, setFormData] = useState<{
    photos: File[]
    videos: File[]
  }>({
    photos: [],
    videos: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const { mutate: updateProfileGallery, isPending } = useAddToGallery()
  const getMediaType = (url: string) => {
    if (/\.(mp4|webm|ogg)$/i.test(url)) return 'video'
    return 'image'
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
    setFormData({ ...formData, photos: acceptedImageFiles })
  }

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const selectedFiles = e.target.files || []
    const files: File[] = Array.from(selectedFiles)
    let acceptedVideoFiles: File[] = []
    if (files.length === 0) return
    files.forEach((newFile) => {
      const fileType = newFile.type.startsWith('video/')
      if (!fileType) {
        toast.warning(`${newFile.name} file type is not acceptable`)
      }
      const isOverSize = newFile.size > MAX_SIZE_MB
      if (isOverSize) {
        toast.warning(`${newFile.name}'s size maximum upload size (100MB)`)
        return
      }

      acceptedVideoFiles.push(newFile)
    })
    setFormData({ ...formData, videos: acceptedVideoFiles })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const files = [...formData.photos, ...formData.videos]
      const uploadedUrls = await uploadToCloudinary(files)
      const formatUrls = uploadedUrls?.map((url) => {
        return {
          image_url: url.url,
          public_id: url.public_id,
          description: getMediaType(url.url),
          type: getMediaType(url.url),
        }
      })
      if (formatUrls) {
        updateProfileGallery(formatUrls, {
          onSuccess: () => {
            setIsOpen(false)
            setFormData({
              photos: [],
              videos: [],
            })
            toast.success('Upload successful')
          },
          onError: (error) => {
            toast.error(error.message)
          },
        })
      }
    } catch (error: any) {
      setIsLoading(false)
      toast.error('Upload Failed. Please try again')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
      <div className="flex items-center gap-3">
        <Label
          htmlFor="photo"
          className="flex items-center gap-1 hover:text-gray-700 cursor-pointer pt-2"
        >
          <Input
            id="photo"
            name="photo"
            type="file"
            multiple
            accept="image/png, image/jpeg"
            onChange={(e) => handleImageChange(e)}
            className="hidden"
          />
          <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xs md:text-sm">Image</span>
          <span className="text-white font-medium p-0.5 bg-green-600 rounded-full ml-0.5 md:ml-1 relative">
            {formData.photos.length !== 0 ? (
              <>
                <Check strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
                <span className="absolute text-[10px] -top-2 -right-2 bg-green-600 w-4 h-4 rounded-full flex items-center justify-center">
                  {formData.photos.length}
                </span>
              </>
            ) : (
              <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
            )}
          </span>
        </Label>
        <Label
          htmlFor="video"
          className="flex items-center gap-1 hover:text-gray-700 cursor-pointer pt-2"
        >
          <Input
            id="video"
            name="video"
            type="file"
            multiple
            accept="video/*"
            onChange={(e) => handleVideoChange(e)}
            className="hidden"
          />
          <VideoIcon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xs md:text-sm">Video</span>
          <span className="text-white font-medium p-0.5 bg-green-600 rounded-full ml-0.5 md:ml-1 relative">
            {formData.videos.length !== 0 ? (
              <>
                <Check strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
                <span className="absolute text-[10px] -top-2 -right-2 bg-green-600 w-4 h-4 rounded-full flex items-center justify-center">
                  {formData.videos.length}
                </span>
              </>
            ) : (
              <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
            )}
          </span>
        </Label>
      </div>

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
          texting="uploading"
          text="upload"
          submitting={isPending || isLoading}
          disabled={!formData.photos && !formData.videos}
          className="capitalize w-20"
        />
      </div>
    </form>
  )
}
