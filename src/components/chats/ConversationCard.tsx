import type { Conversation } from '@/types/chat.types'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ProfileImage from '../global/ProfileImage'

interface ConversationProps {
  conversation: Conversation
}

export default function ConversationCard({ conversation }: ConversationProps) {
  const { conversationId } = useParams()
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )

  const isActive = conversationId === conversation.conversation_id

  return (
    <Link
      to={`/${userType}/chats/${conversation.conversation_id}`}
      className={`flex items-center p-2 rounded-md cursor-pointer bg-white gap-2 shadow-md 
        ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
    >
      <ProfileImage
        size="size-12 md:size-14"
        noStatus
        avatar={conversation.participant_two.profile.avatar?.avatar}
      />
      <div className="flex flex-1 gap-2">
        <div className="w-full">
          <h3 className="font-semibold text-sm md:text-base capitalize">
            {conversation.participant_two.profile.display_name}
          </h3>
          <span className="text-xs md:text-sm text-gray-500 block -mt-0.5">
            Plumber {conversation.participant_two.profile.professional_title}
          </span>
          <p className="text-sm md:text-base break-all line-clamp-1 w-full">
            {conversation.last_message.content || 'No messages yet'}
          </p>
        </div>
        <div className="flex flex-col items-center justify-between shrink-0">
          <span className="text-xs text-gray-500">09:15 AM</span>
          {conversation.unread_count > 0 && (
            <span className="bg-primary text-white text-xs md:text-sm w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full">
              {conversation.unread_count}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
