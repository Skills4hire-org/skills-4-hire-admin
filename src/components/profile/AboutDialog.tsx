import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Edit2 } from 'lucide-react'
import AboutForm from '../form/AboutForm'

export default function AboutDialog({ about }: { about: string | undefined }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className="text-primary absolute top-2 md:top-4 right-2 md:right-4 cursor-pointer text-primary/80">
          <Edit2 strokeWidth={2} className="w-5 h-5 md:w-6 md:h-6" />
          <span className="sr-only">edit about</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle>About</AlertDialogTitle>
          <AlertDialogDescription>
            Let people know what you're about
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AboutForm setIsOpen={setIsOpen} about={about as string} />
      </AlertDialogContent>
    </AlertDialog>
  )
}
