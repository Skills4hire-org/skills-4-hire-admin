import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { toast } from 'sonner'
import { useDeleteProfileImage, useUpdateProfileImage } from '@/hooks/useUsers'
import { uploadToCloudinary } from '@/utils/cloudinary'

export default function ProfileImageForm({
  avatar,
  setIsOpen,
}: {
  avatar: string | undefined
  setIsOpen: (value: boolean) => void
}) {
  const [formData, setFormData] = useState<{
    image: string
    image_file: File[] | null
  }>({
    image: '',
    image_file: null,
  })
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const selectedFiles = e.target.files || []
    const files = Array.from(selectedFiles)
    if (files.length === 0) return
    const fileType = files[0].type.startsWith('image/')
    const isOverSize = files[0].size > MAX_SIZE_MB
    if (!fileType) {
      toast.warning('File type is not acceptable')
    }
    if (isOverSize) {
      toast.warning('Image size must not exceed 2MB')
      return
    }
    const validImage = URL.createObjectURL(files[0])
    setFormData({ image: validImage, image_file: files })
  }

  const { mutate: updateProfileImage, isPending } = useUpdateProfileImage()
  const { mutate: deleteProfileImage, isPending: deleting } =
    useDeleteProfileImage()

  const handleDelete = () => {
    deleteProfileImage(undefined, {
      onSuccess: () => {
        setIsOpen(false)
        setFormData({
          image: '',
          image_file: null,
        })
        toast.success('Profile updated.')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const uploadedUrls = await uploadToCloudinary(formData.image_file)
      if (uploadedUrls) {
        const data = {
          avatar: uploadedUrls[0].url,
          avatar_public_id: uploadedUrls[0]?.public_id,
          description: 'profile image',
        }
        updateProfileImage(data, {
          onSuccess: () => {
            setIsOpen(false)
            setFormData({
              image: '',
              image_file: null,
            })
            toast.success('Profile updated.')
          },
          onError: (error) => {
            toast.error(error.message)
          },
        })
      }
    } catch (error) {
      toast.error('Upload failed.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <figure className="bg-gray-100 w-max mx-auto rounded-full mb-4">
        <img
          src={formData.image || avatar}
          alt="profile image"
          className="aspect-square object-cover w-30 md:w-40 rounded-full"
        />
      </figure>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Label
            htmlFor="image"
            className="h-9 px-4 py-2
                    bg-primary
                    rounded-md text-white cursor-pointer"
          >
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              className="hidden"
            />
            {avatar ? 'Change' : 'Add'}
          </Label>
          {avatar && (
            <Button
              type="button"
              variant="destructive"
              disabled={deleting || !avatar}
              onClick={handleDelete}
            >
              {deleting ? 'Deleting' : 'Delete'}
            </Button>
          )}
        </div>

        <Button
          type="submit"
          className="bg-green-600"
          disabled={isPending || !formData.image_file}
        >
          {isPending ? 'Saving' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
