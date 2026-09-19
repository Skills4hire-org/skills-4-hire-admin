/* import { serviceProviderProfileRegistrationSteps } from '@/assets/data'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import RegistrationProgress from '@/components/registration/RegistrationProgress'
import RegistrationStepCard from '@/components/registration/RegistrationStepCard'
import type {
  ApplicationProfileFormData,
  ExperienceFormData,
  PersonalInformationFormData,
  Registration,
} from '@/utils/types'
import { useSelector } from 'react-redux'

export default function Registration() {
  const { personalInfo, experience, applicationProfile }: Registration =
    useSelector((state: any) => state.registrationState)

  const personalInfoFields: (keyof PersonalInformationFormData)[] = [
    'firstName',
    'lastName',
    'phone',
    'nin',
  ]
  const experienceFields: (keyof ExperienceFormData)[] = ['service']
  const applicationProfileFields: (keyof ApplicationProfileFormData)[] = [
    'country',
    'city',
    'address',
    'dateOfBirth',
    'headline',
  ]
  const filledPersonalInfoFields = personalInfoFields.filter(
    (key) => personalInfo[key] !== '' && personalInfo['nin'].length == 10
  )
  const filledExperienceFields = experienceFields.filter(
    (key) => experience[key] !== undefined
  )
  const filledApplicationProfileFields = applicationProfileFields.filter(
    (key) =>
      applicationProfile[key] !== '' &&
      applicationProfile['headline'].length >= 25
  )

  const handleCheckedForm = (title: string) => {
    if (
      title == 'personal information' &&
      filledPersonalInfoFields.length == 4
    ) {
      return true
    }
    if (title == 'experience' && filledExperienceFields.length == 1) {
      return true
    }
    if (
      title == 'application profile' &&
      filledApplicationProfileFields.length === 5
    ) {
      return true
    }
    return false
  }

  return (
    <div className="space-y-2 md:space-y-4">
      <HeaderWithBackNavigation title="Complete Profile" />

      <Container>
        <div className="max-w-xl mx-auto space-y-6 md:space-y-8">
          <RegistrationProgress />
          <div className="space-y-2 md:space-y-4 ">
            {serviceProviderProfileRegistrationSteps.map((step) => (
              <RegistrationStepCard
                key={step.title}
                {...step}
                handleCheckedState={handleCheckedForm}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
 */
