import { endorse } from '@/api/endorse'
import type { Endorse } from '@/types/endorse.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useEndorse = () => {
  const endorseAction = async (data: Endorse) => {
    try {
      await endorse(data)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const endorseFunction = useMutation({
    mutationFn: endorseAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['endorse'] })
    },
  })

  return endorseFunction
}
