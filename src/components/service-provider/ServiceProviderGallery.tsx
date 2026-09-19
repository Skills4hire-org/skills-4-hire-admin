import { useDeleteFromGallery } from '@/hooks/useUsers'
import { Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ServiceProviderGallery({
  image,
  editGallery,
  image_id,
}: {
  image: string
  editGallery?: boolean
  image_id?: string
}) {
  const { mutate: deleteMedia, isPending: deleting } = useDeleteFromGallery()
  const handleDelete = () => {
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
    <figure className=" rounded-lg relative">
      <img
        src={image}
        alt="uploads"
        className="aspect-square object-cover rounded-lg w-full"
        loading="lazy"
      />

      {editGallery && (
        <button
          className="bg-red-100 p-1 absolute top-0 right-0  rounded-sm cursor-pointer hover:shadow-sm text-destructive hover:text-destructive/80"
          onClick={handleDelete}
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
    </figure>
  )
}
