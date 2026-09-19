import { ChevronDown } from 'lucide-react'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import SearchBar from '@/components/global/SearchBar'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import { useAllProviders } from '@/hooks/useUsers'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import ServiceProviderServiceCard from '@/components/service-provider/ServiceProviderServiceCard'
import type { Provider } from '@/types/user.types'
import type { Favorite } from '@/types/favourites.type'
import { useFavourites } from '@/hooks/useFavourites'

export default function SingleService() {
  const { service } = useParams()
  const formatService = service?.replaceAll('-', ' ')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    min_charge: null,
    ratings: null,
    search: null,
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
  } = useAllProviders({ profession: formatService, ...filters })

  const {
    data: favoritesData,
    isLoading: favoritesLoading,
    isError: favouritesError,
  } = useFavourites()
  const favourites: Favorite = favoritesData
  const providersID = favourites?.providers?.map(
    ({ provider_id }) => provider_id,
  )
  const professionals: Provider[] =
    data?.pages.flatMap((page) => page.results) ?? []

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })
  const handleProviderFetchingError = async () => {
    if (!data) {
      refetch()
    } else {
      fetchNextPage()
    }
  }

  const handleFilters = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value })
  }
  return (
    <div className="min-h-screen ">
      <div className="capitalize">
        <HeaderWithBackNavigation title={formatService} />
      </div>
      <Container>
        <div className="space-y-4">
          <div>
            <SearchBar
              placeholder="Search service"
              maxWidth="100%"
              value={searchQuery}
              setSearchQuery={setSearchQuery}
              onSubmit={() => handleFilters('search', searchQuery)}
            />
          </div>
          <div className="hidden md:flex items-center justify-center gap-3">
            {['Another', 'Service', 'More', 'Rating'].map((label) => (
              <div
                key={label}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 
              rounded-md text-sm w-28 cursor-pointer hover:bg-gray-50"
              >
                {label}
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            ))}
          </div>
          <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-9 md:ml-0">
            {isLoading || favoritesLoading ? (
              <div className="h-24">
                <Loading />
              </div>
            ) : (
              <>
                {!isError || favouritesError ? (
                  <div className="py-10">
                    <Error
                      text="Failed to load professionals"
                      buttonFunc={handleProviderFetchingError}
                    />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      {professionals?.map((professional) => (
                        <ServiceProviderServiceCard
                          key={professional.provider_id}
                          {...professional}
                          providerIDs={providersID}
                          favouriteID={favourites?.favourite_id}
                        />
                      ))}
                    </div>
                    {professionals?.length == 0 && (
                      <>
                        <p className="text-center text-sm md:text-base text-gray-400 py-6">
                          {filters.min_charge ||
                          filters.ratings ||
                          filters.search
                            ? 'No professional found. Adjust your filters'
                            : 'No professional providing this service yet. Check back later.'}
                        </p>
                      </>
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
                        text="Failed to load more professionals"
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
      </Container>
    </div>
  )
}
