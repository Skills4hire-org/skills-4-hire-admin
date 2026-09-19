import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import SearchBar from '@/components/global/SearchBar'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import { useFavourites } from '@/hooks/useFavourites'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useAllProviders } from '@/hooks/useUsers'
import type { Favorite } from '@/types/favourites.type'
import type { Provider } from '@/types/user.types'
import { useState } from 'react'

export default function ServicesSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [providerSearchQuery, setProviderSearchQuery] = useState('')
  const handleSearchQuery = () => {
    setProviderSearchQuery(searchQuery)
    setSearchQuery('')
  }

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useAllProviders({ search: providerSearchQuery })
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

  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title="What are you looking for?" />
      <Container>
        <div className="space-y-4 md:space-y-6">
          <SearchBar
            placeholder="Search for services"
            maxWidth="w-full md:max-w-xl"
            autoFocus
            value={searchQuery}
            onSubmit={handleSearchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-base font-semibold ">
              {providerSearchQuery
                ? `Search result for "${providerSearchQuery}"`
                : 'Recommended for you'}
            </h2>
            {isLoading || favoritesLoading ? (
              <div className="h-24">
                <Loading />
              </div>
            ) : (
              <>
                {isError || favouritesError ? (
                  <div className="py-10">
                    <Error
                      text="Failed to load professionals"
                      buttonFunc={handleProviderFetchingError}
                    />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      {professionals?.slice(0, 5).map((professional) => (
                        <ServiceProviderCard
                          key={professional.provider_id}
                          {...professional}
                          providerIDs={providersID}
                          favouriteID={favourites?.favourite_id}
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
