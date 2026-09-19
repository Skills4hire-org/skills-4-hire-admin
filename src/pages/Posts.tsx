import PostComposer from '@/components/home/PostComposer'
import PostCard from '../components/home/PostCard'
import { usePosts } from '@/hooks/usePosts'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Post } from '@/types/post.types'

export default function Posts() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = usePosts()
  const posts: Post[] = data?.pages.flatMap((page) => page.results) ?? []

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const handlePostFetchingError = () => {
    if (!data) {
      refetch()
    } else {
      fetchNextPage()
    }
  }

  return (
    <div className="lg:px-4 space-y-4">
      <PostComposer />
      <div>
        {isLoading ? (
          <div className="h-24">
            <Loading />
          </div>
        ) : (
          <>
            {isError && !data ? (
              <div className="py-10">
                <Error
                  text="Failed to load posts"
                  buttonFunc={handlePostFetchingError}
                />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4">
                  {posts?.map((post) => (
                    <PostCard key={post.post_id} {...post} />
                  ))}
                </div>

                {posts?.length === 0 && (
                  <p className="text-base md:text-lg font-medium text-center h-24 flex items-center justify-center">
                    No posts yet.
                  </p>
                )}

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
                    Load more
                  </button>
                )}
                {isFetchNextPageError && (
                  <Error
                    text="Failed to load more posts"
                    buttonFunc={fetchNextPage}
                    buttonText="Retry"
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
