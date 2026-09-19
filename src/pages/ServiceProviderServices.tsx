import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import ServiceProviderCard from '@/components/service-provider/ServiceProviderCard'
import ServiceProviderServicesCard from '@/components/service-provider/ServiceProviderServicesCard'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useAllProviders, useUserServices } from '@/hooks/useUsers'
import type { Provider, Service } from '@/types/user.types'
import { useParams } from 'react-router-dom'

export default function ServiceProviderServices() {
  const { profession, id } = useParams()
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useUserServices({ id })
  const {
    data: providers,
    isLoading: providersLoading,
    isError: providersError,
    refetch: providersRefetch,
  } = useAllProviders({
    profession,
  })
  const services: Service[] = data?.pages.flatMap((page) => page.results) ?? []
  const professionals: Provider[] =
    providers?.pages.flatMap((page) => page.results) ?? []

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const handleServicesFetchingError = () => {
    refetch()
  }
  const handleProfessionalsFetchingError = () => {
    providersRefetch()
  }
  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title={`Services`} />
      <Container className="relative">
        <div className="grid grid-cols gap-4 md:gap-6 xl:grid-cols-7 xl:gap-10 ">
          <div className="xl:col-span-4">
            {isLoading ? (
              <div className="h-24">
                <Loading />
              </div>
            ) : (
              <>
                {isError && !data ? (
                  <div className="py-10">
                    <Error
                      text="Failed to load services"
                      buttonFunc={handleServicesFetchingError}
                    />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      {services?.map((service) => (
                        <ServiceProviderServicesCard
                          check={true}
                          key={service.service_id}
                          {...service}
                          isDeleteable={false}
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
                        Load more services
                      </button>
                    )}
                    {isFetchNextPageError && (
                      <Error
                        text="Failed to load more services"
                        buttonFunc={fetchNextPage}
                        buttonText="Retry"
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <div className="xl:col-span-3">
            <div className="space-y-2 md:space-y-4 border p-2 md:p-4 rounded-md shadow-sm ">
              <h2 className="font-semibold text-lg md:text-xl ">
                Similar skilled professionals
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {providersLoading ? (
                  <div className="h-24">
                    <Loading />
                  </div>
                ) : (
                  <>
                    {providersError && !data ? (
                      <div className="py-10">
                        <Error
                          text="Failed to load similar skilled professionals"
                          buttonFunc={handleProfessionalsFetchingError}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 gap-4">
                          {professionals?.slice(0, 6)?.map((professional) => (
                            <ServiceProviderCard
                              key={professional.provider_id}
                              {...professional}
                            />
                          ))}
                        </div>

                        {professionals?.length === 0 && (
                          <p className="text-base md:text-lg font-medium text-center h-24 flex items-center justify-center">
                            No Similar skilled professional found
                          </p>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
