import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import MediaGallery from '@/components/global/MediaGallery'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import GalleryDialog from '@/components/profile/GalleryDialog'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useMyGallery } from '@/hooks/useUsers'
import type { Gallery } from '@/types/user.types'
import { Edit2, Undo2 } from 'lucide-react'
import { useState } from 'react'

export default function ProfileGallery() {
  const [editGallery, setEditGallery] = useState(false)
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useMyGallery()

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const gallery: Gallery[] =
    data?.pages.flatMap((page) => page.data.results) ?? []

  const handleGalleryFetchingError = async () => {
    refetch()
  }
  return (
    <div className="space-y-2 md:space-y-6 relative">
      <HeaderWithBackNavigation title="Gallery" />
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
              <div>
                {editGallery ? (
                  <div className="flex items-center gap-2 absolute top-3 md:top-4 right-2 md:right-4">
                    <GalleryDialog />
                    <button
                      className="text-gray-600 hover:text-gray-500 cursor-pointer shadow-sm hover:shadow-md rounded-sm p-0.5"
                      onClick={() => setEditGallery(false)}
                    >
                      <Undo2
                        strokeWidth={2}
                        className="w-5 h-5 md:w-6 md:h-6"
                      />
                      <span className="sr-only">close edit</span>
                    </button>
                  </div>
                ) : (
                  <button
                    className="text-primary absolute top-3 md:top-4 right-2 md:right-4 cursor-pointer text-primary/80"
                    onClick={() => setEditGallery(true)}
                  >
                    <Edit2 strokeWidth={2} className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="sr-only">open edit</span>
                  </button>
                )}
                <MediaGallery media={gallery} editGallery={editGallery} />

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
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  )
}
