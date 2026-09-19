export type Booking = {
  booking_id: string
  booking_status: string
  customer: {
    profile: {
      display_name: string
      avatar: {
        avatar: string
      }
    }
  }
  provider: {
    provider_id: string
    profile: {
      display_name: string
      avatar: {
        avatar: string
      }
    }
    professional_title: string
    avg_rating: number
  }
  price: number
  descriptions: string
  created_at: string
}

export type BookingInfo = {
  emergency: boolean
  notes: string
  date: string
  time: string
  type: 'onsite' | 'remote' | null
  address: string
  savedAddress: string
  paymentAmount: string
  paymentRemark: string
  serviceProviderName: string
  serviceProviderOccupation: string
}
