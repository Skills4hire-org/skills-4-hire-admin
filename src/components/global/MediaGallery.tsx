import type { Gallery } from '@/types/user.types'
import { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Video from 'yet-another-react-lightbox/plugins/video'

import 'yet-another-react-lightbox/styles.css'
import { getVideoMimeType } from '@/utils/format'
import { useDeleteFromGallery } from '@/hooks/useUsers'
import { toast } from 'sonner'
import { Loader2, PlayIcon, Trash2 } from 'lucide-react'

export default function MediaGallery({
  media,
  editGallery,
}: {
  media: Gallery[] | undefined
  editGallery?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const slides = useMemo(
    () =>
      media?.map((item) =>
        item.type === 'video'
          ? {
              type: 'video' as const,
              width: 1920,
              height: 1080,
              poster: item.thumbnail_url,
              sources: [
                {
                  src: item.image_url,
                  type: getVideoMimeType(item.image_url),
                },
              ],
            }
          : {
              src: item.image_url,
              alt: item.description,
            },
      ),
    [media],
  )

  const { mutate: deleteMedia, isPending: deleting } = useDeleteFromGallery()
  const handleDelete = (image_id: string | undefined) => {
    deleteMedia(image_id, {
      onSuccess: () => {
        toast.success('Deleted successfully')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
        {media?.map((item, index) => (
          <div key={item.work_image_id} className="relative">
            <button
              onClick={() => {
                setIndex(index)
                setOpen(true)
              }}
              className="relative overflow-hidden rounded-lg"
            >
              {item.type === 'video' ? (
                <>
                  <img
                    src={item.thumbnail_url}
                    alt={item.description}
                    className="aspect-square object-cover rounded-lg w-full"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="rounded-full bg-white/90 p-1">
                      <PlayIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={item.image_url}
                  alt={item.description}
                  className="aspect-square object-cover rounded-lg w-full"
                />
              )}
            </button>
            {editGallery && (
              <button
                className="bg-red-100 p-1 absolute top-0 right-0  rounded-sm cursor-pointer hover:shadow-sm text-destructive hover:text-destructive/80"
                onClick={() => handleDelete(item.work_image_id)}
                disabled={deleting}
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                )}

                <span className="sr-only">delete image</span>
              </button>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Video]}
      />
    </>
  )
}
