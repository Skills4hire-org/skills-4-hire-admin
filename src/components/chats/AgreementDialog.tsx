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

export default function AgreementDialog() {
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
        <button className=" px-1  flex items-center gap-1 cursor-pointer  group text-start">
          <Icon
            strokeWidth={5}
            icon="mdi-light:check-circle"
            className="w-6.5 h-6.5 group-hover:text-primary shrink-0"
          />
          <span className="group-hover:text-primary">Agree on Final Price</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-60 px-2 py-4">
        <AlertDialogHeader>
          <AlertDialogTitle className=" flex items-center gap-1 text-sm justify-center  w-full">
            <Icon
              icon="material-symbols-light:money-bag-outline"
              className="w-6.5 h-6.5"
            />
            <span>Do you Agree on Final Price?</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Agree on Final price
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form className="space-y-4">
          <FormInput
            name="price"
            value={formData.price}
            handleInputChange={handleInputChange}
            type="text"
            label="Final Price"
            className="bg-gray-300"
            placeholder="Enter a price"
            labelSize="text-xs md:text-sm"
          />
        </form>
        <AlertDialogFooter className="grid grid-cols-2">
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
