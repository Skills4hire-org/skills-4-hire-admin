import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import NoResultFound from '@/components/global/NoResultFound'
import MobileWithAvatarAndDesktopHeader from '@/components/header/MobileWithAvatarAndDesktopHeader'
import ReviewCard from '@/components/reviews/ReviewCard'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useReviews } from '@/hooks/useReviews'
import type { Review } from '@/types/reviews.types'
import { Star } from 'lucide-react'

function Reviews() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useReviews()
  const reviews = data?.pages.flatMap((page) => page.results) ?? []

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })
  const handleReviewsFetchingError = async () => {
    if (!data) {
      refetch()
    } else {
      fetchNextPage()
    }
  }
  return (
    <div className="space-y-2 md:space-y-4">
      <Container className="bg-white">
        <MobileWithAvatarAndDesktopHeader title="Reviews" />
      </Container>
      <Container>
        {isLoading ? (
          <div className="h-24">
            <Loading />
          </div>
        ) : (
          <>
            {isError && !data ? (
              <div className="py-6">
                <Error
                  text="Failed to load your reviews"
                  buttonFunc={handleReviewsFetchingError}
                />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-2 md:gap-4 max-w-xl mx-auto">
                  {reviews?.map((review: Review) => (
                    <ReviewCard key={review.review_id} {...review} />
                  ))}
                </div>
                {reviews?.length === 0 && (
                  <NoResultFound text="No reviews" icon={Star} />
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
                    text="Failed to load more reviews"
                    buttonFunc={fetchNextPage}
                    buttonText="Retry"
                  />
                )}
              </>
            )}
          </>
        )}
      </Container>
    </div>
  )
}
export default Reviews
