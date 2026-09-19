import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthLogo from '@/components/global/AuthLogo'
import Container from '@/components/global/Container'
import { Camera } from 'lucide-react'
import { toast } from 'sonner'
import { uploadToCloudinary } from '@/utils/cloudinary'
import { selectRole } from '@/api/onboard'
import { useUpdateProfileImage } from '@/hooks/useUsers'

export default function UploadPhoto() {
  const { mutate: updateAvatar } = useUpdateProfileImage()
  const { role } = useParams()
  const [formData, setFormData] = useState<{
    image: string
    image_file: File[]
  }>({
    image: '',
    image_file: [],
  })

  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    try {
      const uploadedUrls = await uploadToCloudinary(formData.image_file)
      const data = {
        avatar: uploadedUrls && uploadedUrls[0]?.url,
        avatar_public_id: uploadedUrls && uploadedUrls[0]?.public_id,
        description: 'profile image',
      }
      updateAvatar(data)

      if (role === 'customer') {
        await selectRole('CUSTOMER')
        toast.success('Registration successful')
        navigate('/customer/home')
      } else {
        navigate('/onboarding/professional/personal-information')
      }
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = async () => {
    setLoading(true)
    try {
      if (role === 'customer') {
        await selectRole('CUSTOMER')
        toast.success('Registration successful')
        navigate('/customer/home')
      } else {
        navigate('onboarding/professional/personal-information')
      }
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="flex items-center justify-center min-h-screen py-20">
      <div className="w-full max-w-sm text-center">
        <div className="w-max mx-auto mb-4">
          <AuthLogo />
        </div>

        <h1 className="text-2xl font-bold">Upload Profile Photo</h1>

        <p className="text-sm text-gray-500 mt-2 mb-8">
          Add a profile picture (optional)
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8 text-gray-400" />
              )}
            </div>
          </div>

          <input
            ref={fileRef}
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={loading || !formData.image || !formData.image_file}
          >
            {role == 'customer'
              ? loading
                ? 'Registering...'
                : 'Complete Registration'
              : loading
                ? 'Uploading...'
                : 'Continue'}
          </button>

          <button
            type="button"
            onClick={handleSkip}
            className="w-full mt-3 text-sm text-gray-500 hover:text-primary hover:underline cursor-pointer"
            disabled={loading}
          >
            Skip for now
          </button>
        </form>
      </div>
    </Container>
  )
}
