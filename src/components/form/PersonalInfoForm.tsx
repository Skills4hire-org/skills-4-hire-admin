/* import { genderOptions } from '@/assets/data' */
import FormInput from '@/components/form-fields/FormInput'
/* import FormSelect from '@/components/form-fields/FormSelect' */
import { useRef, useState, type FormEvent } from 'react'
import FormFile from '../form-fields/FormFile'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useValidateSchema } from '@/hooks/useValidateSchema'
import { personalInfoFormSchema } from '@/utils/schemas'
import { useDispatch, useSelector } from 'react-redux'
import { addPersonalInfo } from '@/features/registration/registrationSlice'
import { toast } from 'sonner'
import type { UserData } from '@/types/user.types'
import type {
  FileStructure,
  PersonalInformationFormData,
} from '@/types/onboard.types'

export default function PersonalInfoForm() {
  const [files, setFiles] = useState({
    driversLicense: null,
    passport: null,
  })
  const { personalInfo }: { personalInfo: PersonalInformationFormData } =
    useSelector((state: any) => state.registrationState)
  const { user_data }: { user_data: UserData } = useSelector(
    (state: any) => state.userState,
  )
  const { nin, driversLicense, passport } = personalInfo
  const dispatch = useDispatch()

  const handleInputChange = (field: string, value: string) => {
    if (field === 'nin') {
      const newValue = value.replace(/[^0-9]/g, '')
      dispatch(
        addPersonalInfo({
          personalInfo: {
            [field]: newValue,
          },
        }),
      )
    } else {
      dispatch(
        addPersonalInfo({
          personalInfo: {
            [field]: value,
          },
        }),
      )
    }
  }

  const fileRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (
    field: string,
    file: FileList | null,
    prevFile: FileStructure,
  ) => {
    const selectedFile = Array.from(file || [])
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const FILE_TYPES = ['image/png', 'image/jpeg']
    if (!file) {
      return
    }
    if (!FILE_TYPES.includes(selectedFile[0].type) && fileRef.current) {
      fileRef.current.value = ''
      return toast(
        'File type is not acceptable. Please select JPEG, JPG, or PNG',
      )
    }
    const isOverSize = selectedFile[0]?.size > MAX_SIZE_MB
    if (isOverSize && fileRef.current) {
      fileRef.current.value = ''
      return toast.warning('File size exceeds 2MB')
    }
    if (!prevFile) {
      setFiles({ ...files, [field]: selectedFile })
    } else {
      // delete uploaded image logic
      dispatch(
        addPersonalInfo({
          personalInfo: {
            file: null,
            name: '',
            selectNewFile: false,
          },
        }),
      )
      setFiles({ ...files, [field]: selectedFile })
    }
  }

  const handleFileUpload = (field: string, file: File[]) => {
    //uploading of image logic here
    const uploadedImage = file
    dispatch(
      addPersonalInfo({
        personalInfo: {
          [field]: {
            file: uploadedImage,
            name: file[0].name,
            selectNewFile: false,
          },
        },
      }),
    )
    toast.success('File uploaded successfully!')
  }

  const handleSelectNewFile = (field: string) => {
    dispatch(
      addPersonalInfo({
        personalInfo: {
          [field]: {
            file: null,
            name: '',
            selectNewFile: true,
          },
        },
      }),
    )
    setFiles({ ...files, [field]: null })
  }

  const navigate = useNavigate()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      (files.driversLicense && !driversLicense.file) ||
      (files.passport && !passport.file)
    ) {
      toast.warning('Please upload the file(s) chosen.')
      return
    }
    const validateData = useValidateSchema(personalInfoFormSchema, personalInfo)
    if (!validateData) return

    navigate('/onboarding/professional/experience')
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto space-y-6 space-y-3 md:space-y-4 mb-10"
    >
      <FormInput
        name="firstName"
        value={user_data?.first_name}
        handleInputChange={handleInputChange}
        type="text"
        required
        className="bg-gray-300 capitalize h-11 pr-6 pl-3"
        placeholder="First Name"
        disabled
      />

      <FormInput
        name="lastName"
        value={user_data?.last_name}
        handleInputChange={handleInputChange}
        type="text"
        required
        className="bg-gray-300 capitalize h-11 pr-6 pl-3"
        placeholder="Last Name"
        disabled
      />

      <FormInput
        name="email"
        value={user_data?.email.toLowerCase()}
        handleInputChange={handleInputChange}
        type="email"
        placeholder="Email"
        required
        className="bg-gray-300 h-11 pl-3 pr-6 "
        disabled
      />

      <FormInput
        name="phone"
        value={user_data?.phone}
        handleInputChange={handleInputChange}
        type="text"
        required
        maxLength={11}
        className={`bg-gray-300 capitalize h-11 pl-3 pr-6 `}
        placeholder="Phone Number"
        disabled
      />

      {/* <FormSelect
        name="gender"
        value={user_data?.profile?.gender}
        handleInputChange={handleInputChange}
        selectItems={genderOptions}
        className="capitalize bg-gray-300 h-[44px] pr-6 disabled:cursor-auto [&>svg]:hidden"
        required
        placeholder="Gender"
        disabled
      /> */}

      <FormInput
        name="nin"
        value={nin}
        handleInputChange={handleInputChange}
        type="text"
        required
        maxLength={10}
        className={`bg-gray-300 capitalize h-11 pr-6 pl-3 placeholder:text-foreground ${
          nin.length > 0 && nin.length !== 10
            ? 'focus-visible:border-destructive focus-visible:ring-destructive border-destructive '
            : 'focus-visible:border-primary focus-visible:ring-primary '
        }`}
        placeholder="Enter NIN"
      />
      <FormFile
        name="driversLicense"
        label="Upload drivers license (optional)"
        handleFileChange={handleFileChange}
        ref={fileRef}
        handleFileUpload={handleFileUpload}
        file={files.driversLicense}
        fileUploaded={driversLicense}
        handleSelectNewFile={handleSelectNewFile}
      />
      <FormFile
        name="passport"
        label="Upload passport"
        handleFileChange={handleFileChange}
        ref={fileRef}
        handleFileUpload={handleFileUpload}
        file={files.passport}
        fileUploaded={passport}
        handleSelectNewFile={handleSelectNewFile}
      />

      <div className=" max-w-xs mx-auto">
        <Button type="submit" className="py-4 w-full">
          Next
        </Button>
      </div>
    </form>
  )
}
