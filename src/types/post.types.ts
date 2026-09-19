export type CreatePost = {
  post_title?: string
  post_content: string
  post_type?: 'GENERAL' | 'SERVICE' | 'JOB'
  amount?: string
  duration?: string
  country?: string
  city?: string
  state?: string
  is_remote?: boolean
  attachments?: {
    attachment_type: string /* 'VIDEO' | 'PHOTO' | 'FILES' */
    attachmentURL: string
  }[]
  tags?: string[]
}

export type PostParams = {
  tags_name?: string
  city?: string
  state?: string
  min_amount?: string
  max_amount?: string
  post_id?: string
  pageParam?: string
}

export type OfferFormType = {
  title: string
  post: string
  budget: string
  timeFrame: string | undefined
  service: string | undefined
  photo: File[]
  attachment: File[]
  city: string
  state: string
}

export type Post = {
  post_id?: string
  post_title?: string | null
  user?: {
    user_id: string
    first_name?: string
    last_name?: string
    total_reviews?: number
    profile?: {
      display_name: string

      city: string | null
      avatar: {
        avatar: string
      }
      professional_title: string
    }
    avg_rating?: number | null
  }
  post_content?: string
  created_at?: string
  updated_at: string
  tags?: {
    name: string
    service_category_id: string
  }[]
  attachments?: {
    post_attachment_id: string
    attachment_type: string
    attachmentURL: string
    created_at: string
  }[]
  comments_counts?: number
  likes_count?: number
  reposts_count?: number
  is_liked?: boolean
  is_commented?: boolean
  is_reposted?: boolean
  duration?: number
  post_status?: string
  amount?: string
  start_date?: string
  end_date?: string
  is_remote?: boolean
  country?: string
  city?: string
  state?: string
}

export type Offers = {
  reposts_count?: number
  commments_counts?: number
  likes_count?: number
  user?: {
    first_name: string
    last_name: string
  }
  post_id?: string
  post_content?: string
  created_at?: string
}

export type PostComment = {
  post_id?: string
  comment_id: string
  total_replies: number
  total_likes: number
  message: string
  user?: {
    user_id: string
    profile?: {
      display_name: string
      avatar: {
        avatar: string
      }
    }
  }
  is_liked: boolean
  is_replied: boolean
  created_at: string
}

export type SendComment = {
  message: string
}

export type CommentReplies = PostComment & {
  parent: string
}

export type Reposted = {
  repost_id: string
  reposted_by: {
    profile: {
      display_name: string
      avatar: {
        avatar: string
      }
    }
  }
}
