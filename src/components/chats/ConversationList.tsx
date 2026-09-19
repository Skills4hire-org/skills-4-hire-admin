import ConversationCard from './ConversationCard'
import type { Conversation } from '@/types/chat.types'
import NoChat from './NoChat'
import SearchBar from '../global/SearchBar'
import { useState } from 'react'
import { useConversations } from '@/hooks/useChats'
import Loading from '../global/Loading'
import Error from '../global/Error'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export default function ConversationList() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFetchNextPageError,
  } = useConversations()
  const conversations: Conversation[] =
    data?.pages.flatMap((page) => page.results) ?? []
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearchQuery = () => {}

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const handleConversationFetchingError = () => {
    refetch()
  }

  return (
    <div className="h-full overflow-y-auto">
      {isLoading ? (
        <div className="h-24">
          <Loading />
        </div>
      ) : isError && !data ? (
        <div className="py-10">
          <Error
            text="Failed to load conversations"
            buttonFunc={handleConversationFetchingError}
          />
        </div>
      ) : (
        <>
          {conversations.length === 0 ? (
            <NoChat />
          ) : (
            <div className="space-y-4 md:space-y-6">
              <SearchBar
                placeholder="Search"
                maxWidth="max-w-md"
                value={searchQuery}
                onSubmit={handleSearchQuery}
                setSearchQuery={setSearchQuery}
              />
              <div className="grid grid-cols-1 gap-2">
                {conversations.map((conversation) => (
                  <ConversationCard
                    key={conversation.conversation_id}
                    conversation={conversation}
                  />
                ))}
              </div>
              <div ref={loadMoreRef} />

              {isFetchingNextPage && (
                <div className="py-4 text-center">
                  <Loading />
                </div>
              )}
              {hasNextPage && (
                <button
                  className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
                  onClick={() => fetchNextPage()}
                >
                  Load more conversations
                </button>
              )}
              {isFetchNextPageError && (
                <Error
                  text="Failed to load more conversations"
                  buttonFunc={fetchNextPage}
                  buttonText="Retry"
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
