import type { BookingInfo } from '@/types/bookings.type'
import type { ServiceProviderServiceCard } from '@/types/user.types'
import { createSlice } from '@reduxjs/toolkit'

interface Booking {
  services: ServiceProviderServiceCard[]
  step: number
  info: BookingInfo
}

const defaultState: Booking = {
  services: [],
  step: 1,
  info: {
    emergency: false,
    notes: '',
    date: '',
    time: '',
    type: 'onsite',
    address: '',
    savedAddress: '',
    paymentAmount: '',
    paymentRemark: '',
    serviceProviderName: '',
    serviceProviderOccupation: '',
  },
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState: defaultState,
  reducers: {
    addService: (state, action) => {
      const { service } = action.payload
      state.services.push(service)
    },
    removeService: (state, action) => {
      const { id } = action.payload
      state.services = state.services.filter(
        (service: ServiceProviderServiceCard) => service.service_id !== id,
      )
    },
    resetService: (state) => {
      state.services = []
    },
    handleSteps: (state, action) => {
      const { step } = action.payload
      state.step = step
    },
    handleBookingInfo: (state, action) => {
      const { info } = action.payload
      state.info = { ...state.info, ...info }
    },
  },
})

export const {
  addService,
  removeService,
  resetService,
  handleSteps,
  handleBookingInfo,
} = bookingSlice.actions

export default bookingSlice.reducer
