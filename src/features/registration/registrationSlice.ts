import type { Registration } from '@/types/onboard.types'
import { createSlice } from '@reduxjs/toolkit'

const defaultState: Registration = {
  personalInfo: {
    nin: '',
    driversLicense: {
      file: null,
      name: '',
      selectNewFile: true,
    },
    passport: {
      file: null,
      name: '',
      selectNewFile: true,
    },
  },

  experience: {
    service: undefined,
    certification: undefined,
    certificateFile: {
      file: null,
      name: '',
      selectNewFile: true,
    },
    experienceYears: undefined,
    previousWorkPlaces: '',
    workImage: {
      file: null,
      name: '',
      selectNewFile: true,
    },
  },

  applicationProfile: {
    country: '',
    state: '',
    city: '',
    address: '',
    dateOfBirth: '',
    headline: '',
  },
}

const registrationSlice = createSlice({
  name: 'registration',
  initialState: defaultState,

  reducers: {
    addPersonalInfo: (state, action) => {
      const { personalInfo } = action.payload
      state.personalInfo = { ...state.personalInfo, ...personalInfo }
    },

    addExperience: (state, action) => {
      const { experience } = action.payload
      state.experience = { ...state.experience, ...experience }
    },

    addApplicationProfile: (state, action) => {
      const { applicationProfile } = action.payload
      state.applicationProfile = {
        ...state.applicationProfile,
        ...applicationProfile,
      }
    },

    clearForms: (state) => {
      state.applicationProfile = defaultState.applicationProfile
      state.experience = defaultState.experience
      state.personalInfo = defaultState.personalInfo
    },
  },
})

export const {
  addPersonalInfo,
  addExperience,
  addApplicationProfile,
  clearForms,
} = registrationSlice.actions

export default registrationSlice.reducer
