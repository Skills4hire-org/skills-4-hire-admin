import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Edit2 } from 'lucide-react'
import CoverPhotoForm from '../form/CoverPhotoForm'
import { useState } from 'react'

export default function CoverPhotoDialog({
  cover_photo,
}: {
  cover_photo: string | undefined
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="bg-white p-2 text-primary rounded-full absolute top-3 md:top-5 right-4 md:right-6 cursor-pointer">
          <Edit2 strokeWidth={3} className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" />
          <span className="sr-only">edit cover photo</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-center">
          <DialogTitle>Cover photo</DialogTitle>
          <DialogDescription className="sr-only">
            Your cover photo
          </DialogDescription>
        </DialogHeader>

        <CoverPhotoForm cover_photo={cover_photo} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
