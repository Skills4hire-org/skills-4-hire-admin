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
import type { Profile } from '@/types/user.types'
import ProviderProfileOverviewForm from '../form/ProviderProfileOverviewForm'

export default function OverviewDialog({
  professional,
}: {
  professional: Profile | undefined
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className="text-primary absolute bottom-6 md:bottom-8 right-0 cursor-pointer">
          <Edit2 strokeWidth={2} className="w-5 h-5 md:w-6 md:h-6" />
          <span className="sr-only">edit profile overview</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle>Profile</AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Your profile
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ProviderProfileOverviewForm
          professional={professional}
          setIsOpen={setIsOpen}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
