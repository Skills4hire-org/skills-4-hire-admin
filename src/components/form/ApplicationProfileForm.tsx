import { useState, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import FormInput from '../form-fields/FormInput'
import { Button } from '../ui/button'
import {
  addApplicationProfile,
  clearForms,
} from '@/features/registration/registrationSlice'

import { useValidateSchema } from '@/hooks/useValidateSchema'
import { applicationProfileFormSchema } from '@/utils/schemas'

import { uploadToCloudinary } from '@/utils/cloudinary'
import { completeOnboard, selectRole } from '@/api/onboard'
import type { Registration } from '@/types/onboard.types'

export default function ApplicationProfileForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { personalInfo, experience, applicationProfile }: Registration =
    useSelector((state: any) => state.registrationState)

  const { country, city, address, dateOfBirth, headline, state } = applicationProfile

  const [submitting, setSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    dispatch(
      addApplicationProfile({
        applicationProfile: { [field]: value },
      }),
    )
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const valid = useValidateSchema(
      applicationProfileFormSchema,
      applicationProfile,
    )

    if (!valid) return

    setSubmitting(true)


    try {
      const driversLicense = await uploadToCloudinary(
        personalInfo.driversLicense?.file,
      )

      const passport = await uploadToCloudinary(personalInfo.passport?.file)

      const cert = await uploadToCloudinary(experience.certificateFile?.file)

      const workImg = await uploadToCloudinary(experience.workImage?.file)
      const profilePayload = {
        professional_title: experience.service,
        headline,
        profile: {
          country,
          city,
          location: address,
        },

        years_of_experience: experience.experienceYears ? Number(experience.experienceYears) : 0,

        nin: personalInfo.nin,

        date_of_birth: dateOfBirth,

        place_of_work: experience.previousWorkPlaces,

        is_certified: experience.certification === 'yes',

        certifications: cert
          ? [
              {
                file_url: cert[0]?.url,
                public_id: cert[0]?.public_id,
                description: 'Certification document',
              },
            ]
          : [],

        work_images: workImg
          ? [
              {
                image_url: workImg[0]?.url,
                public_id: workImg[0]?.public_id,
                description: 'Work sample',
              },
            ]
          : null,

        drivers_license: driversLicense
          ? {
              file_url: driversLicense[0]?.url,
              public_id: driversLicense[0]?.public_id,
            }
          : null,

        passport_photo: passport
          ? {
              file_url: passport[0]?.url,
              public_id: passport[0]?.public_id,
            }
          : null,
      }
      await completeOnboard(profilePayload)
      await selectRole('SERVICE_PROVIDER')
      toast.success('Registration successful!')
      dispatch(clearForms())
      navigate('/professional/home')
    } catch (error: any) {
      toast.error(error?.message || 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
      <FormInput
        name="country"
        label="Country/Region"
        value={country}
        handleInputChange={handleInputChange}
        type="text"
        required
      />
      <FormInput
        name="state"
        label="State"
        value={state}
        handleInputChange={handleInputChange}
        type="text"
        required
      />

      <FormInput
        name="city"
        label="City"
        value={city}
        handleInputChange={handleInputChange}
        type="text"
        required
      />

      <FormInput
        name="address"
        label="Address"
        value={address}
        handleInputChange={handleInputChange}
        type="text"
        required
      />

      <FormInput
        name="dateOfBirth"
        label="Date of Birth"
        value={dateOfBirth}
        handleInputChange={handleInputChange}
        type="date"
        required
      />

      <FormInput
        name="headline"
        label="Headline"
        value={headline}
        handleInputChange={handleInputChange}
        type="text"
        maxLength={90}
        required
      />

      <div className="max-w-xs mx-auto mt-6">
        <Button className="w-full py-4" disabled={submitting}>
          {submitting ? 'Registering...' : 'Register'}
        </Button>
      </div>
    </form>
  )
}
