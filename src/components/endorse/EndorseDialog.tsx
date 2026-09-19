import EndorseForm from '../form/EndorseForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

interface EndorseDialogProp {
  provider_pk: string | undefined
  name?: string
}

export default function EndorseDialog({
  provider_pk,
  name,
}: EndorseDialogProp) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="capitalize font-semibold text-primary text-sm md:text-base cursor-pointer">
          endorse
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle>Endorse {name}</DialogTitle>
          <DialogDescription>
            Write a recommendation to endorse {name}
          </DialogDescription>
        </DialogHeader>
        <EndorseForm provider_pk={provider_pk} />
      </DialogContent>
    </Dialog>
  )
}
