import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import type { Profile } from '@/types/user.types'
import ProfileImageForm from '../form/ProfileImageForm'
import { useState } from 'react'

export default function ProfileImageDialog({
  professional,
}: {
  professional: Profile | undefined
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <figure className="bg-gray-100 -mt-13 md:-mt-18.5  mb-1 md:mb-2 w-max rounded-full border-4 border-background">
          <img
            src={professional?.user?.profile?.avatar?.avatar}
            alt={professional?.user?.profile?.display_name}
            className="aspect-square object-cover w-24 md:w-34 rounded-full"
          />
        </figure>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-center">
          <DialogTitle>Profile Image</DialogTitle>
          <DialogDescription className="sr-only">
            Your profile image
          </DialogDescription>
        </DialogHeader>

        <ProfileImageForm
          avatar={professional?.user?.profile?.avatar?.avatar}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
