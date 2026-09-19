import { serviceProviderTabList } from '@/assets/data'
import Container from '../global/Container'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs'
import { cn } from '@/lib/utils'
import AboutDialog from './AboutDialog'
import { ArrowRight, Edit2, Undo2 } from 'lucide-react'
import ServiceProviderAbout from '../service-provider/ServiceProviderAbout'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyTab from '../service-provider/EmptyTab'
import GalleryDialog from './GalleryDialog'
import type { Gallery } from '@/types/user.types'
import MediaGallery from '../global/MediaGallery'

export default function AboutGallery({
  about,
  gallery,
}: {
  about: string | undefined
  gallery: Gallery[] | undefined
}) {
  const [editGallery, setEditGallery] = useState(false)
  return (
    <div className="border-b-8 pt-2 md:pt-4 relative">
      <Container>
        <Tabs defaultValue="about" className="space-y-2 ">
          <TabsList className="border-b-0 bg-background  rounded-none relative p-0 space-x-12 md:space-x-24">
            {serviceProviderTabList.map((status, index) => {
              return (
                <TabsTrigger
                  key={index}
                  value={status}
                  className={cn(
                    'bg-background cursor-pointer capitalize border-b-1 border-b-transparent text-base md:text-lg text-muted-foreground data-[state=active]:border-b-foreground data-[state=active]:border-b-1 px-0 data-[state=active]:text-foreground',
                  )}
                >
                  {status}
                </TabsTrigger>
              )
            })}
          </TabsList>
          {serviceProviderTabList.map((status) => {
            return (
              <TabsContent key={status} value={status} className="md:pt-1">
                {status === 'about' ? (
                  <div className="pb-3 md:pb-4">
                    <>
                      {about ? (
                        <ServiceProviderAbout about={about} />
                      ) : (
                        <div className="py-10 -mt-2 md:-mt-4 -mb-5 md:-mb-6 ">
                          <EmptyTab label="about" />
                        </div>
                      )}
                    </>

                    <AboutDialog about={about} />
                  </div>
                ) : (
                  <div>
                    <>
                      {gallery?.length == 0 ? (
                        <div className="py-10 -mt-2 md:-mt-4">
                          <EmptyTab label="image uploaded" />
                        </div>
                      ) : (
                        <div className="pb-14 md:pb-16">
                          <MediaGallery
                            media={gallery?.slice(0, 4)}
                            editGallery={editGallery}
                          />
                          <Link
                            to="gallery"
                            className="border-t py-2 text-base md:text-lg mt-2 font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2 hover:bg-gray-300 "
                          >
                            Show all
                            <ArrowRight strokeWidth={3} className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </>

                    {editGallery ? (
                      <div className="flex items-center gap-2 absolute top-2 md:top-4 right-2 md:right-4">
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
                        className="text-primary absolute top-2 md:top-4 right-2 md:right-4 cursor-pointer text-primary/80"
                        onClick={() => setEditGallery(true)}
                      >
                        <Edit2
                          strokeWidth={2}
                          className="w-5 h-5 md:w-6 md:h-6"
                        />
                        <span className="sr-only">open edit</span>
                      </button>
                    )}
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </Container>
    </div>
  )
}
