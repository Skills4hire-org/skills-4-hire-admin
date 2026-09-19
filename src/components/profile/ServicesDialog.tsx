import { useState } from 'react'
import ServiceForm from '../form/ServiceForm'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

export default function ServicesDialog({ text }: { text?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size={text ? 'default' : 'icon'}
          className={`h-7 md:h-10 md:px-4 px-1 text-sm md:text-base font-medium rounded-sm flex items-center gap-2 text-white ${!text && 'w-7 md:w-10'}`}
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          {text}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle>Add a service</AlertDialogTitle>
          <AlertDialogDescription>
            Add a specific service you provide with cost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ServiceForm setIsOpen={setIsOpen} />
      </AlertDialogContent>
    </AlertDialog>
  )
}
