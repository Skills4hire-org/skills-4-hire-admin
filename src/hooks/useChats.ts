import {
  createConversation,
  createMessage,
  getConversationList,
  getMessages,
} from '@/api/chat'
import type {
  Conversation,
  CreateConversation,
  Message,
} from '@/types/chat.types'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useEffect, useRef } from 'react'
import { queryClient } from '@/utils/queryClientConfig'

export const useCreateConversation = () => {
  const createConversationAction = async (data: CreateConversation) => {
    try {
      const response = await createConversation(data)
      return response
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  const createConversationFunction = useMutation({
    mutationFn: createConversationAction,
  })

  return createConversationFunction
}
export const useCreateMessage = () => {
  const createMessageAction = async ({
    conversation_id,
    data,
  }: {
    conversation_id: string
    data: {
      content: string
    }
  }) => {
    try {
      await createMessage({ conversation_id, data })
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  const createMessageFunction = useMutation({
    mutationFn: createMessageAction,
  })

  return createMessageFunction
}

export const useConversations = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['conversations'],
    queryFn: ({ pageParam }) => getConversationList(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.current_page < lastPage.pagination.total_pages) {
        return lastPage.pagination.current_page + 1
      }

      return undefined
    },
    retry: 1,
  })

  return queryData
}

export const useMessages = ({
  conversation_id,
}: {
  conversation_id: string | undefined
}) => {
  const queryData = useInfiniteQuery({
    queryKey: ['messages', conversation_id],
    queryFn: ({ pageParam }) => getMessages({ pageParam, conversation_id }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.current_page < lastPage.pagination.total_pages) {
        return lastPage.pagination.current_page + 1
      }

      return undefined
    },
    retry: 1,
    enabled: !!conversation_id,
  })
  return queryData
}

export const useChatSocket = (
  conversationId: string,
  onMessage: (data: any) => void,
) => {
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (!conversationId) return

    const BASE_URL = import.meta.env.VITE_API_BASE_URL

    const ws = new WebSocket(`${BASE_URL}/ws/chats/${conversationId}/`)

    socketRef.current = ws

    ws.onopen = () => {
      console.log('connected')
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      onMessage(data)
    }

    ws.onclose = () => {
      console.log('closed')
    }

    return () => {
      ws.close()
    }
  }, [conversationId])

  return socketRef
}

export const updateConversationList = (incomingMessage: any) => {
  queryClient.setQueryData(
    ['conversations'],
    (old: { results: Conversation[] }) => {
      if (!old) return old

      const updated = old.results.map((conv) => {
        if (conv.conversation_id !== incomingMessage.conversation) {
          return conv
        }

        return {
          ...conv,

          last_message: {
            message_id: incomingMessage.message_id,

            content: incomingMessage.content,

            created_at: incomingMessage.created_at,

            is_read: incomingMessage.is_read,
          },

          updated_at: incomingMessage.created_at,

          message_count: conv.message_count + 1,
        }
      })

      const sortUpdated = updated.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      )

      return {
        ...old,
        results: sortUpdated,
      }
    },
  )
}

export const updateMessage = (
  incomingMessage: any,
  conversation_id: string,
) => {
  queryClient.setQueryData(
    ['messages', conversation_id],
    (old: { pages: [{ results: Message[] }] }) => {
      if (!old) return old

      const firstPage = old.pages[0]

      return {
        ...old,

        pages: [
          {
            ...firstPage,

            results: [...firstPage.results, incomingMessage],
          },

          ...old.pages.slice(1),
        ],
      }
    },
  )
}
