import { useComments } from '@/hooks/usePosts'
import type { PostComment } from '@/types/post.types'
import Loading from '../global/Loading'
import Error from '../global/Error'
import CommentCard from './CommentCard'
import { MoreHorizontal } from 'lucide-react'

export default function Comment({ post_id }: { post_id: string | undefined }) {
  const {
    data,
    isError,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useComments({ post_id })
  const comments: PostComment[] =
    data?.pages.flatMap((page) => page.results) ?? []
  const handleCommentFetchingError = () => {
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
              text="Failed to load comments"
              buttonFunc={handleCommentFetchingError}
            />
          ) : (
            <>
              <div className="grid gap-6">
                {/* Content Comment */}
                {comments?.map((singleComment) => (
                  <CommentCard
                    key={singleComment.comment_id}
                    {...singleComment}
                    post_id={post_id}
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
                    Load more comments
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
                  text="Failed to load more comments"
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
