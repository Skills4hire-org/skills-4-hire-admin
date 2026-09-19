import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useDeleteService } from '@/hooks/useUsers'
import { toast } from 'sonner'
import { useState } from 'react'

export default function DeleteServiceDialog({
  service_id,
}: {
  service_id?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  const { mutate: deleteService, isPending } = useDeleteService()

  const handleDeleteService = () => {
    deleteService(service_id, {
      onSuccess: () => {
        setIsOpen(false)
        toast.success('Service deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className="p-1 bg-red-100 absolute top-0 right-0 rounded-sm cursor-pointer hover:bg-red-200">
          <Trash2 className="h-3 w-3 md:h-4 md:w-4 text-destructive" />
          <span className="sr-only">delete service</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle>Delete Service</AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Delete a service
          </AlertDialogDescription>
        </AlertDialogHeader>
        <p>
          Are you sure you want to delete this service? This action cannot be
          undone.
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Close
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDeleteService}
            disabled={isPending}
          >
            {isPending ? 'Deleting' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
