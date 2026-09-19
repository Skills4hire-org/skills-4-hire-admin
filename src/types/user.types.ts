export type UserType = 'customer' | 'professional' | null
export type UserData = {
  user_id: string
  email: string
  total_reviews: number
  is_provider: boolean
  is_customer: boolean
  is_verified: boolean
  first_name: string
  last_name: string
  phone: string
  profile: {
    display_name: string
    professional_title: string
    gender: string
    country: string
    city: string
    avatar: {
      avatar: string
    }
  }
  avg_rating: number
}

export type AuthUser = {
  userType: UserType | null
  access: string | null
  refresh: string | null
  user_data: UserData | null
}

export type Provider = {
  provider_id: string
  profile: {
    display_name: string
    city: string
    state: string
    avatar: {
      avatar: string
      is_active: boolean
    }
  }
  professional_title: string
  avg_rating: string
  total_reviews: string
  skills: [
    {
      skill: {
        image: string
      }
    },
  ]
  providerIDs?: string[]
  favouriteID?: string
  min_charge: number
  headline: string
}

export type ProviderParams = {
  search?: string | null
  profession?: string | null
  min_charge?: number | null
  max_charge?: number | null
  ratings?: number | null
  pageParam?: string
}

export type Service = {
  service_id?: string
  name: string
  description?: string
  charge: number
  category_id?: string
  years_of_experience?: number
  attachments: {
    image_url: string
    image_public_id: string
  }[]
}

export type Media = {
  post_attachment_id: string
  attachment_type: 'PHOTO' | 'VIDEO' | 'FILE'
  attachmentURL: string
}

export type Gallery = {
  image_url: string
  description?: string
  public_id?: string
  work_image_id?: string
  thumbnail_url?: string
  type?: string
}

export type Profile = {
  provider_id: string
  professional_title: string
  max_charge: string
  min_charge: string
  avg_rating: number
  total_reviews: number
  completed_bookings: number
  headline: string
  overview: string
  endorsement_count: number
  user: {
    user_id: string
    phone: string
    email: string
    first_name: string
    last_name: string
    is_provider: boolean
    is_customer: boolean
    is_verified: boolean
    profile: {
      gender: string
      display_name: string
      trust_score: number
      country: string
      city: string
      state: string
      location: 'Beside NYSC lodge'
      avatar: {
        avatar: string
      }
      customer_id: string
      provider_id: string
      cover_photo: {
        image_url: string
      }
    }
  }

  posts: {
    post_id: string
    post_title: string
    user: {
      user_id: string
      email: string
      first_name: string
      total_reviews: number
      last_name: string
      is_provider: boolean
      is_customer: boolean
      is_verified: boolean
      profile: {
        display_name: string
        professional_title: string
        country: string
        city: string
        created_at: string
        avatar: {
          avatar: string
        }
        user: string
        customer_id: string | null
        provider_id: string | null
      }
      avg_rating: number | null
    }
    post_content: string
    post_type: string
    created_at: string
    updated_at: string
    tags: {
      name: string
      service_category_id: string
    }[]
    attachments: {
      post_attachment_id: string
      attachment_type: string
      attachmentURL: string
      created_at: string
    }[]
    comments_count: number
    likes_count: number
    reposts_count: number
    is_liked: boolean
    is_commented: boolean
    is_reposted: boolean
    duration: number
    post_status: string
  }[]
  comments: {
    comment_id: string
    user: {
      user_id: string
      email: string
      first_name: string
      total_reviews: number
      last_name: string
      is_provider: boolean
      is_customer: boolean
      is_verified: boolean
      profile: {
        gender: string
        display_name: string
        professional_title: string
        country: string
        city: string
        created_at: string
        avatar: {
          avatar: string
        }
        user: string
        customer_id: string
        provider_id: string
      }
      avg_rating: number
    }
    message: string
    attachments: {
      attachment_type: string
      attachmentURL: string
    }
    parent: string
    created_at: string
    is_liked: boolean
    is_replied: boolean
    total_replies: number
    total_likes: number
  }[]
  services: Service[]
  gallary: Gallery[]
  media: Media[]
}

export type ProfileFormData = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  gender?: string
  profileImage?: string
  profileFile: File[] | null
  countryCode: string
}
export type ProfileOverviewFormData = {
  firstName?: string
  lastName?: string
  profession?: string
  headline?: string
  minCharge?: string
  maxCharge?: string
  address?: string
  city?: string
  state?: string
}

export type ServiceProviderServiceCard = {
  service_id: string
  name: string
  min_charge: string
  max_charge: string
  attachments: {
    image_url: string
  }[]
}
