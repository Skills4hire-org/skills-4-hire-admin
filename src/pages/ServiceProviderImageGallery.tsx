import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import ServiceProviderGallery from '@/components/service-provider/ServiceProviderGallery'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useUserGallery } from '@/hooks/useUsers'
import type { Gallery } from '@/types/user.types'
import { useParams } from 'react-router-dom'

export default function ServiceProviderImageGallery() {
  const { id } = useParams()
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useUserGallery({ id })

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const gallery: Gallery[] = data?.pages.flatMap((page) => page.results) ?? []

  const handleGalleryFetchingError = async () => {
    refetch()
  }
  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title={`Gallery`} />
      <Container>
        {isLoading ? (
          <div className="h-24">
            <Loading />
          </div>
        ) : (
          <>
            {isError && !data ? (
              <div className="py-10">
                <Error
                  text="Failed to load gallery"
                  buttonFunc={handleGalleryFetchingError}
                />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
                  {gallery?.map((gallery) => (
                    <ServiceProviderGallery
                      key={gallery.description}
                      image={gallery.image_url}
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
                    Load more media
                  </button>
                )}
                {isFetchNextPageError && (
                  <Error
                    text="Failed to load more media"
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
