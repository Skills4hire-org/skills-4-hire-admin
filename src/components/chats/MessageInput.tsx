import { useCreateMessage } from '@/hooks/useChats'
import { SendHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface MessageInputProps {
  conversationId: string
}

export default function MessageInput({ conversationId }: MessageInputProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { mutate: sendMessage } = useCreateMessage()

  const MIN_HEIGHT = 40
  const MAX_HEIGHT = 120

  // 🔥 Auto resize logic
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    const newHeight = Math.min(textarea.scrollHeight, MAX_HEIGHT)

    textarea.style.height = `${newHeight}px`
    textarea.style.overflowY =
      textarea.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden'
  }, [text])

  const handleSend = () => {
    sendMessage(
      {
        conversation_id: conversationId,
        data: {
          content: text,
        },
      },
      {
        onSuccess: () => {
          setText('')
          if (textareaRef.current) {
            textareaRef.current.style.height = `${MIN_HEIGHT}px`
          }
        },
      },
    )
  }

  return (
    <div className="p-2 pb-0 border-t flex items-end gap-2">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        rows={1}
        className="flex-1 resize-none border rounded-lg px-3 py-2 text-sm focus:outline-none"
        style={{
          minHeight: MIN_HEIGHT,
          maxHeight: MAX_HEIGHT,
        }}
      />

      <button
        onClick={handleSend}
        className="bg-primary text-white p-2 rounded-full cursor-pointer mb-0.5"
      >
        <SendHorizontal className="w-5 h-5" />
      </button>
    </div>
  )
}
