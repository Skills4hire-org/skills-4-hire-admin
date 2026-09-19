export type Review = {
  review_id: string
  reviewed_by: {
    profile: {
      display_name: string
      avatar: {
        avatar: string
      }
    }
  }
  provider_profile: {
    provider_id: string
    profile: {
      display_name: string
      avatar: {
        avatar: string
      }
    }
    professional_title: string
  }
  ratings: number
  review: string
  created_at: string
}

export type getReviews = {
  count: number
  next: string
  previous: string
  results: Review[]
}
