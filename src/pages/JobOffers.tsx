import JobOfferCard from '@/components/home/JobOfferCard'
import { Briefcase, Sliders } from 'lucide-react'
import { useMemo, useState } from 'react'
import FilterModal from '@/components/home/FilterModal'
import SortDropdown from '@/components/home/SortDropdown'
import NoJobsFound from '@/components/global/NoResultFound'
import { carouselServices } from '@/assets/data'
import { useOffers } from '@/hooks/usePosts'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Post } from '@/types/post.types'

export default function JobOffers() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    serviceType: '',
    minAmount: '',
    maxAmount: '',
    state: '',
    city: '',
  })
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useOffers({
    tags_name: filters.serviceType,
    city: filters.city,
    state: filters.state,
    min_amount: filters.minAmount,
    max_amount: filters.maxAmount,
  })

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

  const [sortType, setSortType] = useState('')

  const hasActiveFilters = Object.values(filters).some(Boolean)

  const services = carouselServices.map((service) => service.text)

  const sortedOffers = useMemo(() => {
    const sortOffers =
      offers &&
      offers.flat().sort((a, b) => {
        const aAmount = Number(a.amount)
        const bAmount = Number(b.amount)
        const aDate = new Date(a.updated_at).getTime()
        const bDate = new Date(b.updated_at).getTime()

        switch (sortType) {
          case 'newest':
            return bDate - aDate
          case 'oldest':
            return aDate - bDate
          case 'highest':
            return bAmount - aAmount
          case 'lowest':
            return aAmount - bAmount
          default:
            return 0
        }
      })

    return sortOffers
  }, [offers, sortType])

  return (
    <div className="lg:px-4">
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        services={services}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold text-sm md:text-base text-gray-900">
            Recent Job Offers
          </h2>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setFilterOpen(true)}
              className="
                relative
                inline-flex
                items-center
                gap-2
                h-[36px]
                px-4
                rounded-md
                bg-white
                border border-gray-200
                text-xs md:text-sm
                shadow-sm
                hover:bg-gray-50
                hover:border-gray-200
                transition cursor-pointer
              "
              disabled={isLoading}
            >
              <Sliders className="w-4 h-4" />
              Filter
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full" />
              )}
            </button>
            <SortDropdown value={sortType} setValue={setSortType} />
          </div>
        </div>
        {isLoading ? (
          <div className="h-24">
            <Loading />
          </div>
        ) : (
          <>
            {!isError && !data ? (
              <div className="py-10">
                <Error
                  text="Failed to load job offers"
                  buttonFunc={handleOffersFetchingError}
                />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4">
                  {sortedOffers?.length === 0 ? (
                    <NoJobsFound
                      icon={Briefcase}
                      text="No job offers found"
                      subtitle=" Try adjusting your filters or reset search"
                    />
                  ) : (
                    sortedOffers?.map((offer) => (
                      <JobOfferCard key={offer.post_id} {...offer} />
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
    </div>
  )
}
