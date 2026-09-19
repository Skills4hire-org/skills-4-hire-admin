import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import FormTextArea from '../form-fields/FormTextArea'
import { toast } from 'sonner'
import { Check, ImageIcon, Plus } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import FormSubmitButton from '../buttons/FormSubmitButton'
import type { CreatePost } from '@/types/post.types'
import { useCreatePost } from '@/hooks/usePosts'
import { useNavigate } from 'react-router-dom'

export default function PostForm() {
  const [input, setInput] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [formData, setFormData] = useState({
    post: '',
    photo: '',
    attachment: '',
  })
  const [showInput, setShowInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { mutate: createPost } = useCreatePost()

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
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    e.preventDefault()

    const newKeyword = input.trim()
    if (!newKeyword) return

    if (!keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword])
      setShowInput(false)
    }

    setInput('')
  }
  const handleAddKeyword = () => {
    const newKeyword = input.trim()
    if (!keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword])
      setShowInput(false)
    }
    setInput('')
  }
  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const allFiles = [...formData.attachment, ...formData.photo]
    setIsSubmitting(true)
    try {
      if (allFiles.length !== 0) {
        /* async function to upload files */
      }

      const allData: CreatePost = {
        post_content: formData.post,
        tags: keywords,
        /*  attachmient: {
          
          attachment_type: 'VIDEO' | 'PHOTO' | 'FILE'
          attachmentURL: string
      } */
      }

      createPost(allData, {
        onSuccess: () => {
          navigate('/provider/home/post')
        },
        onError: () => {
          setIsSubmitting(false)
        },
      })
    } catch (error: any) {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      <FormTextArea
        name="post"
        placeholder="Post your latest work or service"
        value={formData.post}
        handleInputChange={handleInputChange}
        className="text-xs md:text-sm p-2 py-2 md:py-4 h-66 min-h-[48px]"
        rows={3}
        required
      />
      <div className="w-full">
        <div className="space-y-1">
          <span className="text-xs md:text-sm font-medium block">Keywords</span>
          <p className="text-xs md:text-sm text-muted-foreground">
            Add up to 5 keywords relevant to your post.
          </p>
        </div>

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 mb-2">
            {keywords.map((keyword) => (
              <div
                key={keyword}
                className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs md:text-sm"
              >
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="text-xs font-bold cursor-pointer text-primary/80 hover:text-primary"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3">
          {showInput ? (
            <div className="relative max-w-xs">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type keyword and press Enter"
                className="w-full border border-input rounded-md px-3 h-9 text-xs md:text-sm shadow-xs focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-[1px] outline-none pr-14"
              />
              <button
                onClick={handleAddKeyword}
                className="bg-primary text-white rounded-r-md w-12 font-medium absolute top-0 right-0 h-full text-xs md:text-sm cursor-pointer hover:primary/80  disabled:opacity-50"
                disabled={!input}
              >
                Add
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowInput(true)}
              className="text-primary font-medium flex items-center gap-1 text-xs md:text-sm outline outline-primary  px-3 py-1.5 rounded-full hover:bg-primary/10 cursor-pointer hover:outline-2 disabled:opacity-50"
              disabled={keywords.length == 5}
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" /> Add Keyword
            </button>
          )}
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
            {formData.photo ? (
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
          text="Post"
          texting="Posting"
          className="px-4 md:px-8 text-sm md:text-base"
        />
      </div>
    </form>
  )
}
