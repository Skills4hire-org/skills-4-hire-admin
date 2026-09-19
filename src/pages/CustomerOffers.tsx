import OfferCard from '@/components/home/OfferCard'
import { useMyPosts } from '@/hooks/usePosts'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import type { Post } from '@/types/post.types'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import NoJobsFound from '@/components/global/NoResultFound'
import { Briefcase } from 'lucide-react'

export default function CustomerOffers() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useMyPosts()

  const offers: Post[] = data?.pages.flatMap((page) => page.results) ?? []

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })
  const handleOffersFetchingError = async () => {
    if (!data) {
      refetch()
    } else {
      fetchNextPage()
    }
  }

  return (
    <div
      className="
        grid grid-cols-1 
        lg:px-4
        space-y-4
      "
    >
      {isLoading ? (
        <div className="h-24">
          <Loading />
        </div>
      ) : (
        <>
          {isError && !data ? (
            <div className="py-10">
              <Error
                text="Failed to load your offers"
                buttonFunc={handleOffersFetchingError}
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {offers?.length === 0 ? (
                  <NoJobsFound icon={Briefcase} text="No job offers found" />
                ) : (
                  offers?.map((offer) => (
                    <OfferCard key={offer.post_id} {...offer} />
                  ))
                )}
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
                  Load more
                </button>
              )}
              {isFetchNextPageError && (
                <Error
                  text="Failed to load more job offers"
                  buttonFunc={fetchNextPage}
                  buttonText="Retry"
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
