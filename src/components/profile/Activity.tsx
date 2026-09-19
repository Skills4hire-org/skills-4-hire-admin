import { serviceProviderActivityTabList } from '@/assets/data'
import Container from '../global/Container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { cn } from '@/lib/utils'
import { ArrowRight, Edit2Icon } from 'lucide-react'
import type { Post, PostComment } from '@/types/post.types'
import PostCard from '../home/PostCard'
import { Link } from 'react-router-dom'
import EmptyTab from '../service-provider/EmptyTab'
import ServiceProviderGallery from '../service-provider/ServiceProviderGallery'
import CommentCard from '../home/CommentCard'
import type { Media } from '@/types/user.types'

interface ActivityProp {
  posts?: Post[]
  comments?: PostComment[]
  media?: Media[]
}

export default function Activity({ posts, comments, media }: ActivityProp) {
  return (
    <div className="relative border-b-8 pt-2 md:pt-4">
      <Container className="">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg md:text-xl ">Activity</h2>
          <Tabs defaultValue="posts" className="space-y-2">
            <TabsList className="border-b-0 bg-background  rounded-none  p-0 space-x-4 md:space-x-8 ">
              {serviceProviderActivityTabList.map((status, index) => {
                return (
                  <div key={index}>
                    <TabsTrigger
                      value={status}
                      className={cn(
                        'bg-background cursor-pointer capitalize border border-muted-foreground px-4 pt-2 pb-2.5 rounded-full text-base md:text-lg text-muted-foreground data-[state=active]:bg-green-700 data-[state=active]:border-green-700 data-[state=active]:text-white data-[state=active]:border-b-1 font-normal',
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
                <TabsContent key={status} value={status} className="md:pt-1">
                  {
                    <Link
                      to="/professional/create-post"
                      className={`absolute right-2 md:right-4 top-2 md:top-4 border-1 border-primary rounded-full text-primary px-2 py-1 text-xs md:text-sm font-medium flex items-center gap-2 hover:bg-primary hover:text-white ${status === 'posts' ? 'flex' : 'hidden'}`}
                    >
                      Create a post
                      <Edit2Icon className="w-3 h-3 md:w-4 md:h-4" />
                    </Link>
                  }
                  {status === 'posts' && (
                    <>
                      {posts?.length == 0 ? (
                        <div className="py-10 -mt-2 md:-mt-4">
                          <EmptyTab label="posts" />
                        </div>
                      ) : (
                        <div className="pb-10 md:pb-12">
                          {posts?.map((post) => (
                            <PostCard key={post.post_id} {...post} />
                          ))}
                          <Link
                            to="activity"
                            className="border-t py-2  text-base md:text-lg mt-2 font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2 hover:bg-gray-300"
                          >
                            Show all posts
                            <ArrowRight strokeWidth={3} className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                  {status === 'media' && (
                    <>
                      {media?.length == 0 ? (
                        <div className="py-10 -mt-2 md:-mt-4 mb-2">
                          <EmptyTab label="media uploaded" />
                        </div>
                      ) : (
                        <div className="pb-10 md:pb-12">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 pb-2">
                            {media?.map((image, index) => (
                              <ServiceProviderGallery
                                key={index}
                                image={image.attachmentURL}
                              />
                            ))}
                          </div>
                          <Link
                            to="activity"
                            className="border-t py-2  text-base md:text-lg mt-2 font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2 hover:bg-gray-300"
                          >
                            Show all images
                            <ArrowRight strokeWidth={3} className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                  {status === 'comments' && (
                    <>
                      {comments?.length == 0 ? (
                        <div className="py-10 -mt-2 md:-mt-4">
                          <EmptyTab label="comments" />
                        </div>
                      ) : (
                        <div className="pb-10 md:pb-12">
                          <div className="grid gap-2 md:gap-4">
                            {comments?.map((comment) => (
                              <CommentCard
                                key={comment.comment_id}
                                {...comment}
                              />
                            ))}
                          </div>
                          <Link
                            to="activity"
                            className="border-t py-2  text-base md:text-lg mt-2 font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2 hover:bg-gray-300"
                          >
                            Show all comments
                            <ArrowRight strokeWidth={3} className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>
              )
            })}
          </Tabs>
        </div>
      </Container>
    </div>
  )
}
