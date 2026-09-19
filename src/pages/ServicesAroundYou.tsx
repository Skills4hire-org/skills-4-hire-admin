import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import { Input } from '@/components/ui/input'
import { useFavourites } from '@/hooks/useFavourites'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useAllProviders } from '@/hooks/useUsers'
import type { Favorite } from '@/types/favourites.type'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ServicesAroundYou() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useAllProviders({})
  const {
    data: favoritesData,
    isLoading: favoritesLoading,
    isError: favouritesError,
  } = useFavourites()
  const favourites: Favorite = favoritesData
  const providersID = favourites?.providers?.map(
    ({ provider_id }) => provider_id,
  )
  const professionals = data?.pages.flatMap((page) => page.results) ?? []

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
      <HeaderWithBackNavigation title="Professionals for you" />
      <Container>
        <div className="space-y-4 md:space-y-6">
          <div>
            <Link to="/customer/services/search">
              <div className={`relative w-full mx-auto`}>
                <Input
                  type="text"
                  className={`pl-3 pr-10 rounded-md border h-8 md:h-9 text-sm md:text-base`}
                  placeholder="Search for services"
                  name="searchQuery"
                  id="searchQuery"
                />
                <button
                  type="submit"
                  className="absolute top-1/2  -translate-y-1/2 h-full right-0 w-8 bg-primary text-white rounded-r-md flex items-center justify-center"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              </div>
            </Link>
          </div>
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
                    {professionals?.map((professional) => (
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
      </Container>
    </div>
  )
}
