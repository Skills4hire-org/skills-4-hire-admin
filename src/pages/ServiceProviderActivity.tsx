import { serviceProviderActivityTabList } from '@/assets/data'
import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import CommentCard from '@/components/home/CommentCard'
import PostCard from '@/components/home/PostCard'
import EmptyTab from '@/components/service-provider/EmptyTab'
import ServiceProviderGallery from '@/components/service-provider/ServiceProviderGallery'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useMyMedia, useUserComments, useUserPosts } from '@/hooks/usePosts'
import { cn } from '@/lib/utils'
import type { Media } from '@/types/user.types'
import { useParams } from 'react-router-dom'

export default function ServiceProviderActivity() {
  const { id } = useParams()
  const {
    data: post,
    isLoading: postLoading,
    isError: postError,
    refetch: postRefetch,
    fetchNextPage: postFetchNextPage,
    hasNextPage: postHasNextPage,
    isFetchingNextPage: postIsFetchingNextPage,
    isFetchNextPageError: postIsFetchNextPageError,
  } = useUserPosts({ id })

  const {
    data: comment,
    isLoading: commentLoading,
    isError: commentError,
    refetch: commentRefetch,
    fetchNextPage: commentFetchNextPage,
    hasNextPage: commentHasNextPage,
    isFetchingNextPage: commentIsFetchingNextPage,
    isFetchNextPageError: commentIsFetchNextPageError,
  } = useUserComments({ id })
  const {
    data: media,
    isLoading: mediaLoading,
    isError: mediaError,
    refetch: mediaRefetch,
    fetchNextPage: mediaFetchNextPage,
    hasNextPage: mediaHasNextPage,
    isFetchingNextPage: mediaIsFetchingNextPage,
    isFetchNextPageError: mediaIsFetchNextPageError,
  } = useMyMedia({ user_id: id })

  const loadPostMoreRef = useInfiniteScroll({
    hasNextPage: postHasNextPage,
    isFetchingNextPage: postIsFetchingNextPage,
    fetchNextPage: postFetchNextPage,
  })
  const loadCommentMoreRef = useInfiniteScroll({
    hasNextPage: commentHasNextPage,
    isFetchingNextPage: commentIsFetchingNextPage,
    fetchNextPage: commentFetchNextPage,
  })
  const loadMediaMoreRef = useInfiniteScroll({
    hasNextPage: mediaHasNextPage,
    isFetchingNextPage: mediaIsFetchingNextPage,
    fetchNextPage: mediaFetchNextPage,
  })

  const postActivity = post?.pages.flatMap((page) => page.results) ?? []
  const commentActivity = comment?.pages.flatMap((page) => page.results) ?? []
  const mediaActivity = media?.pages.flatMap((page) => page.results) ?? []

  const handlePostFetchingError = async () => {
    postRefetch()
  }
  const handleCommentFetchingError = async () => {
    commentRefetch()
  }
  const handleMediaFetchingError = async () => {
    mediaRefetch()
  }

  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title="All Activity" />
      <Container>
        <Tabs defaultValue="posts" className="space-y-1 relative ">
          <TabsList className="border-b-0 bg-background  rounded-none p-0 space-x-4 md:space-x-8">
            {serviceProviderActivityTabList.map((status, index) => {
              return (
                <div key={index}>
                  <TabsTrigger
                    value={status}
                    className={cn(
                      'bg-background cursor-pointer capitalize border border-muted-foreground px-4 pt-2 pb-2.5 rounded-full text-base md:text-lg text-muted-foreground data-[state=active]:bg-green-700 data-[state=active]:border-green-700 data-[state=active]:text-white data-[state=active]:border-b-1 font-medium',
                    )}
                  >
                    {status}
                  </TabsTrigger>
                </div>
              )
            })}
          </TabsList>
          {serviceProviderActivityTabList.map((status) => {
            return (
              <TabsContent key={status} value={status}>
                {status === 'posts' &&
                  (postLoading ? (
                    <div className="h-24">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      {postError && !post ? (
                        <div className="py-10">
                          <Error
                            text="Failed to load posts"
                            buttonFunc={handlePostFetchingError}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="grid gap-2 md:gap-4">
                            {postActivity?.length == 0 ? (
                              <div className="py-10 -mt-2 md:-mt-4">
                                <EmptyTab label="posts" />
                              </div>
                            ) : (
                              postActivity?.map((post) => (
                                <PostCard key={post.post_id} {...post} />
                              ))
                            )}
                          </div>

                          <div ref={loadPostMoreRef} />

                          {postIsFetchingNextPage && (
                            <div className="py-4 text-center">
                              <Loading />
                            </div>
                          )}
                          {postHasNextPage && (
                            <button
                              className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
                              onClick={() => postFetchNextPage()}
                            >
                              Load more posts
                            </button>
                          )}
                          {postIsFetchNextPageError && (
                            <Error
                              text="Failed to load more posts"
                              buttonFunc={postFetchNextPage}
                              buttonText="Retry"
                            />
                          )}
                        </>
                      )}
                    </>
                  ))}
                {status === 'media' &&
                  (mediaLoading ? (
                    <div className="h-24">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      {mediaError && !media ? (
                        <div className="py-10">
                          <Error
                            text="Failed to load media"
                            buttonFunc={handleMediaFetchingError}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
                            {mediaActivity?.length == 0 ? (
                              <div className="py-10 -mt-2 md:-mt-4">
                                <EmptyTab label="media" />
                              </div>
                            ) : (
                              mediaActivity?.map((media: Media) => (
                                <ServiceProviderGallery
                                  key={media.post_attachment_id}
                                  image={media.attachmentURL}
                                />
                              ))
                            )}
                          </div>

                          <div ref={loadMediaMoreRef} />

                          {mediaIsFetchingNextPage && (
                            <div className="py-4 text-center">
                              <Loading />
                            </div>
                          )}
                          {mediaHasNextPage && (
                            <button
                              className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
                              onClick={() => mediaFetchNextPage()}
                            >
                              Load more media
                            </button>
                          )}
                          {mediaIsFetchNextPageError && (
                            <Error
                              text="Failed to load more media"
                              buttonFunc={mediaFetchNextPage}
                              buttonText="Retry"
                            />
                          )}
                        </>
                      )}
                    </>
                  ))}
                {status === 'comments' &&
                  (commentLoading ? (
                    <div className="h-24">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      {commentError && !comment ? (
                        <div className="py-10">
                          <Error
                            text="Failed to load comments"
                            buttonFunc={handleCommentFetchingError}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="grid gap-2 md:gap-4">
                            {commentActivity?.length == 0 ? (
                              <div className="py-10 -mt-2 md:-mt-4">
                                <EmptyTab label="comments" />
                              </div>
                            ) : (
                              commentActivity?.map((comment) => (
                                <CommentCard
                                  key={comment.comment_id}
                                  {...comment}
                                />
                              ))
                            )}
                          </div>

                          <div ref={loadCommentMoreRef} />

                          {commentIsFetchingNextPage && (
                            <div className="py-4 text-center">
                              <Loading />
                            </div>
                          )}
                          {commentHasNextPage && (
                            <button
                              className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
                              onClick={() => commentFetchNextPage()}
                            >
                              Load more comments
                            </button>
                          )}
                          {commentIsFetchNextPageError && (
                            <Error
                              text="Failed to load more job offers"
                              buttonFunc={commentFetchNextPage}
                              buttonText="Retry"
                            />
                          )}
                        </>
                      )}
                    </>
                  ))}
              </TabsContent>
            )
          })}
        </Tabs>
      </Container>
    </div>
  )
}
