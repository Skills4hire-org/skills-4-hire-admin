import MobileServicesOverviewHeader from '@/components/header/MobileServicesOverviewHeader'
import SectionHeading from '@/components/services/SectionHeading'
import { Link } from 'react-router-dom'
import Container from '@/components/global/Container'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import ServicesCard from '@/components/services/ServicesCard'
import ReferAndEarnBanner from '@/components/services/ReferAndEarnBanner'
import DesktopServicesOverviewHeader from '@/components/header/DesktopServicesOverviewHeader'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import { useAllServices } from '@/hooks/useServices'
import type { Service } from '@/types/services.types'
import { useAllProviders } from '@/hooks/useUsers'
import type { Provider } from '@/types/user.types'
import { useFavourites } from '@/hooks/useFavourites'
import type { Favorite } from '@/types/favourites.type'

export default function Services() {
  const { data, isLoading, isError, refetch } = useAllServices({})
  const {
    data: providers,
    isLoading: providersLoading,
    isError: providersError,
    refetch: refetchProviders,
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

  const services: Service[] = data?.pages.flatMap((page) => page.results) ?? []
  const professionals: Provider[] =
    providers?.pages.flatMap((page) => page.results) ?? []

  const handleProviderFetchingError = () => {
    refetchProviders()
  }

  const handleServicesFetchingError = () => {
    refetch()
  }

  return (
    <div className="space-y-2 md:space-y-6">
      <Container className="bg-white">
        <MobileServicesOverviewHeader />
        <DesktopServicesOverviewHeader />
      </Container>

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
          <section className="space-y-3 pb-1.5 min-h-32">
            <div className="flex items-center justify-between gap-6">
              <SectionHeading heading="Available services" />
              <Link
                to="available-services"
                className="text-xs text-primary underline"
              >
                View all
              </Link>
            </div>
            {isLoading ? (
              <div className="h-24">
                <Loading />
              </div>
            ) : (
              <>
                {isError ? (
                  <div className="h-24">
                    <Error
                      text="Failed to load available services"
                      buttonFunc={handleServicesFetchingError}
                      buttonText="Retry"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 xl:grid-cols-6 gap-2 md:gap-4">
                    {services?.slice(0, 6)?.map((service) => (
                      <ServicesCard key={service.service_id} {...service} />
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
          <ReferAndEarnBanner />
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-6">
              <SectionHeading heading="Professionals for you" />
              <Link
                to="professionals"
                className="text-xs text-primary underline"
              >
                View all
              </Link>
            </div>
            {providersLoading || favoritesLoading ? (
              <div className="h-24">
                <Loading />
              </div>
            ) : (
              <>
                {providersError || favouritesError ? (
                  <div className="py-10">
                    <Error
                      text="Failed to load professionals"
                      buttonFunc={handleProviderFetchingError}
                      buttonText="Retry"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {professionals?.slice(0, 4).map((professional) => (
                      <ServiceProviderCard
                        key={professional.provider_id}
                        {...professional}
                        providerIDs={providersID}
                        favouriteID={favourites?.favourite_id}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </Container>
    </div>
  )
}
