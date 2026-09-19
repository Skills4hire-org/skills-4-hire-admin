import { useState } from 'react'
import FormInput from '../form-fields/FormInput'
import ProfileImage from '../global/ProfileImage'
import FormTextArea from '../form-fields/FormTextArea'
import FormSelect from '../form-fields/FormSelect'
import { timeFrameOptions } from '@/assets/data'
import { ImageIcon, Paperclip, Plus } from 'lucide-react'
import FormSubmitButton from '../buttons/FormSubmitButton'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useMyProfile } from '@/hooks/useUsers'
import type { Profile } from '@/types/user.types'

export default function PostComposer() {
  const { data } = useMyProfile()
  const user: Profile | undefined = data
  const avatar = user?.user?.profile?.avatar?.avatar
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const navigate = useNavigate()
  const url =
    userType == 'customer'
      ? `/${userType}/create-offer`
      : `/${userType}/create-post`

  const [formData, setFormData] = useState({
    post: '',
    budget: '',
    timeFrame: '',
    photo: '',
    attachment: '',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form
      className="
        bg-white
        rounded-md
        space-y-4
        px-2 py-4 md:py-6 md:px-3
        shadow-md
        border
        border-gray-500
        md:border-gray-400
      "
    >
      {userType == 'customer' && (
        <p className="text-base md:text-lg font-medium text-gray-700">
          Create an offer
        </p>
      )}

      <div className="flex items-center gap-2">
        <ProfileImage noStatus avatar={avatar} />
        <Link to={url} className="w-full">
          <FormTextArea
            name="post"
            placeholder={
              userType == 'customer'
                ? 'What job do you want to get done?'
                : 'Post about your latest work or service.'
            }
            value={formData.post}
            handleInputChange={handleInputChange}
            className="text-sm md:text-base p-1 h-[48px] min-h-[48px]"
            rows={1}
            required
          />
        </Link>
      </div>

      <div className="flex flex-col gap-2 md:gap-4">
        {userType == 'customer' && (
          <div className="grid grid-cols-2 gap-4 md:gap-10">
            <Link to={url}>
              <FormInput
                name="budget"
                placeholder="Enter an amount"
                label="Budget Amount (₦)"
                required
                value={formData.budget}
                type="number"
                handleInputChange={handleInputChange}
                className="border-0 border-b h-9 text-sm md:text-base"
                labelSize="text-xs md:text-sm"
              />
            </Link>

            <FormSelect
              name="timeFrame"
              label="Time Frame"
              value={formData.timeFrame}
              handleInputChange={handleInputChange}
              selectItems={timeFrameOptions}
              placeholder="Select"
              className="border-0 border-b h-9 [&_svg]:block text-sm md:text-base"
              labelSize="text-xs md:text-sm"
              handleBlur={() => navigate(url)}
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 md:gap-6 text-sm text-muted-foreground justify-start ml-0">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 hover:text-gray-700">
                <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">Photo</span>
              </div>

              <Link
                to={url}
                className="text-white font-medium p-0.5 bg-green-600 rounded-full"
              >
                <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
              </Link>
            </div>
            {userType == 'customer' && (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 hover:text-gray-700">
                  <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm">Attachment</span>
                </div>
                <Link
                  to={url}
                  className="text-white font-medium p-0.5 bg-green-600 rounded-full"
                >
                  <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
                </Link>
              </div>
            )}
          </div>
          <Link to={url}>
            <FormSubmitButton
              size="sm"
              submitting={false}
              text={userType == 'customer' ? 'Post offer' : 'Post'}
              texting="Posting"
              className="px-4 md:px-8 text-sm"
            />
          </Link>
        </div>
      </div>
    </form>
  )
}
