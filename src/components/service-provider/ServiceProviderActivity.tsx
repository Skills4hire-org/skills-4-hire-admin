import { serviceProviderActivityTabList } from '@/assets/data'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { cn } from '@/lib/utils'
import { TabsContent } from '@radix-ui/react-tabs'
import { Link } from 'react-router-dom'
import ServiceProviderGallery from './ServiceProviderGallery'
import { ArrowRight } from 'lucide-react'
import EmptyTab from './EmptyTab'
import type { Post, PostComment } from '@/types/post.types'
import type { Media } from '@/types/user.types'
import PostCard from '../home/PostCard'
import CommentCard from '../home/CommentCard'

export default function ServiceProviderActivity({
  posts,
  comments,
  media,
  user_id,
}: {
  posts: Post[] | undefined
  comments: PostComment[] | undefined
  media: Media[] | undefined
  user_id: string | undefined
}) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg md:text-xl ">Activity</h2>
      <Tabs defaultValue="posts" className="space-y-1 ">
        <TabsList className="border-b-0 bg-background  rounded-none  p-0 space-x-4 md:space-x-8">
          {serviceProviderActivityTabList.map((status, index) => {
            return (
              <TabsTrigger
                key={index}
                value={status}
                className={cn(
                  'bg-background cursor-pointer capitalize border border-muted-foreground px-4 pt-2 pb-2.5 rounded-full text-base md:text-lg text-muted-foreground data-[state=active]:bg-green-700 data-[state=active]:border-green-700 data-[state=active]:text-white data-[state=active]:border-b-1 font-medium',
                )}
              >
                {status}
              </TabsTrigger>
            )
          })}
        </TabsList>
        {serviceProviderActivityTabList.map((status) => {
          return (
            <TabsContent key={status} value={status} className="pb-10 md:pb-12">
              {status === 'posts' && (
                <>
                  {posts?.map((post) => (
                    <PostCard key={post.post_id} {...post} />
                  ))}

                  {posts?.length == 0 || !posts ? (
                    <div className="pt-10 md:pt-12">
                      <EmptyTab label="posts" />
                    </div>
                  ) : (
                    <Link
                      to={`/customer/professionals/${user_id}/activity`}
                      className="border-t py-2  text-base md:text-lg font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2 hover:bg-gray-300"
                    >
                      Show all posts
                      <ArrowRight strokeWidth={3} className="w-4 h-4" />
                    </Link>
                  )}
                </>
              )}
              {status === 'media' && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
                    {media?.map((media) => (
                      <ServiceProviderGallery
                        key={media.post_attachment_id}
                        image={media?.attachmentURL}
                      />
                    ))}
                  </div>
                  {media?.length == 0 || !media ? (
                    <div className="pt-10 md:pt-12 mb-1 ">
                      <EmptyTab label="media uploaded" />
                    </div>
                  ) : (
                    <Link
                      to={`/customer/professionals/${user_id}/activity`}
                      className="border-t py-2  text-base md:text-lg mt-2 font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2 hover:bg-gray-300"
                    >
                      Show all images
                      <ArrowRight strokeWidth={3} className="w-4 h-4" />
                    </Link>
                  )}
                </>
              )}
              {status === 'comments' && (
                <div className="grid gap-2 md:gap-4">
                  {comments?.map((singleComment) => (
                    <CommentCard
                      key={singleComment.comment_id}
                      {...singleComment}
                    />
                  ))}
                  {comments?.length == 0 || !comments ? (
                    <div className="pt-10 md:pt-12">
                      <EmptyTab label="comments" />
                    </div>
                  ) : (
                    <Link
                      to={`/customer/professionals/${user_id}/activity`}
                      className="border-t py-2  text-base md:text-lg mt-2 font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2 hover:bg-gray-300"
                    >
                      Show all comments
                      <ArrowRight strokeWidth={3} className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
