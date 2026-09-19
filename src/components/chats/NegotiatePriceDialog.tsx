import { Icon } from '@iconify/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { currencyFormatter } from '@/utils/format'
import { useState } from 'react'
import FormInput from '../form-fields/FormInput'
import FormTextArea from '../form-fields/FormTextArea'

export default function NegotiatePriceDialog() {
  const [formData, setFormData] = useState({
    price: '',
    note: '',
  })
  const handleInputChange = (field: string, value: string) => {
    if (field === 'price') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({
        ...prev,
        [field]: newValue && `${currencyFormatter(Number(newValue))}`,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="border-r-1 border-foreground px-1  flex items-center gap-1 cursor-pointer hover:text-primary text-start">
          <Icon
            icon="material-symbols-light:cycle"
            className="w-6.5 h-6.5 shrink-0"
          />
          <span>Negotiate Price</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-56 px-2 py-4">
        <AlertDialogHeader>
          <AlertDialogTitle className=" flex items-center gap-1 text-sm justify-center  w-full">
            <Icon
              icon="material-symbols-light:cycle"
              className="w-6.5 h-6.5 "
            />
            <span>Negotiate Price</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Negotiate price
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form className="space-y-4">
          <FormInput
            name="price"
            value={formData.price}
            handleInputChange={handleInputChange}
            type="text"
            label="Counter offer"
            className="bg-gray-300"
            placeholder="Enter a price"
            labelSize="text-xs md:text-sm"
          />
          <FormTextArea
            name="note"
            value={formData.note}
            handleInputChange={handleInputChange}
            label="Note (Optional)"
            rows={1}
            className="bg-gray-300 mt-2 min-h-8 h-9 text-xs md:text-sm md:h-10"
          />
        </form>
        <AlertDialogFooter className="grid grid-cols-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Send</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
