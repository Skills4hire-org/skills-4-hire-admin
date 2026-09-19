import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import { useSelector } from 'react-redux'
import { useIsMobile } from '@/hooks/use-mobile'
import { ChevronLeft } from 'lucide-react'
import ProfileImage from '../global/ProfileImage'
import type { UserType } from '@/utils/types'
import {
  updateConversationList,
  updateMessage,
  useChatSocket,
  useMessages,
} from '@/hooks/useChats'
import type { Message } from '@/types/chat.types'
import ProposePriceDialog from './ProposePriceDialog'
import NegotiatePriceDialog from './NegotiatePriceDialog'
import AgreementDialog from './AgreementDialog'
import Loading from '../global/Loading'
import Error from '../global/Error'

export default function ChatWindow() {
  const { conversation_id } = useParams()
  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFetchNextPageError,
  } = useMessages({ conversation_id })
  const messages: Message[] = data?.pages.flatMap((page) => page.results) ?? []

  useChatSocket(conversation_id!, (incomingMessage) => {
    updateMessage(incomingMessage, conversation_id!)
    updateConversationList(incomingMessage)
  })

  const isMobile = useIsMobile()

  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  const handleMessageFetchingError = () => {
    refetch()
  }
  const containerRef = useRef<HTMLDivElement>(null)
  const handleScroll = () => {
    const container = containerRef.current

    if (!container) return

    const isNearTop = container.scrollTop < 100

    if (isNearTop && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if (!conversation_id) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a conversation to start chatting.
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {isLoading ? (
        <div className="h-24">
          <Loading />
        </div>
      ) : isError && !data ? (
        <div className="py-10">
          <Error
            text="Failed to load messages"
            buttonFunc={handleMessageFetchingError}
          />
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <div className="flex items-center gap-3 border-b pb-2 -mt-2">
              {isMobile && (
                <Link to={`/${userType}/chats`} className="text-sm">
                  <ChevronLeft className="w-6 h-6" />
                </Link>
              )}
              <div className="flex items-center gap-2">
                <ProfileImage size="size-10" noStatus />
                <div>
                  <h2 className="font-semibold text-lg">
                    {messages[0].sender.profile.display_name}
                  </h2>
                  <div className="text-xs md:text-sm flex items-center gap-1.5 font-medium -mt-0.5">
                    <span className="w-2 h-2 block bg-primary  rounded-full"></span>
                    {/*  <span>Online</span> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center max-w-xs mx-auto border mt-3 rounded-sm text-xs/3.5  py-1 ">
              <ProposePriceDialog />
              <NegotiatePriceDialog />
              <AgreementDialog />
            </div>
          </div>

          {/* MESSAGES */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3"
            ref={containerRef}
            onScroll={handleScroll}
          >
            {isFetchingNextPage && (
              <div className="text-sm md:text-base">
                Loading older messages...
              </div>
            )}
            {isFetchNextPageError && (
              <Error
                text="Failed to load older messages"
                buttonFunc={fetchNextPage}
                buttonText="Retry"
              />
            )}
            {messages?.map((message) => {
              return (
                <MessageBubble key={message.message_id} message={message} />
              )
            })}
          </div>
          <div ref={bottomRef} />
          {/* INPUT */}
          <MessageInput conversationId={conversation_id} />
        </>
      )}
    </div>
  )
}
