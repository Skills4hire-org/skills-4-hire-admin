/* import { useSelector } from 'react-redux'
import CircularProgress from './CircularProgress' */

/* export default function RegistrationProgress() {
  const { personalInfo, experience, applicationProfile }: Registration =
    useSelector((state: any) => state.registrationState)
  const requiredFormData: RequiredFormData = {
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    phone: personalInfo.phone,
    nin: personalInfo.nin,
    service: experience.service,
    ...applicationProfile,
  }
  const requiredFields: (keyof RequiredFormData)[] = [
    'firstName',
    'lastName',
    'phone',
    'nin',
    'service',
    'country',
    'city',
    'address',
    'dateOfBirth',
    'headline',
  ]

  const calculateCompletionPercentage = () => {
    const filledFields = requiredFields.filter((key) => {
      const value = requiredFormData[key]

      if (key == 'nin') {
        return value?.length === 10
      }
      if (key == 'headline') {
        return value && value.length >= 25
      }
      return value !== undefined && value !== ''
    })
    const percentage = 20 + (filledFields.length / requiredFields.length) * 80
    return percentage
  }
  const totalPercentage = calculateCompletionPercentage()
  return (
    <div className="text-center space-y-0.5 md:space-y-1">
      <CircularProgress
        percentage={totalPercentage}
        size="w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
      />

      <p className="text-xs md:text-sm text-muted-foreground mt-1.5">
        Fill out your profile to get jobs
      </p>
    </div>
  )
} */
