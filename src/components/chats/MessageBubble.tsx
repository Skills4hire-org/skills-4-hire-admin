import type { Message } from '@/types/chat.types'
import type { UserData } from '@/types/user.types'
import { useSelector } from 'react-redux'

interface MessageProps {
  message: Message
}

export default function MessageBubble({ message }: MessageProps) {
  const { user_data }: { user_data: UserData } = useSelector(
    (state: any) => state.userState,
  )

  const isSent = message.sender.user_id === user_data.user_id

  const formattedTime = new Date(message.created_at).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs text-sm relative
        ${
          isSent
            ? 'bg-primary/20 text-foreground rounded-br-none'
            : 'bg-gray-100 text-black rounded-bl-none'
        }`}
      >
        {/* Message text */}
        <div className="break-words pb-2.5">{message.content}</div>

        {/* Timestamp */}
        <span
          className={`absolute bottom-1 right-2 text-[10px]
          ${isSent ? 'text-foreground/60' : 'text-gray-500'}`}
        >
          {formattedTime}
        </span>
      </div>
    </div>
  )
}
