import { useRepostedBy } from '@/hooks/usePosts'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import Loading from '../global/Loading'
import Error from '../global/Error'
import NoResultFound from '../global/NoResultFound'
import { Repeat } from 'lucide-react'
import type { Reposted } from '@/types/post.types'
import RepostCard from './RepostCard'

interface RepostDialogProp {
  open: boolean
  onOpenChange: (value: boolean) => void
  post_id?: string
}

export default function RepostDialog({
  open,
  onOpenChange,
  post_id,
}: RepostDialogProp) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useRepostedBy({
    post_id,
  })
  const repostedBy: Reposted[] =
    data?.pages.flatMap((page) => page.results) ?? []

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })
  const handleFetchingError = async () => {
    if (!data) {
      refetch()
    } else {
      fetchNextPage()
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle>Reposted by</DialogTitle>
          <DialogDescription className="sr-only">
            List of users that reposted this post
          </DialogDescription>
        </DialogHeader>
        <div>
          {isLoading ? (
            <div className="h-24">
              <Loading />
            </div>
          ) : (
            <>
              {isError && !data ? (
                <div className="py-6">
                  <Error
                    text="Failed to load"
                    buttonFunc={handleFetchingError}
                  />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-2 md:gap-4 max-w-xl mx-auto">
                    {repostedBy?.map((user) => (
                      <RepostCard key={user.repost_id} {...user} />
                    ))}
                  </div>
                  {repostedBy?.length === 0 && (
                    <NoResultFound text="No repost yet" icon={Repeat} />
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
                      text="Failed to load more users"
                      buttonFunc={fetchNextPage}
                      buttonText="Retry"
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
