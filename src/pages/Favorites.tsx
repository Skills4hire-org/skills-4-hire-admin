import NoFavoriteCard from '@/components/favorites/NoFavoriteCard'
import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import MobileWithAvatarAndDesktopHeader from '@/components/header/MobileWithAvatarAndDesktopHeader'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import { useFavourites } from '@/hooks/useFavourites'
import type { Favorite } from '@/types/favourites.type'

export default function Favorites() {
  const { data, isLoading, isError, refetch } = useFavourites()
  const favourites: Favorite = data
  const allFavourites = favourites?.providers ?? []
  const providersID = allFavourites?.map(({ provider_id }) => provider_id)

  const handleFavouritesFetchingError = () => {
    refetch()
  }

  return (
    <div className="space-y-2 md:space-y-4">
      <Container className="bg-white">
        <MobileWithAvatarAndDesktopHeader title="Favorites" />
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
                  text="Failed to load your favorite skilled professionals"
                  buttonFunc={handleFavouritesFetchingError}
                />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-2 md:gap-4 max-w-xl mx-auto">
                  {allFavourites?.map((favourite) => (
                    <ServiceProviderCard
                      key={favourite.provider_id}
                      {...favourite}
                      providerIDs={providersID}
                      favouriteID={favourites?.favourite_id}
                    />
                  ))}
                </div>

                {allFavourites?.length === 0 && <NoFavoriteCard />}
              </>
            )}
          </>
        )}
      </Container>
    </div>
  )
}
