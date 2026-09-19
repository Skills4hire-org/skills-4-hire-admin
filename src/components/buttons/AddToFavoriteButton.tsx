import { useAddFavourite, useDeleteFavourite } from '@/hooks/useFavourites'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'

export default function AddToFavoriteButton({
  id,
  isFavourite,
  name,
  favouriteID,
}: {
  id: string
  isFavourite: boolean | undefined
  name: string
  favouriteID?: string
}) {
  const { mutate: addFavourite, isPending: adding } = useAddFavourite()
  const { mutate: deleteFavourite, isPending: deleting } = useDeleteFavourite()
  const handleFavourites = () => {
    isFavourite
      ? deleteFavourite(
          {
            provider_id: id,
            favourite_id: favouriteID as string,
          },
          {
            onSuccess: () => {
              toast.success(
                `You've removed ${name} from your favourite professionals`,
              )
            },
          },
        )
      : addFavourite(id, {
          onSuccess: () => {
            toast.success(
              `You've added ${name} to your favourite professionals`,
            )
          },
        })
  }

  return (
    <button
      onClick={handleFavourites}
      className="cursor-pointer"
      disabled={adding || deleting}
    >
      <Heart
        className={`w-4 md:w-6 h-4 md:h-6 ${isFavourite ? 'text-red-600 fill-red-600' : 'text-foreground'}`}
      />
    </button>
  )
}
