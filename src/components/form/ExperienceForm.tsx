import { useRef, useState, type FormEvent } from 'react'
import FormSelect from '../form-fields/FormSelect'
import {
  certificationOptions,
  serviceTypes,
  yearsOfExperience,
} from '@/assets/data'
import FormFile from '../form-fields/FormFile'
import FormInput from '../form-fields/FormInput'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { addExperience } from '@/features/registration/registrationSlice'
import { toast } from 'sonner'
import type { ExperienceFormData, FileStructure } from '@/types/onboard.types'

export default function ExperienceForm() {
  const [files, setFiles] = useState({
    certificateFile: null,
    workImage: null,
  })
  const { experience }: { experience: ExperienceFormData } = useSelector(
    (state: any) => state.registrationState,
  )
  const {
    service,
    certification,
    experienceYears,
    previousWorkPlaces,
    workImage,
    certificateFile,
  } = experience

  const dispatch = useDispatch()
  const handleInputChange = (field: string, value: string) => {
    dispatch(
      addExperience({
        experience: {
          [field]: value,
        },
      }),
    )
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
    const isOverSize = selectedFile[0].size > MAX_SIZE_MB
    if (isOverSize && fileRef.current) {
      fileRef.current.value = ''
      return toast.warning('File size exceeds 2MB')
    }
    if (!prevFile.file) {
      setFiles({ ...files, [field]: selectedFile })
    } else {
      // delete uploaded image logic
      dispatch(
        addExperience({
          experience: {
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
      addExperience({
        experience: {
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
      addExperience({
        experience: {
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
      (files.certificateFile && !certificateFile.file) ||
      (files.workImage && !workImage.file)
    ) {
      toast.warning('Please upload the file(s) chosen.')
      return
    }
    navigate('/onboarding/professional/application-profile')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 mb-10">
      <FormSelect
        label="What type of services do you specialize in?"
        name="service"
        value={service}
        handleInputChange={handleInputChange}
        selectItems={serviceTypes}
        className="capitalize bg-transparent pb-1 pl-3 pr-6 border-b-foreground border-x-0 border-t-0 h-6 pt-0 rounded-none shadow-none [&>svg]:hidden "
        align="end"
        selectContentClassName="bg-gray-300 shadow-none rounded-none border-0 absolute   break-all w-66 -right-0.5"
        selectItemClassName="place-content-center w-64 rounded-none px-4"
        sideOffset={-4}
        indicator
        required
      />
      <FormSelect
        label="Do you have any certifications or training related to your work?"
        name="certification"
        value={certification}
        handleInputChange={handleInputChange}
        selectItems={certificationOptions}
        className="capitalize bg-transparent pb-1 pl-3 pr-6 border-b-foreground border-x-0 border-t-0 h-6 pt-0 rounded-none shadow-none [&>svg]:hidden"
        align="end"
        selectContentClassName="bg-gray-300 shadow-none rounded-none border-0 absolute min-w-18 w-full break-all -right-0.5"
        selectItemClassName="place-content-center w-16 rounded-none px-4"
        sideOffset={-4}
        indicator
      />
      {certification == 'yes' && (
        <FormFile
          name="certificateFile"
          handleFileChange={handleFileChange}
          required={certification === 'yes'}
          handleFileUpload={handleFileUpload}
          file={files.certificateFile}
          ref={fileRef}
          fileUploaded={certificateFile}
          handleSelectNewFile={handleSelectNewFile}
        />
      )}
      <FormSelect
        label="How many years of experience do you have in this field?"
        name="experienceYears"
        value={experienceYears}
        handleInputChange={handleInputChange}
        selectItems={yearsOfExperience}
        className="capitalize bg-transparent pb-1 pl-3 pr-6 border-b-foreground border-x-0 border-t-0 h-6 pt-0 rounded-none shadow-none [&>svg]:hidden"
        align="end"
        selectContentClassName="bg-gray-300 shadow-none rounded-none border-0 absolute min-w-17 w-full break-all -right-0.5"
        selectItemClassName="place-content-center w-15  rounded-none px-4"
        sideOffset={-4}
        indicator
      />
      <FormInput
        name="previousWorkPlaces"
        label="Where have you worked before?"
        value={previousWorkPlaces}
        handleInputChange={handleInputChange}
        type="text"
        className="bg-transparent pb-1 px-3 border-b-foreground border-x-0 focus-visible:ring-0 border-t-0 h-6 pt-0 rounded-none shadow-none"
        placeholder=""
      />
      <div className="relative">
        <FormFile
          name="workImage"
          label="Upload an image of your work"
          handleFileChange={handleFileChange}
          ref={fileRef}
          handleFileUpload={handleFileUpload}
          file={files.workImage}
          fileUploaded={workImage}
          handleSelectNewFile={handleSelectNewFile}
        />
      </div>

      <div className=" max-w-xs mx-auto mt-6">
        <Button className="py-4 w-full">Next</Button>
      </div>
    </form>
  )
}
