import { serviceProviderTabList } from '@/assets/data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { cn } from '@/lib/utils'
import ServiceProviderAbout from './ServiceProviderAbout'
import ServiceProviderGallery from './ServiceProviderGallery'
import EmptyTab from './EmptyTab'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Gallery } from '@/types/user.types'

export default function ServiceProviderTab({
  about,
  gallery,
  user_id,
}: {
  about: string | undefined
  gallery: Gallery[] | undefined
  user_id: string | undefined
}) {
  return (
    <Tabs defaultValue="about" className="space-y-1 ">
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
          <TabsContent key={status} value={status} className="">
            {status === 'gallery' && (
              <div className="pb-10 md:pb-12">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
                  {gallery?.map((gallery) => (
                    <ServiceProviderGallery
                      key={gallery.image_url}
                      image={gallery.image_url}
                    />
                  ))}
                </div>

                {gallery?.length == 0 || !gallery ? (
                  <div className="pt-10 md:pt-12 mb-1">
                    <EmptyTab label="image uploaded" />
                  </div>
                ) : (
                  <Link
                    to={`/customer/professionals/${user_id}/gallery`}
                    className="border-t py-2  text-base md:text-lg mt-2 font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2 hover:bg-gray-300"
                  >
                    Show all images
                    <ArrowRight strokeWidth={3} className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}
            {status === 'about' && (
              <>
                <ServiceProviderAbout about={about} />
                {!about && (
                  <div className="py-10 md:py-12 ">
                    <EmptyTab label="about" />
                  </div>
                )}
              </>
            )}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
