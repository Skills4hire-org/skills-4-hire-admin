export type FileStructure = {
  file: File[] | null
  name: string
  selectNewFile: boolean
}

export type PersonalInformationFormData = {
  nin: string
  driversLicense: FileStructure
  passport: FileStructure
}

export type ExperienceFormData = {
  service: string | undefined
  certification: string | undefined
  certificateFile: FileStructure
  experienceYears: string | undefined
  previousWorkPlaces: string
  workImage: FileStructure
}

export type ApplicationProfileFormData = {
  country: string
  state:string
  city: string
  address: string
  dateOfBirth: string
  headline: string
}

export type Registration = {
  personalInfo: PersonalInformationFormData
  experience: ExperienceFormData
  applicationProfile: ApplicationProfileFormData
}

export type RequiredFormData = {
  country: string
  city: string
  address: string
  dateOfBirth: string
  headline: string
  firstName: string
  lastName: string
  phone: string
  nin: string
  service: string | undefined
}
