import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Plus } from 'lucide-react'
import GalleryForm from '../form/GalleryForm'

export default function GalleryDialog() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button
          className="text-primary hover:text-primary/80 cursor-pointer shadow-sm hover:shadow-md rounded-sm p-0.5"
          onClick={() => setIsOpen(true)}
        >
          <Plus strokeWidth={2} className="w-5 h-5 md:w-6 md:h-6" />
          <span className="sr-only">add image to gallery</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle>Showcase your work</AlertDialogTitle>
          <AlertDialogDescription>
            Upload photos/videos of your projects to your gallery
          </AlertDialogDescription>
        </AlertDialogHeader>
        <GalleryForm setIsOpen={setIsOpen} />
      </AlertDialogContent>
    </AlertDialog>
  )
}
