import { useCommentReplies } from '@/hooks/usePosts'
import type { CommentReplies } from '@/types/post.types'
import Loading from '../global/Loading'
import Error from '../global/Error'
import CommentCard from './CommentCard'
import { MoreHorizontal } from 'lucide-react'

export default function CommentReplies({
  comment_id,
  post_id,
  depth,
}: {
  comment_id: string | undefined
  post_id: string | undefined
  depth: number
}) {
  const {
    data,
    isError,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useCommentReplies({ post_id, comment_id })
  const replies: CommentReplies[] =
    data?.pages.flatMap((page) => page.results) ?? []

  const handleRepliesFetchingError = () => {
    if (!data) {
      refetch()
    } else {
      fetchNextPage()
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isError ? (
            <Error
              text="Failed to load replies"
              buttonFunc={handleRepliesFetchingError}
            />
          ) : (
            <>
              <div className="grid gap-6">
                {/* Content Comment */}
                {replies?.map((singleComment) => (
                  <CommentCard
                    key={singleComment.comment_id}
                    {...singleComment}
                    post_id={post_id}
                    depth={depth}
                  />
                ))}
              </div>
              {hasNextPage && (
                <div className="flex items-center gap-1">
                  <div className="p-1 bg-gray-100 w-max rounded-full">
                    <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <button
                    className="text-[10px] md:text-xs font-medium cursor-pointer hover:bg-gray-100 p-1 rounded-sm"
                    onClick={() => fetchNextPage()}
                  >
                    Load more replies
                  </button>
                </div>
              )}
              {isFetchingNextPage && (
                <div className="py-4 text-center">
                  <Loading />
                </div>
              )}
              {isFetchNextPageError && (
                <Error
                  text="Failed to load more replies"
                  buttonFunc={fetchNextPage}
                  buttonText="Retry"
                />
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
