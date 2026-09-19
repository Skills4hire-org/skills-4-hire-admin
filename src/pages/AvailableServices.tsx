import type { AvailableServices } from '@/utils/types'
import { Link } from 'react-router-dom'
import Container from '@/components/global/Container'
import ServicesCard from '@/components/services/ServicesCard'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useAllServices } from '@/hooks/useServices'
import type { Service } from '@/types/services.types'
import Loading from '@/components/global/Loading'
import Error from '@/components/global/Error'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export default function AvailableServices() {
  const {
    data: vocationalServices,
    isLoading: vocationalServicesLoading,
    isError: vocationalServicesError,
    refetch: vocationalServicesRefetch,
    fetchNextPage: vocationalServicesFetchNextPage,
    hasNextPage: vocationalServicesHasNextPage,
    isFetchingNextPage: vocationalServicesIsFetchingNextPage,
    isFetchNextPageError: vocationalServicesIsFetchingNextPageError,
  } = useAllServices({ category: 'vocational' })

  const {
    data: digitalServices,
    isLoading: digitalServicesLoading,
    isError: digitalServicesError,
    refetch: digitalServicesRefetch,
    fetchNextPage: digitalServicesFetchNextPage,
    hasNextPage: digitalServicesHasNextPage,
    isFetchingNextPage: digitalServicesIsFetchingNextPage,
    isFetchNextPageError: digitalServicesIsFetchingNextPageError,
  } = useAllServices({ category: 'digital' })

  const vocationalServicesList: Service[] =
    vocationalServices?.pages.flatMap((page) => page.results) ?? []

  const handleVocationalServiceFetchingError = async () => {
    if (!vocationalServices) {
      vocationalServicesRefetch()
    } else {
      vocationalServicesFetchNextPage()
    }
  }

  const loadMoreVocationalServicesRef = useInfiniteScroll({
    hasNextPage: vocationalServicesHasNextPage,
    isFetchingNextPage: vocationalServicesIsFetchingNextPage,
    fetchNextPage: vocationalServicesFetchNextPage,
  })
  const digitalServicesList: Service[] =
    digitalServices?.pages.flatMap((page) => page.results) ?? []

  const handleDigitalServiceFetchingError = async () => {
    if (!digitalServices) {
      digitalServicesRefetch()
    } else {
      digitalServicesFetchNextPage()
    }
  }

  const loadMoreDigitalServicesRef = useInfiniteScroll({
    hasNextPage: digitalServicesHasNextPage,
    isFetchingNextPage: digitalServicesIsFetchingNextPage,
    fetchNextPage: digitalServicesFetchNextPage,
  })

  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title="Available services" />
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

          <div className="space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-sm font-semibold capitalize text-center">
                Vocational & On-Site Services
              </h3>
              {vocationalServicesLoading ? (
                <div className="h-24">
                  <Loading />
                </div>
              ) : (
                <>
                  {vocationalServicesError && !vocationalServices ? (
                    <div className="h-24">
                      <Error
                        text="Failed to load services"
                        buttonFunc={handleVocationalServiceFetchingError}
                        buttonText="Retry"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 xl:grid-cols-5 gap-2 md:gap-4">
                        {vocationalServicesList?.map((service) => (
                          <ServicesCard key={service.service_id} {...service} />
                        ))}
                      </div>

                      <div ref={loadMoreVocationalServicesRef} />

                      {vocationalServicesIsFetchingNextPage && (
                        <div className="py-4 text-center">
                          <Loading />
                        </div>
                      )}
                      {vocationalServicesHasNextPage && (
                        <button
                          className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
                          onClick={() => vocationalServicesFetchNextPage()}
                        >
                          Load more
                        </button>
                      )}
                      {vocationalServicesIsFetchingNextPageError && (
                        <Error
                          text="Failed to load more services"
                          buttonFunc={vocationalServicesFetchNextPage}
                          buttonText="Retry"
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-sm font-semibold capitalize text-center">
                Digital Skills & Online Services
              </h3>
              {digitalServicesLoading ? (
                <div className="h-24">
                  <Loading />
                </div>
              ) : (
                <>
                  {digitalServicesError && !digitalServices ? (
                    <div className="py-6">
                      <Error
                        text="Failed to load services"
                        buttonFunc={handleDigitalServiceFetchingError}
                        buttonText="Retry"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 xl:grid-cols-5 gap-2 md:gap-4">
                        {digitalServicesList?.map((service) => (
                          <ServicesCard key={service.service_id} {...service} />
                        ))}
                      </div>

                      <div ref={loadMoreDigitalServicesRef} />

                      {digitalServicesIsFetchingNextPage && (
                        <div className="py-4 text-center">
                          <Loading />
                        </div>
                      )}
                      {digitalServicesHasNextPage && (
                        <button
                          className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
                          onClick={() => digitalServicesFetchNextPage()}
                        >
                          Load more
                        </button>
                      )}
                      {digitalServicesIsFetchingNextPageError && (
                        <Error
                          text="Failed to load more services"
                          buttonFunc={digitalServicesFetchNextPage}
                          buttonText="Retry"
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
