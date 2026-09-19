export interface User {
  id: string
  name: string
  avatar?: string
}

export type CreateConversation = {
  participant_two_id: string
}

export interface Avatar {
  avatar_id: string
  avatar: string
}

export interface Profile {
  display_name: string
  professional_title: string | null
  avatar: Avatar | null
}

export interface User {
  user_id: string
  first_name: string
  last_name: string
  email: string
  profile: Profile
}

export type Message = {
  message_id: string
  conversation: string
  sender: User
  content: string
  is_read: boolean
  is_edited: boolean
  created_at: string
  edited_at: string | null
}

export type Conversation = {
  conversation_id: string
  participant_one: string
  participant_two: User
  message_count: number
  unread_count: number
  last_message: {
    message_id: string
    content: string
    created_at: string
    is_read: boolean
  }

  created_at: string
  updated_at: string
}
