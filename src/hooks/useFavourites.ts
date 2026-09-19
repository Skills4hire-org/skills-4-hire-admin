import { addFavourite, deleteFavourite, getFavourites } from '@/api/favourites'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useFavourites = () => {
  const getAllFavourites = async () => {
    const favourites = await getFavourites()
    return favourites
  }
  const queryData = useQuery({
    queryKey: ['favourites'],
    queryFn: getAllFavourites,
  })
  return queryData
}

export const useAddFavourite = () => {
  const addFavouriteAction = async (provider_id: string) => {
    try {
      await addFavourite(provider_id)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const addFavouriteFunction = useMutation({
    mutationFn: addFavouriteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] })
    },
  })

  return addFavouriteFunction
}
export const useDeleteFavourite = () => {
  const deleteFavouriteAction = async ({
    provider_id,
    favourite_id,
  }: {
    provider_id: string
    favourite_id: string
  }) => {
    try {
      await deleteFavourite({ provider_id, favourite_id })
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const deleteFavouriteFunction = useMutation({
    mutationFn: deleteFavouriteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] })
    },
  })

  return deleteFavouriteFunction
}
